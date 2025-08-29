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
import { HrService } from '../../hr.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Country } from '@shared/interfaces/hr';

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


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEmployeemasterupdationfor>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.City; // Edit mode  with your Data Name

    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
 this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.EmployeeMasterUpdationForForm = this.fb.group({
      //EmployeeMasterUpdationForId: [''],
      EmployeeMasterUpdationForName: ['', Validators.required],
      EmployeeMasterUpdationForRemark: ['', Validators.required],
      EmployeeMasterUpdationForAuth: [{ value: true, disabled:true }],
      EmployeeMasterUpdationForIsActive: [{ value: true, disabled: !this.isEditMode }],
      EmployeeMasterUpdationForIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      EmployeeMasterUpdationForAuthRemark: ['NIL',Validators.required],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],

    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.City) {
      console.log('Patching form with Company Entity Type data:', this.data.City);

      this.EmployeeMasterUpdationForForm.patchValue({
        // Add your form fields here
      });

      this.EmployeeMasterUpdationForForm.get('EmployeeMasterUpdationForIsActive')?.enable();
      this.EmployeeMasterUpdationForForm.get('EmployeeMasterUpdationForIsDiscard')?.enable();
      this.EmployeeMasterUpdationForForm.get('EmployeeMasterUpdationForAuth')?.enable();

      console.log('Form values after patch:', this.EmployeeMasterUpdationForForm.value);
    }
  }



onSubmit(): void {
// Add your default Submit logic here
}
  onCancel(): void {
    this.dialogRef.close();
  }

}
