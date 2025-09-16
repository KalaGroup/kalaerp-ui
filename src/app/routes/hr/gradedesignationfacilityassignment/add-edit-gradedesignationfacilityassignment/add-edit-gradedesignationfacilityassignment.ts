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
import { Gradectcdesignationfacilityservice } from '@shared/services/hr/gradectcdesignationfacility/gradectcdesignationfacilityservice';
@Component({
  selector: 'app-add-edit-gradedesignationfacilityassignment',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // Angular Material Modules
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

    // ... other imports
  ],
  templateUrl: './add-edit-gradedesignationfacilityassignment.html',
  styleUrl: './add-edit-gradedesignationfacilityassignment.scss',
})
export class AddEditGradedesignationfacilityassignment {
  @ViewChild('stepper') stepper!: MatStepper;

  gradeForm!: FormGroup;
  currentStep = 1;
  totalSteps = 4;
  isEditMode = false;
  currencySearchControl = new FormControl('');
  qualificationSearchControl = new FormControl('');
  filteredCurrencyList: any[] = [];
  filteredQualificationList: any[] = [];
  // Data lists for dropdowns
  currencyList: any[] = [];
  qualificationList: any[] = [];
  facilityList: any[] = [];
  gradeLevelList = [
    { value: 'Entry', label: 'Entry Level' },
    { value: 'Junior', label: 'Junior Level' },
    { value: 'Mid', label: 'Mid Level' },
    { value: 'Senior', label: 'Senior Level' },
    { value: 'Lead', label: 'Lead Level' },
    { value: 'Manager', label: 'Manager Level' },
    { value: 'Director', label: 'Director Level' },
    { value: 'Executive', label: 'Executive Level' },
  ];

  selectedFacilities: number[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditGradedesignationfacilityassignment>,
    public gradedesignationfacilityassignment: Gradectcdesignationfacilityservice,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data.grade || false;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data.grade);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCurrencies();
    this.loadAllQualifications();
    this.loadFacilityDetails();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.gradeForm = this.fb.group({
      GradeId: [''],
      CreatedDate: [{ value: currentDate, disabled: true }],
      // Basic Information - Step 1
      GradeCode: [
        {
          value: '',
          disabled: false,
        },
        [],
      ],
      GradeName: ['', [Validators.required, Validators.maxLength(100)]],
      GradeLevel: ['', [Validators.required, Validators.maxLength(100)]],
      GradeDescription: ['', [Validators.required, Validators.maxLength(100)]],
      MinSalCTC: ['', [Validators.required, Validators.min(0)]],
      MaxSalCTC: ['', [Validators.required, Validators.min(0)]],
      GradeCurrencyId: ['', [Validators.required]],

      // Employment Terms - Step 2
      LeaveEntitlementAnnual: ['', [Validators.required, Validators.min(0), Validators.max(365)]],
      ProbationPeriod: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
      NoticePeriod: ['', [Validators.required, Validators.min(0), Validators.max(12)]],
      ExperiencedRequired: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
      ExperiencedRemark: ['', [Validators.required, Validators.maxLength(100)]],
      GradeRemark: ['', [Validators.required, Validators.maxLength(100)]],

      // Status flags
      GradeAuth: [{ value: true, disabled: !this.isEditMode }],
      GradeIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      GradeIsActive: [{ value: true, disabled: !this.isEditMode }],

      // Designations - Step 3 (FormArray)
      designations: this.fb.array([this.createDesignationGroup()]),

      // Facility Assignments - Step 4 (handled separately)
      facilityAssignments: [[]],

      // CTC Structure - Step 5
      CTCMasterBasic: ['', [Validators.required, Validators.min(0)]],
      CTCMasterDA: ['', [Validators.required, Validators.min(0)]],
      CTCMasterHRA: ['', [Validators.required, Validators.min(0)]],
      CTCMasterConvAllowance: ['', [Validators.min(0)]],
      CTCMasterCityCompensatoryAlowance: ['', [Validators.min(0)]],
      CTCMasterLeaveTravelAllowance: ['', [Validators.min(0)]],
      CTCMasterCarAllowance: ['', [Validators.min(0)]],
      CTCMasterFuelAllowance: ['', [Validators.min(0)]],
      CTCMasterDriverAllowance: ['', [Validators.min(0)]],
      CTCMasterMiscAllowance: ['', [Validators.min(0)]],
      CTCMasterGross: [{ value: '', disabled: true }], // Auto-calculated
      CTCMasterPFEmployee: ['', [Validators.required, Validators.min(0)]],
      CTCMasterPT: ['', [Validators.required, Validators.min(0)]],
      CTCMasterEsic: ['', [Validators.required, Validators.min(0)]],
      CTCMasterPFEmployer: ['', [Validators.required, Validators.min(0)]],
      CTCMasterMedicalInsurance: ['', [Validators.required, Validators.min(0)]],
      CTCMasterPerformanceKPA: ['', [Validators.required, Validators.min(0)]],
      CTCMasterGraduity: ['', [Validators.required, Validators.min(0)]],
      CTCMasterBonus: ['', [Validators.required, Validators.min(0)]],
      CTCMasterMLWF: ['', [Validators.required, Validators.min(0)]],
    });

