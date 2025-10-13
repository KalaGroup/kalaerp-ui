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
import { Districtmasterservice } from '@shared/services/hr/districtmaster/districtmasterservice';


@Component({
  selector: 'app-add-edit-district',
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
  templateUrl: './add-edit-district.html',
  styleUrl: './add-edit-district.scss',
})
export class AddEditDistrictComponent implements OnInit {
  DistrictForm!: FormGroup;
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
    private districtservice: Districtmasterservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDistrictComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.District;

    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCountries();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.DistrictForm = this.fb.group({
      DistrictId: 0,
      CreatedDate: [{ value: currentDate, disabled: true }],
      IsActive: [{ value: true, disabled: !this.isEditMode }],
      IsDiscard: [{ value: true, disabled: !this.isEditMode }],
      DistrictMasterAuth: [{ value: false, disabled: !this.isEditMode }],
      DistrictName: ['', Validators.required],
      ShortName: ['', Validators.required],
      DistrictCode: ['', Validators.required],
      DistrictMasterRemark: [''],
      DistrictMasterAuthRemark: ['Nil'],
      CreatedBy: ['10'],
      CountryId: ['', Validators.required],
      StateId: ['', Validators.required],

      StateName: [''],
      CountryName: [''],
    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.District) {
      console.log('Patching form with District data:', this.data.District);

      this.DistrictForm.patchValue({
        DistrictId: this.data.District.DistrictId,
        DistrictCode: this.data.District.DistrictCode,
        DistrictName: this.data.District.DistrictName,
        ShortName: this.data.District.ShortName,
        IsActive: this.data.District.IsActive,
        IsDiscard: this.data.District.IsDiscard,
        CountryId: this.data.District.CountryId,
        StateId: this.data.District.stateId,
        DistrictMasterRemark: this.data.District.DistrictMasterRemark,
        DistrictMasterAuthRemark: this.data.District.DistrictMasterAuthRemark,
        DistrictMasterAuth: this.data.District.DistrictMasterAuth,
        CreatedBy: this.data.District.CreatedBy,
        CreatedDate: new Date(this.data.District.CreatedDate).toLocaleDateString('en-GB'),
      });

      this.DistrictForm.get('IsActive')?.enable();
      this.DistrictForm.get('IsDiscard')?.enable();

      console.log('Form values after patch:', this.DistrictForm.value);
    }
  }
  onSubmit(): void {
    this.DistrictForm.enable(); //important for active boolean

    if (this.DistrictForm.valid) {
      this.dialogRef.close(this.DistrictForm.value);
    } else {
      this.DistrictForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  // ✅ Load countries
  private loadCountries(): void {
    this.districtservice.getAllCountries().subscribe({
      next: res => {
        this.countryList = res;
        this.filteredCountryList = [...this.countryList];

        // Search filter
        this.countrySearchControl.valueChanges.subscribe((value: any) => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCountryList = this.countryList.filter(country =>
            country.CountryName.toLowerCase().includes(filterValue)
          );
        });

        if (this.isEditMode && this.data) {
          this.setCountryForEdit();
        }
      },
      error: err => console.error('Failed to load countries:', err),
    });
  }

  // ✅ Load states
  onCountryChange(countryId: number): void {
    if (!countryId) {
      this.stateList = [];
      this.filteredStateList = [];
      // this.DistrictForm.patchValue({ StateId: null, DistrictId: null }); // reset state & district
      return;
    }

    this.districtservice.getAllState(countryId).subscribe({
      next: res => {
        this.stateList = res || [];
        this.filteredStateList = [...this.stateList];

        // reset selected state & district when country changes
        //this.DistrictForm.patchValue({ StateId: null, DistrictId: null });

        if (this.isEditMode && this.data) {
          this.setStateForEdit();
        }
      },
      error: err => console.error('Failed to load states:', err),
    });
  }

  // ✅ Load districts
  onStateChange(stateId: number): void {
    if (!stateId) {
      this.districtList = [];
      this.filteredDistrictList = [];
      //this.DistrictForm.patchValue({ DistrictId: null });
      return;
    }

    this.districtservice.getAllDistrict(stateId).subscribe({
      next: res => {
        this.districtList = res || [];
        this.filteredDistrictList = [...this.districtList];

        // reset district
        //this.DistrictForm.patchValue({ DistrictId: null });
      },
      error: err => console.error('Failed to load districts:', err),
    });
  }

  private setCountryForEdit(): void {
    let countryId = null;
    const cityData = this.data.District;

    if (cityData?.CountryName) {
      const country = this.countryList.find(
        c => c.CountryName.trim() === cityData.CountryName.trim()
      );
      countryId = country ? country.CountryId : null;
    }

    if (countryId) {
      this.DistrictForm.patchValue({
        CountryId: countryId,
      });
      console.log('✅ Country set:', countryId);

      // 🔹 Now load states for this country
      this.onCountryChange(countryId);
    }
  }

  private setStateForEdit(): void {
    let stateId = null;
    const DistrictData = this.data.District;

    if (DistrictData?.StateName) {
      const state = this.stateList.find(s => s.StateName.trim() === DistrictData.StateName.trim());
      stateId = state ? state.StateId : null;
    }

    if (stateId) {
      this.DistrictForm.patchValue({
        StateId: stateId,
      });
      console.log('✅ State set:', stateId);

      // 🔹 Now load districts for this state
      this.onStateChange(stateId);
    }
  }

  allowLettersAndSpaces(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const input = event.target as HTMLInputElement;
    if (!pattern.test(event.key) || (input.selectionStart === 0 && event.key === ' ')) {
      event.preventDefault();
    }
  }

  allowUppercaseLetters(event: KeyboardEvent) {
    const pattern = /^[A-Za-z]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  allowAlphanumeric(event: KeyboardEvent) {
    const pattern = /^[A-Za-z0-9]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  toUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

}
