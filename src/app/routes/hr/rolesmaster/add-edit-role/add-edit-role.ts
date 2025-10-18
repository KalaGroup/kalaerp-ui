/* eslint-disable @angular-eslint/prefer-inject */
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
import { IDivision } from '@shared/interfaces/hr/division';
import { Divisionservice } from '@shared/services/hr/division/divisionservice';
import { Designationservice } from '@shared/services/hr/designation/designationservice';
import { IGrade } from '@shared/interfaces/hr/grade';
import { IDesignation } from '@shared/interfaces/hr/designation';
import { MatTableDataSource } from '@angular/material/table';
import { Roleservice } from '@shared/services/hr/role/roleservice';

interface Row {
  description: string;
  isEdit?: boolean;
}

@Component({
  selector: 'app-add-edit-role',
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
  templateUrl: './add-edit-role.html',
  styleUrl: './add-edit-role.scss',
})
export class AddEditRole implements OnInit {
  roleForm!: FormGroup;
  isEditMode = false;
  roleDetailsDataSource = new MatTableDataSource<any>([]);
  newroleDetail: string = '';
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
    private roleService: Roleservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditRole>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.role;
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
    this.roleForm = this.fb.group({
      RolesId: [''],
      RolesGradeId: ['', [Validators.required]],
      RolesDesignationId: ['', [Validators.required]],
      RolesDivisionId: ['', [Validators.required]],
      RolesRemark: [''],
      RolesAuthRemark: [''],
      RolesAuth: [{ value: true, disabled: !this.isEditMode }],
      RolesIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      RolesIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode && this.data.role) {
      console.log('this.data.role', this.data.role);
      this.loadAllDescriptions();
      this.roleForm.patchValue({
       
        RolesId: this.data.role.RolesId,
        RolesGradeId: this.data.role.RolesGradeId,
        RolesDesignationId: this.data.role.RolesDesignationId,
        RolesDivisionId: this.data.role.RolesDivisionId,
        RolesRemark: this.data.role.RolesRemark,
        RolesAuthRemark: this.data.role.RolesAuthRemark,
        RolesAuth: this.data.role.RolesAuth,
        RolesIsDiscard: this.data.role.RolesIsDiscard,
        RolesIsActive: this.data.role.RolesIsActive,
        CreatedBy: this.data.role.CreatedBy,
      });
      this.roleForm.get('code')?.enable();
      this.roleForm.get('CreatedDate')?.disable();
      this.roleForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.roleForm.value);
    }
  }

  loadAllDescriptions(): void {
    ;
    const roleMstId = this.data.role.RolesId;
    this.roleService.getRolesDetailsByMstId(roleMstId).subscribe({
      next: res => {
        console.log('Role Details Fetched successfully:', res);
        this.descriptionDetails = res;
        this.description = res.map((d: any) => ({
          srno: d.SrNo,
          desc: d.RolesDetailsDescription,
        }));
      },
      error: err => {
        console.error('Error fetch Role details:', err);
      },
    });
  }

  loadAllGrade(): void {
    this.roleService.getGradeList().subscribe({
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
    const gradeData = this.data.role;

    if (gradeData?.GradeName) {
      const Grade = this.gradeList.find(
        p => p.GradeName.trim().toLowerCase() === gradeData.GradeName.trim().toLowerCase()
      );

      GradeId = Grade ? Grade.GradeId : null; // 🔥 use correct property name

      console.log('Found Grade by name:', GradeId, 'for Grade:', gradeData.GradeName);
    }

    if (GradeId) {
      this.roleForm.patchValue({
        RolesGradeId: GradeId,
      });
      console.log('Grade set in form:', GradeId);
    } else {
      console.log('No Grade ID found for Grade Name:', gradeData?.GradeName);
    }
  }

  loadAllDivision(): void {
    this.roleService.getDivisionList().subscribe({
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
    const divisionData = this.data.role;

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
      this.roleForm.patchValue({
        RolesDivisionId: DivisionId,
      });
      console.log('Division set in form:', DivisionId);
    } else {
      console.log('No Division ID found for Division Name:', divisionData?.DivisionName);
    }
  }

  loadAllDesignation(): void {
    this.roleService.getDesignationList().subscribe({
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
    const designationData = this.data.role;

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
      this.roleForm.patchValue({
        RolesDesignationId: DesignationId,
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
    this.roleForm.reset();
    this.roleDetailsDataSource.data = [];
    this.newroleDetail = '';
    console.log('Reset all data');
  }

  onSubmit(): void {
    ;
    if (this.roleForm.valid && this.description.length > 0) {
      this.roleForm.enable(); //important for active boolean
      const descriptionString = this.description.map(item => ({
        srno: item.srno,
        desc: item.desc,
      }));
      const payload = {
        ...this.roleForm.value,
        descriptions: descriptionString,
      };
      console.log('Form submitted with values:', payload);
      this.dialogRef?.close(payload);
    } else {
      this.roleForm.markAllAsTouched();
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
