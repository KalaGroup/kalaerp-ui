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
  selector: 'app-add-edit-companyentitytype',
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
  templateUrl: './add-edit-companyentitytype.html',
  styleUrl: './add-edit-companyentitytype.scss'
})
export class AddEditCompanyentitytype implements OnInit {

    CompanyEntityForm!: FormGroup;
  isEditMode = false;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCompanyentitytype>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.City;

    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
 this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.CompanyEntityForm = this.fb.group({
      //CompEntityTypeID: [''],
      CompanyEntityTypeName: ['', Validators.required],
      CompanyEntityTypeShortName: ['', Validators.required],
      CompanyEntityTypeAuth: [{ value: true, disabled:true }],
      CompanyEntityTypeIsActive: [{ value: true, disabled: !this.isEditMode }],
      CompanyEntityTypeIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CompanyEntityTypeRemark: ['',Validators.required],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],

    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.City) {
      console.log('Patching form with Company Entity Type data:', this.data.City);

      this.CompanyEntityForm.patchValue({
        // Add your form fields here
      });

      this.CompanyEntityForm.get('CompanyEntityTypeIsActive')?.enable();
      this.CompanyEntityForm.get('CompanyEntityTypeIsDiscard')?.enable();
      this.CompanyEntityForm.get('CompanyEntityTypeAuth')?.enable();

      console.log('Form values after patch:', this.CompanyEntityForm.value);
    }
  }



onSubmit(): void {
// Add your default Submit logic here
}
  onCancel(): void {
    this.dialogRef.close();
  }

}
