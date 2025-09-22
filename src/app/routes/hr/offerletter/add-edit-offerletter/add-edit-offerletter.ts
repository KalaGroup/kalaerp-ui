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
//import { Companyservice } from '@shared/services/hr/company/companyservice';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-add-edit-offerletter',
  imports: [
    DecimalPipe,
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
  ],
  templateUrl: './add-edit-offerletter.html',
  styleUrl: './add-edit-offerletter.scss'
})
export class AddEditOfferletter {
     offerLetterForm!: FormGroup;
  isEditMode: boolean = false;

  // Lists for dropdowns
  positionList: any[] = [];
  recruitmentList: any[] = [];

  // Search controls
  positionSearchControl = new FormControl('');
  recruitmentSearchControl = new FormControl('');

  // Filtered lists
  filteredPositionList: any[] = [];
  filteredRecruitmentList: any[] = [];

  isLoading = false;
  totalCTC = 0;

  minDate = new Date(); // Today's date as minimum for joining date

  constructor(
    // private offerLetterService: OfferLetterService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditOfferletter>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.offerLetter;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllPositions();
    this.loadAllRecruitments();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format

    // Complete Offer Letter Form with all fields
    this.offerLetterForm = this.fb.group({
      // Hidden/System fields
      OfferLetterId: [{ value: '', disabled: true }],
      CreatedBy: [{ value: '', disabled: true }],
      CreatedDate: [{ value: currentDate, disabled: true }],
      UpdatedBy: [{ value: '', disabled: true }],

      // Basic Information
      OfferLetterPositionId: ['', [Validators.required]],
      OfferLetterRecruitmentId: ['', [Validators.required]],
      OfferLetterJoinindate: ['', [Validators.required]],
      OfferLetterRemark: ['', [Validators.maxLength(200)]],

      // Authorization fields
      OfferLetterAuth1: [false],
      OfferLetterAuth1Remark: ['', [Validators.maxLength(200)]],
      OfferLetterAuth2: [false],
      OfferLetterAuth2Remark: ['', [Validators.maxLength(200)]],
      OfferLetterAuth3: [false],
      OfferLetterAuth3Remark: ['', [Validators.maxLength(200)]],

      // CTC Components - Earnings
      OfferLetterBasic: [0, [Validators.required, Validators.min(0)]],
      OfferLetterDA: [0, [Validators.min(0)]],
      OfferLetterHRA: [0, [Validators.min(0)]],
      OfferLetterConvAllowance: [0, [Validators.min(0)]],
      OfferLetterCityCompensatoryAlowance: [0, [Validators.min(0)]],
      OfferLetterLeaveTravelAllowance: [0, [Validators.min(0)]],
      OfferLetterCarAllowance: [0, [Validators.min(0)]],
      OfferLetterFuelAllowance: [0, [Validators.min(0)]],
      OfferLetterDriverAllowance: [0, [Validators.min(0)]],
      OfferLetterMiscAllowance: [0, [Validators.min(0)]],
      OfferLetterPerformanceKPA: [0, [Validators.min(0)]],
      OfferLetterBonus: [0, [Validators.min(0)]],

      // Gross (calculated field)
      OfferLetterGross: [{ value: 0, disabled: true }],

      // Deductions
      OfferLetterPT: [0, [Validators.min(0)]],
      OfferLetterEsic: [0, [Validators.min(0)]],
      OfferLetterPFEmployee: [0, [Validators.min(0)]],
      OfferLetterMLWF: [0, [Validators.min(0)]],

      // Employer Contributions
      OfferLetterPFEmployer: [0, [Validators.min(0)]],
      OfferLetterMedicalInsurance: [0, [Validators.min(0)]],
      OfferLetterGraduity: [0, [Validators.min(0)]],

      // Status flags
      OfferLetterIsActive: [{ value: true, disabled: !this.isEditMode }],
      OfferLetterIsDiscard: [{ value: false, disabled: !this.isEditMode }],
    });

    // If editing, pre-fill form with available data
    if (this.isEditMode) {
      console.log('Patching form with offer letter data:', this.data.offerLetter);
      const offerLetterData = this.data.offerLetter;

      const joiningDate = offerLetterData.OfferLetterJoinindate
        ? new Date(offerLetterData.OfferLetterJoinindate)
        : '';

      this.offerLetterForm.patchValue({
        OfferLetterId: offerLetterData.OfferLetterId || '',
        OfferLetterPositionId: offerLetterData.OfferLetterPositionId || '',
        OfferLetterRecruitmentId: offerLetterData.OfferLetterRecruitmentId || '',
        OfferLetterJoinindate: joiningDate,
        OfferLetterRemark: offerLetterData.OfferLetterRemark || '',

        // Authorization
        OfferLetterAuth1: offerLetterData.OfferLetterAuth1 ?? false,
        OfferLetterAuth1Remark: offerLetterData.OfferLetterAuth1Remark || '',
        OfferLetterAuth2: offerLetterData.OfferLetterAuth2 ?? false,
        OfferLetterAuth2Remark: offerLetterData.OfferLetterAuth2Remark || '',
        OfferLetterAuth3: offerLetterData.OfferLetterAuth3 ?? false,
        OfferLetterAuth3Remark: offerLetterData.OfferLetterAuth3Remark || '',

        // CTC data would come from separate CTC object if available
        // Assuming CTC data is nested in offerLetterData.ctc
        OfferLetterBasic: offerLetterData.ctc?.OfferLetterBasic || 0,
        OfferLetterDA: offerLetterData.ctc?.OfferLetterDA || 0,
        OfferLetterHRA: offerLetterData.ctc?.OfferLetterHRA || 0,
        // ... add all other CTC fields

        // Status flags
        OfferLetterIsActive: offerLetterData.OfferLetterIsActive ?? true,
        OfferLetterIsDiscard: offerLetterData.OfferLetterIsDiscard ?? false,
      });

      this.offerLetterForm.get('OfferLetterIsActive')?.enable();
      this.offerLetterForm.get('OfferLetterIsDiscard')?.enable();

      // Calculate CTC after patching values
      this.calculateGrossAndCTC();

      console.log('Form values after patch:', this.offerLetterForm.value);
    }
  }

