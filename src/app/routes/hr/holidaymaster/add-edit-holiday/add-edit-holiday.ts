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
import { MaterialModule } from '../../../../../../schematics/ng-add/files/module-files/app/material-module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-holiday',
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
    MaterialModule,
  ],
  templateUrl: './add-edit-holiday.html',
  styleUrl: './add-edit-holiday.scss',
})
export class AddEditHoliday implements OnInit {
  HolidayForm!: FormGroup;
  isEditMode = false;
  filteredCurrencyList: any;
  HolidayFY!: Date;
  maxBirthday = new Date();
  HolidayDate: Date | null = null;
  filteredCompanyList: any;
  filteredHolidayFYList: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditHoliday>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.City; // add your data field

    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.HolidayForm = this.fb.group({
      HolidayId: [''],
      HolidayFY: ['', Validators.required],
      HolidayDate: ['', Validators.required],
      HolidayFor: ['', Validators.required],
      HolidayCompanyId: ['', Validators.required],
      HolidayRemark: [''],
      HolidayAuth: [{ value: true, disabled: !this.isEditMode }],
      HolidayAuthRemark: ['NIL', Validators.required],
      HolidayIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      HolidayIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.City) {
      console.log('Patching form with Holiday data:', this.data.City);

      this.HolidayForm.patchValue({
        // Add your form fields here
      });

      this.HolidayForm.get('HolidayIsActive')?.enable();
      this.HolidayForm.get('HolidayIsDiscard')?.enable();
      this.HolidayForm.get('HolidayAuth')?.enable();

      console.log('Form values after patch:', this.HolidayForm.value);
    }
  }

  onSubmit(): void {
    // Add your default Submit logic here
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
