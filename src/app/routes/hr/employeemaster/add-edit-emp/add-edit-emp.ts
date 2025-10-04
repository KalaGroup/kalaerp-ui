import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ValidationErrorDialog } from '@shared/validation-error-dialog/validation-error-dialog';
import { Countryservice } from '@shared/services/hr/country/countryservice';

@Component({
  selector: 'app-add-edit-emp',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-edit-emp.html',
  styleUrl: './add-edit-emp.scss',
})
export class AddEditEmp {
  @ViewChild('stepper') stepper!: MatStepper;

  employeeForm!: FormGroup;
  currentStep = 1;
  totalSteps = 5;
  isEditMode = false;

  // Data lists
  basicInfoCountryList: any[] = [];
  presentAddressCountryList: any[] = [];
  permanentAddressCountryList: any[] = [];
  stateList: any[] = [];
  districtList: any[] = [];
  cityList: any[] = [];
  divisionList: any[] = [];
  positionList: any[] = [];
  offerLetterList: any[] = [];
  employeeTypeList: any[] = [];
  parentCompanyList: any[] = [];
  companyEntityList: any[] = [];
  profitCenterList: any[] = [];
  departmentList: any[] = [];
  workstationList: any[] = [];
  gradeList: any[] = [];
  designationList: any[] = [];
  reportToList: any[] = []; // Employee list for reporting manager
  departmentHODList: any[] = []; // HOD list

  // Search controls for dropdowns
  countrySearchControlForBasicInfo = new FormControl('');
  countrySearchControlForPresentAddress = new FormControl('');
  countrySearchControlForPermanentAddress = new FormControl('');
  presentStateSearchControl = new FormControl('');
  presentDistrictSearchControl = new FormControl('');
  presentCitySearchControl = new FormControl('');
  permanentStateSearchControl = new FormControl('');
  permanentDistrictSearchControl = new FormControl('');
  permanentCitySearchControl = new FormControl('');
  divisionSearchControl = new FormControl('');
  positionSearchControl = new FormControl('');
  departmentSearchControl = new FormControl('');
  gradeSearchControl = new FormControl('');
  designationSearchControl = new FormControl('');
  offerLetterSearchControl = new FormControl('');
  employeeTypeSearchControl = new FormControl('');
  parentCompanySearchControl = new FormControl('');
  companyEntitySearchControl = new FormControl('');
  profitCenterSearchControl = new FormControl('');
  workstationSearchControl = new FormControl('');
  reportToSearchControl = new FormControl('');
  departmentHODSearchControl = new FormControl('');

  // Filtered lists
  filteredBasicInfoCountryList: any[] = [];
  filteredPresentAddressCountryList: any[] = [];
  filteredPermanentAddressCountryList: any[] = [];
  filteredPresentStateList: any[] = [];
  filteredPresentDistrictList: any[] = [];
  filteredPresentCityList: any[] = [];
  filteredPermanentStateList: any[] = [];
  filteredPermanentDistrictList: any[] = [];
  filteredPermanentCityList: any[] = [];
  filteredDivisionList: any[] = [];
  filteredPositionList: any[] = [];
  filteredDepartmentList: any[] = [];
  filteredGradeList: any[] = [];
  filteredDesignationList: any[] = [];
  filteredOfferLetterList: any[] = [];
  filteredEmployeeTypeList: any[] = [];
  filteredParentCompanyList: any[] = [];
  filteredCompanyEntityList: any[] = [];
  filteredProfitCenterList: any[] = [];
  filteredWorkstationList: any[] = [];
  filteredReportToList: any[] = [];
  filteredDepartmentHODList: any[] = [];

  genderList = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  bloodGroupList = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  religionList = [
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Muslim', label: 'Muslim' },
    { value: 'Christian', label: 'Christian' },
    { value: 'Sikh', label: 'Sikh' },
    { value: 'Buddhist', label: 'Buddhist' },
    { value: 'Jain', label: 'Jain' },
    { value: 'Other', label: 'Other' },
  ];

  religionCategoryList = [
    { value: 'General', label: 'General' },
    { value: 'OBC', label: 'OBC' },
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' },
    { value: 'Other', label: 'Other' },
  ];