    // Add custom validator for salary range
    this.gradeForm.addValidators(this.salaryRangeValidator);

    // If editing, pre-fill form with available data
    if (this.isEditMode) {
      debugger;
      this.patchFormData();
    }

    // Subscribe to stepper selection changes
    setTimeout(() => {
      if (this.stepper) {
        this.stepper.selectionChange.subscribe(event => {
          this.currentStep = event.selectedIndex + 1;
        });
      }
    });
  }

  // Create designation form group
  private createDesignationGroup(): FormGroup {
    return this.fb.group({
      DesignationId: [''],
      DesignationCode: ['', [Validators.required, Validators.maxLength(10)]],
      DesignationName: ['', [Validators.required, Validators.maxLength(100)]],
      DesignationQualificationId: ['', [Validators.required]],
      DesignationDescription: ['', [Validators.required, Validators.maxLength(100)]],
      GradeQualificationRemark: ['', [Validators.required, Validators.maxLength(100)]],
      RequiredSkills: ['', [Validators.required, Validators.maxLength(100)]],
      DesignationRemark: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  // Custom validator for salary range
  private salaryRangeValidator = (control: AbstractControl): { [key: string]: any } | null => {
    const minSal = control.get('MinSalCTC')?.value;
    const maxSal = control.get('MaxSalCTC')?.value;

    if (minSal && maxSal && minSal >= maxSal) {
      return { salaryRangeInvalid: true };
    }
    return null;
  };

  // Calculate Gross Salary
  calculateGross(): void {
    const basic = parseFloat(this.gradeForm.get('CTCMasterBasic')?.value) || 0;
    const da = parseFloat(this.gradeForm.get('CTCMasterDA')?.value) || 0;
    const hra = parseFloat(this.gradeForm.get('CTCMasterHRA')?.value) || 0;
    const convAllowance = parseFloat(this.gradeForm.get('CTCMasterConvAllowance')?.value) || 0;
    const cityCompAllowance =
      parseFloat(this.gradeForm.get('CTCMasterCityCompensatoryAlowance')?.value) || 0;
    const lta = parseFloat(this.gradeForm.get('CTCMasterLeaveTravelAllowance')?.value) || 0;
    const carAllowance = parseFloat(this.gradeForm.get('CTCMasterCarAllowance')?.value) || 0;
    const fuelAllowance = parseFloat(this.gradeForm.get('CTCMasterFuelAllowance')?.value) || 0;
    const driverAllowance = parseFloat(this.gradeForm.get('CTCMasterDriverAllowance')?.value) || 0;
    const miscAllowance = parseFloat(this.gradeForm.get('CTCMasterMiscAllowance')?.value) || 0;

    const gross =
      basic +
      da +
      hra +
      convAllowance +
      cityCompAllowance +
      lta +
      carAllowance +
      fuelAllowance +
      driverAllowance +
      miscAllowance;

    this.gradeForm.patchValue({
      CTCMasterGross: gross,
    });
  }

  // FormArray getters
  get designations(): FormArray {
    return this.gradeForm.get('designations') as FormArray;
  }

  addDesignation(): void {
    // Validate if the last designation is filled before adding a new one
    if (this.designations.length > 0) {
      const lastDesignation = this.designations.at(this.designations.length - 1) as FormGroup;

      // Mark all fields as touched to show validation errors
      lastDesignation.markAllAsTouched();

      // Check if the last designation is valid
      if (lastDesignation.invalid) {
        // Find which fields are invalid for a more specific message
        const invalidFields: string[] = [];
        Object.keys(lastDesignation.controls).forEach(key => {
          if (lastDesignation.get(key)?.invalid) {
            invalidFields.push(this.getFieldDisplayName(key));
          }
        });

        alert(
          `Please fill all required fields in Designation ${this.designations.length} before adding a new designation.\n\nMissing fields: ${invalidFields.join(', ')}`
        );
        return;
      }
    }

    // If validation passes, add new designation
    this.designations.push(this.createDesignationGroup());
  }

  // Helper method to get user-friendly field names
  private getFieldDisplayName(fieldName: string): string {
    const fieldMap: { [key: string]: string } = {
      DesignationCode: 'Designation Code',
      DesignationName: 'Designation Name',
      DesignationQualificationId: 'Qualification',
      DesignationDescription: 'Designation Description',
      GradeQualificationRemark: 'Qualification Remarks',
      RequiredSkills: 'Required Skills',
      DesignationRemark: 'Designation Remarks',
    };
    return fieldMap[fieldName] || fieldName;
  }

  removeDesignation(index: number): void {
    if (this.designations.length > 1) {
      this.designations.removeAt(index);
    }
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
        return true; // Facility assignment is optional
      case 5:
        return this.isStep5Valid(); // CTC Structure validation
      default:
        return false;
    }
  }

  private isStep1Valid(): boolean {
    const step1Fields = [
      'GradeName',
      'GradeLevel',
      'GradeDescription',
      'MinSalCTC',
      'MaxSalCTC',
      'GradeCurrencyId',
    ];
    const fieldsValid = step1Fields.every(field => {
      const control = this.gradeForm.get(field);
      return control?.valid ?? false;
    });
    return fieldsValid && !this.gradeForm.hasError('salaryRangeInvalid');
  }

  private isStep2Valid(): boolean {
    const step2Fields = [
      'LeaveEntitlementAnnual',
      'ProbationPeriod',
      'NoticePeriod',
      'ExperiencedRequired',
      'ExperiencedRemark',
      'GradeRemark',
    ];
    return step2Fields.every(field => {
      const control = this.gradeForm.get(field);
      return control?.valid ?? false;
    });
  }

  private isStep3Valid(): boolean {
    return this.designations.controls.every(designation => designation.valid);
  }

  private isStep5Valid(): boolean {
    const step5Fields = [
      'CTCMasterBasic',
      'CTCMasterDA',
      'CTCMasterHRA',
      'CTCMasterPFEmployee',
      'CTCMasterPT',
      'CTCMasterEsic',
      'CTCMasterPFEmployer',
      'CTCMasterMedicalInsurance',
      'CTCMasterPerformanceKPA',
      'CTCMasterGraduity',
      'CTCMasterBonus',
      'CTCMasterMLWF',
    ];
    return step5Fields.every(field => {
      const control = this.gradeForm.get(field);
      return control?.valid ?? false;
    });
  }

  getStepControl(step: number): AbstractControl {
    return this.fb.control('', []);
  }

  // Facility management methods
  onFacilityChange(event: any): void {
    const facilityId = parseInt(event.source.value);

    if (event.checked) {
      if (!this.selectedFacilities.includes(facilityId)) {
        this.selectedFacilities.push(facilityId);
      }
    } else {
      this.selectedFacilities = this.selectedFacilities.filter(id => id !== facilityId);
    }

    // Update form control
    this.gradeForm.patchValue({
      facilityAssignments: this.selectedFacilities,
    });
  }

  getFacilityName(facilityId: number): string {
    const facility = this.facilityList.find(f => f.FacilityId === facilityId);
    return facility ? facility.FacilityName : '';
  }

  // Form submission and action methods
  onSubmit(): void {
    if (this.gradeForm.valid) {
      const formData = this.prepareFormData();
      console.log('Grade Master Form Data:', formData);

      // Here you would typically call your service to save/update the grade
      // this.gradeService.saveGrade(formData).subscribe(...)

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
    this.gradeForm.reset();
    this.currentStep = 1;
    this.selectedFacilities = [];
    this.stepper?.reset();
    this.initializeForm();
  }

  // Data preparation method
  private prepareFormData(): any {
    const formValue = this.gradeForm.getRawValue();

    return {
      // Grade Master data
      gradeData: {
        //GradeId: formValue.GradeId,
        GradeId: this.isEditMode ? formValue.GradeId || null : null,
        GradeCode: formValue.GradeCode,
        GradeName: formValue.GradeName,
        GradeLevel: formValue.GradeLevel,
        MinSalCTC: formValue.MinSalCTC,
        MaxSalCTC: formValue.MaxSalCTC,
        GradeCurrencyId: formValue.GradeCurrencyId,
        GradeDescription: formValue.GradeDescription,
        LeaveEntitlementAnnual: formValue.LeaveEntitlementAnnual,
        ProbationPeriod: formValue.ProbationPeriod,
        NoticePeriod: formValue.NoticePeriod,
        GradeRemark: formValue.GradeRemark,
        GradeAuth: formValue.GradeAuth,
        GradeIsDiscard: formValue.GradeIsDiscard,
        GradeIsActive: formValue.GradeIsActive,
        ExperiencedRequired: formValue.ExperiencedRequired,
        ExperiencedRemark: formValue.ExperiencedRemark,
        //CreatedBy: formValue.CreatedBy,
        // CreatedDate: formValue.CreatedDate,
      },
      // Designations data
      designations: formValue.designations.map((designation: any, index: number) => ({
        DesignationId: this.isEditMode ? designation.DesignationId || null : null,
        DesignationCode: designation.DesignationCode,
        DesignationName: designation.DesignationName,
        DesignationQualificationId: designation.DesignationQualificationId,
        DesignationDescription: designation.DesignationDescription,
        GradeQualificationRemark: designation.GradeQualificationRemark,
        RequiredSkills: designation.RequiredSkills,
        DesignationRemark: designation.DesignationRemark,
      })),
      // Facility assignments
      facilityAssignments: this.selectedFacilities.map(facilityId => ({
        AssignmentFacilityId: facilityId,
      })),
      // CTC Structure data
      ctcStructure: {
        CTCMasterBasic: formValue.CTCMasterBasic,
        CTCMasterDA: formValue.CTCMasterDA,
        CTCMasterHRA: formValue.CTCMasterHRA,
        CTCMasterConvAllowance: formValue.CTCMasterConvAllowance,
        CTCMasterCityCompensatoryAlowance: formValue.CTCMasterCityCompensatoryAlowance,
        CTCMasterCarAllowance: formValue.CTCMasterCarAllowance,
        CTCMasterFuelAllowance: formValue.CTCMasterFuelAllowance,
        CTCMasterDriverAllowance: formValue.CTCMasterDriverAllowance,
        CTCMasterMiscAllowance: formValue.CTCMasterMiscAllowance,
        CTCMasterGross: formValue.CTCMasterGross,
        CTCMasterPFEmployee: formValue.CTCMasterPFEmployee,
        CTCMasterPT: formValue.CTCMasterPT,
        CTCMasterEsic: formValue.CTCMasterEsic,
        CTCMasterPFEmployer: formValue.CTCMasterPFEmployer,
        CTCMasterMedicalInsurance: formValue.CTCMasterMedicalInsurance,
        CTCMasterPerformanceKPA: formValue.CTCMasterPerformanceKPA,
        CTCMasterGraduity: formValue.CTCMasterGraduity,
        CTCMasterBonus: formValue.CTCMasterBonus,
        CTCMasterMLWF: formValue.CTCMasterMLWF,
      },
    };
  }

  // Edit mode data patching
  private patchFormData(): void {
    const gradeData = this.data.grade;

    // Patch basic grade information
    this.gradeForm.patchValue({
      GradeId: gradeData.GradeId,
      GradeCode: gradeData.GradeCode || '',
      GradeName: gradeData.GradeName || '',
      GradeLevel: gradeData.GradeLevel || '',
      GradeDescription: gradeData.GradeDescription || '',
      MinSalCTC: gradeData.MinSalCTC || '',
      MaxSalCTC: gradeData.MaxSalCTC || '',
      GradeCurrencyId: gradeData.GradeCurrencyId || '',
      LeaveEntitlementAnnual: gradeData.LeaveEntitlementAnnual || '',
      ProbationPeriod: gradeData.ProbationPeriod || '',
      NoticePeriod: gradeData.NoticePeriod || '',
      ExperiencedRequired: gradeData.ExperiencedRequired || '',
      ExperiencedRemark: gradeData.ExperiencedRemark || '',
      GradeRemark: gradeData.GradeRemark || '',
      GradeAuth: gradeData.GradeAuth ?? true,
      GradeIsDiscard: gradeData.GradeIsDiscard ?? false,
      GradeIsActive: gradeData.GradeIsActive ?? true,
      // CreatedBy: gradeData.CreatedBy || '',
      // CreatedDate: gradeData.CreatedDate || '',
    });

    // Patch CTC Structure if available
    if (gradeData.CTCStructure) {
      const ctc = gradeData.CTCStructure;
      this.gradeForm.patchValue({
        CTCMasterBasic: ctc.CTCMasterBasic || '',
        CTCMasterDA: ctc.CTCMasterDA || '',
        CTCMasterHRA: ctc.CTCMasterHRA || '',
        CTCMasterConvAllowance: ctc.CTCMasterConvAllowance || '',
        CTCMasterCityCompensatoryAlowance: ctc.CTCMasterCityCompensatoryAlowance || '',
        CTCMasterLeaveTravelAllowance: ctc.CTCMasterLeaveTravelAllowance || '',
        CTCMasterCarAllowance: ctc.CTCMasterCarAllowance || '',
        CTCMasterFuelAllowance: ctc.CTCMasterFuelAllowance || '',
        CTCMasterDriverAllowance: ctc.CTCMasterDriverAllowance || '',
        CTCMasterMiscAllowance: ctc.CTCMasterMiscAllowance || '',
        CTCMasterGross: ctc.CTCMasterGross || '',
        CTCMasterPFEmployee: ctc.CTCMasterPFEmployee || '',
        CTCMasterPT: ctc.CTCMasterPT || '',
        CTCMasterEsic: ctc.CTCMasterEsic || '',
        CTCMasterPFEmployer: ctc.CTCMasterPFEmployer || '',
        CTCMasterMedicalInsurance: ctc.CTCMasterMedicalInsurance || '',
        CTCMasterPerformanceKPA: ctc.CTCMasterPerformanceKPA || '',
        CTCMasterGraduity: ctc.CTCMasterGraduity || '',
        CTCMasterBonus: ctc.CTCMasterBonus || '',
        CTCMasterMLWF: ctc.CTCMasterMLWF || '',
      });
    }

    // Patch designations if available
    if (gradeData.Designations && gradeData.Designations.length > 0) {
      // Clear existing designations
      while (this.designations.length > 0) {
        this.designations.removeAt(0);
      }

      // Add designations from data
      gradeData.Designations.forEach((designation: any) => {
        const designationGroup = this.createDesignationGroup();
        designationGroup.patchValue({
          DesignationId: designation.DesignationId || '',
          DesignationCode: designation.DesignationCode || '',
          DesignationName: designation.DesignationName || '',
          DesignationQualificationId: designation.DesignationQualificationId || '',
          DesignationDescription: designation.DesignationDescription || '',
          GradeQualificationRemark: designation.GradeQualificationRemark || '',
          RequiredSkills: designation.RequiredSkills || '',
          DesignationRemark: designation.DesignationRemark || '',
        });
        this.designations.push(designationGroup);
      });
    }

    // Patch facility assignments if available
    if (gradeData.FacilityAssignments && gradeData.FacilityAssignments.length > 0) {
      this.selectedFacilities = gradeData.FacilityAssignments.map(
        (fa: any) => fa.AssignmentFacilityId
      );
      this.gradeForm.patchValue({
        facilityAssignments: this.selectedFacilities,
      });
    }

    // Enable status controls in edit mode
    this.gradeForm.get('GradeAuth')?.enable();
    this.gradeForm.get('GradeIsDiscard')?.enable();
    this.gradeForm.get('GradeIsActive')?.enable();
  }

  private markAllFieldsAsTouched(): void {
    this.gradeForm.markAllAsTouched();
    this.designations.controls.forEach(designation => {
      const designationGroup = designation as FormGroup; // Add this line
      designationGroup.markAllAsTouched(); // Change this line
    });
  }

  private showValidationErrors(): void {
    console.log('Form validation errors:', this.getFormValidationErrors());
  }

  private getFormValidationErrors(): any {
    const errors: any = {};

    Object.keys(this.gradeForm.controls).forEach(key => {
      const control = this.gradeForm.get(key);
      if (control && !control.valid) {
        errors[key] = control.errors;
      }
    });

    // Check designation errors
    this.designations.controls.forEach((designation, index) => {
      const designationGroup = designation as FormGroup; // Add this line
      const designationErrors: any = {};
      Object.keys(designationGroup.controls).forEach(key => {
        // Change this line
        const control = designationGroup.get(key); // Change this line
        if (control && !control.valid) {
          designationErrors[key] = control.errors;
        }
      });
      if (Object.keys(designationErrors).length > 0) {
        errors[`designation_${index}`] = designationErrors;
      }
    });

    return errors;
  }

  isFormValidForSubmission(): boolean {
    return this.isStep1Valid() && this.isStep2Valid() && this.isStep3Valid();
  }

  // Helper methods for template
  isStepCompleted(step: number): boolean {
    return step < this.currentStep;
  }

  isStepActive(step: number): boolean {
    return step === this.currentStep;
  }

  getStepTitle(step: number): string {
    switch (step) {
      case 1:
        return 'Basic Information';
      case 2:
        return 'Employment Terms';
      case 3:
        return 'Designations';
      case 4:
        return 'Facility Assignment';
      case 5:
        return 'CTC Structure';
      default:
        return '';
    }
  }

  // Navigation helper methods (if needed for custom navigation)
  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps && this.stepper) {
      this.stepper.selectedIndex = step - 1;
      this.currentStep = step;
    }
  }

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

  loadAllCurrencies(): void {
    this.gradedesignationfacilityassignment.getAllCurrencies().subscribe({
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
    const countryData = this.data.gradedesignationfacilityAssignment;
    // Find currency by name (trim whitespace for comparison)
    if (countryData?.CurrencyName) {
      const currency = this.currencyList.find(
        c => c.CurrencyName.trim() === countryData.CurrencyName.trim()
      );
      currencyId = currency ? currency.CurrencyId : null;
      console.log('Found currency by name:', currencyId, 'for currency:', countryData.CurrencyName);
    }

    if (currencyId) {
      this.gradeForm.patchValue({
        GradeCurrencyId: currencyId,
      });
      console.log('Currency set in form:', currencyId);
    } else {
      console.log('No currency ID found for currency name:', countryData?.CurrencyName);
    }
  }

  loadAllQualifications(): void {
    this.gradedesignationfacilityassignment.getAllQualificationDetails().subscribe({
      next: res => {
        this.qualificationList = res;
        console.log('Loaded qualification:', res);
        this.filteredQualificationList = [...this.qualificationList];
        this.qualificationSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredQualificationList = this.qualificationList.filter(qualification =>
            qualification.QualificationName.toLowerCase().includes(filterValue)
          );
        });
        // Handle currency selection for edit mode
        if (this.isEditMode) {
          this.setQualificationForEdit();
        }
      },
      error: err => {
        console.error('Failed to load qualification:', err);
      },
    });
  }

  private setQualificationForEdit(): void {
    let qualificationId = null;
    const qualificationData = this.data.gradedesignationfacilityAssignment;
    // Find currency by name (trim whitespace for comparison)
    if (qualificationData?.QualificationName) {
      const currency = this.qualificationList.find(
        c => c.QualificationName.trim() === qualificationData.QualificationName.trim()
      );
      qualificationId = currency ? currency.QualificationId : null;
      console.log(
        'Found qualification by name:',
        qualificationId,
        'for qualification:',
        qualificationData.QualificationName
      );
    }

    if (qualificationId) {
      this.gradeForm.patchValue({
        DesignationQualificationId: qualificationId,
      });
      console.log('Qualification set in form:', qualificationId);
    } else {
      console.log(
        'No Qualification ID found for Qualification name:',
        qualificationData?.QualificationName
      );
    }
  }

  loadFacilityDetails(): void {
    this.gradedesignationfacilityassignment.getAllFacilityDetails().subscribe({
      next: data => {
        this.facilityList = data;
        console.log('Fetched Facility', data);
      },
      error: err => {
        console.error('Error fetching facilities', err);
      },
    });
  }
}
