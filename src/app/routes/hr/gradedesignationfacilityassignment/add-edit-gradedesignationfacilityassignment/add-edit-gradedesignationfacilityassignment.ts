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
//import { Gradedesignationfacilityassignmentservice } from '@shared/services/hr/GradeDesignationFacilityAssignment/gradedesignationfacilityassignmentservice';

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
  // currencyList: any[] = [
  //   { CurrencyId: 1, CurrencyName: 'USD - US Dollar' },
  //   { CurrencyId: 2, CurrencyName: 'EUR - Euro' },
  //   { CurrencyId: 3, CurrencyName: 'INR - Indian Rupee' },
  //   { CurrencyId: 4, CurrencyName: 'GBP - British Pound' },
  //   { CurrencyId: 5, CurrencyName: 'JPY - Japanese Yen' },
  //   { CurrencyId: 6, CurrencyName: 'CAD - Canadian Dollar' },
  //   { CurrencyId: 7, CurrencyName: 'AUD - Australian Dollar' },
  // ];

  qualificationList: any[] = [];
  // qualificationList: any[] = [
  //   { QualificationId: 1, QualificationName: 'High School' },
  //   { QualificationId: 2, QualificationName: "Bachelor's Degree" },
  //   { QualificationId: 3, QualificationName: "Master's Degree" },
  //   { QualificationId: 4, QualificationName: 'PhD' },
  //   { QualificationId: 5, QualificationName: 'Professional Certification' },
  //   { QualificationId: 6, QualificationName: 'Diploma' },
  //   { QualificationId: 7, QualificationName: 'Associate Degree' },
  // ];

  facilityList: any[] = [];

  // facilityList: any[] = [
  //   { FacilityId: 1, FacilityName: 'Cafeteria' },
  //   { FacilityId: 2, FacilityName: 'Gym/Fitness Center' },
  //   { FacilityId: 3, FacilityName: 'Parking' },
  //   { FacilityId: 4, FacilityName: 'Medical Room' },
  //   { FacilityId: 5, FacilityName: 'Library' },
  //   { FacilityId: 6, FacilityName: 'Conference Rooms' },
  //   { FacilityId: 7, FacilityName: 'Recreation Area' },
  //   { FacilityId: 8, FacilityName: 'Training Rooms' },
  //   { FacilityId: 9, FacilityName: 'Executive Lounge' },
  //   { FacilityId: 10, FacilityName: 'Childcare Center' },
  //   { FacilityId: 11, FacilityName: 'Shuttle Service' },
  //   { FacilityId: 12, FacilityName: 'Game Room' },
  // ];

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
    this.isEditMode = data?.isEdit || false;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCurrencies();
    this.loadAllQualifications();
    this.loadFacilityDetails();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format

    this.gradeForm = this.fb.group({
      // Hidden/System fields
      // CreatedBy: [{ value: '', disabled: true }],
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
    });

    // Add custom validator for salary range
    this.gradeForm.addValidators(this.salaryRangeValidator);

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data?.grade) {
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

  // Get step control for mat-stepper
  // getStepControl(step: number): AbstractControl {
  //   switch (step) {
  //     case 1:
  //       // Return a custom FormGroup with only step 1 fields for validation
  //       return this.fb.group({
  //         GradeName: this.gradeForm.get('GradeName'),
  //         GradeLevel: this.gradeForm.get('GradeLevel'),
  //         GradeDescription: this.gradeForm.get('GradeDescription'),
  //         MinSalCTC: this.gradeForm.get('MinSalCTC'),
  //         MaxSalCTC: this.gradeForm.get('MaxSalCTC'),
  //         GradeCurrencyId: this.gradeForm.get('GradeCurrencyId'),
  //       });
  //     case 2:
  //       return this.fb.group({
  //         LeaveEntitlementAnnual: this.gradeForm.get('LeaveEntitlementAnnual'),
  //         ProbationPeriod: this.gradeForm.get('ProbationPeriod'),
  //         NoticePeriod: this.gradeForm.get('NoticePeriod'),
  //         ExperiencedRequired: this.gradeForm.get('ExperiencedRequired'),
  //         ExperiencedRemark: this.gradeForm.get('ExperiencedRemark'),
  //         GradeRemark: this.gradeForm.get('GradeRemark'),
  //       });
  //     case 3:
  //       return this.designations;
  //     case 4:
  //       return this.gradeForm; // Step 4 is optional, so return main form
  //     default:
  //       return this.gradeForm;
  //   }
  // }

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
        CreatedBy: formValue.CreatedBy,
        CreatedDate: formValue.CreatedDate,
      },
      // Designations data
      designations: formValue.designations.map((designation: any, index: number) => ({
        ...designation,
        //DesignationGradeID: null, // Will be set after grade is saved
      })),
      // Facility assignments
      facilityAssignments: this.selectedFacilities.map(facilityId => ({
       // AssignmentGradeId: null, // Will be set after grade is saved
        AssignmentFacilityId: facilityId,
      })),
    };
  }

  // Edit mode data patching
  private patchFormData(): void {
    const gradeData = this.data.grade;

    // Patch basic grade information
    this.gradeForm.patchValue({
      GradeCode: gradeData.GradeCode || '',
      GradeName: gradeData.GradeName || '',
      GradeLevel: gradeData.GradeLevel || '',
      GradeDescription: gradeData.GradeDescription || '',
      MinSalCTC: gradeData.MinSalCTC || '',
      MaxSalCTC: gradeData.MaxSalCTC || '',
      //GradeCurrencyId: gradeData.GradeCurrencyId || '',
      LeaveEntitlementAnnual: gradeData.LeaveEntitlementAnnual || '',
      ProbationPeriod: gradeData.ProbationPeriod || '',
      NoticePeriod: gradeData.NoticePeriod || '',
      ExperiencedRequired: gradeData.ExperiencedRequired || '',
      ExperiencedRemark: gradeData.ExperiencedRemark || '',
      GradeRemark: gradeData.GradeRemark || '',
      GradeAuth: gradeData.GradeAuth ?? true,
      GradeIsDiscard: gradeData.GradeIsDiscard ?? false,
      GradeIsActive: gradeData.GradeIsActive ?? true,
      CreatedBy: gradeData.CreatedBy || '',
      CreatedDate: gradeData.CreatedDate || '',
    });

    // Patch designations if available
    if (gradeData.designations && gradeData.designations.length > 0) {
      // Clear existing designations
      while (this.designations.length > 0) {
        this.designations.removeAt(0);
      }

      // Add designations from data
      gradeData.designations.forEach((designation: any) => {
        const designationGroup = this.createDesignationGroup();
        designationGroup.patchValue({
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
    if (gradeData.facilityAssignments && gradeData.facilityAssignments.length > 0) {
      this.selectedFacilities = gradeData.facilityAssignments.map(
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
