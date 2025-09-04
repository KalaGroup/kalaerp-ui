/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
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
@Component({
  selector: 'app-add-edit-department',
  imports: [
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
  templateUrl: './add-edit-department.html',
  styleUrl: './add-edit-department.scss',
})
export class AddEditDepartment implements OnInit {
  DepartmentForm!: FormGroup;
  isEditMode = false;

  filteredDivisionList: any[] = [];
  filteredParentDepartmentList: any[] = [];
  filteredProfitCenterList: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDepartment>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.DepartmentId;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.DepartmentForm = this.fb.group({
      DepartmentCode: ['', Validators.required],
      DepartmentName: ['', Validators.required],
      DepartmentShortName: ['', Validators.required],
      DepartmentDivisionID: ['', Validators.required],
      ParentDepartmentID: ['', Validators.required],
      DepartmentProfitcenterID: ['', Validators.required],
      DepartmentRemark: [''],
      DepartmentType: [''],
      DepartmentAuthRemark: ['NIL', Validators.required],
      DepartmentAuth: [{ value: true, disabled: !this.isEditMode }],
      DepartmentIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      DepartmentIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });

    if (this.isEditMode && this.data) {
      this.DepartmentForm.patchValue(this.data);
      this.DepartmentForm.get('DepartmentIsActive')?.enable();
      this.DepartmentForm.get('DepartmentIsDiscard')?.enable();
      this.DepartmentForm.get('DepartmentAuth')?.enable();
    }
  }

  onSubmit(): void {
    if (this.DepartmentForm.valid) {
      console.log('Form Submitted:', this.DepartmentForm.value);
      this.dialogRef.close(this.DepartmentForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
