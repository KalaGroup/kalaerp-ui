import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-add-edit-company',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule],
  templateUrl: './add-edit-company.html',
  styleUrl: './add-edit-company.scss'
})
export class AddEditCompany {
     companyForm!: FormGroup;
  isEditMode: boolean = false;
  currencyList: any[] = [];
  code: string ='';
  currencySearchControl = new FormControl('');
  filteredCurrencyList: any[] = [];


  constructor(private hrService: HrService,
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
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    // Complete Company Form with all fields
this.companyForm = this.fb.group({
  // Auto-generated fields
  CreatedDate: [{ value: currentDate, disabled: true }],
  code: [{ value: '', disabled: !this.isEditMode }],
  CompanyId: [{ value: '', disabled: true }], // Auto-generated ID
  
  // Basic Company Information
  CompanyName: ['', [Validators.required, Validators.minLength(2)]],
  CompanyShortName: ['', [Validators.required, Validators.minLength(1)]],
  CompanyCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{3,10}$/)]],
  DisplayName: [''],
  LegalName: ['', [Validators.required]],
  
  // Company Type & Classification
  CompanyType: ['', [Validators.required]], // Private Ltd, Public Ltd, Partnership, etc.
  BusinessType: [''], // Manufacturing, Service, Trading, etc.
  IndustryType: [''], // IT, Healthcare, Finance, etc.
  CompanySize: [''], // Small, Medium, Large, Enterprise
  
  // Registration Details
  RegistrationNumber: ['', [Validators.required]],
  TaxId: ['', [Validators.required]],
  VATNumber: [''],
  GSTNumber: [''],
  PAN: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
  TIN: [''],
  CIN: [''], // Corporate Identification Number
  
