import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

import { facilityservices } from '@shared/services/hr/facilityservice.ts/facilityservice';


@Component({
  selector: 'app-add-edit-facility',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule],
  templateUrl: './add-edit-facility.html',
  styleUrl: './add-edit-facility.scss'
})
export class AddEditFacility implements OnInit {
  facilityForm!: FormGroup;
  isEditMode: boolean = false;
  code: string = '';
  constructor(
    private fb: FormBuilder,
    private FacilityServices: facilityservices, // Properly inject the service
    public dialogRef: MatDialogRef<AddEditFacility>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.facility;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy

    this.facilityForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      FaciltyCode: [''],
      FacilityName: ['', [Validators.required]],
      FacilityRemark: [''],
      FacilityAuth: [{ value: true, disabled: !this.isEditMode }],
      FacilityIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      FacilityIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: [0]
    });

    if (this.isEditMode && this.data.facility) {
      console.log('Patching form with facility data:', this.data.facility);
      this.facilityForm.patchValue({
        FaciltyCode: this.data.facility.FaciltyCode || '',
        FacilityName: this.data.facility.FacilityName || '',
        FacilityRemark: this.data.facility.FacilityRemark || '',
        FacilityAuth: this.data.facility.FacilityAuth ?? true,
        FacilityIsDiscard: this.data.facility.FacilityIsDiscard ?? false,
        FacilityIsActive: this.data.facility.FacilityIsActive ?? true,
        CreatedBy: this.data.facility.CreatedBy ?? 0
      });

    }
  }


  // onSubmit(): void {
  //   if (this.facilityForm.valid) {
  //     console.log(this.facilityForm.value);
  //     this.dialogRef.close(this.facilityForm.value);
  //   } else {
  //     this.facilityForm.markAllAsTouched();
  //   }
  // }

  onSubmit(): void {
    if (this.facilityForm.invalid) {
      this.facilityForm.markAllAsTouched();
      return;
    }

    const formData = this.facilityForm.getRawValue();

    formData.CityAuth = formData.CityAuth ?? true;
    formData.CityIsActive = formData.CityIsActive ?? true;
    formData.CityIsDiscard = formData.CityIsDiscard ?? false;


    console.log('Final Payload:', formData);

    this.dialogRef.close(formData);
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
