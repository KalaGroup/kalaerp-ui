import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { IDivision } from '@shared/interfaces/hr/division';
import { Divisionservice } from '@shared/services/hr/division/divisionservice';
import { Designationservice } from '@shared/services/hr/designation/designationservice';
import { IGrade } from '@shared/interfaces/hr/grade';
import { IDesignation } from '@shared/interfaces/hr/designation';
import { Gradeservice } from '@shared/services/hr/grade/gradeservice';
import { Authoritiesservice } from '@shared/services/hr/authorities/authoritiesservice';
import { MatTableDataSource } from '@angular/material/table';

interface Row {
  description: string;
  isEdit?: boolean;
}

@Component({
  selector: 'app-add-edit-authorities',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './add-edit-authorities.html',
  styleUrl: './add-edit-authorities.scss',
})
export class AddEditAuthorities {
  authoritiesForm!: FormGroup;
  isEditMode = false;
  authoritiesDetailsDataSource = new MatTableDataSource<any>([]);
  newauthoritiesDetail: string = '';
  descriptionDetails: any[] = [];
  description: { srno: number; desc: string }[] = [];
  editIndex: number | null = null;
  newDescription: string = '';

  //Grade
  filteredgradeList: IGrade[] = [];
  gradeList: any[] = [];
  gradeSearchControl = new FormControl('');

  //Division
  filtereddivisionList: IDivision[] = [];
  divisionList: any[] = [];
  divisionSearchControl = new FormControl('');

  //Designation
  filtereddesignationList: IDesignation[] = [];
  designationList: any[] = [];
  designationSearchControl = new FormControl('');

  constructor(
    private authoritiesService: Authoritiesservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditAuthorities>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.authorities;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllGrade();
    this.loadAllDivision();
    this.loadAllDesignation();
    this.loadAllDescriptions();
  }

