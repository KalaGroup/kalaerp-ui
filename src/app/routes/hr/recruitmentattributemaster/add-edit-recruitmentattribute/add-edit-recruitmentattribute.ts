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
import { AddEditWorkstation } from '../../workstationmaster/add-edit-workstation/add-edit-workstation';

@Component({
  selector: 'app-add-edit-recruitmentattribute',
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
  templateUrl: './add-edit-recruitmentattribute.html',
  styleUrl: './add-edit-recruitmentattribute.scss'
})
export class AddEditRecruitmentattribute {

    cityForm!: FormGroup;
  isEditMode = false;
  filteredCountryList: Country[] = [];
  countryList: any[] = [];
  filteredStateList: any;
  filteredTierTypeList: any;
  filteredDistrictList: any;
  selectedCountryId: number | null = null;
  selectedStateId: number | null = null;
  countrySearchControl = new FormControl('');
  stateSearchControl = new FormControl('');
  districtSearchControl = new FormControl('');
  tierTypeSearchControl = new FormControl('');
  stateList: any[] = [];
  districtList: any[] = [];
  tierTypeList: any[] = [];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditWorkstation>,
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
    this.cityForm = this.fb.group({
      CityId: [''],
      CreatedDate: [{ value: currentDate, disabled: true }],
      CityAuth: [{ value: false, disabled: !this.isEditMode }],
      CityIsActive: [{ value: true, disabled: !this.isEditMode }],
      CityIsDiscard: [{ value: true, disabled: !this.isEditMode }],

      CityName: ['', Validators.required],
      CityShortName: ['', Validators.required],
      CityCode: ['', Validators.required],
      CityLatitude: ['', Validators.required],
      CityLongitude: ['', Validators.required],
      CityRemark: [''],
      CreatedBy: ['', Validators.required,],

      CityCountryID: ['', Validators.required],
      CityStateID: ['', Validators.required],
      CityDistrictID: ['', Validators.required],
      CityTierTypeID: ['', Validators.required],

      StateName: [''],
      CountryName: [''],
      DistrictName: [''],
    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.City) {
      console.log('Patching form with city data:', this.data.City);

      this.cityForm.patchValue({
        CityId: this.data.City.CityId,
        CityCode: this.data.City.CityCode,
        CityName: this.data.City.CityName,
        CityShortName: this.data.City.CityShortName,
        CityLatitude: this.data.City.CityLatitude,
        CityLongitude: this.data.City.CityLongitude,
        CityRemark: this.data.City.CityRemark,
        CityIsActive: this.data.City.CityIsActive,
        CityIsDiscard: this.data.City.CityIsDiscard,
        CityAuth: this.data.City.CityAuth,
        CityCountryID: this.data.City.CityCountryID,
        CityStateID: this.data.City.CityStateID,
        CityDistrictID: this.data.City.CityDistrictID,
        CityTierTypeID: this.data.City.CityTierTypeId,
        CreatedBy: this.data.City.CreatedBy,
        CreatedDate: new Date(this.data.City.CreatedDate).toLocaleDateString('en-GB'),
      });

      this.cityForm.get('CityIsActive')?.enable();
      this.cityForm.get('CityIsDiscard')?.enable();
      this.cityForm.get('CityAuth')?.enable();

      console.log('Form values after patch:', this.cityForm.value);
    }
  }



onSubmit(): void {

}
  onCancel(): void {
    this.dialogRef.close();
  }

}
