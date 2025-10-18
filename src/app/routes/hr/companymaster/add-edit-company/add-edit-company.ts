import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Companyservice } from '@shared/services/hr/company/companyservice';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
  templateUrl: './add-edit-company.html',
  styleUrl: './add-edit-company.scss',
})
export class AddEditCompany {
  companyForm!: FormGroup;
  isEditMode: boolean = false;
  code: string = '';
  currencyList: any[] = [];
  companyEntityTypeList: any[] = [];
  parentcompanyList: any[] = [];

  corporateCountryList: any[] = [];
  corporateStateList: any[] = [];
  corporateDistrictList: any[] = [];
  corporateCityList: any[] = [];

  registeredCountryList: any[] = [];
  registeredStateList: any[] = [];
  registeredDistrictList: any[] = [];
  registeredCityList: any[] = [];

  currencySearchControl = new FormControl('');
  compEntityTypeSearchControl = new FormControl('');
  parentCompanySearchControl = new FormControl('');

  corporateCountrySearchControl = new FormControl('');
  corporateStateSearchControl = new FormControl('');
  corporateDistrictSearchControl = new FormControl('');
  corporateCitySearchControl = new FormControl('');

  registeredCountrySearchControl = new FormControl('');
  registeredStateSearchControl = new FormControl('');
  registeredDistrictSearchControl = new FormControl('');
  registeredCitySearchControl = new FormControl('');

  filteredCurrencyList: any[] = [];
  filteredCompEntityTypeList: any[] = [];
  filteredParentCompanyList: any[] = [];

  filteredCorporateCountryList: any[] = [];
  filteredCorporateStateList: any[] = [];
  filteredCorporateDistrictList: any[] = [];
  filteredCorporateCityList: any[] = [];

  filteredRegisteredCountryList: any[] = [];
  filteredRegisteredStateList: any[] = [];
  filteredRegisteredDistrictList: any[] = [];
  filteredRegisteredCityList: any[] = [];
  isLoading = false;
  selectedLogoFile: File | null = null;
  logoPreview: string | ArrayBuffer | null = null;

  maxDate = new Date(); // Today's date as maximum
  minDate = new Date(1800, 0, 1); // Minimum date (adjust as needed)

  constructor(
    private companyService: Companyservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCompany>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.company;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCurrencies();
    this.loadAllCompanyEntityTypes();
    this.loadAllParentCompanies();
    this.loadAllRegisteredCountries();
    this.loadAllCorporateCountries();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    // Complete Company Form with all fields
    this.companyForm = this.fb.group({
      // Hidden/System fields
      CompanyID: [{ value: '', disabled: true }],
      CreatedBy: [{ value: '', disabled: true }], // Set current user ID
      CreatedDate: [{ value: currentDate, disabled: true }],

      // Basic Information
      CompanyCode: [
        {
          value: this.isEditMode ? '' : 'AUTO-GENERATED',
          //disabled: !this.isEditMode
          disabled: true,
        },
        //this.isEditMode ? [Validators.required, Validators.maxLength(20)] : []
        [],
      ],
      CompanyName: ['', [Validators.required, Validators.maxLength(200)]],
      ShortName: ['', [Validators.maxLength(50)]],
      CompEntityTypeId: [''],
      EstablishedDate: [''],
      CurrencyId: ['', [Validators.required]],
      FiscalYearStart: [''],
      ParentCompanyId: [''],
      OwnershipPercentage: [100, [Validators.required, Validators.min(0), Validators.max(100)]],

      // Contact Information
      EmailID: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      PhoneNumber: ['', [Validators.maxLength(20)]],
      Website: ['', [Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(200)]],
      SocialMedialink: ['', [Validators.maxLength(200)]],
      Logo: [''],

      // Legal Information - FIXED: Made patterns optional by removing required validator
      PAN: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/), Validators.maxLength(10)]],
      GST: [
        '',
        [
          Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
          Validators.maxLength(15),
        ],
      ],
      CIN: [
        '',
        [
          Validators.pattern(/^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/),
          Validators.maxLength(21),
        ],
      ],

      // Registered Address
      RegisteredAddress: ['', [Validators.maxLength(500)]],
      RegisteredCountryID: ['', [Validators.required]],
      RegisteredStateID: ['', [Validators.required]],
      RegisteredDistrictID: ['', [Validators.required]],
      RegisteredCityID: ['', [Validators.required]],
      RegisteredPinCode: ['', [Validators.required, Validators.maxLength(10)]],

