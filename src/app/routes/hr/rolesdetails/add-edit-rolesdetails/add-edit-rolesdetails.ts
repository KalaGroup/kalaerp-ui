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
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-role-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
    templateUrl: './add-edit-rolesdetails.html',
  styleUrl: './add-edit-rolesdetails.scss'
})
export class AddEditRoleDetails implements OnInit {
  RolesDetailsForm!: FormGroup;
  isEditMode = false;

  filteredRolesList: any[] = []; // for DetailsRolesId dropdown

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditRoleDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.RolesDetails;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.RolesDetailsForm = this.fb.group({
      DetailsRolesId: ['', Validators.required],
      SrNo: ['', Validators.required],
      RolesDetailsDescription: ['', Validators.required],
    });

    if (this.isEditMode && this.data) {
      this.RolesDetailsForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.RolesDetailsForm.valid) {
      console.log('Form Submitted:', this.RolesDetailsForm.value);
      this.dialogRef.close(this.RolesDetailsForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
