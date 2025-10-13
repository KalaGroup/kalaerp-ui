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
import { Empmstupdationforservice } from '@shared/services/hr/empmstupdationfor/empmstupdationforservice';

@Component({
  selector: 'app-add-edit-employeemasterupdationfor',
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
  templateUrl: './add-edit-employeemasterupdationfor.html',
  styleUrl: './add-edit-employeemasterupdationfor.scss'
})
export class AddEditEmployeemasterupdationfor {

  EmployeeMasterUpdationForForm!: FormGroup;
  isEditMode = false;


  constructor(private empmstupdationforservice: Empmstupdationforservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEmployeemasterupdationfor>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.employeemasterupdationfor; // Edit mode  with your Data Name

    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {

    const currentDate = new Date().toLocaleDateString('en-GB');
    this.EmployeeMasterUpdationForForm = this.fb.group({
      EmployeeMasterUpdationForId: [''],
      EmployeeMasterUpdationForName: ['', Validators.required],
      EmployeeMasterUpdationForRemark: ['', Validators.required],
      EmployeeMasterUpdationForAuth: [{ value: true, disabled: !this.isEditMode }],
      EmployeeMasterUpdationForIsActive: [{ value: true, disabled: !this.isEditMode }],
      EmployeeMasterUpdationForIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      EmployeeMasterUpdationForAuthRemark: ['', Validators.required],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],

    });

    // If editing, pre-fill form with available data
    if (this.isEditMode) {

      console.log('Patching form with employeemasterupdationfor data:', this.data.employeemasterupdationfor);
      this.EmployeeMasterUpdationForForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        code: this.data.employeemasterupdationfor.code,
        EmployeeMasterUpdationForId: this.data.employeemasterupdationfor.EmployeeMasterUpdationForId,
        EmployeeMasterUpdationForName: this.data.employeemasterupdationfor.EmployeeMasterUpdationForName,
        EmployeeMasterUpdationForRemark: this.data.employeemasterupdationfor.EmployeeMasterUpdationForRemark,
        EmployeeMasterUpdationForAuth: this.data.employeemasterupdationfor.EmployeeMasterUpdationForAuth,
        EmployeeMasterUpdationForIsActive: this.data.employeemasterupdationfor.EmployeeMasterUpdationForIsActive,
        EmployeeMasterUpdationForIsDiscard: this.data.employeemasterupdationfor.EmployeeMasterUpdationForIsDiscard,
        EmployeeMasterUpdationForAuthRemark: this.data.employeemasterupdationfor.EmployeeMasterUpdationForAuthRemark,
        CreatedBy: this.data.employeemasterupdationfor.CreatedBy

      });
      this.EmployeeMasterUpdationForForm.get('code')?.enable();
      this.EmployeeMasterUpdationForForm.get('CreatedDate')?.disable();
      this.EmployeeMasterUpdationForForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.EmployeeMasterUpdationForForm.value);
    }
  }



  onSubmit(): void {
    this.EmployeeMasterUpdationForForm.enable();//important for active boolean
    if (this.EmployeeMasterUpdationForForm.valid) {
      this.dialogRef.close(this.EmployeeMasterUpdationForForm.value);
    } else {
      this.EmployeeMasterUpdationForForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  allowLettersAndSpaces(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const input = event.target as HTMLInputElement;

    // Block invalid characters and leading space
    if (!pattern.test(event.key) || (input.selectionStart === 0 && event.key === ' ')) {
      event.preventDefault();
    }
  }

}
