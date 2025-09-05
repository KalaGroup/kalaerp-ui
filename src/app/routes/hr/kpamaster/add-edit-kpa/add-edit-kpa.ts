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
import { kpaservice } from '@shared/services/hr/KPA/kpaservice';


interface Row {
  description: string;
  isEdit?: boolean;
}

@Component({
  selector: 'app-add-edit-kpa',
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
    ReactiveFormsModule,],
  templateUrl: './add-edit-kpa.html',
  styleUrl: './add-edit-kpa.scss'
})
export class AddEditKpa {
  KPAForm!: FormGroup;
  isEditMode: boolean = false;
  kpatypeList: any[] = [];
  code: string = '';
  kpatypeSearchControl = new FormControl('');
  filteredkpatypeList: any[] = [];
  // define lists for dropdowns
  gradeList: any[] = [];
  designationList: any[] = [];
  divisionList: any[] = [];
  descriptionDetails: any[] = [];
  responsibilitiesList: any[] = [];
  newDescription: string = '';
  description: { srno: number; desc: string }[] = [];
  editIndex: number | null = null;

  constructor(private KPAservice: kpaservice, private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditKpa>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.kpa;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllKPAGrade();
    this.loadAllKPADesignation();
    this.loadAllKPADivision();

  }

  private initializeForm(): void {
    const currentDate = new Date(); // keep as Date object

    this.KPAForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      Kpaid: [''],
      KpagradeId: ['', Validators.required],
      KpadesignationId: ['', Validators.required],
      KpadivisionId: ['', Validators.required],
      Kparemark: [''],
      KpaauthRemark: [''],
      Kpaauth: [{ value: true, disabled: !this.isEditMode }],
      KpaisActive: [{ value: true, disabled: !this.isEditMode }],
      KpaisDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
    });

    if (this.isEditMode && this.data.kpa) {
      debugger
      console.log('Patching form with kpa data:', this.data.kpa);
      this.loadAllDescriptions();
      this.KPAForm.patchValue({
        Kpaid: this.data.kpa.Kpaid ?? '',
        KpagradeId: this.data.kpa.KpagradeId ?? '',
        KpadesignationId: this.data.kpa.KpadesignationId ?? '',
        KpadivisionId: this.data.kpa.KpadivisionId ?? '',
        Kparemark: this.data.kpa.Kparemark ?? '',
        KpaauthRemark: this.data.kpa.KpaauthRemark ?? true,
        KpaisActive: this.data.kpa.KpaisActive ?? true,
        KpaisDiscard: this.data.kpa.KpaisDiscard ?? false,
        CreatedBy: this.data.kpa.CreatedBy ?? '1',
        CreatedDate: this.data.kpa.CreatedDate ? new Date(this.data.kpa.CreatedDate) : currentDate,

      });
    }
  }

  loadAllDescriptions(): void {
    debugger
    const KpaMstId = this.data.kpa.Kpaid;
    this.KPAservice.getKpaByMstId(KpaMstId).subscribe({
      next: res => {
        console.log('kpa Details Fetched successfully:', res);
        this.descriptionDetails = res;
        console.log("descriptionDetails", this.descriptionDetails)
        this.description = res.map((d: any) => ({
          srno: d.SrNo,
          desc: d.KpadetailsDescription

        }));
      },
      error: err => {
        console.error('Error fetch kpa details:', err);
      },
    });
  }

  loadAllKPAGrade(): void {
    debugger
    this.KPAservice.getAllGrade().subscribe({
      next: res => {
        this.gradeList = res;
        console.log("All Grade", this.gradeList);
        if (this.isEditMode && this.data) {
          this.setKpaGradeForEdit();
        }
      },
      error: err => console.error('Error loading grades', err)
    });
  }
  private setKpaGradeForEdit(): void {

    let GradeId = null;
    const kpaData = this.data.kpa;
    if (kpaData?.GradeName) {
      const kpatype = this.gradeList.find(
        q => q.GradeName.trim() === kpaData.GradeName.trim()
      );
      GradeId = kpatype ? kpatype.GradeId : null;

      console.log('Found KPA by name:', GradeId, 'for name:', kpaData.GradeName);
    }

    if (GradeId) {
      this.KPAForm.patchValue({
        KpagradeId: GradeId,
      });
      console.log('KPA set in form:', GradeId);
    } else {
      console.log('No KPA ID found for name:', kpaData?.GradeName);
    }
  }

  // ✅ Load Designation API
  loadAllKPADesignation(): void {
    this.KPAservice.getAllDesignations().subscribe({
      next: res => {
        this.designationList = res;
        if (this.isEditMode && this.data) {
          this.setkpaDesignationForEdit();
        }
      },
      error: err => console.error('Error loading designations', err)
    });
  }

  private setkpaDesignationForEdit(): void {
    let DesignationId = null;
    const kpaData = this.data.kpa;
    if (kpaData?.DesignationName) {
      const kpaType = this.designationList.find(
        q => q.DesignationName.trim() === kpaData.DesignationName.trim()
      );
      DesignationId = kpaType ? kpaType.DesignationId : null;

      console.log('Found KPA by name:', DesignationId, 'for name:', kpaData.DesignationName);
    }

    if (DesignationId) {
      this.KPAForm.patchValue({
        KpadesignationId: DesignationId,
      });
      console.log('kpa set in form:', DesignationId);
    } else {
      console.log('No kpa  found for name:', kpaData?.DesignationName);
    }
  }


  // ✅ Load Division API
  loadAllKPADivision(): void {
    this.KPAservice.getAllDivisions().subscribe({
      next: res => {
        this.divisionList = res;
        if (this.isEditMode && this.data) {
          this.setkpaDivisionForEdit();
        }
      },
      error: err => console.error('Error loading divisions', err)
    });
  }

  private setkpaDivisionForEdit(): void {
    let DivisionId = null;
    const kpaData = this.data.kpa;
    if (kpaData?.DivisionName) {
      const activityType = this.divisionList.find(
        q => q.DivisionName.trim() === kpaData.DivisionName.trim()
      );
      DivisionId = activityType ? activityType.DivisionId : null;

      console.log('Found KPA by name:', DivisionId, 'for name:', kpaData.DivisionName);
    }

    if (DivisionId) {
      this.KPAForm.patchValue({
        KpadivisionId: DivisionId,
      });
      console.log('KPA set in form:', DivisionId);
    } else {
      console.log('No KPA ID found for name:', kpaData?.DivisionName);
    }
  }

  onSubmit(): void {

    console.log('Form Value:', this.KPAForm.value);
    if (this.KPAForm.valid && this.description.length > 0) {
      this.KPAForm.enable(); // Enable the form to include disabled fields
      const descriptionString = this.description.map(item => ({
        srno: item.srno,
        desc: item.desc,
      }));
      const payload = {
        ...this.KPAForm.value,
        descriptions: descriptionString,
      };
      this.dialogRef.close(payload);  // ✅ will return PascalCase keys
    } else {
      this.KPAForm.markAllAsTouched();
    }
  }



  onCancel(): void {
    this.dialogRef.close();
  }



  addRow() {
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
