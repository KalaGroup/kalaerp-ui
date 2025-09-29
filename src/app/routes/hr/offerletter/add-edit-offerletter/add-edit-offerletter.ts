import { Component, Inject, OnDestroy } from '@angular/core';
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
import { recruitmentmasterservice } from '../../../../shared/services/hr/RecruitmentMaster/recruitmentmaster';
import { Offerletter } from '@shared/services/hr/offerletter/offerletter';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-add-edit-offerletter',
  imports: [
    DecimalPipe,
    DatePipe,
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
    MatTableModule,
    MatChipsModule,
  ],
  templateUrl: './add-edit-offerletter.html',
  styleUrl: './add-edit-offerletter.scss',
})
export class AddEditOfferletter  implements OnDestroy {
  private recruitmentSearchSubscription: any = null;
  private isInitializingEdit = false;

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

  // Recruitment Table Properties
  showRecruitmentTable = false;
  recruitmentTableData: any[] = [];
  selectedRecruitmentData: any = null;
  recruitmentDisplayedColumns: string[] = [
    'recruitmentCode',
    'candidateName',
    'position',
    'email',
    'contact',
    'referenceName',
    'referenceCode',
    'jobSuitability',
    'interviewerName',
    'interviewerComment',
    'currentCTC',
    'expectedCTC',
    'recommendedCTC',
    'expectedJoiningDate',
    'hrComment',
    'offerLetterStatus',
    'authStatus',
    'remarks',
  ];

  minDate = new Date(); // Today's date as minimum for joining date

  // Authorization control property
  canAuthorize: boolean = false; // Set to false for makers, true for authorizers