      // Corporate Address (optional)
      CorporateAddress: ['', [Validators.maxLength(500)]],
      CorporateCountryID: [''],
      CorporateStateID: [''],
      CorporateDistrictID: [''],
      CorporateCityID: [''],
      CorporatePinCode: ['', [Validators.maxLength(10)]],

      // AI & Analytics - FIXED: Removed required validator from boolean fields
      AIInsightsEnabled: [false],
      // FIXED: Commented out PredictiveAnalyticsLevel as it's not in template
      // PredictiveAnalyticsLevel: ['Basic', [Validators.required, Validators.maxLength(20)]],
      InterCompanyTransactions: [false],
      LocationAdvantageScore: ['', [Validators.min(0), Validators.max(100)]],
      TalentAccessibilityScore: ['', [Validators.min(0), Validators.max(100)]],
      CostEfficiencyRating: ['', [Validators.min(0), Validators.max(100)]],

      // Additional Information - FIXED: Made CompanyRemark optional
      CompanyRemark: ['', [Validators.maxLength(200)]],
      CompanyRemark2: ['', [Validators.maxLength(200)]],

      // Status flags
      CompanyIsAuth: [{ value: true, disabled: !this.isEditMode }],
      CompanyIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CompanyIsActive: [{ value: true, disabled: !this.isEditMode }],
    });

    // If editing, pre-fill form with available data
    if (this.isEditMode) {
      console.log('Patching form with company data:', this.data.company);
      const companyData = this.data.company;

      const establishedDate = companyData.EstablishedDate
        ? new Date(companyData.EstablishedDate)
        : '';
      const fiscalYearStart = companyData.FiscalYearStart
        ? new Date(companyData.FiscalYearStart)
        : '';

      this.companyForm.patchValue({
        // Basic Information
        CompanyCode: companyData.CompanyCode || '',
        CompanyName: companyData.CompanyName || '',
        ShortName: companyData.ShortName || '',
        EstablishedDate: establishedDate,
        FiscalYearStart: fiscalYearStart,
        ParentCompanyId: companyData.ParentCompanyId || '',
        OwnershipPercentage: companyData.OwnershipPercentage || 100,

        // Contact Information
        EmailID: companyData.EmailId || '',
        PhoneNumber: companyData.PhoneNumber || '',
        Website: companyData.Website || '',
        SocialMedialink: companyData.SocialMedialink || '',
        Logo: companyData.Logo || '',

        // Legal Information
        PAN: companyData.Pan || '',
        GST: companyData.Gst || '',
        CIN: companyData.Cin || '',

        // Registered Address
        RegisteredAddress: companyData.RegisteredAddress || '',
        RegisteredPinCode: companyData.RegisteredPinCode || '',

        // Corporate Address
        CorporateAddress: companyData.CorporateAddress || '',
        CorporatePinCode: companyData.CorporatePinCode || '',

        // AI & Analytics
        AIInsightsEnabled: companyData.AIInsightsEnabled ?? false,
        // FIXED: Commented out as field doesn't exist in template
        // PredictiveAnalyticsLevel: companyData.PredictiveAnalyticsLevel || 'Basic',
        InterCompanyTransactions: companyData.InterCompanyTransactions ?? false,
        LocationAdvantageScore: companyData.LocationAdvantageScore || '',
        TalentAccessibilityScore: companyData.TalentAccessibilityScore || '',
        CostEfficiencyRating: companyData.CostEfficiencyRating || '',

        // Additional Information
        CompanyRemark: companyData.CompanyRemark || '',
        CompanyRemark2: companyData.CompanyRemark2 || '',

        // Status flags
        CompanyIsAuth: companyData.CompanyIsAuth ?? true,
        CompanyIsDiscard: companyData.CompanyIsDiscard ?? false,
        CompanyIsActive: companyData.CompanyIsActive ?? true,
      });

      this.companyForm.get('CompanyIsAuth')?.enable();
      this.companyForm.get('CompanyIsDiscard')?.enable();
      this.companyForm.get('CompanyIsActive')?.enable();
      console.log('Form values after patch:', this.companyForm.value);
    }
  }

  loadAllCurrencies(): void {
    this.companyService.getAllCurrencies().subscribe({
      next: res => {
        this.currencyList = res;
        console.log('Loaded currencies:', res);
        this.filteredCurrencyList = [...this.currencyList];
        this.currencySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCurrencyList = this.currencyList.filter(currency =>
            currency.CurrencyName.toLowerCase().includes(filterValue)
          );
        });
        // Handle currency selection for edit mode
        if (this.isEditMode) {
          this.setCurrencyForEdit();
        }
      },
      error: err => {
        console.error('Failed to load currencies:', err);
      },
    });
  }

  private setCurrencyForEdit(): void {
    let currencyId = null;
    const countryData = this.data.company;
    // Find currency by name (trim whitespace for comparison)
    if (countryData?.CurrencyName) {
      const currency = this.currencyList.find(
        c => c.CurrencyName.trim() === countryData.CurrencyName.trim()
      );
      currencyId = currency ? currency.CurrencyId : null;
      console.log('Found currency by name:', currencyId, 'for currency:', countryData.CurrencyName);
    }

    if (currencyId) {
      this.companyForm.patchValue({
        CurrencyId: currencyId,
      });
      console.log('Currency set in form:', currencyId);
    } else {
      console.log('No currency ID found for currency name:', countryData?.CurrencyName);
    }
  }

  loadAllCompanyEntityTypes(): void {
    this.companyService.getAllCompanyEntityTypes().subscribe({
      next: res => {
        this.companyEntityTypeList = res;
        console.log('Loaded company entity types:', res);
        this.filteredCompEntityTypeList = [...this.companyEntityTypeList];
        this.compEntityTypeSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCompEntityTypeList = this.companyEntityTypeList.filter(compEntityType =>
            compEntityType.CompanyEntityTypeName.toLowerCase().includes(filterValue)
          );
        });
        if (this.isEditMode) {
          this.setCompanyEntityTypeForEdit();
        }
      },
      error: err => {
        console.error('Failed to load company entity types:', err);
      },
    });
  }

  private setCompanyEntityTypeForEdit(): void {
    let companyEntityTypeId = null;
    const companyEntityTypeData = this.data.company;
    // Find company entity type by name (trim whitespace for comparison)
    if (companyEntityTypeData?.CompanyEntityTypeName) {
      const compEntityType = this.companyEntityTypeList.find(
        c => c.CompanyEntityTypeName.trim() === companyEntityTypeData.CompanyEntityTypeName.trim()
      );
      companyEntityTypeId = compEntityType ? compEntityType.CompEntityTypeId : null;
      console.log(
        'Found company Entity Type by id:',
        companyEntityTypeId,
        'for company Entity Type:',
        companyEntityTypeData.CompanyEntityTypeName
      );
    }

    if (companyEntityTypeId) {
      this.companyForm.patchValue({
        CompEntityTypeId: companyEntityTypeId,
      });
      console.log('Company Entity Type set in form:', companyEntityTypeId);
    } else {
      console.log(
        'No Company Entity Type ID found for Company Entity Type name:',
        companyEntityTypeData?.CompanyEntityTypeName
      );
    }
  }

  loadAllParentCompanies(): void {
    this.companyService.getParentCompanies().subscribe({
      next: res => {
        this.parentcompanyList = res;
        console.log('Loaded Parent Company:', res);
        this.filteredParentCompanyList = [...this.parentcompanyList];
        this.parentCompanySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredParentCompanyList = this.filteredParentCompanyList.filter(parentCompany =>
            parentCompany.ParentCompanyName.toLowerCase().includes(filterValue)
          );
        });
        if (this.isEditMode && this.data) {
          this.setParentCompanyForEdit();
        }
      },
      error: err => {
        console.error('Failed to load parent company:', err);
      },
    });
  }

  private setParentCompanyForEdit(): void {
    let parentCompId = null;
    const parentCompanyData = this.data.company;
    // Find company by name (trim whitespace for comparison)
    if (parentCompanyData?.ParentCompanyName) {
      const parentComp = this.parentcompanyList.find(
        c => c.ParentCompanyName.trim() === parentCompanyData.ParentCompanyName.trim()
      );
      parentCompId = parentComp ? parentComp.ParentCompanyId : null;
      console.log(
        'Found parent company id by name:',
        parentCompId,
        'for Parentcompany:',
        parentCompanyData.ParentCompanyName
      );
    }

    if (parentCompId) {
      this.companyForm.patchValue({
        ParentCompanyId: parentCompId,
      });
      console.log('Parent Company set in form:', parentCompId);
    } else {
      console.log(
        'No parent company id found for parent company name:',
        parentCompanyData?.ParentCompanyName
      );
    }
  }

  //Registered Dropdown Code
  loadAllRegisteredCountries(): void {
    this.companyService.getAllCountries().subscribe({
      next: res => {
        this.registeredCountryList = res;
        console.log('Loaded Corporate Countries:', res);
        this.filteredRegisteredCountryList = [...this.registeredCountryList];
        this.registeredCountrySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredRegisteredCountryList = this.registeredCountryList.filter(country =>
            country.CountryName.toLowerCase().includes(filterValue)
          );
        });
        // Handle country selection for edit mode
        if (this.isEditMode && this.data) {
          this.setRegisteredCountryForEdit();
        }
      },
      error: err => {
        console.error('Failed to load countries:', err);
      },
    });
  }

  private setRegisteredCountryForEdit(): void {
    let registeredCountryId = null;
    const countryData = this.data.company;
    if (countryData?.RegisteredCountryName) {
      const rCountry = this.registeredCountryList.find(
        c => c.CountryName.trim() === countryData.RegisteredCountryName.trim()
      );
      registeredCountryId = rCountry ? rCountry.CountryId : null;
      console.log(
        'Found country id:',
        registeredCountryId,
        'for country:',
        countryData.RegisteredCountryName
      );
    }

    if (registeredCountryId) {
      this.companyForm.patchValue({
        RegisteredCountryID: registeredCountryId,
      });
      this.onRegisteredCountryChange(registeredCountryId);
      console.log('Country set in form:', registeredCountryId);
    } else {
      console.log('No Country ID found for Country name:', countryData?.CountryName);
    }
  }

  onRegisteredCountryChange(countryId: number): void {
    console.log('Selected Country ID:', countryId);
    // Reset state and dependent fields
    this.companyForm.patchValue({
      RegisteredStateID: '',
      RegisteredDistrictID: '',
      RegisteredCityID: '',
    });

    // Clear state data
    this.registeredStateList = [];
    this.filteredRegisteredStateList = [];

    if (!countryId) {
      return;
    }

    // Load Registered states for selected Registered country
    this.companyService.getRStatesByCounrtyId(countryId).subscribe({
      next: states => {
        this.registeredStateList = states;
        this.filteredRegisteredStateList = [...this.registeredStateList];
        console.log('Loaded states:', states);

        // Setup search filter for states
        this.registeredStateSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredRegisteredStateList = this.registeredStateList.filter(state =>
            state.StateName.toLowerCase().includes(filterValue)
          );
        });
        // Handle state selection for edit mode
        if (this.isEditMode && this.data) {
          this.setRegisteredStateForEdit();
        }
      },
      error: err => {
        console.error('Failed to load states:', err);
      },
    });
  }

  private setRegisteredStateForEdit(): void {
    let regStateId = null;
    const stateData = this.data.company;
    if (stateData?.RegisteredStateName) {
      const rState = this.registeredStateList.find(
        c => c.StateName.trim() === stateData.RegisteredStateName.trim()
      );
      regStateId = rState ? rState.StateId : null;
      console.log('Found state by name:', regStateId, 'for state:', stateData.RegisteredStateName);
    }

    if (regStateId) {
      this.companyForm.patchValue({
        RegisteredStateID: regStateId,
      });
      console.log('State set in form:', regStateId);
      this.onRegisteredStateChange(regStateId);
    } else {
      console.log('No State ID found for currency name:', stateData?.RegisteredStateName);
    }
  }

  onRegisteredStateChange(stateId: number): void {
    console.log('Selected State ID:', stateId);
    // Reset district and city fields
    this.companyForm.patchValue({
      RegisteredDistrictID: '',
      RegisteredCityID: '',
    });
    // Clear district and city data
    this.registeredDistrictList = [];
    this.filteredRegisteredDistrictList = [];
    if (!stateId) {
      return;
    }
    // Load districts for selected state
    this.companyService.getRDistrictsByStateId(stateId).subscribe({
      next: districts => {
        this.registeredDistrictList = districts;
        this.filteredRegisteredDistrictList = [...this.registeredDistrictList];
        console.log('Loaded districts:', districts);
        // Setup search filter for districts
        this.registeredDistrictSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredRegisteredDistrictList = this.registeredDistrictList.filter(district =>
            district.DistrictName.toLowerCase().includes(filterValue)
          );
        });
        // Handle district selection for edit mode
        if (this.isEditMode && this.data) {
          this.setRegisteredDistrictForEdit();
        }
      },
      error: err => {
        console.error('Failed to load districts:', err);
      },
    });
  }

  private setRegisteredDistrictForEdit(): void {
    let regDistrictId = null;
    const districtData = this.data.company;
    if (districtData?.RegisteredDistrictName) {
      const rDistrict = this.registeredDistrictList.find(
        c => c.DistrictName.trim() === districtData.RegisteredDistrictName.trim()
      );
      regDistrictId = rDistrict ? rDistrict.DistrictId : null;
      console.log(
        'Found district by name:',
        regDistrictId,
        'for district:',
        districtData.RegisteredDistrictName
      );
    }
    if (regDistrictId) {
      this.companyForm.patchValue({
        RegisteredDistrictID: regDistrictId,
      });
      console.log('District set in form:', regDistrictId);
      this.onRegisteredDistrictChange(regDistrictId);
    } else {
      console.log('No district ID found for district name:', districtData?.RegisteredDistrictName);
    }
  }

  onRegisteredDistrictChange(districtId: number): void {
    console.log('Selected District ID:', districtId);
    this.companyForm.patchValue({
      RegisteredCityID: '',
    });
    // Clear city data
    this.registeredCityList = [];
    this.filteredRegisteredCityList = [];
    if (!districtId) {
      return;
    }
    // Load cities for selected district
    this.companyService.getRCitiesByDistrictId(districtId).subscribe({
      next: cities => {
        this.registeredCityList = cities;
        this.filteredRegisteredCityList = [...this.registeredCityList];
        console.log('Loaded cities:', cities);
        // Setup search filter for cities
        this.registeredCitySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredRegisteredCityList = this.registeredCityList.filter(city =>
            city.CityName.toLowerCase().includes(filterValue)
          );
        });
        // Handle city selection for edit mode
        if (this.isEditMode && this.data) {
          this.setRegisteredCityForEdit();
        }
      },
      error: err => {
        console.error('Failed to load cities:', err);
      },
    });
  }

  private setRegisteredCityForEdit(): void {
    let regCityId = null;
    const cityData = this.data.company;
    if (cityData?.RegisteredCityName) {
      const rCity = this.registeredCityList.find(
        c => c.CityName.trim() === cityData.RegisteredCityName.trim()
      );
      regCityId = rCity ? rCity.CityId : null;
      console.log('Found city by name:', regCityId, 'for city:', cityData.RegisteredCityName);
    }
    if (regCityId) {
      this.companyForm.patchValue({
        RegisteredCityID: regCityId,
      });
      console.log('City set in form:', regCityId);
    } else {
      console.log('No city ID found for city name:', cityData?.RegisteredCityName);
    }
  }

  // Corporate Dropdown Code
  loadAllCorporateCountries(): void {
    this.companyService.getAllCountries().subscribe({
      next: res => {
        this.corporateCountryList = res;
        console.log('Loaded Corporate Countries:', res);
        this.filteredCorporateCountryList = [...this.corporateCountryList];
        this.corporateCountrySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCorporateCountryList = this.corporateCountryList.filter(country =>
            country.CountryName.toLowerCase().includes(filterValue)
          );
        });
        // Handle country selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCorporateCountryForEdit();
        }
      },
      error: err => {
        console.error('Failed to load countries:', err);
      },
    });
  }

  private setCorporateCountryForEdit(): void {
    let corporateCountryId = null;
    const countryData = this.data.company;
    if (countryData?.CorporateCountryName) {
      const cCountry = this.corporateCountryList.find(
        c => c.CountryName.trim() === countryData.CorporateCountryName.trim()
      );
      corporateCountryId = cCountry ? cCountry.CountryId : null;
      console.log(
        'Found country by name:',
        corporateCountryId,
        'for country:',
        countryData.CorporateCountryName
      );
    }
    if (corporateCountryId) {
      this.companyForm.patchValue({
        CorporateCountryID: corporateCountryId,
      });
      console.log('Corporate Country set in form:', corporateCountryId);
      this.onCorporateCountryChange(corporateCountryId);
    } else {
      console.log(
        'No Corporate Country ID found for Corporate Country name:',
        countryData?.CorporateCountryName
      );
    }
  }

  onCorporateCountryChange(countryId: number): void {
    console.log('Selected Corporate Country ID:', countryId);
    // Reset state and dependent fields
    this.companyForm.patchValue({
      CorporateStateID: '',
      CorporateDistrictID: '',
      CorporateCityID: '',
    });
    // Clear state data
    this.corporateStateList = [];
    this.filteredCorporateStateList = [];
    if (!countryId) {
      return;
    }
    // Load Corporate states for selected Corporate country
    this.companyService.getRStatesByCounrtyId(countryId).subscribe({
      next: states => {
        this.corporateStateList = states;
        this.filteredCorporateStateList = [...this.corporateStateList];
        console.log('Loaded states:', states);
        // Setup search filter for states
        this.corporateStateSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCorporateStateList = this.corporateStateList.filter(state =>
            state.StateName.toLowerCase().includes(filterValue)
          );
        });
        // Handle state selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCorporateStateForEdit();
        }
      },
      error: err => {
        console.error('Failed to load states:', err);
      },
    });
  }

  private setCorporateStateForEdit(): void {
    let corporateStateId = null;
    const stateData = this.data.company;
    if (stateData?.CorporateStateName) {
      const cState = this.corporateStateList.find(
        c => c.StateName.trim() === stateData.CorporateStateName.trim()
      );
      corporateStateId = cState ? cState.StateId : null;
      console.log(
        'Found state by name:',
        corporateStateId,
        'for state:',
        stateData.CorporateStateName
      );
    }
    if (corporateStateId) {
      this.companyForm.patchValue({
        CorporateStateID: corporateStateId,
      });
      console.log('Corporate State set in form:', corporateStateId);
      this.onCorporateStateChange(corporateStateId);
    } else {
      console.log(
        'No Corporate State ID found for Corporate State name:',
        stateData?.CorporateStateName
      );
    }
  }

  onCorporateStateChange(stateId: number): void {
    console.log('Selected Corporate State ID:', stateId);
    // Reset district and city fields
    this.companyForm.patchValue({
      CorporateDistrictID: '',
      CorporateCityID: '',
    });
    // Clear district and city data
    this.corporateDistrictList = [];
    this.filteredCorporateDistrictList = [];
    if (!stateId) {
      return;
    }
    // Load districts for selected state
    this.companyService.getRDistrictsByStateId(stateId).subscribe({
      next: districts => {
        this.corporateDistrictList = districts;
        this.filteredCorporateDistrictList = [...this.corporateDistrictList];
        console.log('Loaded districts:', districts);
        // Setup search filter for districts
        this.corporateDistrictSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCorporateDistrictList = this.corporateDistrictList.filter(district =>
            district.DistrictName.toLowerCase().includes(filterValue)
          );
        });
        // Handle district selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCorporateDistrictForEdit();
        }
      },
      error: err => {
        console.error('Failed to load districts:', err);
      },
    });
  }

  private setCorporateDistrictForEdit(): void {
    let corporateDistrictId = null;
    const districtData = this.data.company;
    if (districtData?.CorporateDistrictName) {
      const cDistrict = this.corporateDistrictList.find(
        c => c.DistrictName.trim() === districtData.CorporateDistrictName.trim()
      );
      corporateDistrictId = cDistrict ? cDistrict.DistrictId : null;
      console.log(
        'Found district by name:',
        corporateDistrictId,
        'for district:',
        districtData.CorporateDistrictName
      );
    }
    if (corporateDistrictId) {
      this.companyForm.patchValue({
        CorporateDistrictID: corporateDistrictId,
      });
      console.log('Corporate District set in form:', corporateDistrictId);
      this.onCorporateDistrictChange(corporateDistrictId);
    } else {
      console.log(
        'No Corporate District ID found for Corporate District name:',
        districtData?.CorporateDistrictName
      );
    }
  }

  onCorporateDistrictChange(districtId: number): void {
    console.log('Selected Corporate District ID:', districtId);
    this.companyForm.patchValue({
      CorporateCityID: '',
    });
    // Clear city data
    this.corporateCityList = [];
    this.filteredCorporateCityList = [];
    if (!districtId) {
      return;
    }
    // Load cities for selected district
    this.companyService.getRCitiesByDistrictId(districtId).subscribe({
      next: cities => {
        this.corporateCityList = cities;
        this.filteredCorporateCityList = [...this.corporateCityList];
        console.log('Loaded cities:', cities);
        // Setup search filter for cities
        this.corporateCitySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCorporateCityList = this.corporateCityList.filter(city =>
            city.CityName.toLowerCase().includes(filterValue)
          );
        });
        // Handle city selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCorporateCityForEdit();
        }
      },
      error: err => {
        console.error('Failed to load cities:', err);
      },
    });
  }

  private setCorporateCityForEdit(): void {
    let corporateCityId = null;
    const cityData = this.data.company;
    if (cityData?.CorporateCityName) {
      const cCity = this.corporateCityList.find(
        c => c.CityName.trim() === cityData.CorporateCityName.trim()
      );
      corporateCityId = cCity ? cCity.CityId : null;
      console.log('Found city by name:', corporateCityId, 'for city:', cityData.CorporateCityName);
    }
    if (corporateCityId) {
      this.companyForm.patchValue({
        CorporateCityID: corporateCityId,
      });
      console.log('Corporate City set in form:', corporateCityId);
    } else {
      console.log(
        'No Corporate City ID found for Corporate City name:',
        cityData?.CorporateCityName
      );
    }
  }

  //for copy registered address to corporate address
  async copyCorporateAddressAsync(): Promise<void> {
    console.log('Starting async copy corporate address function');

    const registeredValues = this.companyForm.value;
    console.log('Registered values:', registeredValues);

    // Copy basic fields first
    this.companyForm.patchValue({
      CorporateAddress: registeredValues.RegisteredAddress,
      CorporatePinCode: registeredValues.RegisteredPinCode,
    });

    try {
      if (registeredValues.RegisteredCountryID) {
        // Set country
        this.companyForm.patchValue({
          CorporateCountryID: registeredValues.RegisteredCountryID,
        });

        // Load and wait for states
        await this.loadCorporateStatesAsync(registeredValues.RegisteredCountryID);

        if (registeredValues.RegisteredStateID) {
          // Set state
          this.companyForm.patchValue({
            CorporateStateID: registeredValues.RegisteredStateID,
          });

          // Load and wait for districts
          await this.loadCorporateDistrictsAsync(registeredValues.RegisteredStateID);

          if (registeredValues.RegisteredDistrictID) {
            // Set district
            this.companyForm.patchValue({
              CorporateDistrictID: registeredValues.RegisteredDistrictID,
            });

            // Load and wait for cities
            await this.loadCorporateCitiesAsync(registeredValues.RegisteredDistrictID);

            if (registeredValues.RegisteredCityID) {
              // Set city
              this.companyForm.patchValue({
                CorporateCityID: registeredValues.RegisteredCityID,
              });
            }
          }
        }
      }

      console.log('Corporate address copy completed successfully');
    } catch (error) {
      console.error('Error copying corporate address:', error);
    }
  }

  // Async helper methods for copyCorporateAddressAsync() method
  private loadCorporateStatesAsync(countryId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.companyService.getRStatesByCounrtyId(countryId).subscribe({
        next: states => {
          this.corporateStateList = states;
          this.filteredCorporateStateList = [...this.corporateStateList];
          console.log('Loaded corporate states async:', states);
          resolve();
        },
        error: err => {
          console.error('Failed to load corporate states async:', err);
          reject(err);
        },
      });
    });
  }

  private loadCorporateDistrictsAsync(stateId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.companyService.getRDistrictsByStateId(stateId).subscribe({
        next: districts => {
          this.corporateDistrictList = districts;
          this.filteredCorporateDistrictList = [...this.corporateDistrictList];
          console.log('Loaded corporate districts async:', districts);
          resolve();
        },
        error: err => {
          console.error('Failed to load corporate districts async:', err);
          reject(err);
        },
      });
    });
  }

  private loadCorporateCitiesAsync(districtId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.companyService.getRCitiesByDistrictId(districtId).subscribe({
        next: cities => {
          this.corporateCityList = cities;
          this.filteredCorporateCityList = [...this.corporateCityList];
          console.log('Loaded corporate cities async:', cities);
          resolve();
        },
        error: err => {
          console.error('Failed to load corporate cities async:', err);
          reject(err);
        },
      });
    });
  }



  allowCompanyNameChars(event: KeyboardEvent) {
    const inputChar = event.key;
    const pattern = /^[A-Za-z ]$/;

    // Block invalid characters
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }

    // Prevent leading space
    const input = event.target as HTMLInputElement;
    if (input.selectionStart === 0 && inputChar === ' ') {
      event.preventDefault();
    }
  }

  allowShortNameChars(event: KeyboardEvent) {
    const pattern = /^[A-Za-z .,\- ]$/;
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }

    // Prevent leading space
    const input = event.target as HTMLInputElement;
    if (input.selectionStart === 0 && inputChar === ' ') {
      event.preventDefault();
    }
  }



  onSubmit(): void {
    ;
    const formData = { ...this.companyForm.value };
    // Convert file to base64 if logo is selected
    if (this.selectedLogoFile) {
      const reader = new FileReader();
      reader.onload = () => {
        // Remove the data URL prefix to get pure base64
        const base64Data = (reader.result as string).split(',')[1];
        formData.Logo = base64Data;

        this.dialogRef.close(formData);
        console.log('Form submitted:', formData);
      };
      reader.readAsDataURL(this.selectedLogoFile);
    } else {
      // No logo selected, proceed with form submission
      this.dialogRef.close(formData);
      console.log('Form submitted:', formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onLogoSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedLogoFile = file;

      // Resize and compress the image
      this.resizeImage(file, 200, 150, 0.8).then(resizedFile => {
        this.selectedLogoFile = resizedFile;
        // Create preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.logoPreview = e.target.result;
        };
        reader.readAsDataURL(resizedFile);
      });
    }
  }

  clearLogo(): void {
    this.selectedLogoFile = null;
    this.logoPreview = null;
    this.companyForm.patchValue({ Logo: null });

    // Clear file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number
  ): Promise<File> {
    return new Promise(resolve => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            const resizedFile = new File([blob!], file.name, {
              type: 'image/jpeg', // Convert to JPEG for better compression
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          'image/jpeg',
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }

  onReset(): void {
    // Reset form to initial values (only for add mode)
    if (!this.isEditMode) {
      // Store current values of fields that should not be reset
      const preservedValues = {
        CompanyCode: this.companyForm.get('CompanyCode')?.value,
        CreatedDate: this.companyForm.get('CreatedDate')?.value,
        CompanyIsActive: this.companyForm.get('CompanyIsActive')?.value,
        CompanyIsAuth: this.companyForm.get('CompanyIsAuth')?.value,
        CompanyIsDiscard: this.companyForm.get('CompanyIsDiscard')?.value,
      };

      // Reset form with initial values, excluding preserved fields
      this.companyForm.patchValue({
        // Basic Information (excluding CompanyCode and CreatedDate)
        CompanyName: '',
        ShortName: '',
        CompEntityTypeId: '',
        EstablishedDate: '',
        CurrencyId: '',
        FiscalYearStart: '',
        ParentCompanyId: '',
        OwnershipPercentage: 100,

        // Contact Information
        EmailID: '',
        PhoneNumber: '',
        Website: '',
        SocialMedialink: '',
        Logo: '',

        // Legal Information
        PAN: '',
        GST: '',
        CIN: '',

        // Registered Address
        RegisteredAddress: '',
        RegisteredCountryID: '',
        RegisteredStateID: '',
        RegisteredDistrictID: '',
        RegisteredCityID: '',
        RegisteredPinCode: '',

        // Corporate Address
        CorporateAddress: '',
        CorporateCountryID: '',
        CorporateStateID: '',
        CorporateDistrictID: '',
        CorporateCityID: '',
        CorporatePinCode: '',

        // AI & Analytics
        AIInsightsEnabled: false,
        InterCompanyTransactions: false,
        LocationAdvantageScore: '',
        TalentAccessibilityScore: '',
        CostEfficiencyRating: '',

        // Additional Information
        CompanyRemark: '',
        CompanyRemark2: '',

        // Status flags are preserved - not reset
      });

      // Clear logo-related data
      this.selectedLogoFile = null;
      this.logoPreview = null;

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      // Clear any search controls for dropdowns if they exist
      if (this.compEntityTypeSearchControl) {
        this.compEntityTypeSearchControl.reset();
      }
      if (this.currencySearchControl) {
        this.currencySearchControl.reset();
      }
      if (this.parentCompanySearchControl) {
        this.parentCompanySearchControl.reset();
      }
      // Mark form as pristine and untouched
      this.companyForm.markAsPristine();
      this.companyForm.markAsUntouched();

      console.log('Form has been reset to initial values');
    }
  }
}
