/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
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

@Component({
  selector: 'app-add-edit-role',
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
  templateUrl: './add-edit-role.html',
  styleUrl: './add-edit-role.scss'
})
export class AddEditRole implements OnInit {
  RolesForm!: FormGroup;
  isEditMode = false;

  filteredGradeList: any[] = [];
  filteredDesignationList: any[] = [];
  filteredDivisionList: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditRole>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.Roles;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');

    this.RolesForm = this.fb.group({
      RolesGradeId: ['', Validators.required],
      RolesDesignationId: ['', Validators.required],
      RolesDivisionId: ['', Validators.required],
      RolesRemark: [''],
      RolesType: [''],
      RolesAuthRemark: ['NIL', Validators.required],
      RolesAuth: [{ value: true, disabled: !this.isEditMode }],
      RolesIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      RolesIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });

    if (this.isEditMode && this.data) {
      this.RolesForm.patchValue(this.data);
      this.RolesForm.get('RolesIsActive')?.enable();
      this.RolesForm.get('RolesIsDiscard')?.enable();
      this.RolesForm.get('RolesAuth')?.enable();
    }
  }

  onSubmit(): void {
    if (this.RolesForm.valid) {
      console.log('Form Submitted:', this.RolesForm.value);
      this.dialogRef.close(this.RolesForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