  constructor(
    private offerLetterService: Offerletter,
    private recruitmentmasterservice: recruitmentmasterservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditOfferletter>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.offerLetter;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
    // Set authorization permission based on user role
    // You can get this from your auth service or user role
    this.canAuthorize = this.checkUserAuthorizationPermission();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllPositions();
    //this.loadAllRecruitments();
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
      // OfferLetterAuth1: [false],
      // OfferLetterAuth1Remark: ['', [Validators.maxLength(200)]],
      // OfferLetterAuth2: [false],
      // OfferLetterAuth2Remark: ['', [Validators.maxLength(200)]],
      // OfferLetterAuth3: [false],
      // OfferLetterAuth3Remark: ['', [Validators.maxLength(200)]],

      // Authorization fields - conditionally disable based on user role
      OfferLetterAuth1: [{ value: false, disabled: !this.canAuthorize }],
      OfferLetterAuth1Remark: [
        { value: '', disabled: !this.canAuthorize },
        [Validators.maxLength(200)],
      ],
      OfferLetterAuth2: [{ value: false, disabled: !this.canAuthorize }],
      OfferLetterAuth2Remark: [
        { value: '', disabled: !this.canAuthorize },
        [Validators.maxLength(200)],
      ],
      OfferLetterAuth3: [{ value: false, disabled: !this.canAuthorize }],
      OfferLetterAuth3Remark: [
        { value: '', disabled: !this.canAuthorize },
        [Validators.maxLength(200)],
      ],

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

      const ctcData =
        offerLetterData.OfferLetterCtcs && offerLetterData.OfferLetterCtcs[0]
          ? offerLetterData.OfferLetterCtcs[0]
          : {};

      this.offerLetterForm.patchValue({
        OfferLetterId: offerLetterData.OfferLetterId || '',
        // OfferLetterPositionId: offerLetterData.OfferLetterPositionId || '',
        // OfferLetterRecruitmentId: offerLetterData.OfferLetterRecruitmentId || '',
        OfferLetterJoinindate: joiningDate,
        OfferLetterRemark: offerLetterData.OfferLetterRemark || '',

        // Authorization
        OfferLetterAuth1: offerLetterData.OfferLetterAuth1 ?? false,
        OfferLetterAuth1Remark: offerLetterData.OfferLetterAuth1Remark || '',
        OfferLetterAuth2: offerLetterData.OfferLetterAuth2 ?? false,
        OfferLetterAuth2Remark: offerLetterData.OfferLetterAuth2Remark || '',
        OfferLetterAuth3: offerLetterData.OfferLetterAuth3 ?? false,
        OfferLetterAuth3Remark: offerLetterData.OfferLetterAuth3Remark || '',

        // CTC Components - Earnings (from nested OfferLetterCtcs array)
        OfferLetterBasic: ctcData.OfferLetterBasic || 0,
        OfferLetterDA: ctcData.OfferLetterDa || 0, // Note: API uses 'Da' not 'DA'
        OfferLetterHRA: ctcData.OfferLetterHra || 0, // Note: API uses 'Hra' not 'HRA'
        OfferLetterConvAllowance: ctcData.OfferLetterConvAllowance || 0,
        OfferLetterCityCompensatoryAlowance: ctcData.OfferLetterCityCompensatoryAlowance || 0,
        OfferLetterLeaveTravelAllowance: ctcData.OfferLetterLeaveTravelAllowance || 0,
        OfferLetterCarAllowance: ctcData.OfferLetterCarAllowance || 0,
        OfferLetterFuelAllowance: ctcData.OfferLetterFuelAllowance || 0,
        OfferLetterDriverAllowance: ctcData.OfferLetterDriverAllowance || 0,
        OfferLetterMiscAllowance: ctcData.OfferLetterMiscAllowance || 0,
        OfferLetterPerformanceKPA: ctcData.OfferLetterPerformanceKpa || 0, // Note: API uses 'Kpa' not 'KPA'
        OfferLetterBonus: ctcData.OfferLetterBonus || 0,

        // Gross (calculated field)
        OfferLetterGross: ctcData.OfferLetterGross || 0,

        // Deductions
        OfferLetterPT: ctcData.OfferLetterPt || 0, // Note: API uses 'Pt' not 'PT'
        OfferLetterEsic: ctcData.OfferLetterEsic || 0,
        OfferLetterPFEmployee: ctcData.OfferLetterPfemployee || 0, // Note: API uses 'Pfemployee' not 'PFEmployee'
        OfferLetterMLWF: ctcData.OfferLetterMlwf || 0, // Note: API uses 'Mlwf' not 'MLWF'

        // Employer Contributions
        OfferLetterPFEmployer: ctcData.OfferLetterPfemployer || 0, // Note: API uses 'Pfemployer' not 'PFEmployer'
        OfferLetterMedicalInsurance: ctcData.OfferLetterMedicalInsurance || 0,
        OfferLetterGraduity: ctcData.OfferLetterGraduity || 0,
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
    // Apply authorization restrictions AFTER patching values
    this.applyAuthorizationRestrictions();
  }

  // Separate method to handle authorization restrictions
  private applyAuthorizationRestrictions(): void {
    if (!this.canAuthorize) {
      // Disable authorization fields for non-authorized users
      this.offerLetterForm.get('OfferLetterAuth1')?.disable();
      this.offerLetterForm.get('OfferLetterAuth1Remark')?.disable();
      this.offerLetterForm.get('OfferLetterAuth2')?.disable();
      this.offerLetterForm.get('OfferLetterAuth2Remark')?.disable();
      this.offerLetterForm.get('OfferLetterAuth3')?.disable();
      this.offerLetterForm.get('OfferLetterAuth3Remark')?.disable();
    } else {
      // Ensure authorization fields are enabled for authorized users
      this.offerLetterForm.get('OfferLetterAuth1')?.enable();
      this.offerLetterForm.get('OfferLetterAuth1Remark')?.enable();
      this.offerLetterForm.get('OfferLetterAuth2')?.enable();
      this.offerLetterForm.get('OfferLetterAuth2Remark')?.enable();
      this.offerLetterForm.get('OfferLetterAuth3')?.enable();
      this.offerLetterForm.get('OfferLetterAuth3Remark')?.enable();
    }

    console.log('Authorization restrictions applied. Can authorize:', this.canAuthorize);
  }

  loadAllPositions(): void {
    this.recruitmentmasterservice.getAllpositionId().subscribe({
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
  }

  private setPositionForEdit(): void {
    let positionId = null;
    const offerLetterData = this.data.offerLetter;

    if (offerLetterData?.PositionMasterName) {
      const position = this.positionList.find(
        p => p.PositionMasterName.trim() === offerLetterData.PositionMasterName.trim()
      );
      positionId = position ? position.PositionMasterId : null;
      console.log(
        'Found position by name:',
        positionId,
        'for position:',
        offerLetterData.PositionMasterName
      );
    }

    if (positionId) {
      this.offerLetterForm.patchValue({
        OfferLetterPositionId: positionId,
      });
      this.onPositionChange(positionId); // Load recruitments for this position
      console.log('Position set in form:', positionId);
    } else {
      console.log('No position ID found for position name:', offerLetterData?.PositionMasterName);
    }
  }

  onPositionChange(positionId: number): void {
    console.log('Position changed to ID:', positionId);
    // this.offerLetterForm.patchValue({
    //   OfferLetterRecruitmentId: '', // Clear recruitment when position changes
    // });

    // Don't clear recruitment if we're initializing edit mode
    if (!this.isInitializingEdit) {
      this.offerLetterForm.patchValue({
        OfferLetterRecruitmentId: '', // Clear recruitment when position changes
      });
    }

    this.recruitmentList = [];
    this.filteredRecruitmentList = [];
    this.recruitmentSearchControl.reset();

    // Unsubscribe from previous search subscription
    if (this.recruitmentSearchSubscription) {
      this.recruitmentSearchSubscription.unsubscribe();
      this.recruitmentSearchSubscription = null;
    }

    if (positionId) {
      this.offerLetterService.getRecruitmentsByPositionId(positionId).subscribe({
        next: res => {
          this.recruitmentList = res;
          console.log('Loaded recruitments for position ID', positionId, ':', res);
          this.filteredRecruitmentList = [...this.recruitmentList];
          // Create subscription only once per position change
          this.recruitmentSearchSubscription = this.recruitmentSearchControl.valueChanges.subscribe(
            value => {
              const filterValue = (value || '').toLowerCase();
              this.filteredRecruitmentList = this.recruitmentList.filter(recruitment =>
                recruitment.RecruitmentMasterNameOfCandidates.toLowerCase().includes(filterValue)
              );
            }
          );

          if (this.isEditMode) {
            this.setRecruitmentForEdit();
          }
        },
        error: err => {
          console.error('Failed to load recruitments for position ID', positionId, ':', err);
        },
      });
    }
  }

  private setRecruitmentForEdit(): void {
    const offerLetterData = this.data.offerLetter;

    if (!offerLetterData?.RecruitmentMasterNameOfCandidates || this.recruitmentList.length === 0) {
      this.isInitializingEdit = false; // Reset flag
      return;
    }

    const recruitment = this.recruitmentList.find(
      r =>
        r.RecruitmentMasterNameOfCandidates.trim() ===
        offerLetterData.RecruitmentMasterNameOfCandidates.trim()
    );

    if (recruitment) {
      const recruitmentId = recruitment.RecruitmentMasterId;
      console.log(
        'Found recruitment by name:',
        recruitmentId,
        'for candidate:',
        offerLetterData.RecruitmentMasterNameOfCandidates
      );

      this.offerLetterForm.patchValue({
        OfferLetterRecruitmentId: recruitmentId,
      });
      console.log('Recruitment set in form:', recruitmentId);
    } else {
      console.log(
        'No recruitment ID found for candidate name:',
        offerLetterData.RecruitmentMasterNameOfCandidates
      );
    }

    // Reset initialization flag
    this.isInitializingEdit = false;
  }

  ngOnDestroy(): void {
    if (this.recruitmentSearchSubscription) {
      this.recruitmentSearchSubscription.unsubscribe();
    }
  }

  calculateGrossAndCTC(): void {
    const formValue = this.offerLetterForm.value;

    // Calculate earnings total
    const earnings = [
      'OfferLetterBasic',
      'OfferLetterDA',
      'OfferLetterHRA',
      'OfferLetterConvAllowance',
      'OfferLetterCityCompensatoryAlowance',
      'OfferLetterLeaveTravelAllowance',
      'OfferLetterCarAllowance',
      'OfferLetterFuelAllowance',
      'OfferLetterDriverAllowance',
      'OfferLetterMiscAllowance',
      'OfferLetterPerformanceKPA',
      'OfferLetterBonus',
    ];

    let grossTotal = 0;
    earnings.forEach(field => {
      grossTotal += parseFloat(formValue[field]) || 0;
    });

    // Update gross salary in form
    this.offerLetterForm.patchValue(
      {
        OfferLetterGross: grossTotal,
      },
      { emitEvent: false }
    );

    // Calculate employer contributions
    const employerContributions = [
      'OfferLetterPFEmployer',
      'OfferLetterMedicalInsurance',
      'OfferLetterGraduity',
    ];

    let employerTotal = 0;
    employerContributions.forEach(field => {
      employerTotal += parseFloat(formValue[field]) || 0;
    });

    // Total CTC = Gross + Employer Contributions
    this.totalCTC = grossTotal + employerTotal;

    console.log(
      'Gross Total:',
      grossTotal,
      'Employer Total:',
      employerTotal,
      'Total CTC:',
      this.totalCTC
    );
  }

  // Auto-calculate PF based on basic salary (business logic example)
  onBasicSalaryChange(): void {
    debugger;
    const basic = parseFloat(this.offerLetterForm.get('OfferLetterBasic')?.value) || 0;

    if (basic > 0) {
      // Auto-calculate PF (12% of basic, max 1800 per month = 21600 per year)
      const pfEmployee = Math.min(basic * 0.12, 21600);
      const pfEmployer = pfEmployee;

      this.offerLetterForm.patchValue(
        {
          OfferLetterPFEmployee: pfEmployee,
          OfferLetterPFEmployer: pfEmployer,
        },
        { emitEvent: false }
      );
    }

    this.calculateGrossAndCTC();
  }

  onSubmit(): void {
    const formData = { ...this.offerLetterForm.getRawValue() };

    // Format joining date to match DateOnly format (YYYY-MM-DD)
    const joiningDate = formData.OfferLetterJoinindate
      ? new Date(formData.OfferLetterJoinindate).toISOString().split('T')[0]
      : null;

    // Prepare CTC data as array (matching List<OfferLetterCtcDetail>)
    const ctcDetails = [
      {
        OfferLetterBasic: formData.OfferLetterBasic || 0,
        OfferLetterDa: formData.OfferLetterDA || 0, // Note: DA -> Da
        OfferLetterHra: formData.OfferLetterHRA || 0, // Note: HRA -> Hra
        OfferLetterConvAllowance: formData.OfferLetterConvAllowance || 0,
        OfferLetterCityCompensatoryAlowance: formData.OfferLetterCityCompensatoryAlowance || 0,
        OfferLetterLeaveTravelAllowance: formData.OfferLetterLeaveTravelAllowance || 0,
        OfferLetterCarAllowance: formData.OfferLetterCarAllowance || 0,
        OfferLetterFuelAllowance: formData.OfferLetterFuelAllowance || 0,
        OfferLetterDriverAllowance: formData.OfferLetterDriverAllowance || 0,
        OfferLetterMiscAllowance: formData.OfferLetterMiscAllowance || 0,
        OfferLetterGross: formData.OfferLetterGross || 0,
        OfferLetterPt: formData.OfferLetterPT || 0, // Note: PT -> Pt
        OfferLetterEsic: formData.OfferLetterEsic || 0,
        OfferLetterPfemployee: formData.OfferLetterPFEmployee || 0, // Note: PFEmployee -> Pfemployee
        OfferLetterPfemployer: formData.OfferLetterPFEmployer || 0, // Note: PFEmployer -> Pfemployer
        OfferLetterMedicalInsurance: formData.OfferLetterMedicalInsurance || 0,
        OfferLetterPerformanceKpa: formData.OfferLetterPerformanceKPA || 0, // Note: KPA -> Kpa
        OfferLetterGraduity: formData.OfferLetterGraduity || 0,
        OfferLetterBonus: formData.OfferLetterBonus || 0,
        OfferLetterMlwf: formData.OfferLetterMLWF || 0, // Note: MLWF -> Mlwf
      },
    ];

    // Prepare the payload to match InsertOfferLetterRequest exactly
    const offerLetterPayload = {
      OfferLetterPositionId: formData.OfferLetterPositionId,
      OfferLetterRecruitmentId: formData.OfferLetterRecruitmentId,
      OfferLetterJoinindate: joiningDate,
      OfferLetterRemark: formData.OfferLetterRemark || 'Nil',
      OfferLetterAuth1: formData.OfferLetterAuth1 || false,
      OfferLetterAuth1Remark: formData.OfferLetterAuth1Remark || 'Nil',
      OfferLetterAuth2: formData.OfferLetterAuth2 || false,
      OfferLetterAuth2Remark: formData.OfferLetterAuth2Remark || 'Nil',
      OfferLetterAuth3: formData.OfferLetterAuth3 || false,
      OfferLetterAuth3Remark: formData.OfferLetterAuth3Remark || 'Nil',
      OfferLetterIsActive: formData.OfferLetterIsActive || true,
      OfferLetterIsDiscard: formData.OfferLetterIsDiscard || false,
      CreatedBy: 1, // Set current user ID from your auth service
      CreatedDate: new Date().toISOString(),
      UpdatedBy: 1, // Set current user ID from your auth service
      UpdatedDate: new Date().toISOString(),
      offerLetterCtcs: ctcDetails, // Note: lowercase 'o' and array format
    };

    this.dialogRef.close(offerLetterPayload);
    console.log('Form submitted:', offerLetterPayload);
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

  // Add this method to handle recruitment selection
  onRecruitmentChange(recruitmentId: number): void {
    console.log('Recruitment selected ID:', recruitmentId);

    if (recruitmentId) {
      // Fetch specific recruitment details from backend
      this.offerLetterService.getRecruitmentsByMasterId(recruitmentId).subscribe({
        next: recruitmentDetail => {
          this.selectedRecruitmentData = recruitmentDetail;
          console.log('Fetched recruitment detail for selected candidate:', recruitmentDetail);

          // If table is currently shown, update it with selected data
          if (this.showRecruitmentTable) {
            this.recruitmentTableData = [recruitmentDetail];
          }
        },
        error: err => {
          console.error('Failed to fetch recruitment detail:', err);
          this.selectedRecruitmentData = null;
          if (this.showRecruitmentTable) {
            this.recruitmentTableData = [];
          }
        },
      });
    } else {
      // No recruitment selected, clear selected data
      this.selectedRecruitmentData = null;
      if (this.showRecruitmentTable) {
        this.recruitmentTableData = [];
      }
    }
  }
  // Updated toggle method to show selected data when button clicked
  toggleRecruitmentTable(): void {
    this.showRecruitmentTable = !this.showRecruitmentTable;

    if (this.showRecruitmentTable) {
      // If we have selected recruitment data, show it
      if (this.selectedRecruitmentData) {
        this.recruitmentTableData = [this.selectedRecruitmentData];
        console.log('Showing selected recruitment data in table:', this.selectedRecruitmentData);
      } else {
        // No specific selection, load all recruitment data
        this.loadRecruitmentTableData();
      }
    } else {
      // Hide table, but keep the selected data stored
      console.log('Hiding recruitment table');
    }
  }

  loadRecruitmentTableData(): void {
    this.recruitmentmasterservice.getAllRecruitmentMaster().subscribe({
      next: data => {
        this.recruitmentTableData = data;
        console.log('Recruitment data loaded for table:', data);
      },
      error: err => {
        console.error('Failed to load recruitment data:', err);
      },
    });
  }

  getOfferLetterStatusText(status: string): string {
    switch (status) {
      case 'OLI':
        return 'Offer Letter Issued';
      case 'HLD':
        return 'Hold';
      default:
        return 'Selected';
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
}
