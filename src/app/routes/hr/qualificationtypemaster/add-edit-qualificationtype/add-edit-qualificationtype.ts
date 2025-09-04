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
import { IQualificationtype } from '@shared/interfaces/hr/qualificationtype';
import { Qualificationtypeservice } from '@shared/services/hr/qualificationtype/qualificationtypeservice';

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
  styleUrl: './add-edit-qualificationtype.scss',
})
export class AddEditQualificationtype implements OnInit {
  qualificationtypeForm!: FormGroup;
  isEditMode = false;
  filteredprofitcenterList: IQualificationtype[] = [];
  profitcenterList: any[] = [];
  selectedCountryId: number | null = null;
  selectedStateId: number | null = null;
  profitcenterSearchControl = new FormControl('');

  constructor(
    private qualificationtypeService: Qualificationtypeservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditQualificationtype>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.qualificationtype;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date();
    this.qualificationtypeForm = this.fb.group({
      QualificationTypeId: [''],
      QualificationTypeCode: ['', [Validators.required]],
      QualificationTypeName: ['', [Validators.required]],
      QualificationTypeRemark: [''],
      QualificationTypeAuth: [{ value: true, disabled: !this.isEditMode }],
      QualificationTypeIsDiscard:  [{ value: false, disabled: !this.isEditMode }],
      QualificationTypeIsActive:  [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      debugger;
      console.log('Patching form with Qualificationtype data:', this.data.qualificationtype);
      this.qualificationtypeForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        code: this.data.qualificationtype.code,
        QualificationTypeId: this.data.qualificationtype.QualificationTypeId,
        QualificationTypeCode: this.data.qualificationtype.QualificationTypeCode,
        QualificationTypeName: this.data.qualificationtype.QualificationTypeName,
        QualificationTypeRemark: this.data.qualificationtype.QualificationTypeRemark,
        QualificationTypeAuth: this.data.qualificationtype.QualificationTypeAuth,
        QualificationTypeIsDiscard: this.data.qualificationtype.QualificationTypeIsDiscard,
        QualificationTypeIsActive: this.data.qualificationtype.QualificationTypeIsActive,
        CreatedBy: this.data.qualificationtype.CreatedBy,
      });
      this.qualificationtypeForm.get('code')?.enable();
      this.qualificationtypeForm.get('CreatedDate')?.disable();
      this.qualificationtypeForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.qualificationtypeForm.value);
    }
  }

  onSubmit(): void {
    debugger;
        this.qualificationtypeForm.enable();//important for active boolean
    if (this.qualificationtypeForm.valid) {
      this.dialogRef.close(this.qualificationtypeForm.value);
    } else {
      this.qualificationtypeForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
