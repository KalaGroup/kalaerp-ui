import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Country } from '@shared/interfaces/hr';
import { profitcenterservices } from '@shared/services/hr/profitcenter/profitcenterservices';
import { HttpClient } from '@angular/common/http';

import { FormArray } from '@angular/forms';
import { Activityservcie } from '@shared/services/hr/ActivityMaster/activityservice';

interface Row {
  description: string;
  isEdit?: boolean;
}
@Component({
  selector: 'app-add-edit-activity',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
  ,
  templateUrl: './add-edit-activity.html',
  styleUrl: './add-edit-activity.scss'
})

export class AddEditActivity {
  ActivityForm!: FormGroup;
  isEditMode: boolean = false;
  activitytypeList: any[] = [];
  code: string = '';
  activitytypeSearchControl = new FormControl('');
  filteredactivitytypeList: any[] = [];
  // define lists for dropdowns
  gradeList: any[] = [];
  designationList: any[] = [];
  divisionList: any[] = [];
  descriptionDetails: any[] = [];
  responsibilitiesList: any[] = [];
  newDescription: string = '';
  description: { srno: number; desc: string }[] = [];
  editIndex: number | null = null;


  constructor(private ActivityServices: Activityservcie, private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditActivity>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.activity;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllActivityGrade();
    this.loadAllActivityDesignation();
    this.loadAllActivityDivision();


  }