  loadAllPositions(): void {
    // Replace with your actual service call
    /*
    this.offerLetterService.getAllPositions().subscribe({
      next: res => {
        this.positionList = res;
        console.log('Loaded positions:', res);
        this.filteredPositionList = [...this.positionList];
        this.positionSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredPositionList = this.positionList.filter(position =>
            position.PositionName.toLowerCase().includes(filterValue)
          );
        });

        if (this.isEditMode) {
          this.setPositionForEdit();
        }
      },
      error: err => {
        console.error('Failed to load positions:', err);
      },
    });
    */

    // Dummy data for positions
    this.positionList = [
      { PositionMasterId: 1, PositionName: 'Software Engineer' },
      { PositionMasterId: 2, PositionName: 'Senior Developer' },
      { PositionMasterId: 3, PositionName: 'Project Manager' },
      { PositionMasterId: 4, PositionName: 'Business Analyst' },
      { PositionMasterId: 5, PositionName: 'QA Engineer' }
    ];
    this.filteredPositionList = [...this.positionList];

    this.positionSearchControl.valueChanges.subscribe(value => {
      const filterValue = (value || '').toLowerCase();
      this.filteredPositionList = this.positionList.filter(position =>
        position.PositionName.toLowerCase().includes(filterValue)
      );
    });
  }

  private setPositionForEdit(): void {
    let positionId = null;
    const offerLetterData = this.data.offerLetter;

    if (offerLetterData?.PositionName) {
      const position = this.positionList.find(
        p => p.PositionName.trim() === offerLetterData.PositionName.trim()
      );
      positionId = position ? position.PositionMasterId : null;
      console.log('Found position by name:', positionId, 'for position:', offerLetterData.PositionName);
    }

    if (positionId) {
      this.offerLetterForm.patchValue({
        OfferLetterPositionId: positionId,
      });
      console.log('Position set in form:', positionId);
    } else {
      console.log('No position ID found for position name:', offerLetterData?.PositionName);
    }
  }