  private initializeForm(): void {
    const currentDate = new Date();
    this.authoritiesForm = this.fb.group({
      AuthoritiesId: [''],
      AuthoritiesGradeId: ['', [Validators.required]],
      AuthoritiesDesignationId: ['', [Validators.required]],
      AuthoritiesDivisionId: ['', [Validators.required]],
      AuthoritiesRemark: [''],
      AuthoritiesAuthRemark: [''],
      AuthoritiesAuth: [{ value: true, disabled: !this.isEditMode }],
      AuthoritiesIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      AuthoritiesIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode && this.data.authorities) {
      this.loadAllDescriptions();
      this.authoritiesForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        code: this.data.authorities.code,
        AuthoritiesId: this.data.authorities.AuthoritiesId,
        AuthoritiesGradeId: this.data.authorities.AuthoritiesGradeId,
        AuthoritiesDesignationId: this.data.authorities.AuthoritiesDesignationId,
        AuthoritiesDivisionId: this.data.authorities.AuthoritiesDivisionId,
        AuthoritiesRemark: this.data.authorities.AuthoritiesRemark,
        AuthoritiesAuthRemark: this.data.authorities.AuthoritiesAuthRemark,
        AuthoritiesAuth: this.data.authorities.AuthoritiesAuth,
        AuthoritiesIsDiscard: this.data.authorities.AuthoritiesIsDiscard,
        AuthoritiesIsActive: this.data.authorities.AuthoritiesIsActive,
        CreatedBy: this.data.authorities.CreatedBy,
      });
      this.authoritiesForm.get('code')?.enable();
      this.authoritiesForm.get('CreatedDate')?.disable();
      this.authoritiesForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.authoritiesForm.value);
    }
  }

  loadAllDescriptions(): void {
    const authoritiesMstId = this.data.authorities.AuthoritiesId;
    this.authoritiesService.getAuthoritiesDetailsByMstId(authoritiesMstId).subscribe({
      next: res => {
        console.log('Authorities Details Fetched successfully:', res);
        this.descriptionDetails = res;
        this.description = res.map((d: any) => ({
          srno: d.SrNo,
          desc: d.AuthoritiesDetailsDescription,
        }));
      },
      error: err => {
        console.error('Error fetch Authorities details:', err);
      },
    });
  }

  loadAllGrade(): void {
    this.authoritiesService.getGradeList().subscribe({
      next: res => {
        this.gradeList = res;
        console.log('Grade loaded:', res);
        this.filteredgradeList = [...this.gradeList];
        this.gradeSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredgradeList = this.gradeList.filter(grade =>
            grade.GradeName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setGradeForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Grade:', err);
      },
    });
  }

  private setGradeForEdit(): void {

    let GradeId: number | null = null;
    const gradeData = this.data.authorities;

    if (gradeData?.GradeName) {
      const Grade = this.gradeList.find(
        p => p.GradeName.trim().toLowerCase() === gradeData.GradeName.trim().toLowerCase()
      );

      GradeId = Grade ? Grade.GradeId : null; // 🔥 use correct property name

      console.log('Found Grade by name:', GradeId, 'for Grade:', gradeData.GradeName);
    }

    if (GradeId) {
      this.authoritiesForm.patchValue({
        AuthoritiesGradeId: GradeId,
      });
      console.log('Grade set in form:', GradeId);
    } else {
      console.log('No Grade ID found for Grade Name:', gradeData?.GradeName);
    }
  }

  loadAllDivision(): void {
    this.authoritiesService.getDivisionList().subscribe({
      next: res => {
        this.divisionList = res;
        console.log('Grade loaded:', res);
        this.filtereddivisionList = [...this.divisionList];
        this.divisionSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filtereddivisionList = this.divisionList.filter(division =>
            division.DivisionName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setDivisionForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Division:', err);
      },
    });
  }

  private setDivisionForEdit(): void {
    let DivisionId: number | null = null;
    const divisionData = this.data.authorities;

    if (divisionData?.DivisionName) {
      const Division = this.divisionList.find(
        p => p.DivisionName.trim().toLowerCase() === divisionData.DivisionName.trim().toLowerCase()
      );

      DivisionId = Division ? Division.DivisionId : null; // 🔥 use correct property name

      console.log(
        'Found Division by name:',
        DivisionId,
        'for Division:',
        divisionData.DivisionName
      );
    }

    if (DivisionId) {
      this.authoritiesForm.patchValue({
        AuthoritiesDivisionId: DivisionId,
      });
      console.log('Division set in form:', DivisionId);
    } else {
      console.log('No Division ID found for Division Name:', divisionData?.DivisionName);
    }
  }

  loadAllDesignation(): void {
    this.authoritiesService.getDesignationList().subscribe({
      next: res => {
        this.designationList = res;
        console.log('Designation loaded:', res);
        this.filtereddesignationList = [...this.designationList];
        this.designationSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filtereddesignationList = this.designationList.filter(designation =>
            designation.DesignationName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setDesignationForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Designation:', err);
      },
    });
  }

  private setDesignationForEdit(): void {
    let DesignationId: number | null = null;
    const designationData = this.data.authorities;

    if (designationData?.DesignationName) {
      const Designation = this.designationList.find(
        p =>
          p.DesignationName.trim().toLowerCase() ===
          designationData.DesignationName.trim().toLowerCase()
      );

      DesignationId = Designation ? Designation.DesignationId : null; // 🔥 use correct property name

      console.log(
        'Found Designation by name:',
        DesignationId,
        'for Designation:',
        designationData.DesignationName
      );
    }

    if (DesignationId) {
      this.authoritiesForm.patchValue({
        AuthoritiesDesignationId: DesignationId,
      });
      console.log('Designation set in form:', DesignationId);
    } else {
      console.log(
        'No Designation ID found for Designation Name:',
        designationData?.DesignationName
      );
    }
  }
  onReset(): void {
    this.authoritiesForm.reset();
    this.authoritiesDetailsDataSource.data = [];
    this.newauthoritiesDetail = '';
    console.log('Reset all data');
  }

  onSubmit(): void {
    if (this.authoritiesForm.valid && this.description.length > 0) {
      this.authoritiesForm.enable(); //important for active boolean
      const descriptionString = this.description.map(item => ({
        srno: item.srno,
        desc: item.desc,
      }));
      const payload = {
        ...this.authoritiesForm.value,
        descriptions: descriptionString,
      };
      console.log('Form submitted with values:', payload);
      this.dialogRef?.close(payload);
    } else {
      this.authoritiesForm.markAllAsTouched();
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
