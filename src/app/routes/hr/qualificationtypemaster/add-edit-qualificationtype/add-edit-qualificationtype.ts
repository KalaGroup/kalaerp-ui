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
  selector: 'app-add-edit-qualificationtype',
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
  templateUrl: './add-edit-qualificationtype.html',
  styleUrl: './add-edit-qualificationtype.scss'
})
export class AddEditQualificationtype implements OnInit {

    QualificationTypeForm!: FormGroup;
  isEditMode = false;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditQualificationtype>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.City; // Add your Data Name

    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
 this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.QualificationTypeForm = this.fb.group({
      //QualificationTypeID: [''],
      QualificationTypeCode: ['', Validators.required],
      QualificationTypeName: ['', Validators.required],
      QualificationTypeAuth: [{ value: true, disabled:true }],
      QualificationTypeIsActive: [{ value: true, disabled: !this.isEditMode }],
      QualificationTypeIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      QualificationTypeRemark: ['',Validators.required],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],

    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.City) {
      console.log('Patching form with Company Entity Type data:', this.data.City);

      this.QualificationTypeForm.patchValue({
        // Add your form fields here
      });

      this.QualificationTypeForm.get('QualificationTypeIsActive')?.enable();
      this.QualificationTypeForm.get('QualificationTypeIsDiscard')?.enable();
      this.QualificationTypeForm.get('QualificationTypeAuth')?.enable();

      console.log('Form values after patch:', this.QualificationTypeForm.value);
    }
  }



onSubmit(): void {
// Add your default Submit logic here
}
  onCancel(): void {
    this.dialogRef.close();
  }

}
