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
import { ICompanyentitytype } from '@shared/interfaces/hr/companyentitytype';
import { Companyentitytypeservice } from '@shared/services/hr/companyentitytype/companyentitytypeservice';

@Component({
  selector: 'app-add-edit-companyentitytype',
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
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './add-edit-companyentitytype.html',
  styleUrl: './add-edit-companyentitytype.scss'
})
export class AddEditCompanyentitytype implements OnInit {
  companyentitytypeForm!: FormGroup;
  isEditMode = false;
  filteredprofitcenterList: ICompanyentitytype[] = [];
  selectedCountryId: number | null = null;
  selectedStateId: number | null = null;
  profitcenterSearchControl = new FormControl('');

  constructor(
    private companyentitytypeService: Companyentitytypeservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCompanyentitytype>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.companyentitytype;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date();
    this.companyentitytypeForm = this.fb.group({
      CompEntityTypeId: [''],
      CompanyEntityTypeName: ['', [Validators.required]],
      CompanyEntityTypeShortName: ['', [Validators.required]],
      CompanyEntityTypeRemark: [''],
      CompanyEntityTypeAuth: [{ value: true, disabled: !this.isEditMode }],
      CompanyEntityTypeIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CompanyEntityTypeIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      debugger;
      console.log('Patching form with Companyentitytype data:', this.data.companyentitytype);
      this.companyentitytypeForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        code: this.data.companyentitytype.code,
        CompEntityTypeId: this.data.companyentitytype.CompEntityTypeId,
        CompanyEntityTypeName: this.data.companyentitytype.CompanyEntityTypeName,
        CompanyEntityTypeShortName: this.data.companyentitytype.CompanyEntityTypeShortName,
        CompanyEntityTypeRemark: this.data.companyentitytype.CompanyEntityTypeRemark,
        CompanyEntityTypeAuth: this.data.companyentitytype.CompanyEntityTypeAuth,
        CompanyEntityTypeIsActive: this.data.companyentitytype.CompanyEntityTypeIsActive,
        CompanyEntityTypeIsDiscard: this.data.companyentitytype.CompanyEntityTypeIsDiscard,
        CreatedBy: this.data.companyentitytype.CreatedBy,
      });
      this.companyentitytypeForm.get('code')?.enable();
      this.companyentitytypeForm.get('CreatedDate')?.disable();
      this.companyentitytypeForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.companyentitytypeForm.value);
    }
  }

  toUpperCase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.companyentitytypeForm.get('CompanyEntityTypeShortName')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    this.companyentitytypeForm.enable();//important for active boolean
    if (this.companyentitytypeForm.valid) {
      this.dialogRef.close(this.companyentitytypeForm.value);
    } else {
      this.companyentitytypeForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  allowOnlyLettersAndSpaces(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const inputChar = event.key;

    // Block special characters and numbers
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }

    // Block leading space
    const input = event.target as HTMLInputElement;
    if (input.selectionStart === 0 && inputChar === ' ') {
      event.preventDefault();
    }
  }


}