


import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormsModule,
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
import { recruitmentmasterservice } from '@shared/services/hr/RecruitmentMaster/recruitmentmaster';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface Row {
  newRound: number;
  newMarks: number;
  newAttributeId: number;
  isEdit?: boolean;
  attributeName?: string; // optional for display
}
@Component({
  selector: 'app-add-edit-recruitment',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-edit-recruitment.html',
  styleUrl: './add-edit-recruitment.scss'
})
export class AddEditRecruitment implements OnInit {
  RecruitmentForm!: FormGroup;
  isEditMode: boolean = false;
  recruitmentList: any[] = [];
  code: string = '';
  recruitmentSearchControl = new FormControl('');
  filteredrecruitmentList: any[] = [];

  // Define lists for dropdowns
  RecruitmentReferenceList: any[] = [];
  PositionMasterList: any[] = [];
  CityList: any[] = [];
  CompanyList: any[] = [];
  EmployeeList: any[] = [];
  gradeList: any[] = [];
  designationList: any[] = [];
  positionList: any[] = [];
  StatusStageList: any[] = [];
  RecruitmentStageStatusList: any[] = [];



  Details: { newRound: number; newMarks: number; newAttributeId: number }[] = [];
  editIndex: number | null = null;
  AttributeList: any[] = [];
  filteredCompanyList: any[] = [];
  CompanySearchControl: FormControl = new FormControl('');
  //recruitmentDetails: any[] = []; // table rows


  filteredCityList: any[] = [];;
  CitySearchControl: FormControl = new FormControl('');

  // input fields for new row
  newRound: number | null = null;
  newMarks: number | null = null;
  newAttributeId: number | null = null;



  constructor(
    private Recruitmentmasterservice: recruitmentmasterservice,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditRecruitment>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.recruitment;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllRecruitmentGrade();
    this.loadAllRecruitmentDesignation();
    this.loadAllCity();
    this.loadAllReference();
    this.loadAllCompany();
    this.loadAllStatusStage();
    this.loadAllAttribute();
    this.loadAllEmployee();
    this.loadAllRecruitmentPosition();
  }

