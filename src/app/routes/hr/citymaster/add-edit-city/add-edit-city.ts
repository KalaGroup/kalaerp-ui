/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  AbstractControl,
  ValidationErrors,
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
import { CitymasterService } from '@shared/services/hr/Citymaster/citymaster-service';

@Component({
  selector: 'app-add-edit-currency',
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
  templateUrl: './add-edit-city.html',
  styleUrl: './add-edit-city.scss',
})
export class AddEditCityComponent implements OnInit {
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
    private CitymasterService: CitymasterService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.City;

    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCountries();
    this.loadTierTypes();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.cityForm = this.fb.group({
      CityId: [''],
      CreatedDate: [{ value: currentDate, disabled: true }],
      CityName: ['', Validators.required],
      CityShortName: ['', Validators.required],
      CityCode: ['', Validators.required],
      CityLatitude: ['', Validators.required],
      CityLongitude: ['', Validators.required],
      CityRemark: ['', Validators.required],
      CreatedBy: ['10', Validators.required,],

      CityCountryID: ['', Validators.required],
      CityStateID: ['', Validators.required],
      CityDistrictID: ['', Validators.required],
      CityTierTypeID: ['', Validators.required],

      CityAuth: [{ value: true, disabled: !this.isEditMode }],
      CityIsActive: [{ value: true, disabled: !this.isEditMode }],
      CityIsDiscard: [{ value: false, disabled: !this.isEditMode }],

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
        CityIsActive: this.data.City.CityIsActive ?? true,
        CityIsDiscard: this.data.City.CityIsDiscard ?? false,
        CityAuth: this.data.City.CityAuth ?? true,
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



  // onSubmit(): void {

  //   if (this.cityForm.valid) {
  //     this.dialogRef.close(this.cityForm.value);
  //   } else {
  //     this.cityForm.markAllAsTouched();
  //   }
  // }
  onSubmit(): void {
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }

    const formData = this.cityForm.getRawValue();

    formData.CityAuth = formData.CityAuth ?? true;
    formData.CityIsActive = formData.CityIsActive ?? true;
    formData.CityIsDiscard = formData.CityIsDiscard ?? false;


    console.log('Final Payload:', formData);

    this.dialogRef.close(formData);
  }



  onCancel(): void {
    this.dialogRef.close();
  }


  // ✅ Load countries
  private loadCountries(): void {
    this.CitymasterService.getAllCountries().subscribe({
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
      this.cityForm.patchValue({ CityStateID: null, CityDistrictID: null }); // reset state & district
      return;
    }

    this.CitymasterService.getAllState(countryId).subscribe({
      next: res => {
        this.stateList = res || [];
        this.filteredStateList = [...this.stateList];

        // reset selected state & district when country changes
        this.cityForm.patchValue({ CityStateID: null, CityDistrictID: null });

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
      this.cityForm.patchValue({ CityDistrictID: null });
      return;
    }

    this.CitymasterService.getAllDistrict(stateId).subscribe({
      next: res => {
        this.districtList = res || [];
        this.filteredDistrictList = [...this.districtList];

        // reset district
        this.cityForm.patchValue({ CityDistrictID: null });

        // 🔹 if edit mode, set district only after list is loaded
        if (this.isEditMode && this.data) {
          this.setDistrictForEdit();
        }
      },
      error: err => console.error('Failed to load districts:', err),
    });
  }


  // ✅ Load tier types (static)
  private loadTierTypes(): void {
    
    this.tierTypeList = [
      { tierTypeId: 1, TierTypeName: 'Tier 1' },
      { tierTypeId: 2, TierTypeName: 'Tier 2' },
      { tierTypeId: 3, TierTypeName: 'Tier 3' }
    ];

    this.filteredTierTypeList = [...this.tierTypeList];

    this.tierTypeSearchControl.valueChanges.subscribe((value: any) => {
      const filterValue = (value || '').toLowerCase();
      this.filteredTierTypeList = this.tierTypeList.filter(tt =>
        tt.TierTypeName.toLowerCase().includes(filterValue)
      );
    });

    if (this.isEditMode && this.data) {
      this.setTierTypeForEdit();
    }
  }


  private setCountryForEdit(): void {
    let countryId = null;
    const cityData = this.data.City;

    if (cityData?.CountryName) {
      const country = this.countryList.find(
        c => c.CountryName.trim() === cityData.CountryName.trim()
      );
      countryId = country ? country.CountryId : null;
    }

    if (countryId) {
      this.cityForm.patchValue({
        CityCountryID: countryId,
      });
      console.log('✅ Country set:', countryId);

      // 🔹 Now load states for this country
      this.onCountryChange(countryId);
    }
  }


  private setStateForEdit(): void {
    let stateId = null;
    const cityData = this.data.City;

    if (cityData?.StateName) {
      const state = this.stateList.find(
        s => s.StateName.trim() === cityData.StateName.trim()
      );
      stateId = state ? state.StateId : null;
    }

    if (stateId) {
      this.cityForm.patchValue({
        CityStateID: stateId,
      });
      console.log('✅ State set:', stateId);

      // 🔹 Now load districts for this state
      this.onStateChange(stateId);
    }
  }


  private setDistrictForEdit(): void {
    let districtId = null;
    const cityData = this.data.City;

    if (cityData?.DistrictName) {
      const district = this.districtList.find(
        d => d.DistrictName.trim() === cityData.DistrictName.trim()
      );
      districtId = district ? district.DistrictId : null;
    }

    if (districtId) {
      this.cityForm.patchValue({
        CityDistrictID: districtId,
      });
      console.log('✅ District set:', districtId);
    }
  }


  private setTierTypeForEdit(): void {
    
    let tierTypeId = null;
    const cityData = this.data.City;

    // Find tier type by ID
    if (cityData?.CityTierTypeId) {
      const tier = this.tierTypeList.find(
        t => t.TierTypeId === cityData.CityTierTypeId
      );
      tierTypeId = tier ? tier.TierTypeId : null;

      console.log('Found tier type by ID:', tierTypeId);
    }

    if (tierTypeId) {
      this.cityForm.patchValue({
        CityTierTypeId: tierTypeId,
      });
      console.log('Tier type set in form:', tierTypeId);
    } else {
      console.log('No tier type found for:', cityData?.CityTierTypeId);
    }
  }

  preventSpecialChar(event: KeyboardEvent) {
    const pattern = /[A-Za-z]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  blockSpaces(event: KeyboardEvent) {
    const pattern = /[A-Za-z0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  allowOnlyLettersAndSpaces(event: KeyboardEvent) {
    const inputChar = event.key;
    const pattern = /^[A-Za-z ]$/;

    // Block anything not a letter or space
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }

    // Prevent leading space
    const input = event.target as HTMLInputElement;
    if (input.selectionStart === 0 && inputChar === ' ') {
      event.preventDefault();
    }
  }







  // loadCountries(): void {
  //   this.http.getAllCountries().subscribe({
  //     next: (res: any[]) => {
  //       this.countryList = res;
  //     },
  //     error: (err: any) => console.error('Error loading countries', err)
  //   });
  // }

  // // ✅ Load States when country changes
  // onCountryChange(countryId: number): void {
  //   this.selectedCountryId = countryId;
  //   this.stateList = [];
  //   this.districtList = [];

  //   this.hrService.getStatesByCountry(countryId).subscribe({
  //     next: (res: any[]) => {
  //       this.stateList = res;
  //     },
  //     error: (err: any) => console.error('Error loading states', err)
  //   });
  // }

  // // ✅ Load Districts when state changes
  // onStateChange(stateId: number): void {
  //   this.selectedStateId = stateId;
  //   this.districtList = [];

  //   this.hrService.getDistrictsByState(stateId).subscribe({
  //     next: (res: any[]) => {
  //       this.districtList = res;
  //     },
  //     error: (err: any) => console.error('Error loading districts', err)
  //   });
  // }

  // // ✅ Static Tier Types
  // loadTierTypes(): void {
  //   this.filteredTierTypeList = [
  //     { TierTypeId: 1, TierTypeName: 'Tier 1' },
  //     { TierTypeId: 2, TierTypeName: 'Tier 2' },
  //     { TierTypeId: 3, TierTypeName: 'Tier 3' }
  //   ];
  // }
  // Allow only letters, numbers, spaces, and basic punctuation
  allowLettersNumbersSpaces(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9\s.,-]*$/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Disallow leading/trailing spaces
  noLeadingTrailingSpaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    if (value.trim().length !== value.length) {
      return { invalidSpaces: true };
    }
    return null;
  }
  // Trim input value on blur
  trimRemark(controlName: string) {
    const control = this.cityForm.get(controlName);
    if (control && typeof control.value === 'string') {
      const trimmed = control.value.trim();
      if (trimmed !== control.value) {
        control.setValue(trimmed);
      }
    }
  }
}