  loadAllRecruitments(): void {
    // Replace with your actual service call
    /*
    this.offerLetterService.getAllRecruitments().subscribe({
      next: res => {
        this.recruitmentList = res;
        console.log('Loaded recruitments:', res);
        this.filteredRecruitmentList = [...this.recruitmentList];
        this.recruitmentSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredRecruitmentList = this.recruitmentList.filter(recruitment =>
            recruitment.CandidateName.toLowerCase().includes(filterValue)
          );
        });

        if (this.isEditMode) {
          this.setRecruitmentForEdit();
        }
      },
      error: err => {
        console.error('Failed to load recruitments:', err);
      },
    });
    */

    // Dummy data for recruitments
    this.recruitmentList = [
      { RecruitmentMasterId: 1, CandidateName: 'John Smith' },
      { RecruitmentMasterId: 2, CandidateName: 'Sarah Johnson' },
      { RecruitmentMasterId: 3, CandidateName: 'Mike Davis' },
      { RecruitmentMasterId: 4, CandidateName: 'Emily Brown' },
      { RecruitmentMasterId: 5, CandidateName: 'David Wilson' }
    ];
    this.filteredRecruitmentList = [...this.recruitmentList];

    this.recruitmentSearchControl.valueChanges.subscribe(value => {
      const filterValue = (value || '').toLowerCase();
      this.filteredRecruitmentList = this.recruitmentList.filter(recruitment =>
        recruitment.CandidateName.toLowerCase().includes(filterValue)
      );
    });
  }

  private setRecruitmentForEdit(): void {
    let recruitmentId = null;
    const offerLetterData = this.data.offerLetter;

    if (offerLetterData?.CandidateName) {
      const recruitment = this.recruitmentList.find(
        r => r.CandidateName.trim() === offerLetterData.CandidateName.trim()
      );
      recruitmentId = recruitment ? recruitment.RecruitmentMasterId : null;
      console.log('Found recruitment by name:', recruitmentId, 'for candidate:', offerLetterData.CandidateName);
    }

    if (recruitmentId) {
      this.offerLetterForm.patchValue({
        OfferLetterRecruitmentId: recruitmentId,
      });
      console.log('Recruitment set in form:', recruitmentId);
    } else {
      console.log('No recruitment ID found for candidate name:', offerLetterData?.CandidateName);
    }
  }

  calculateGrossAndCTC(): void {
    const formValue = this.offerLetterForm.value;

    // Calculate earnings total
    const earnings = [
      'OfferLetterBasic', 'OfferLetterDA', 'OfferLetterHRA', 'OfferLetterConvAllowance',
      'OfferLetterCityCompensatoryAlowance', 'OfferLetterLeaveTravelAllowance',
      'OfferLetterCarAllowance', 'OfferLetterFuelAllowance', 'OfferLetterDriverAllowance',
      'OfferLetterMiscAllowance', 'OfferLetterPerformanceKPA', 'OfferLetterBonus'
    ];

    let grossTotal = 0;
    earnings.forEach(field => {
      grossTotal += parseFloat(formValue[field]) || 0;
    });

    // Update gross salary in form
    this.offerLetterForm.patchValue({
      OfferLetterGross: grossTotal
    }, { emitEvent: false });

    // Calculate employer contributions
    const employerContributions = [
      'OfferLetterPFEmployer', 'OfferLetterMedicalInsurance', 'OfferLetterGraduity'
    ];

    let employerTotal = 0;
    employerContributions.forEach(field => {
      employerTotal += parseFloat(formValue[field]) || 0;
    });

    // Total CTC = Gross + Employer Contributions
    this.totalCTC = grossTotal + employerTotal;

    console.log('Gross Total:', grossTotal, 'Employer Total:', employerTotal, 'Total CTC:', this.totalCTC);
  }

  // Auto-calculate PF based on basic salary (business logic example)
  onBasicSalaryChange(): void {
    const basic = parseFloat(this.offerLetterForm.get('OfferLetterBasic')?.value) || 0;

    if (basic > 0) {
      // Auto-calculate PF (12% of basic, max 1800 per month = 21600 per year)
      const pfEmployee = Math.min((basic * 0.12), 21600);
      const pfEmployer = pfEmployee;

      this.offerLetterForm.patchValue({
        OfferLetterPFEmployee: pfEmployee,
        OfferLetterPFEmployer: pfEmployer
      }, { emitEvent: false });
    }

    this.calculateGrossAndCTC();
  }