  // Contact Information
  Email: ['', [Validators.required, Validators.email]],
  AlternateEmail: ['', [Validators.email]],
  Phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,15}$/)]],
  AlternatePhone: ['', [Validators.pattern(/^[0-9+\-\s()]{7,15}$/)]],
  Fax: [''],
  Website: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
  
  // Address Information
  Address: ['', [Validators.required]],
  AddressLine2: [''],
  City: ['', [Validators.required]],
  State: ['', [Validators.required]],
  Country: ['', [Validators.required]],
  PostalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,10}$/)]],
  
  // Billing Address (if different)
  BillingAddress: [''],
  BillingAddressLine2: [''],
  BillingCity: [''],
  BillingState: [''],
  BillingCountry: [''],
  BillingPostalCode: [''],
  IsBillingSameAsAddress: [true],
  
  // Financial Information
  Currency: ['', [Validators.required]],
  TimeZone: ['', [Validators.required]],
  FiscalYearStart: ['', [Validators.required]],
  FiscalYearEnd: ['', [Validators.required]],
  BaseCurrency: [''],
  
  // Banking Information
  BankName: [''],
  BankAccountNumber: [''],
  BankIFSC: [''],
  BankSWIFT: [''],
  BankBranch: [''],
  
  // Company Settings
  Logo: [''],
  Description: [''],
  EstablishedDate: [''],
  IncorporationDate: [''],
  NumberOfEmployees: [''],
  AnnualRevenue: [''],
  
  // Contact Persons
  CEOName: [''],
  CEOEmail: ['', [Validators.email]],
  CEOPhone: [''],
  ContactPersonName: [''],
  ContactPersonEmail: ['', [Validators.email]],
  ContactPersonPhone: [''],
  ContactPersonDesignation: [''],
  
  // Compliance & Legal
  LicenseNumber: [''],
  LicenseExpiryDate: [''],
  InsuranceNumber: [''],
  InsuranceExpiryDate: [''],
  
  // System Fields
  IsActive: [{ value: true, disabled: !this.isEditMode }],
  IsVerified: [{ value: false, disabled: true }],
  IsApproved: [{ value: false, disabled: true }],
  CreatedBy: [{ value: '', disabled: true }],
  ModifiedBy: [{ value: '', disabled: true }],
  ModifiedDate: [{ value: '', disabled: true }],
  
  // Additional Settings
  AllowMultipleBranches: [false],
  AllowMultipleCurrencies: [false],
  EnableTaxCalculation: [true],
  EnableInventoryManagement: [false],
  EnablePayrollManagement: [false],
  
  // Notification Settings
  EmailNotifications: [true],
  SMSNotifications: [false],
  PushNotifications: [true],
  
  // Subscription & Plan
  SubscriptionPlan: [''],
  SubscriptionStartDate: [''],
  SubscriptionEndDate: [''],
  MaxUsers: [0],
  MaxBranches: [1],
  
  // Social Media Links
  FacebookURL: [''],
  TwitterURL: [''],
  LinkedInURL: [''],
  InstagramURL: [''],
  
  // Operational Settings
  WorkingDaysPerWeek: [5, [Validators.min(1), Validators.max(7)]],
  WorkingHoursPerDay: [8, [Validators.min(1), Validators.max(24)]],
  WeekStartDay: ['Monday'],
  DefaultLanguage: ['English'],
  DefaultDateFormat: ['DD/MM/YYYY'],
  DefaultTimeFormat: ['24'],
  
  // Integration Settings
  EnableAPIAccess: [false],
  APIKey: [{ value: '', disabled: true }],
  WebhookURL: [''],
  
  // Approval Workflow
  RequireApprovalForExpenses: [false],
  RequireApprovalForPurchases: [false],
  RequireApprovalForLeaves: [false],
  ApprovalLimit: [0],
  
  // Document Settings
  DocumentNumberPrefix: [''],
  InvoicePrefix: ['INV'],
  QuotationPrefix: ['QUO'],
  PurchaseOrderPrefix: ['PO'],
  
  // Security Settings
  PasswordPolicy: ['Medium'],
  SessionTimeout: [30],
  TwoFactorAuthentication: [false],
  IPWhitelisting: [false],
  
  // Backup & Archive
  AutoBackup: [true],
  BackupFrequency: ['Daily'],
  DataRetentionPeriod: [7], // in years
  
  // Custom Fields (if needed)
  CustomField1: [''],
  CustomField2: [''],
  CustomField3: [''],
  CustomField4: [''],
  CustomField5: [''],
  
  // Status and Remarks
  Status: ['Active'],
  Remarks: [''],
  Notes: [''],
  Tags: ['']
});

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.country) {
      console.log('Patching form with country data:', this.data.country);
      this.companyForm.patchValue({
         code: this.data.country.code || this.data.country.CountryCode || '',
        CountryCode: this.data.country.CountryCode || '',
        CountryName: this.data.country.CountryName || '',
        CountryShortName: this.data.country.CountryShortName || '',
        IsActive: this.data.country.IsActive ?? true
      });
       this.companyForm.get('code')?.enable();
      this.companyForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.companyForm.value);
    }
  }

  loadAllCurrencies(): void {
    this.hrService.getAllCurrencies().subscribe({
      next: (res) => {
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
        if (this.isEditMode && this.data) {
          this.setCurrencyForEdit();
        }
      },
      error: (err) => {
        console.error('Failed to load currencies:', err);
      }
    });
  }

   private setCurrencyForEdit(): void {
    let currencyId = null;
    const countryData = this.data.country;
    // Find currency by name (trim whitespace for comparison)
    if (countryData?.CurrencyName) {
      const currency = this.currencyList.find(c => 
        c.CurrencyName.trim() === countryData.CurrencyName.trim()
      );
      currencyId = currency ? currency.CurrencyId : null;
      console.log('Found currency by name:', currencyId, 'for currency:', countryData.CurrencyName);
    }

    if (currencyId) {
      this.companyForm.patchValue({
        CurrencyId: currencyId
      });
      console.log('Currency set in form:', currencyId);
    } else {
      console.log('No currency ID found for currency name:', countryData?.CurrencyName);
    }
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.dialogRef.close(this.companyForm.value);
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