  private initializeForm(): void {
    const currentDate = new Date(); // keep as Date object

    this.ActivityForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      ActivityId: [''],
      ActivityGradeId: ['', Validators.required],
      ActivityDesignationId: ['', Validators.required],
      ActivityDivisionId: ['', Validators.required],
      ActivityRemark: [''],
      ActivityAuthRemark: [''],
      ActivityAuth: [{ value: true, disabled: !this.isEditMode }],
      ActivityIsActive: [{ value: true, disabled: !this.isEditMode }],
      ActivityIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
    });

    if (this.isEditMode && this.data.activity) {
      console.log('Patching form with activity data:', this.data.activity);
      this.loadAllDescriptions();
      this.ActivityForm.patchValue({
        ActivityId: this.data.activity.ActivityId ?? '',
        ActivityGradeId: this.data.activity.ActivityGradeId ?? '',
        ActivityDesignationId: this.data.activity.ActivityDesignationId ?? '',
        ActivityDivisionId: this.data.activity.DivisionId ?? '',
        ActivityRemark: this.data.activity.ActivityRemark ?? '',
        ActivityAuthRemark: this.data.activity.ActivityAuthRemark ?? '',
        ActivityAuth: this.data.activity.ActivityAuth ?? true,
        ActivityIsActive: this.data.activity.ActivityIsActive ?? true,
        ActivityIsDiscard: this.data.activity.ActivityIsDiscard ?? false,
        CreatedBy: this.data.activity.CreatedBy ?? '1',
        CreatedDate: this.data.activity.CreatedDate ? new Date(this.data.activity.CreatedDate) : currentDate,

      });
    }
  }


 
  loadAllDescriptions(): void {
    debugger
    const activityMstId = this.data.activity.ActivityId;
    this.ActivityServices.getActivityByMstId(activityMstId).subscribe({
      next: res => {
        console.log('activity Details Fetched successfully:', res);
        this.descriptionDetails = res;
        console.log("descriptionDetails", this.descriptionDetails)
        this.description = res.map((d: any) => ({
          srno: d.SrNo,
          desc: d.ActivityDetailsDescription,
        }));
      },
      error: err => {
        console.error('Error fetch activity details:', err);
      },
    });
  }


  // ✅ Load Grade API
  loadAllActivityGrade(): void {
    debugger
    this.ActivityServices.getAllGrade().subscribe({
      next: res => {
        this.gradeList = res;
        console.log("All Grade", this.gradeList);
        if (this.isEditMode && this.data) {
          this.setactivityGradeForEdit();
        }
      },
      error: err => console.error('Error loading grades', err)
    });
  }
  private setactivityGradeForEdit(): void {

    let GradeId = null;
    const activityData = this.data.activity;
    if (activityData?.GradeName) {
      const activityType = this.gradeList.find(
        q => q.GradeName.trim() === activityData.GradeName.trim()
      );
      GradeId = activityType ? activityType.GradeId : null;

      console.log('Found activityType by name:', GradeId, 'for name:', activityData.GradeName);
    }

    if (GradeId) {
      this.ActivityForm.patchValue({
        ActivityGradeId: GradeId,
      });
      console.log('activityType set in form:', GradeId);
    } else {
      console.log('No activityType ID found for name:', activityData?.GradeName);
    }
  }

  // ✅ Load Designation API
  loadAllActivityDesignation(): void {
    this.ActivityServices.getAllDesignations().subscribe({
      next: res => {
        this.designationList = res;
        if (this.isEditMode && this.data) {
          this.setactivityDesignationForEdit();
        }
      },
      error: err => console.error('Error loading designations', err)
    });
  }

  private setactivityDesignationForEdit(): void {
    let DesignationId = null;
    const activityData = this.data.activity;
    if (activityData?.DesignationName) {
      const activityType = this.designationList.find(
        q => q.DesignationName.trim() === activityData.DesignationName.trim()
      );
      DesignationId = activityType ? activityType.DesignationId : null;

      console.log('Found activityType by name:', DesignationId, 'for name:', activityData.DesignationName);
    }

    if (DesignationId) {
      this.ActivityForm.patchValue({
        ActivityDesignationId: DesignationId,
      });
      console.log('activityType set in form:', DesignationId);
    } else {
      console.log('No activityType ID found for name:', activityData?.DesignationName);
    }
  }


  // ✅ Load Division API
  loadAllActivityDivision(): void {
    this.ActivityServices.getAllDivisions().subscribe({
      next: res => {
        this.divisionList = res;
        console.log("divisionList", this.divisionList)
        if (this.isEditMode && this.data) {
          this.setactivityDivisionForEdit();
        }
      },
      error: err => console.error('Error loading divisions', err)
    });
  }

  private setactivityDivisionForEdit(): void {
    let DivisionId = null;
    const activityData = this.data.activity;
    if (activityData?.DivisionName) {
      const activityType = this.divisionList.find(
        q => q.DivisionName.trim() === activityData.DivisionName.trim()
      );
      DivisionId = activityType ? activityType.DivisionId : null;

      console.log('Found activityType by name:', DivisionId, 'for name:', activityData.DivisionName);
    }

    if (DivisionId) {
      this.ActivityForm.patchValue({
        ActivityDivisionId: DivisionId,
      });
      console.log('activityType set in form:', DivisionId);
    } else {
      console.log('No activityType ID found for name:', activityData?.DivisionName);
    }
  }

  onSubmit(): void {

    console.log('Form Value:', this.ActivityForm.value);
    if (this.ActivityForm.valid && this.description.length > 0) {
      this.ActivityForm.enable(); // Enable the form to include disabled fields
      const descriptionString = this.description.map(item => ({
        srno: item.srno,
        desc: item.desc,
      }));
      const payload = {
        ...this.ActivityForm.value,
        descriptions: descriptionString,
      };
      this.dialogRef.close(payload);  // ✅ will return PascalCase keys
    } else {
      this.ActivityForm.markAllAsTouched();
    }
  }



  onCancel(): void {
    this.dialogRef.close();
  }



  addRow() {
    debugger
    const desc = this.newDescription.trim();

    if (this.newDescription.trim() == undefined || this.newDescription.trim() == '') {
      alert('Please Add Description.');
      return;
    }

    if (desc !== '') {
      // check if already exists
      const exists = this.description.some(item => item.desc.toLowerCase() === desc.toLowerCase());
      if (exists) {
        alert('This description already exists!');
        return;
      }
      const srno = this.description.length + 1; // Sr.No = next index
      this.description.push({ srno, desc });
      this.newDescription = ''; // clear input
    }
  }


  deleteRow(index: number) {
    this.description.splice(index, 1);
  }

  editRow(index: number) {
    this.editIndex = index; // mark row as editable
  }

  updateRow(index: number) {
    if (this.description.at(index)?.desc == undefined || this.description.at(index)?.desc == '') {
      alert('Please Add Description.');
      return;
    }
    let flg = 0;
    for (let part of this.description) {
      if (part.desc == this.description.at(index)?.desc) {
        flg += 1;
      }
    }

    if (flg > 1) {
      this.description.at(index)?.desc == '';
      alert('This description already exists!');
      return;
    }

    this.editIndex = null; // finish editing
  }

}