  private initializeForm(): void {
    const currentDate = new Date();

    this.RecruitmentForm = this.fb.group({
      RecruitmentMasterId: [0],
      RecruitmentMasterPositionId: ['', Validators.required],
      RecruitmentMasterCode: [''],
      RecruitmentMasterReferenceId: ['', Validators.required],
      RecruitmentMasterReferenceName: ['', Validators.required],
      RecruitmentMasterReferenceCode: ['', Validators.required],
      RecruitmentMasterNameOfCandidates: ['', Validators.required],
      RecruitmentMasterCityId: ['', Validators.required],
      RecruitmentMasterCompanyId: ['', Validators.required],
      RecruitmentMasterCandidateEmailId: ['', [Validators.required, Validators.email]],
      RecruitmentMasterCandidateContactNumber: ['', Validators.required],
      RecruitmentMasterAppropriateForJobRole: [''],
      RecruitmentMasterInterviewerEmployeeId: ['', Validators.required],
      RecruitmentMasterInterviewerComment: [''],
      RecruitmentMasterGradeId: ['', Validators.required],
      RecruitmentMasterDesignationId: ['', Validators.required],
      RecruitmentMasterCurrentCTCPA: [''],
      RecruitmentMasterExpectedCTCPA: [''],
      RecruitmentMasterRecommendedCTCPA: [''],
      RecruitmentMasterExpectedJoiningDate: [null, Validators.required],
      RecruitmentMasterHrcomment: [''],
      RecruitmentMasterRecruitmentStageStatusId: ['', Validators.required],
      RecruitmentMasterOfferLetterStatus: [''],
      RecruitmentMasterRemark: [''],
      RecruitmentMasterAuthRemark: ['ok'],
      RecruitmentMasterAuth: [{ value: true, disabled: !this.isEditMode }],
      RecruitmentMasterIsActive: [{ value: true, disabled: !this.isEditMode }],
      RecruitmentMasterIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }]
    });

    // Populate form in edit mode
    if (this.isEditMode && this.data?.recruitment) {
      this.loadAllDetails();
      this.populateFormForEdit();
    }
  }

  private populateFormForEdit(): void {
    const recruitment = this.data.recruitment;
    debugger
    this.RecruitmentForm.patchValue({
      RecruitmentMasterId: recruitment.RecruitmentMasterId,
      RecruitmentMasterPositionId: recruitment.RecruitmentMasterPositionId,
      RecruitmentMasterCode: recruitment.RecruitmentMasterCode,
      RecruitmentMasterReferenceId: recruitment.RecruitmentMasterReferenceId,
      RecruitmentMasterReferenceName: recruitment.RecruitmentMasterReferenceName,
      RecruitmentMasterReferenceCode: recruitment.RecruitmentMasterReferenceCode,
      RecruitmentMasterNameOfCandidates: recruitment.RecruitmentMasterNameOfCandidates,
      RecruitmentMasterCityId: recruitment.RecruitmentMasterCityId,
      RecruitmentMasterCompanyId: recruitment.RecruitmentMasterCompanyId,
      RecruitmentMasterCandidateEmailId: recruitment.RecruitmentMasterCandidateEmailId,
      RecruitmentMasterCandidateContactNumber: recruitment.RecruitmentMasterCandidateContactNumber,
      RecruitmentMasterAppropriateForJobRole: recruitment.RecruitmentMasterAppropriateForJobRole,
      RecruitmentMasterInterviewerEmployeeId: recruitment.RecruitmentMasterInterviewerEmployeeId,
      RecruitmentMasterInterviewerComment: recruitment.RecruitmentMasterInterviewerComment,
      RecruitmentMasterGradeId: recruitment.RecruitmentMasterGradeId,
      RecruitmentMasterDesignationId: recruitment.RecruitmentMasterDesignationId,
      RecruitmentMasterCurrentCTCPA: recruitment.RecruitmentMasterCurrentCTCPA,
      RecruitmentMasterExpectedCTCPA: recruitment.RecruitmentMasterExpectedCTCPA,
      RecruitmentMasterRecommendedCTCPA: recruitment.RecruitmentMasterRecommendedCTCPA,
      RecruitmentMasterExpectedJoiningDate: recruitment.RecruitmentMasterExpectedJoiningDate
        ? new Date(recruitment.RecruitmentMasterExpectedJoiningDate)
        : null,
      RecruitmentMasterHrcomment: recruitment.RecruitmentMasterHrcomment,
      RecruitmentMasterRecruitmentStageStatusId: recruitment.RecruitmentMasterRecruitmentStageStatusId,
      RecruitmentMasterOfferLetterStatus: recruitment.RecruitmentMasterOfferLetterStatus,
      RecruitmentMasterRemark: recruitment.RecruitmentMasterRemark,
      RecruitmentMasterAuthRemark: recruitment.RecruitmentMasterAuthRemark,
      RecruitmentMasterAuth: recruitment.RecruitmentMasterAuth,
      RecruitmentMasterIsDiscard: recruitment.RecruitmentMasterIsDiscard,
      RecruitmentMasterIsActive: recruitment.RecruitmentMasterIsActive,
      CreatedBy: recruitment.CreatedBy,
      CreatedDate: recruitment.CreatedDate ? new Date(recruitment.CreatedDate) : new Date()
      // RecruitmentDetails: result.recruitmentDetails || []

    });
  }

  loadAllDetails(): void {
    debugger
    const RecruitmentMasterId = this.data.recruitment.RecruitmentMasterId;
    this.Recruitmentmasterservice.getRecruitmentDetailsByMstId(RecruitmentMasterId).subscribe({
      next: res => {
        console.log('recruitment Details Fetched successfully:', res);
        // this.recruitmentDetails = res;
        this.Details = res;
        this.Details = res.map((d: any) => ({
          newRound: d.RecruitmentDetailsInterviewRoundNumber,
          newMarks: d.RecruitmentDetailsMarksObtained,
          newAttributeId: d.RecruitmentDetailsAttributeId,
        }));
      },
      error: err => {
        console.error('Error fetch responsibilities details:', err);
      },
    });
  }


  // Load Grade API
  loadAllRecruitmentGrade(): void {
    this.Recruitmentmasterservice.getAllGrade().subscribe({
      next: res => {
        this.gradeList = res;
        console.log("All Grade", this.gradeList);
        if (this.isEditMode && this.data) {
          this.setRecruitmentGradeForEdit();
        }
      },
      error: err => console.error('Error loading grades', err)
    });
  }

  private setRecruitmentGradeForEdit(): void {
    let GradeId = null;
    const recruitmentData = this.data.recruitment;

    if (recruitmentData?.GradeName) {
      const grade = this.gradeList.find(
        g => g.GradeName?.trim() === recruitmentData.GradeName?.trim()
      );
      GradeId = grade ? grade.GradeId : null;
      console.log('Found grade by name:', GradeId, 'for name:', recruitmentData.GradeName);
    }

    if (GradeId) {
      this.RecruitmentForm.patchValue({
        RecruitmentMasterGradeId: GradeId,
      });
      console.log('Grade set in form:', GradeId);
    } else {
      console.log('No grade ID found for name:', recruitmentData?.GradeName);
    }
  }

  // Load Designation API
  loadAllRecruitmentDesignation(): void {
    this.Recruitmentmasterservice.getAllDesignations().subscribe({
      next: res => {
        this.designationList = res;
        if (this.isEditMode && this.data) {
          this.setRecruitmentDesignationForEdit();
        }
      },
      error: err => console.error('Error loading designations', err)
    });
  }

  private setRecruitmentDesignationForEdit(): void {
    let DesignationId = null;
    const recruitmentData = this.data.recruitment;

    if (recruitmentData?.DesignationName) {
      const designation = this.designationList.find(
        d => d.DesignationName?.trim() === recruitmentData.DesignationName?.trim()
      );
      DesignationId = designation ? designation.DesignationId : null;
      console.log('Found designation by name:', DesignationId, 'for name:', recruitmentData.DesignationName);
    }

    if (DesignationId) {
      this.RecruitmentForm.patchValue({
        RecruitmentMasterDesignationId: DesignationId,
      });
      console.log('Designation set in form:', DesignationId);
    } else {
      console.log('No designation ID found for name:', recruitmentData?.DesignationName);
    }
  }




  loadAllCity(): void {
    this.Recruitmentmasterservice.getAllCity().subscribe({
      next: res => {
        this.CityList = res;
        console.log('Company  loaded:', res);
        this.filteredCityList = [...this.CityList];
        this.CitySearchControl.valueChanges.subscribe((value: any) => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCityList = this.CityList.filter(city =>
            city.CityName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCityForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Company:', err);
      },
    });
  }


  private setCityForEdit(): void {

    let CityId = null;
    const companyData = this.data.recruitment;

    if (companyData?.CityName) {
      const Company = this.CityList.find(
        p => p.CityName.trim().toLowerCase() === companyData.CityName.trim().toLowerCase()
      );
      CityId = Company ? Company.CityId : null; // 🔥 use correct property name
      console.log('Found Company Name by name:', CityId, 'for Company:', companyData.CityName);
    }

    if (CityId) {
      this.RecruitmentForm.patchValue({
        RecruitmentMasterCityId: CityId,
      });
      console.log('Company set in form:', CityId);
    } else {
      console.log('No Company ID found for Company Name:', companyData?.CityName);
    }
  }


  loadAllCompany(): void {
    this.Recruitmentmasterservice.getAllRecruitmentMasterCompany().subscribe({
      next: res => {
        this.CompanyList = res;
        console.log('Company  loaded:', res);
        this.filteredCompanyList = [...this.CompanyList];
        this.CompanySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCompanyList = this.CompanyList.filter(company =>
            company.CompanyName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCompanyForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Company:', err);
      },
    });
  }

  private setCompanyForEdit(): void {

    let CompanyId = null;
    const companyData = this.data.recruitment;

    if (companyData?.CompanyName) {
      const Company = this.CompanyList.find(
        p => p.CompanyName.trim().toLowerCase() === companyData.CompanyName.trim().toLowerCase()
      );
      CompanyId = Company ? Company.CompanyId : null; // 🔥 use correct property name
      console.log('Found Company Name by name:', CompanyId, 'for Company:', companyData.CompanyName);
    }

    if (CompanyId) {
      this.RecruitmentForm.patchValue({
        RecruitmentMasterCompanyId: CompanyId,
      });
      console.log('Company set in form:', CompanyId);
    } else {
      console.log('No Company ID found for Company Name:', companyData?.CompanyName);
    }
  }

  // Load RecruitmentReference API
  loadAllReference(): void {
    this.Recruitmentmasterservice.getAllRecruitmentMasterReference().subscribe({
      next: res => {
        this.RecruitmentReferenceList = res;
        console.log("RecruitmentReferenceList", this.RecruitmentReferenceList);
        if (this.isEditMode && this.data) {
          this.setReferenceForEdit();
        }
      },
      error: err => console.error('Error loading references', err)
    });
  }

  private setReferenceForEdit(): void {
    let RecruitmentReferenceId = null;
    const recruitmentData = this.data.recruitment;

    if (recruitmentData?.RecruitmentReferenceName) {
      const reference = this.RecruitmentReferenceList.find(
        r => r.RecruitmentReferenceName?.trim() === recruitmentData.RecruitmentReferenceName?.trim()
      );
      RecruitmentReferenceId = reference ? reference.RecruitmentReferenceId : null;
      console.log('Found reference by name:', RecruitmentReferenceId, 'for name:', recruitmentData.RecruitmentReferenceName);
    }

    if (RecruitmentReferenceId) {
      this.RecruitmentForm.patchValue({
        RecruitmentMasterReferenceId: RecruitmentReferenceId,
      });
      console.log('Reference set in form:', RecruitmentReferenceId);
    } else {
      console.log('No reference ID found for name:', recruitmentData?.RecruitmentReferenceName);
    }
  }

  // Load Status Stage API
  loadAllStatusStage(): void {
    this.Recruitmentmasterservice.getAllStatusStage().subscribe({
      next: res => {
        this.StatusStageList = res;
        console.log("StatusStageList", this.StatusStageList);
        if (this.isEditMode && this.data) {
          this.setStatusStageForEdit();
        }
      },
      error: err => console.error('Error loading status stages', err)
    });
  }

  private setStatusStageForEdit(): void {
    let RecruitmentStageStatusId = null;
    const recruitmentData = this.data.recruitment;

    if (recruitmentData?.RecruitmentStageStatusName) {
      const statusStage = this.StatusStageList.find(
        s => s.RecruitmentStageStatusName?.trim() === recruitmentData.RecruitmentStageStatusName?.trim()
      );
      RecruitmentStageStatusId = statusStage ? statusStage.RecruitmentStageStatusId : null;
      console.log('Found status stage by name:', RecruitmentStageStatusId, 'for name:', recruitmentData.RecruitmentStageStatusName);
    }

    if (RecruitmentStageStatusId) {
      this.RecruitmentForm.patchValue({
        RecruitmentMasterRecruitmentStageStatusId: RecruitmentStageStatusId,
      });
      console.log('Status stage set in form:', RecruitmentStageStatusId);
    } else {
      console.log('No status stage ID found for name:', recruitmentData?.RecruitmentStageStatusName);
    }
  }



  loadAllAttribute(): void {
    console.log("AttributeList", this.AttributeList);
    this.Recruitmentmasterservice.getAllAttribute().subscribe({
      next: res => {
        this.AttributeList = res;
        console.log("AttributeList", this.AttributeList);
        if (this.isEditMode && this.data) {
          this.setAttributeForEdit();
        }
      },
      error: err => console.error('Error loading attributes', err)
    });
  }

  private setAttributeForEdit(): void {
    debugger
    let RecruitmentAttributeId = null;
    const recruitmentData = this.data.recruitment;

    if (recruitmentData?.RecruitmentAttributeName) {
      const attribute = this.AttributeList.find(
        a => a.RecruitmentAttributeName?.trim() === recruitmentData.RecruitmentAttributeName?.trim()
      );
      RecruitmentAttributeId = attribute ? attribute.RecruitmentAttributeId : null;
      console.log('Found attribute:', RecruitmentAttributeId, 'for name:', recruitmentData.RecruitmentAttributeName);
    }

    if (RecruitmentAttributeId) {
      this.RecruitmentForm.patchValue({
        recruitmentDetailsAttributeId: RecruitmentAttributeId,
      });
      console.log('Attribute set in form:', RecruitmentAttributeId);
    } else {
      console.log('No attribute ID found for name:', recruitmentData?.RecruitmentAttributeName);
    }
  }


  // Load Employee API
  loadAllEmployee(): void {
    debugger
    this.Recruitmentmasterservice.getAllEmployeeId().subscribe({
      next: res => {
        this.EmployeeList = res;
        console.log("EmployeeList", this.EmployeeList);
        if (this.isEditMode && this.data) {
          this.setEmployeeForEdit();
        }
      },
      error: err => console.error('Error loading employees', err)
    });
  }

  private setEmployeeForEdit(): void {
    debugger
    let EmployeeMasterId = null;
    const recruitmentData = this.data.recruitment;

    if (recruitmentData?.RecruiterFullName) {
      const employee = this.EmployeeList.find(
        e => e.EmployeeMasterFullName?.trim() === recruitmentData.RecruiterFullName?.trim()
      );
      EmployeeMasterId = employee ? employee.EmployeeMasterId : null;
      console.log('Found employee by name:', EmployeeMasterId, 'for name:', recruitmentData.RecruiterFullName);
    }

    if (EmployeeMasterId) {
      this.RecruitmentForm.patchValue({
        RecruitmentMasterInterviewerEmployeeId: EmployeeMasterId,
      });
      console.log('Employee set in form:', EmployeeMasterId);
    } else {
      console.log('No employee ID found for name:', recruitmentData?.EmployeeMasterFullName);
    }
  }

  // Load Designation API
  loadAllRecruitmentPosition(): void {
    debugger
    this.Recruitmentmasterservice.getAllpositionId().subscribe({
      next: res => {
        this.positionList = res;
        if (this.isEditMode && this.data) {
          this.setRecruitmentpositionForEdit();
        }
      },
      error: err => console.error('Error loading designations', err)
    });
  }

  private setRecruitmentpositionForEdit(): void {
    debugger
    let PositionMasterId = null;
    const recruitmentData = this.data.recruitment;

    if (recruitmentData?.RecruitmentMasterPositionName) {
      const designation = this.positionList.find(
        d => d.PositionMasterName?.trim() === recruitmentData.RecruitmentMasterPositionName?.trim()
      );
      PositionMasterId = designation ? designation.PositionMasterId : null;
      console.log('Found designation by name:', PositionMasterId, 'for name:', recruitmentData.RecruitmentMasterPositionName);
    }

    if (PositionMasterId) {
      this.RecruitmentForm.patchValue({
        RecruitmentMasterPositionId: PositionMasterId,
      });
      console.log('Designation set in form:', PositionMasterId);
    } else {
      console.log('No designation ID found for name:', recruitmentData?.RecruitmentMasterPositionName);
    }
  }


  onSubmit(): void {
    debugger
    if (this.RecruitmentForm.valid) {
      this.RecruitmentForm.enable(); // Ensure all fields included

      const payload = {
        ...this.RecruitmentForm.value,
        RecruitmentDetails: this.Details//this.recruitmentDetails  // Must match backend property name exactly
      };

      console.log('Final Payload Sent:', payload);

      this.dialogRef.close(payload);
    } else {
      this.RecruitmentForm.markAllAsTouched();
    }

  }


  addDetailRow(): void {
    debugger;

    // validation
    if (this.newRound == null || this.newMarks == null || this.newAttributeId == null) {
      alert('Please fill all fields before adding.');
      return;
    }

    // check if same round + attribute already exists
    const exists = this.Details.some(
      d =>
        d.newRound === this.newRound &&
        d.newMarks === this.newMarks &&
        d.newAttributeId === this.newAttributeId
    );

    if (exists) {
      alert('This round with the selected attribute already exists!');
      return;
    }

    // add new row
    this.Details.push({
      newRound: this.newRound,
      newMarks: this.newMarks,
      newAttributeId: this.newAttributeId
    });

    // reset inputs
    this.newRound = null;
    this.newMarks = null;
    this.newAttributeId = null;

    console.log('recruitmentDetails:', this.Details);
  }

  deleteDetailRow(index: number): void {
    this.Details.splice(index, 1);
  }




  onCancel(): void {
    this.dialogRef.close();
  }


  editDetailRow(index: number): void {
    const current = this.Details[index];
    this.Details[index] = {
      ...current,
      newRound: current.newRound,
      newMarks: current.newMarks,
      newAttributeId: current.newAttributeId
    };
    this.editIndex = index;
  }

  updateDetailRow(index: number): void {
    debugger
    const current = this.Details[index];

    // Validation
    if (!current.newRound || !current.newMarks || !current.newAttributeId) {
      alert('Please fill all fields before updating.');
      return;
    }

    // Duplicate check
    const duplicate = this.Details.some(
      (d, i) =>
        i !== index &&
        d.newRound === current.newRound &&
        d.newMarks === current.newMarks &&
        d.newAttributeId === current.newAttributeId
    );

    if (duplicate) {
      alert('This round + attribute combination already exists!');
      return;
    }

    // Update saved values
    this.Details[index] = {
      ...current,
      newRound: current.newRound,
      newMarks: current.newMarks,
      newAttributeId: current.newAttributeId
    };

    this.editIndex = null;
  }

  // Real-time typing restrictions
  allowAlphanumeric(event: KeyboardEvent) {
    const pattern = /^[A-Za-z0-9]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  allowLettersAndSpace(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const input = event.target as HTMLInputElement;
    if (!pattern.test(event.key) || (input.selectionStart === 0 && event.key === ' ')) {
      event.preventDefault();
    }
  }

  // Optional: prevent invalid paste for name fields
  blockInvalidPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text') || '';
    const pattern = /^[A-Za-z ]+$/;
    if (!pattern.test(clipboardData)) {
      event.preventDefault();
    }
  }



  allowNumbersOnly(event: KeyboardEvent) {
    const pattern = /^[0-9]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }


}