  maritalStatusList = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' },
  ];

  // Authorization control property
  canAuthorize: boolean = false; // Set to false for makers, true for authorizers

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddEditEmp>,
    public countryService: Countryservice, // Replace with your actual service
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.employee || false;
    // Set authorization permission based on user role
    // You can get this from your auth service or user role
    this.canAuthorize = this.checkUserAuthorizationPermission();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCountriesForBasicInfo();
    this.loadAllCountriesForPresentAddress();
    this.loadAllCountriesForPermanentAddress();
    this.loadAllStates();
    this.loadAllDistricts();
    this.loadAllCities();
    // this.loadAllDivisions();
    // this.loadAllPositions();
    // this.loadAllOfferLetters();
    // this.loadAllEmployeeTypes();
    // this.loadAllParentCompanies();
    // this.loadAllCompanyEntities();
    // this.loadAllProfitCenters();
    // this.loadAllDepartments();
    // this.loadAllWorkstations();
    // this.loadAllGrades();
    // this.loadAllDesignations();
    // this.loadAllReportingManagers();
    // this.loadAllDepartmentHODs();
  }

  private initializeForm(): void {
    const currentDate = new Date().toISOString().split('T')[0];

    this.employeeForm = this.fb.group({
      EmployeeId: [''],
      CreatedDate: [{ value: currentDate, disabled: true }],

      // Step 1: Basic Information
      EmployeeMasterCode: [{ disabled: true, value: '' }],
      EmployeeMasterFirstName: ['', [Validators.required, Validators.maxLength(100)]],
      EmployeeMasterMiddleName: ['', [Validators.maxLength(100)]],
      EmployeeMasterLastName: ['', [Validators.required, Validators.maxLength(100)]],
      EmployeeMasterFullName: [{ value: '', disabled: true }],
      EmployeeMasterDateOfBirth: ['', [Validators.required]],
      EmployeeMasterGender: ['', [Validators.required]],
      EmployeeMasterNationalityCountryId: ['', [Validators.required]],
      EmployeeMasterReligion: ['', [Validators.required]],
      EmployeeMasterReligionCategory: ['', [Validators.required]],
      EmployeeMasterBloodGroup: ['', [Validators.required]],
      EmployeeMasterPhotoAttachment: [''],
      EmployeeMasterRemark: ['', [Validators.maxLength(200)]],
      EmployeeMasterAuthRemark: ['', [Validators.maxLength(200)]],
      EmployeeMasterAuth: [{ value: false, disabled: !this.isEditMode }],
      EmployeeMasterIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      EmployeeMasterIsActive: [{ value: true, disabled: !this.isEditMode }],

      // Step 2: Address Details - Present
      AddressDetailsEmployeeMasterPresentAdress: [
        '',
        [Validators.required, Validators.maxLength(500)],
      ],
      AddressDetailsEmployeeMasterPresentCountryId: ['', [Validators.required]],
      AddressDetailsEmployeeMasterPresentStateId: ['', [Validators.required]],
      AddressDetailsEmployeeMasterPresentDistrictId: ['', [Validators.required]],
      AddressDetailsEmployeeMasterPresentCitytId: ['', [Validators.required]],
      AddressDetailsEmployeeMasterPresentPinCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{6}$/)],
      ],
      AddressDetailsEmployeeMasterPemanantAddresssameAsPresent: [false],

      // Step 2: Address Details - Permanent
      AddressDetailsEmployeeMasterPermanantAdress: [
        '',
        [Validators.required, Validators.maxLength(500)],
      ],
      AddressDetailsEmployeeMasterPermanantCountryId: ['', [Validators.required]],
      AddressDetailsEmployeeMasterPermanantStateId: ['', [Validators.required]],
      AddressDetailsEmployeeMasterPermanantDistrictId: ['', [Validators.required]],
      AddressDetailsEmployeeMasterPermanantCityId: ['', [Validators.required]],
      AddressDetailsEmployeeMasterPermanantPinCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{6}$/)],
      ],
      AddressDetailsEmployeeMasterAuthRemark: ['', [Validators.maxLength(500)]],
      AddressDetailsEmployeeMasterAuth: [{ value: true, disabled: !this.isEditMode }],

      // Step 3: Family Details
      FamilyDetailsEmployeeMasterFatherHusbandName: [
        '',
        [Validators.required, Validators.maxLength(200)],
      ],
      FamilyDetailsEmployeeMasterMotherName: ['', [Validators.required, Validators.maxLength(200)]],
      FamilyDetailsEmployeeMasterMartialStatus: ['', [Validators.required]],
      FamilyDetailsEmployeeMasterSpouseName: ['', [Validators.maxLength(200)]],
      FamilyDetailsEmployeeMasterSpouseDateOfBirth: [''],
      FamilyDetailsEmployeeMasterSpouseAadharNumber: ['', [Validators.pattern(/^\d{12}$/)]],
      FamilyDetailsEmployeeMasterNumberofChidren: [0, [Validators.min(0), Validators.max(20)]],
      FamilyDetailsEmployeeMasterSpouseAadharNumberAttachment: [''],
      FamilyDetailsEmployeeMasterRemark: ['', [Validators.maxLength(200)]],
      FamilyDetailsEmployeeMasterAuthRemark: ['', [Validators.maxLength(200)]],
      FamilyDetailsEmployeeMasterAuth: [{ value: true, disabled: !this.isEditMode }],

      // Step 4: Employment Details
      EmploymentDetailsEmployeeMasterId: [''],
      EmploymentDetailsDivisionId: ['', [Validators.required]],
      EmploymentDetailsPositionId: ['', [Validators.required]],
      EmploymentDetailsOfferLetterId: ['', [Validators.required]],
      EmploymentDetailsEmployeeTypeId: ['', [Validators.required]],
      EmploymentDetailsParentCompanyId: ['', [Validators.required]],
      EmploymentDetailsCompanyEntityId: ['', [Validators.required]],
      EmploymentDetailsProfitcenterId: ['', [Validators.required]],
      EmploymentDetailsDepartmentId: ['', [Validators.required]],
      EmploymentDetailsWorkastationId: ['', [Validators.required]],
      EmploymentDetailsGradeId: ['', [Validators.required]],
      EmploymentDetailsDesignationId: ['', [Validators.required]],
      EmploymentDetailsReportToId: ['', [Validators.required]],
      EmploymentDetailsReportDepartmentHODId: ['', [Validators.required]],
      EmploymentDetailsRemark: ['', [Validators.maxLength(200)]],
      // EmploymentDetailsAuth1Remark: ['', [Validators.maxLength(200)]],
      // EmploymentDetailsAuth2Remark: ['', [Validators.maxLength(200)]],
      // EmploymentDetailsAuth3Remark: ['', [Validators.maxLength(200)]],
      // EmploymentDetailsAuth1: [{ value: true, disabled: !this.isEditMode }],
      // EmploymentDetailsAuth2: [{ value: true, disabled: !this.isEditMode }],
      // EmploymentDetailsAuth3: [{ value: true, disabled: !this.isEditMode }],
      // Authorization fields - conditionally disable based on user role
      EmploymentDetailsAuth1: [{ value: false, disabled: !this.canAuthorize }],
      EmploymentDetailsAuth1Remark: [
        { value: '', disabled: !this.canAuthorize },
        [Validators.maxLength(200)],
      ],
      EmploymentDetailsAuth2: [{ value: false, disabled: !this.canAuthorize }],
      EmploymentDetailsAuth2Remark: [
        { value: '', disabled: !this.canAuthorize },
        [Validators.maxLength(200)],
      ],
      EmploymentDetailsAuth3: [{ value: false, disabled: !this.canAuthorize }],
      EmploymentDetailsAuth3Remark: [
        { value: '', disabled: !this.canAuthorize },
        [Validators.maxLength(200)],
      ],
    });

    // Auto-generate full name
    this.employeeForm
      .get('EmployeeMasterFirstName')
      ?.valueChanges.subscribe(() => this.generateFullName());
    this.employeeForm
      .get('EmployeeMasterMiddleName')
      ?.valueChanges.subscribe(() => this.generateFullName());
    this.employeeForm
      .get('EmployeeMasterLastName')
      ?.valueChanges.subscribe(() => this.generateFullName());

    // Copy present to permanent address
    this.employeeForm
      .get('AddressDetailsEmployeeMasterPemanantAddresssameAsPresent')
      ?.valueChanges.subscribe(sameAsPresent => {
        if (sameAsPresent) {
          this.copyPresentToPermanentAddress();
        }
      });

    // Conditional validators for spouse details
    this.employeeForm
      .get('FamilyDetailsEmployeeMasterMartialStatus')
      ?.valueChanges.subscribe(status => {
        this.updateSpouseValidators(status);
      });

    if (this.isEditMode) {
      this.patchFormData();
      // Apply authorization restrictions AFTER patching values
      this.applyAuthorizationRestrictions();
    }

    // Subscribe to stepper changes
    setTimeout(() => {
      if (this.stepper) {
        this.stepper.selectionChange.subscribe(event => {
          this.currentStep = event.selectedIndex + 1;
        });
      }
    });
  }

  private generateFullName(): void {
    const firstName = this.employeeForm.get('EmployeeMasterFirstName')?.value || '';
    const middleName = this.employeeForm.get('EmployeeMasterMiddleName')?.value || '';
    const lastName = this.employeeForm.get('EmployeeMasterLastName')?.value || '';

    const fullName = [firstName, middleName, lastName].filter(name => name.trim()).join(' ');
    this.employeeForm.patchValue({ EmployeeMasterFullName: fullName });
  }

  private copyPresentToPermanentAddress(): void {
    this.employeeForm.patchValue({
      AddressDetailsEmployeeMasterPermanantAdress: this.employeeForm.get(
        'AddressDetailsEmployeeMasterPresentAdress'
      )?.value,
      AddressDetailsEmployeeMasterPermanantCountryId: this.employeeForm.get(
        'AddressDetailsEmployeeMasterPresentCountryId'
      )?.value,
      AddressDetailsEmployeeMasterPermanantStateId: this.employeeForm.get(
        'AddressDetailsEmployeeMasterPresentStateId'
      )?.value,
      AddressDetailsEmployeeMasterPermanantDistrictId: this.employeeForm.get(
        'AddressDetailsEmployeeMasterPresentDistrictId'
      )?.value,
      AddressDetailsEmployeeMasterPermanantCityId: this.employeeForm.get(
        'AddressDetailsEmployeeMasterPresentCitytId'
      )?.value,
      AddressDetailsEmployeeMasterPermanantPinCode: this.employeeForm.get(
        'AddressDetailsEmployeeMasterPresentPinCode'
      )?.value,
    });
  }

  private updateSpouseValidators(maritalStatus: string): void {
    const spouseNameControl = this.employeeForm.get('FamilyDetailsEmployeeMasterSpouseName');
    const spouseDobControl = this.employeeForm.get('FamilyDetailsEmployeeMasterSpouseDateOfBirth');

    if (maritalStatus === 'Married') {
      spouseNameControl?.setValidators([Validators.required, Validators.maxLength(200)]);
      spouseDobControl?.setValidators([Validators.required]);
    } else {
      spouseNameControl?.clearValidators();
      spouseDobControl?.clearValidators();
    }

    spouseNameControl?.updateValueAndValidity();
    spouseDobControl?.updateValueAndValidity();
  }

  // Step validation methods
  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.isStep1Valid();
      case 2:
        return this.isStep2Valid();
      case 3:
        return this.isStep3Valid();
      case 4:
        return this.isStep4Valid();
      default:
        return false;
    }
  }

  private isStep1Valid(): boolean {
    const step1Fields = [
      'EmployeeMasterFirstName',
      'EmployeeMasterLastName',
      'EmployeeMasterDateOfBirth',
      'EmployeeMasterGender',
      'EmployeeMasterNationalityCountryId',
      'EmployeeMasterReligion',
      'EmployeeMasterReligionCategory',
      'EmployeeMasterBloodGroup',
    ];
    return step1Fields.every(field => this.employeeForm.get(field)?.valid ?? false);
  }

  private isStep2Valid(): boolean {
    const step2Fields = [
      'AddressDetailsEmployeeMasterPresentAdress',
      'AddressDetailsEmployeeMasterPresentCountryId',
      'AddressDetailsEmployeeMasterPresentStateId',
      'AddressDetailsEmployeeMasterPresentDistrictId',
      'AddressDetailsEmployeeMasterPresentCitytId',
      'AddressDetailsEmployeeMasterPresentPinCode',
      'AddressDetailsEmployeeMasterPermanantAdress',
      'AddressDetailsEmployeeMasterPermanantCountryId',
      'AddressDetailsEmployeeMasterPermanantStateId',
      'AddressDetailsEmployeeMasterPermanantDistrictId',
      'AddressDetailsEmployeeMasterPermanantCityId',
      'AddressDetailsEmployeeMasterPermanantPinCode',
    ];
    return step2Fields.every(field => this.employeeForm.get(field)?.valid ?? false);
  }

  private isStep3Valid(): boolean {
    const step3Fields = [
      'FamilyDetailsEmployeeMasterFatherHusbandName',
      'FamilyDetailsEmployeeMasterMotherName',
      'FamilyDetailsEmployeeMasterMartialStatus',
    ];
    return step3Fields.every(field => this.employeeForm.get(field)?.valid ?? false);
  }

  private isStep4Valid(): boolean {
    const step4Fields = [
      'EmploymentDetailsDivisionId',
      'EmploymentDetailsPositionId',
      'EmploymentDetailsOfferLetterId',
      'EmploymentDetailsEmployeeTypeId',
      'EmploymentDetailsParentCompanyId',
      'EmploymentDetailsCompanyEntityId',
      'EmploymentDetailsProfitcenterId',
      'EmploymentDetailsDepartmentId',
      'EmploymentDetailsWorkastationId',
      'EmploymentDetailsGradeId',
      'EmploymentDetailsDesignationId',
      'EmploymentDetailsReportToId',
      'EmploymentDetailsReportDepartmentHODId',
    ];
    return step4Fields.every(field => this.employeeForm.get(field)?.valid ?? false);
  }

  getStepControl(step: number): AbstractControl {
    return this.fb.control('', []);
  }

  // Form actions
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.prepareFormData();
      console.log('Employee Form Data:', formData);
      this.dialogRef.close({ success: true, data: formData });
    } else {
      this.markAllFieldsAsTouched();
      this.showValidationErrors();
    }
  }

  onCancel(): void {
    this.dialogRef.close({ success: false });
  }

  onReset(): void {
    this.employeeForm.reset();
    this.currentStep = 1;
    this.stepper?.reset();
    this.initializeForm();
  }

  private prepareFormData(): any {
    const formValue = this.employeeForm.getRawValue();

    return {
      employeeData: {
        EmployeeId: this.isEditMode ? formValue.EmployeeId || null : null,
        EmployeeMasterCode: formValue.EmployeeMasterCode,
        EmployeeMasterFirstName: formValue.EmployeeMasterFirstName,
        EmployeeMasterMiddleName: formValue.EmployeeMasterMiddleName,
        EmployeeMasterLastName: formValue.EmployeeMasterLastName,
        EmployeeMasterFullName: formValue.EmployeeMasterFullName,
        EmployeeMasterDateOfBirth: formValue.EmployeeMasterDateOfBirth,
        EmployeeMasterGender: formValue.EmployeeMasterGender,
        EmployeeMasterNationalityCountryId: formValue.EmployeeMasterNationalityCountryId,
        EmployeeMasterReligion: formValue.EmployeeMasterReligion,
        EmployeeMasterReligionCategory: formValue.EmployeeMasterReligionCategory,
        EmployeeMasterBloodGroup: formValue.EmployeeMasterBloodGroup,
        EmployeeMasterPhotoAttachment: formValue.EmployeeMasterPhotoAttachment,
        EmployeeMasterRemark: formValue.EmployeeMasterRemark,
        EmployeeMasterAuthRemark: formValue.EmployeeMasterAuthRemark,
        EmployeeMasterAuth: formValue.EmployeeMasterAuth,
        EmployeeMasterIsDiscard: formValue.EmployeeMasterIsDiscard,
        EmployeeMasterIsActive: formValue.EmployeeMasterIsActive,
      },
      addressDetails: {
        AddressDetailsEmployeeMasterPresentAdress:
          formValue.AddressDetailsEmployeeMasterPresentAdress,
        AddressDetailsEmployeeMasterPresentCountryId:
          formValue.AddressDetailsEmployeeMasterPresentCountryId,
        AddressDetailsEmployeeMasterPresentStateId:
          formValue.AddressDetailsEmployeeMasterPresentStateId,
        AddressDetailsEmployeeMasterPresentDistrictId:
          formValue.AddressDetailsEmployeeMasterPresentDistrictId,
        AddressDetailsEmployeeMasterPresentCitytId:
          formValue.AddressDetailsEmployeeMasterPresentCitytId,
        AddressDetailsEmployeeMasterPresentPinCode:
          formValue.AddressDetailsEmployeeMasterPresentPinCode,
        AddressDetailsEmployeeMasterPemanantAddresssameAsPresent:
          formValue.AddressDetailsEmployeeMasterPemanantAddresssameAsPresent,
        AddressDetailsEmployeeMasterPermanantAdress:
          formValue.AddressDetailsEmployeeMasterPermanantAdress,
        AddressDetailsEmployeeMasterPermanantCountryId:
          formValue.AddressDetailsEmployeeMasterPermanantCountryId,
        AddressDetailsEmployeeMasterPermanantStateId:
          formValue.AddressDetailsEmployeeMasterPermanantStateId,
        AddressDetailsEmployeeMasterPermanantDistrictId:
          formValue.AddressDetailsEmployeeMasterPermanantDistrictId,
        AddressDetailsEmployeeMasterPermanantCityId:
          formValue.AddressDetailsEmployeeMasterPermanantCityId,
        AddressDetailsEmployeeMasterPermanantPinCode:
          formValue.AddressDetailsEmployeeMasterPermanantPinCode,
        AddressDetailsEmployeeMasterAuthRemark: formValue.AddressDetailsEmployeeMasterAuthRemark,
        AddressDetailsEmployeeMasterAuth: formValue.AddressDetailsEmployeeMasterAuth,
      },
      familyDetails: {
        FamilyDetailsEmployeeMasterFatherHusbandName:
          formValue.FamilyDetailsEmployeeMasterFatherHusbandName,
        FamilyDetailsEmployeeMasterMotherName: formValue.FamilyDetailsEmployeeMasterMotherName,
        FamilyDetailsEmployeeMasterMartialStatus:
          formValue.FamilyDetailsEmployeeMasterMartialStatus,
        FamilyDetailsEmployeeMasterSpouseName: formValue.FamilyDetailsEmployeeMasterSpouseName,
        FamilyDetailsEmployeeMasterSpouseDateOfBirth:
          formValue.FamilyDetailsEmployeeMasterSpouseDateOfBirth,
        FamilyDetailsEmployeeMasterSpouseAadharNumber:
          formValue.FamilyDetailsEmployeeMasterSpouseAadharNumber,
        FamilyDetailsEmployeeMasterNumberofChidren:
          formValue.FamilyDetailsEmployeeMasterNumberofChidren,
        FamilyDetailsEmployeeMasterSpouseAadharNumberAttachment:
          formValue.FamilyDetailsEmployeeMasterSpouseAadharNumberAttachment,
        FamilyDetailsEmployeeMasterRemark: formValue.FamilyDetailsEmployeeMasterRemark,
        FamilyDetailsEmployeeMasterAuthRemark: formValue.FamilyDetailsEmployeeMasterAuthRemark,
        FamilyDetailsEmployeeMasterAuth: formValue.FamilyDetailsEmployeeMasterAuth,
      },
      employmentDetails: {
        // EmploymentDetailsEmployeeMasterId: this.isEditMode
        //   ? formValue.EmploymentDetailsEmployeeMasterId || null
        //   : null,
        EmploymentDetailsDivisionId: formValue.EmploymentDetailsDivisionId,
        EmploymentDetailsPositionId: formValue.EmploymentDetailsPositionId,
        EmploymentDetailsOfferLetterId: formValue.EmploymentDetailsOfferLetterId,
        EmploymentDetailsEmployeeTypeId: formValue.EmploymentDetailsEmployeeTypeId,
        EmploymentDetailsParentCompanyId: formValue.EmploymentDetailsParentCompanyId,
        EmploymentDetailsCompanyEntityId: formValue.EmploymentDetailsCompanyEntityId,
        EmploymentDetailsProfitcenterId: formValue.EmploymentDetailsProfitcenterId,
        EmploymentDetailsDepartmentId: formValue.EmploymentDetailsDepartmentId,
        EmploymentDetailsWorkastationId: formValue.EmploymentDetailsWorkastationId,
        EmploymentDetailsGradeId: formValue.EmploymentDetailsGradeId,
        EmploymentDetailsDesignationId: formValue.EmploymentDetailsDesignationId,
        EmploymentDetailsReportToId: formValue.EmploymentDetailsReportToId,
        EmploymentDetailsReportDepartmentHODId: formValue.EmploymentDetailsReportDepartmentHODId,
        EmploymentDetailsRemark: formValue.EmploymentDetailsRemark,
        EmploymentDetailsAuth1Remark: formValue.EmploymentDetailsAuth1Remark,
        EmploymentDetailsAuth2Remark: formValue.EmploymentDetailsAuth2Remark,
        EmploymentDetailsAuth3Remark: formValue.EmploymentDetailsAuth3Remark,
        EmploymentDetailsAuth1: formValue.EmploymentDetailsAuth1,
        EmploymentDetailsAuth2: formValue.EmploymentDetailsAuth2,
        EmploymentDetailsAuth3: formValue.EmploymentDetailsAuth3,
      },
    };
  }

  private patchFormData(): void {
    const employeeData = this.data.employee;

    if (!employeeData) return;

    // Patch all form values at once
    this.employeeForm.patchValue({
      // Step 1: Basic Information
      EmployeeId: employeeData.EmployeeId || '',
      EmployeeMasterCode: employeeData.EmployeeMasterCode || '',
      EmployeeMasterFirstName: employeeData.EmployeeMasterFirstName || '',
      EmployeeMasterMiddleName: employeeData.EmployeeMasterMiddleName || '',
      EmployeeMasterLastName: employeeData.EmployeeMasterLastName || '',
      EmployeeMasterFullName: employeeData.EmployeeMasterFullName || '',
      EmployeeMasterDateOfBirth: employeeData.EmployeeMasterDateOfBirth || '',
      EmployeeMasterGender: employeeData.EmployeeMasterGender || '',
      EmployeeMasterNationalityCountryId: employeeData.EmployeeMasterNationalityCountryId || '',
      EmployeeMasterReligion: employeeData.EmployeeMasterReligion || '',
      EmployeeMasterReligionCategory: employeeData.EmployeeMasterReligionCategory || '',
      EmployeeMasterBloodGroup: employeeData.EmployeeMasterBloodGroup || '',
      EmployeeMasterPhotoAttachment: employeeData.EmployeeMasterPhotoAttachment || '',
      EmployeeMasterRemark: employeeData.EmployeeMasterRemark || '',
      EmployeeMasterAuthRemark: employeeData.EmployeeMasterAuthRemark || '',
      EmployeeMasterAuth: employeeData.EmployeeMasterAuth ?? true,
      EmployeeMasterIsDiscard: employeeData.EmployeeMasterIsDiscard ?? false,
      EmployeeMasterIsActive: employeeData.EmployeeMasterIsActive ?? true,

      // Step 2: Address Details
      AddressDetailsEmployeeMasterPresentAdress:
        employeeData.AddressDetailsEmployeeMasterPresentAdress || '',
      AddressDetailsEmployeeMasterPresentCountryId:
        employeeData.AddressDetailsEmployeeMasterPresentCountryId || '',
      AddressDetailsEmployeeMasterPresentStateId:
        employeeData.AddressDetailsEmployeeMasterPresentStateId || '',
      AddressDetailsEmployeeMasterPresentDistrictId:
        employeeData.AddressDetailsEmployeeMasterPresentDistrictId || '',
      AddressDetailsEmployeeMasterPresentCitytId:
        employeeData.AddressDetailsEmployeeMasterPresentCitytId || '',
      AddressDetailsEmployeeMasterPresentPinCode:
        employeeData.AddressDetailsEmployeeMasterPresentPinCode || '',
      AddressDetailsEmployeeMasterPemanantAddresssameAsPresent:
        employeeData.AddressDetailsEmployeeMasterPemanantAddresssameAsPresent ?? false,
      AddressDetailsEmployeeMasterPermanantAdress:
        employeeData.AddressDetailsEmployeeMasterPermanantAdress || '',
      AddressDetailsEmployeeMasterPermanantCountryId:
        employeeData.AddressDetailsEmployeeMasterPermanantCountryId || '',
      AddressDetailsEmployeeMasterPermanantStateId:
        employeeData.AddressDetailsEmployeeMasterPermanantStateId || '',
      AddressDetailsEmployeeMasterPermanantDistrictId:
        employeeData.AddressDetailsEmployeeMasterPermanantDistrictId || '',
      AddressDetailsEmployeeMasterPermanantCityId:
        employeeData.AddressDetailsEmployeeMasterPermanantCityId || '',
      AddressDetailsEmployeeMasterPermanantPinCode:
        employeeData.AddressDetailsEmployeeMasterPermanantPinCode || '',
      AddressDetailsEmployeeMasterAuthRemark:
        employeeData.AddressDetailsEmployeeMasterAuthRemark || '',
      AddressDetailsEmployeeMasterAuth: employeeData.AddressDetailsEmployeeMasterAuth ?? true,

      // Step 3: Family Details
      FamilyDetailsEmployeeMasterFatherHusbandName:
        employeeData.FamilyDetailsEmployeeMasterFatherHusbandName || '',
      FamilyDetailsEmployeeMasterMotherName:
        employeeData.FamilyDetailsEmployeeMasterMotherName || '',
      FamilyDetailsEmployeeMasterMartialStatus:
        employeeData.FamilyDetailsEmployeeMasterMartialStatus || '',
      FamilyDetailsEmployeeMasterSpouseName:
        employeeData.FamilyDetailsEmployeeMasterSpouseName || '',
      FamilyDetailsEmployeeMasterSpouseDateOfBirth:
        employeeData.FamilyDetailsEmployeeMasterSpouseDateOfBirth || '',
      FamilyDetailsEmployeeMasterSpouseAadharNumber:
        employeeData.FamilyDetailsEmployeeMasterSpouseAadharNumber || '',
      FamilyDetailsEmployeeMasterNumberofChidren:
        employeeData.FamilyDetailsEmployeeMasterNumberofChidren || 0,
      FamilyDetailsEmployeeMasterSpouseAadharNumberAttachment:
        employeeData.FamilyDetailsEmployeeMasterSpouseAadharNumberAttachment || '',
      FamilyDetailsEmployeeMasterRemark: employeeData.FamilyDetailsEmployeeMasterRemark || '',
      FamilyDetailsEmployeeMasterAuthRemark:
        employeeData.FamilyDetailsEmployeeMasterAuthRemark || '',
      FamilyDetailsEmployeeMasterAuth: employeeData.FamilyDetailsEmployeeMasterAuth ?? true,

      // Step 4: Employment Details
      EmploymentDetailsEmployeeMasterId: employeeData.EmploymentDetailsEmployeeMasterId || '',
      EmploymentDetailsDivisionId: employeeData.EmploymentDetailsDivisionId || '',
      EmploymentDetailsPositionId: employeeData.EmploymentDetailsPositionId || '',
      EmploymentDetailsOfferLetterId: employeeData.EmploymentDetailsOfferLetterId || '',
      EmploymentDetailsEmployeeTypeId: employeeData.EmploymentDetailsEmployeeTypeId || '',
      EmploymentDetailsParentCompanyId: employeeData.EmploymentDetailsParentCompanyId || '',
      EmploymentDetailsCompanyEntityId: employeeData.EmploymentDetailsCompanyEntityId || '',
      EmploymentDetailsProfitcenterId: employeeData.EmploymentDetailsProfitcenterId || '',
      EmploymentDetailsDepartmentId: employeeData.EmploymentDetailsDepartmentId || '',
      EmploymentDetailsWorkastationId: employeeData.EmploymentDetailsWorkastationId || '',
      EmploymentDetailsGradeId: employeeData.EmploymentDetailsGradeId || '',
      EmploymentDetailsDesignationId: employeeData.EmploymentDetailsDesignationId || '',
      EmploymentDetailsReportToId: employeeData.EmploymentDetailsReportToId || '',
      EmploymentDetailsReportDepartmentHODId:
        employeeData.EmploymentDetailsReportDepartmentHODId || '',
      EmploymentDetailsRemark: employeeData.EmploymentDetailsRemark || '',
      EmploymentDetailsAuth1Remark: employeeData.EmploymentDetailsAuth1Remark || '',
      EmploymentDetailsAuth2Remark: employeeData.EmploymentDetailsAuth2Remark || '',
      EmploymentDetailsAuth3Remark: employeeData.EmploymentDetailsAuth3Remark || '',
      EmploymentDetailsAuth1: employeeData.EmploymentDetailsAuth1 ?? true,
      EmploymentDetailsAuth2: employeeData.EmploymentDetailsAuth2 ?? true,
      EmploymentDetailsAuth3: employeeData.EmploymentDetailsAuth3 ?? true,
    });
    // Enable disabled controls in edit mode
    this.enableEditModeControls();
    console.log('Employee data patched successfully');
  }

  private enableEditModeControls(): void {
    const controlsToEnable = [
      'EmployeeMasterAuth',
      'EmployeeMasterIsDiscard',
      'EmployeeMasterIsActive',
      'AddressDetailsEmployeeMasterAuth',
      'FamilyDetailsEmployeeMasterAuth',
      'EmploymentDetailsAuth1',
      'EmploymentDetailsAuth2',
      'EmploymentDetailsAuth3',
      'EmploymentDetailsAuth1Remark',
      'EmploymentDetailsAuth2Remark',
      'EmploymentDetailsAuth3Remark',
    ];

    controlsToEnable.forEach(controlName => {
      this.employeeForm.get(controlName)?.enable();
    });
  }

  // Separate method to handle authorization restrictions
  private applyAuthorizationRestrictions(): void {
    if (!this.canAuthorize) {
      // Disable authorization fields for non-authorized users
      this.employeeForm.get('EmploymentDetailsAuth1')?.disable();
      this.employeeForm.get('EmploymentDetailsAuth1Remark')?.disable();
      this.employeeForm.get('EmploymentDetailsAuth2')?.disable();
      this.employeeForm.get('EmploymentDetailsAuth2Remark')?.disable();
      this.employeeForm.get('EmploymentDetailsAuth3')?.disable();
      this.employeeForm.get('EmploymentDetailsAuth3Remark')?.disable();
    } else {
      // Ensure authorization fields are enabled for authorized users
      this.employeeForm.get('EmploymentDetailsAuth1')?.enable();
      this.employeeForm.get('EmploymentDetailsAuth1Remark')?.enable();
      this.employeeForm.get('EmploymentDetailsAuth2')?.enable();
      this.employeeForm.get('EmploymentDetailsAuth2Remark')?.enable();
      this.employeeForm.get('EmploymentDetailsAuth3')?.enable();
      this.employeeForm.get('EmploymentDetailsAuth3Remark')?.enable();
    }
    console.log('Authorization restrictions applied. Can authorize:', this.canAuthorize);
  }

  private markAllFieldsAsTouched(): void {
    this.employeeForm.markAllAsTouched();
  }

  private showValidationErrors(): void {
    const errorsByStep = this.getErrorsByStep();

    if (Object.keys(errorsByStep).length > 0) {
      console.log('Validation Errors by Step:', errorsByStep);

      // Open dialog instead of alert
      this.dialog.open(ValidationErrorDialog, {
        width: '600px',
        maxHeight: '80vh',
        data: { errorsByStep },
        disableClose: false,
        panelClass: 'validation-error-dialog',
      });
    }
  }

  private getFormValidationErrors(): any {
    const errors: any = {};

    Object.keys(this.employeeForm.controls).forEach(key => {
      const control = this.employeeForm.get(key);
      if (control && !control.valid) {
        errors[key] = control.errors;
      }
    });

    return errors;
  }

  // Keep getErrorsByStep and getErrorMessages methods as they are
  private getErrorsByStep(): any {
    const errors = this.getFormValidationErrors();
    const errorsByStep: any = {
      'Basic Information': [],
      'Address Details': [],
      'Family Details': [],
      'Employment Details': [],
    };

    Object.keys(errors).forEach(fieldName => {
      const fieldErrors = errors[fieldName];
      const displayName = this.getFieldDisplayName(fieldName);
      const errorMessages = this.getErrorMessages(fieldName, fieldErrors);

      if (fieldName.startsWith('EmployeeMaster')) {
        errorsByStep['Basic Information'].push(
          ...errorMessages.map(msg => `• ${displayName}: ${msg}`)
        );
      } else if (fieldName.startsWith('AddressDetails')) {
        errorsByStep['Address Details'].push(
          ...errorMessages.map(msg => `• ${displayName}: ${msg}`)
        );
      } else if (fieldName.startsWith('FamilyDetails')) {
        errorsByStep['Family Details'].push(
          ...errorMessages.map(msg => `• ${displayName}: ${msg}`)
        );
      } else if (fieldName.startsWith('EmploymentDetails')) {
        errorsByStep['Employment Details'].push(
          ...errorMessages.map(msg => `• ${displayName}: ${msg}`)
        );
      }
    });

    return errorsByStep;
  }

  private getErrorMessages(fieldName: string, fieldErrors: any): string[] {
    const messages: string[] = [];

    if (fieldErrors.required) messages.push('Required');
    if (fieldErrors.maxlength) messages.push(`Max ${fieldErrors.maxlength.requiredLength} chars`);
    if (fieldErrors.minlength) messages.push(`Min ${fieldErrors.minlength.requiredLength} chars`);
    if (fieldErrors.min) messages.push(`Minimum value ${fieldErrors.min.min}`);
    if (fieldErrors.max) messages.push(`Maximum value ${fieldErrors.max.max}`);
    if (fieldErrors.pattern) messages.push('Invalid format');
    if (fieldErrors.email) messages.push('Invalid email');

    return messages;
  }

  private getFieldDisplayName(fieldName: string): string {
    const fieldMap: { [key: string]: string } = {
      // Step 1: Basic Information
      EmployeeMasterCode: 'Employee Code',
      EmployeeMasterFirstName: 'First Name',
      EmployeeMasterMiddleName: 'Middle Name',
      EmployeeMasterLastName: 'Last Name',
      EmployeeMasterFullName: 'Full Name',
      EmployeeMasterDateOfBirth: 'Date of Birth',
      EmployeeMasterGender: 'Gender',
      EmployeeMasterNationalityCountryId: 'Nationality',
      EmployeeMasterReligion: 'Religion',
      EmployeeMasterReligionCategory: 'Religion Category',
      EmployeeMasterBloodGroup: 'Blood Group',
      EmployeeMasterPhotoAttachment: 'Photo Attachment',
      EmployeeMasterRemark: 'Remark',
      EmployeeMasterAuthRemark: 'Authorization Remark',

      // Step 2: Address Details - Present
      AddressDetailsEmployeeMasterPresentAdress: 'Present Address',
      AddressDetailsEmployeeMasterPresentCountryId: 'Present Country',
      AddressDetailsEmployeeMasterPresentStateId: 'Present State',
      AddressDetailsEmployeeMasterPresentDistrictId: 'Present District',
      AddressDetailsEmployeeMasterPresentCitytId: 'Present City',
      AddressDetailsEmployeeMasterPresentPinCode: 'Present Pin Code',

      // Step 2: Address Details - Permanent
      AddressDetailsEmployeeMasterPemanantAddresssameAsPresent: 'Same as Present Address',
      AddressDetailsEmployeeMasterPermanantAdress: 'Permanent Address',
      AddressDetailsEmployeeMasterPermanantCountryId: 'Permanent Country',
      AddressDetailsEmployeeMasterPermanantStateId: 'Permanent State',
      AddressDetailsEmployeeMasterPermanantDistrictId: 'Permanent District',
      AddressDetailsEmployeeMasterPermanantCityId: 'Permanent City',
      AddressDetailsEmployeeMasterPermanantPinCode: 'Permanent Pin Code',
      AddressDetailsEmployeeMasterAuthRemark: 'Address Authorization Remark',

      // Step 3: Family Details
      FamilyDetailsEmployeeMasterFatherHusbandName: 'Father/Husband Name',
      FamilyDetailsEmployeeMasterMotherName: 'Mother Name',
      FamilyDetailsEmployeeMasterMartialStatus: 'Marital Status',
      FamilyDetailsEmployeeMasterSpouseName: 'Spouse Name',
      FamilyDetailsEmployeeMasterSpouseDateOfBirth: 'Spouse Date of Birth',
      FamilyDetailsEmployeeMasterSpouseAadharNumber: 'Spouse Aadhar Number',
      FamilyDetailsEmployeeMasterNumberofChidren: 'Number of Children',
      FamilyDetailsEmployeeMasterSpouseAadharNumberAttachment: 'Spouse Aadhar Attachment',
      FamilyDetailsEmployeeMasterRemark: 'Family Remark',
      FamilyDetailsEmployeeMasterAuthRemark: 'Family Authorization Remark',

      // Step 4: Employment Details
      EmploymentDetailsDivisionId: 'Division',
      EmploymentDetailsPositionId: 'Position',
      EmploymentDetailsOfferLetterId: 'Offer Letter',
      EmploymentDetailsEmployeeTypeId: 'Employee Type',
      EmploymentDetailsParentCompanyId: 'Parent Company',
      EmploymentDetailsCompanyEntityId: 'Company Entity',
      EmploymentDetailsProfitcenterId: 'Profit Center',
      EmploymentDetailsDepartmentId: 'Department',
      EmploymentDetailsWorkastationId: 'Workstation',
      EmploymentDetailsGradeId: 'Grade',
      EmploymentDetailsDesignationId: 'Designation',
      EmploymentDetailsReportToId: 'Report To',
      EmploymentDetailsReportDepartmentHODId: 'Department HOD',
      EmploymentDetailsRemark: 'Employment Remark',
      EmploymentDetailsAuth1Remark: 'Authorization Remark 1',
      EmploymentDetailsAuth2Remark: 'Authorization Remark 2',
      EmploymentDetailsAuth3Remark: 'Authorization Remark 3',
    };

    return fieldMap[fieldName] || fieldName;
  }

  isFormValidForSubmission(): boolean {
    return this.isStep1Valid() && this.isStep2Valid() && this.isStep3Valid() && this.isStep4Valid();
  }

  // Navigation methods
  nextStep(): void {
    if (this.stepper && this.currentStep < this.totalSteps) {
      this.stepper.next();
    }
  }

  previousStep(): void {
    if (this.stepper && this.currentStep > 1) {
      this.stepper.previous();
    }
  }

  // Method to check if current user can authorize
  private checkUserAuthorizationPermission(): boolean {
    // Replace this with your actual role checking logic
    // Example implementations:

    // Option 1: Check from injected data
    // return this.data?.userRole === 'AUTHORIZER' || this.data?.userRole === 'ADMIN';

    // Option 2: Check from auth service (recommended)
    // return this.authService.hasPermission('OFFER_LETTER_AUTHORIZE');

    // Option 3: Check user role from localStorage/session
    // const userRole = localStorage.getItem('userRole');
    // return userRole === 'AUTHORIZER' || userRole === 'ADMIN';

    // For now, returning false to disable for makers
    return false;
  }

  // Load country data for basic info
  loadAllCountriesForBasicInfo(): void {
    this.countryService.getAllCountries().subscribe({
      next: (data: any[]) => {
        this.basicInfoCountryList = data;
        // Initialize filtered list
        this.filteredBasicInfoCountryList = [...this.basicInfoCountryList];
        // Setup search filter
        this.countrySearchControlForBasicInfo.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredBasicInfoCountryList = this.basicInfoCountryList.filter(country =>
            country.CountryName.toLowerCase().includes(filterValue)
          );
        });
      },
      error: err => {
        console.error('Error fetching countries:', err);
      },
    });
  }

  // Load country data for present adress
  loadAllCountriesForPresentAddress(): void {
    this.countryService.getAllCountries().subscribe({
      next: (data: any[]) => {
        this.presentAddressCountryList = data;
        // Initialize filtered list
        this.filteredPresentAddressCountryList = [...this.presentAddressCountryList];
        // Setup search filter
        this.countrySearchControlForPresentAddress.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredPresentAddressCountryList = this.presentAddressCountryList.filter(country =>
            country.CountryName.toLowerCase().includes(filterValue)
          );
        }
        );
      },
      error: err => {
        console.error('Error fetching countries:', err);
      },
    });
  }

  // Load country data for permanent adress
  loadAllCountriesForPermanentAddress(): void {
    this.countryService.getAllCountries().subscribe({
      next: (data: any[]) => {
        this.permanentAddressCountryList = data;
        // Initialize filtered list
        this.filteredPermanentAddressCountryList = [...this.permanentAddressCountryList];
        // Setup search filter
        this.countrySearchControlForPermanentAddress.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredPermanentAddressCountryList = this.permanentAddressCountryList.filter(country =>
            country.CountryName.toLowerCase().includes(filterValue)
          );
        }
        );
      },
      error: err => {
        console.error('Error fetching countries:', err);
      },
    });
  }

  loadAllStates(): void {
    // Implement your service call
  }

  loadAllDistricts(): void {
    // Implement your service call
  }

  loadAllCities(): void {
    // Implement your service call
  }

  // File upload handler
  onFileSelect(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic
      this.employeeForm.patchValue({ [controlName]: file.name });
    }
  }
}