  onSubmit(): void {
    if (this.offerLetterForm.valid) {
      const formData = { ...this.offerLetterForm.getRawValue() };

      // Prepare the data structure to match your database schema
      const offerLetterData = {
        OfferLetterId: formData.OfferLetterId || 0,
        OfferLetterPositionId: formData.OfferLetterPositionId,
        OfferLetterRecruitmentId: formData.OfferLetterRecruitmentId,
        OfferLetterJoinindate: formData.OfferLetterJoinindate,
        OfferLetterRemark: formData.OfferLetterRemark || 'Nil',
        OfferLetterAuth1: formData.OfferLetterAuth1,
        OfferLetterAuth1Remark: formData.OfferLetterAuth1Remark || 'Nil',
        OfferLetterAuth2: formData.OfferLetterAuth2,
        OfferLetterAuth2Remark: formData.OfferLetterAuth2Remark || 'Nil',
        OfferLetterAuth3: formData.OfferLetterAuth3,
        OfferLetterAuth3Remark: formData.OfferLetterAuth3Remark || 'Nil',
        OfferLetterIsActive: formData.OfferLetterIsActive,
        OfferLetterIsDiscard: formData.OfferLetterIsDiscard,
        CreatedBy: formData.CreatedBy || 1, // Set current user ID
        UpdatedBy: formData.UpdatedBy || 1, // Set current user ID
      };

      // CTC Data (separate object for OfferLetterCTC table)
      const ctcData = {
        OfferLetterBasic: formData.OfferLetterBasic,
        OfferLetterDA: formData.OfferLetterDA,
        OfferLetterHRA: formData.OfferLetterHRA,
        OfferLetterConvAllowance: formData.OfferLetterConvAllowance,
        OfferLetterCityCompensatoryAlowance: formData.OfferLetterCityCompensatoryAlowance,
        OfferLetterLeaveTravelAllowance: formData.OfferLetterLeaveTravelAllowance,
        OfferLetterCarAllowance: formData.OfferLetterCarAllowance,
        OfferLetterFuelAllowance: formData.OfferLetterFuelAllowance,
        OfferLetterDriverAllowance: formData.OfferLetterDriverAllowance,
        OfferLetterMiscAllowance: formData.OfferLetterMiscAllowance,
        OfferLetterGross: formData.OfferLetterGross,
        OfferLetterPT: formData.OfferLetterPT,
        OfferLetterEsic: formData.OfferLetterEsic,
        OfferLetterPFEmployee: formData.OfferLetterPFEmployee,
        OfferLetterPFEmployer: formData.OfferLetterPFEmployer,
        OfferLetterMedicalInsurance: formData.OfferLetterMedicalInsurance,
        OfferLetterPerformanceKPA: formData.OfferLetterPerformanceKPA,
        OfferLetterGraduity: formData.OfferLetterGraduity,
        OfferLetterBonus: formData.OfferLetterBonus,
        OfferLetterMLWF: formData.OfferLetterMLWF,
      };

      const completeData = {
        offerLetter: offerLetterData,
        ctc: ctcData
      };

      this.dialogRef.close(completeData);
      console.log('Form submitted:', completeData);
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      Object.keys(this.offerLetterForm.controls).forEach(key => {
        this.offerLetterForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onReset(): void {
    if (!this.isEditMode) {
      if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
        const currentDate = new Date().toLocaleDateString('en-GB');

        this.offerLetterForm.patchValue({
          // Reset all form fields except system fields
          OfferLetterPositionId: '',
          OfferLetterRecruitmentId: '',
          OfferLetterJoinindate: '',
          OfferLetterRemark: '',

          // Reset authorization
          OfferLetterAuth1: false,
          OfferLetterAuth1Remark: '',
          OfferLetterAuth2: false,
          OfferLetterAuth2Remark: '',
          OfferLetterAuth3: false,
          OfferLetterAuth3Remark: '',

          // Reset all CTC fields to 0
          OfferLetterBasic: 0,
          OfferLetterDA: 0,
          OfferLetterHRA: 0,
          OfferLetterConvAllowance: 0,
          OfferLetterCityCompensatoryAlowance: 0,
          OfferLetterLeaveTravelAllowance: 0,
          OfferLetterCarAllowance: 0,
          OfferLetterFuelAllowance: 0,
          OfferLetterDriverAllowance: 0,
          OfferLetterMiscAllowance: 0,
          OfferLetterPerformanceKPA: 0,
          OfferLetterBonus: 0,
          OfferLetterGross: 0,
          OfferLetterPT: 0,
          OfferLetterEsic: 0,
          OfferLetterPFEmployee: 0,
          OfferLetterMLWF: 0,
          OfferLetterPFEmployer: 0,
          OfferLetterMedicalInsurance: 0,
          OfferLetterGraduity: 0,
        });

        // Reset search controls
        this.positionSearchControl.reset();
        this.recruitmentSearchControl.reset();

        // Recalculate CTC
        this.calculateGrossAndCTC();

        // Mark form as pristine and untouched
        this.offerLetterForm.markAsPristine();
        this.offerLetterForm.markAsUntouched();

        console.log('Form has been reset to initial values');
      }
    }
  }
}
