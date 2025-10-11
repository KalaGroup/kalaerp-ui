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
import { Erppageassignmentrelationshipservice } from '@shared/services/hr/ERPPageAssignmentRelationship/ERPPageAssignmentRelationshipservice';
import { HttpClient } from '@angular/common/http';


interface Row {
  ErppageAssignmentRelationshipDetailsPageId: number;
  ErppageAssignmentRelationshipDetailschecker1PositiontId: number;
  ErppageAssignmentRelationshipDetailschecker2PositiontId: number;
  ErppageAssignmentRelationshipDetailschecker3PositiontId: number;
  ErppageAssignmentRelationshipDetailschecker4PositiontId: number;
  ErppageAssignmentRelationshipDetailschecker5PositiontId: number;
  ErppageAssignmentRelationshipDetailsRemark: string;
  ErppageAssignmentRelationshipDetailsIsDiscard: boolean;
  ErppageAssignmentRelationshipDetailsIsActive: boolean
  isEdit?: boolean;

}


@Component({
  selector: 'app-add-edit-pageassignmentrelationship',
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
    FormsModule
  ],
  templateUrl: './add-edit-pageassignmentrelationship.html',
  styleUrl: './add-edit-pageassignmentrelationship.scss'
})
export class AddEditPageassignmentrelationship implements OnInit {
  ERPForm!: FormGroup;
  isEditMode: boolean = false;
  relationshiptypeList: any[] = [];
  code: string = '';
  relationshiptypeSearchControl = new FormControl('');
  filteredrelationshiptypeList: any[] = [];
  editIndex: number | null = null;
  divisionList: any[] = [];
  departmentList: any[] = [];
  profitCenterList: any[] = [];
  filteredDepartmentList: any[] = [];
  DepartmentList: any[] = [];
  DepartmentSearchControl = new FormControl('');

  //---------------------Details------------
  Details: {
    ErppageAssignmentRelationshipDetailsPageId: number;
    ErppageAssignmentRelationshipDetailschecker1PositiontId: number;
    ErppageAssignmentRelationshipDetailschecker2PositiontId: number;
    ErppageAssignmentRelationshipDetailschecker3PositiontId: number;
    ErppageAssignmentRelationshipDetailschecker4PositiontId: number;
    ErppageAssignmentRelationshipDetailschecker5PositiontId: number;
    ErppageAssignmentRelationshipDetailsRemark: string;
    ErppageAssignmentRelationshipDetailsIsDiscard: boolean;
    ErppageAssignmentRelationshipDetailsIsActive: boolean
  }[] = [];

  PageTittelList: any[] = [];
  positionList: any[] = [];


  ErppageAssignmentRelationshipDetailsPageId: number | null = null;
  ErppageAssignmentRelationshipDetailschecker1PositiontId: number | null = null;
  ErppageAssignmentRelationshipDetailschecker2PositiontId: number | null = null;
  ErppageAssignmentRelationshipDetailschecker3PositiontId: number | null = null;
  ErppageAssignmentRelationshipDetailschecker4PositiontId: number | null = null;
  ErppageAssignmentRelationshipDetailschecker5PositiontId: number | null = null;
  ErppageAssignmentRelationshipDetailsRemark: string | null = null;
  // ErppageAssignmentRelationshipDetailsIsDiscard: boolean
  // ErppageAssignmentRelationshipDetailsIsActive: boolean





  constructor(
    private ERPpageassignmentrelationshipservice: Erppageassignmentrelationshipservice,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditPageassignmentrelationship>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.relationship;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllDivision();
    this.loadAllDepartment();
    this.loadAllProfitcenter();
    this.loadAllRecruitmentPosition();
    this.loadAllpagetittel();


  }

  private initializeForm(): void {
    const currentDate = new Date();

    this.ERPForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      ErppageAssignmentRelationshipId: [''],
      ErppageAssignmentRelationshipDivisionId: ['', Validators.required],
      ErppageAssignmentRelationshipDepartmentId: ['', Validators.required],
      ErppageAssignmentRelationshipProfitcenterId: ['', Validators.required],
      ErppageAssignmentRelationshipRemark: [''],
      ErppageAssignmentRelationshipAuth1Remark: [''],
      ErppageAssignmentRelationshipAuth2Remark: [''],
      ErppageAssignmentRelationshipAuth1: [{ value: true, disabled: !this.isEditMode }],
      ErppageAssignmentRelationshipAuth2: [{ value: true, disabled: !this.isEditMode }],
      ErppageAssignmentRelationshipIsActive: [{ value: true, disabled: !this.isEditMode }],
      ErppageAssignmentRelationshipIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: ['3'],
    });

    if (this.isEditMode && this.data?.relationship) {
      this.loadAllDetails();
      this.populateFormForEdit();
    }
  }
  private populateFormForEdit(): void {
    const relationship = this.data.relationship;
    this.ERPForm.patchValue({
      ErppageAssignmentRelationshipId: relationship.ErppageAssignmentRelationshipId,
      ErppageAssignmentRelationshipDivisionId: relationship.ErppageAssignmentRelationshipDivisionId,
      ErppageAssignmentRelationshipDepartmentId: relationship.ErppageAssignmentRelationshipDepartmentId,
      ErppageAssignmentRelationshipProfitcenterId: relationship.ErppageAssignmentRelationshipProfitcenterId,
      ErppageAssignmentRelationshipRemark: relationship.ErppageAssignmentRelationshipRemark,
      ErppageAssignmentRelationshipAuth1Remark: relationship.ErppageAssignmentRelationshipAuth1Remark,
      ErppageAssignmentRelationshipAuth2Remark: relationship.ErppageAssignmentRelationshipAuth2Remark,
      ErppageAssignmentRelationshipAuth1: relationship.ErppageAssignmentRelationshipAuth1,
      ErppageAssignmentRelationshipAuth2: relationship.ErppageAssignmentRelationshipAuth2,
      ErppageAssignmentRelationshipIsActive: relationship.ErppageAssignmentRelationshipIsActive,
      ErppageAssignmentRelationshipIsDiscard: relationship.ErppageAssignmentRelationshipIsDiscard,
      CreatedBy: 3,
      CreatedDate: relationship.CreatedDate ? new Date(relationship.CreatedDate) : new Date()
    });
  }
  loadAllDetails(): void {
    debugger
    const ErppageAssignmentRelationshipId = this.data.relationship.ErppageAssignmentRelationshipId;
    this.ERPpageassignmentrelationshipservice.getRelationshipDetailsByMstId(ErppageAssignmentRelationshipId).subscribe({
      next: res => {
        console.log('relationship Details Fetched successfully:', res);

        this.Details = res;
        this.Details = res.map((d: any) => ({
          ErppageAssignmentRelationshipDetailsPageId: d.ErppageAssignmentRelationshipDetailsPageId,
          ErppageAssignmentRelationshipDetailschecker1PositiontId: d.ErppageAssignmentRelationshipDetailschecker1PositiontId,
          ErppageAssignmentRelationshipDetailschecker2PositiontId: d.ErppageAssignmentRelationshipDetailschecker2PositiontId,
          ErppageAssignmentRelationshipDetailschecker3PositiontId: d.ErppageAssignmentRelationshipDetailschecker3PositiontId,
          ErppageAssignmentRelationshipDetailschecker4PositiontId: d.ErppageAssignmentRelationshipDetailschecker4PositiontId,
          ErppageAssignmentRelationshipDetailschecker5PositiontId: d.ErppageAssignmentRelationshipDetailschecker5PositiontId,
          ErppageAssignmentRelationshipDetailsRemark: d.ErppageAssignmentRelationshipDetailsRemark,
          ErppageAssignmentRelationshipDetailsIsDiscard: d.ErppageAssignmentRelationshipDetailsIsDiscard,
          ErppageAssignmentRelationshipDetailsIsActive: d.ErppageAssignmentRelationshipDetailsIsActive,
        }));
      },
      error: err => {
        console.error('Error fetch relationship details:', err);
      },
    });
  }



  loadAllRecruitmentPosition(): void {
    this.ERPpageassignmentrelationshipservice.getAllpositionId().subscribe({
      next: res => {
        this.positionList = res;
        if (this.isEditMode && this.data) {
          this.setRecruitmentpositionForEdit();
        }
      },
      error: err => console.error('Error loading positions', err)
    });
  }

  private setRecruitmentpositionForEdit(): void {
    let PositionMasterId = null;
    const recruitmentData = this.data.relationship;

    if (recruitmentData?.PositionMasterName) {
      const designation = this.positionList.find(
        d => d.PositionMasterName?.trim() === recruitmentData.PositionMasterName?.trim()
      );
      PositionMasterId = designation ? designation.PositionMasterId : null;
      console.log('Found designation by name:', PositionMasterId);
    }

    if (PositionMasterId) {
      this.ERPForm.patchValue({
        ErppageAssignmentRelationshipDetailschecker1PositiontId: PositionMasterId,
      });
    }
  }


  loadAllpagetittel(): void {
    debugger
    this.ERPpageassignmentrelationshipservice.getAllpagetittel().subscribe({
      next: res => {
        this.PageTittelList = res;
        if (this.isEditMode && this.data) {
          this.setpagetittelForEdit();
        }
      },
      error: err => console.error('Error loading designations', err)
    });
  }

  private setpagetittelForEdit(): void {
    debugger
    let KalaErppageDetailsId = null;
    const pageData = this.data.relationship;

    if (pageData?.PageTittle) {
      const designation = this.positionList.find(
        d => d.PositionMasterName?.trim() === pageData.RecruitmentMasterPositionName?.trim()
      );
      KalaErppageDetailsId = designation ? designation.KalaErppageDetailsId : null;
      console.log('Found designation by name:', KalaErppageDetailsId, 'for name:', pageData.PageTittle);
    }

    if (KalaErppageDetailsId) {
      this.ERPForm.patchValue({
        ErppageAssignmentRelationshipDetailsPageId: KalaErppageDetailsId,
      });
      console.log('Designation set in form:', KalaErppageDetailsId);
    } else {
      console.log('No designation ID found for name:', pageData?.PageTittle);
    }
  }


  loadAllDivision(): void {
    debugger
    this.ERPpageassignmentrelationshipservice.getAllDivision().subscribe({
      next: res => {
        this.divisionList = res;
        console.log("Division list loaded:", this.divisionList);

        if (this.isEditMode && this.data?.relationship) {
          this.setDivisionForEdit();
        }
      },
      error: err => console.error('Error loading divisions:', err)
    });
  }



  private setDivisionForEdit(): void {
    debugger;
    let DivisionId: number | null = null;
    const divisionData = this.data.relationship;

    if (divisionData?.DivisionName) {
      const Division = this.divisionList.find(
        p =>
          p.DivisionName.trim().toLowerCase() ===
          divisionData.DivisionName.trim().toLowerCase()
      );

      DivisionId = Division ? Division.DivisionId : null; // 🔥 use correct property name
      console.log('Found DivisionName by name:', DivisionId, 'for ProfitCenter:', divisionData.DivisionName);
    }

    if (DivisionId) {
      this.ERPForm.patchValue({
        ErppageAssignmentRelationshipDivisionId: DivisionId,
      });
      console.log('ProfitCenter set in form:', DivisionId);
    } else {
      console.log('No ProfitCenter ID found for ProfitCenter Name:', divisionData?.DivisionName);
    }
  }


  loadAllDepartment(): void {
    this.ERPpageassignmentrelationshipservice.getAllDepartment().subscribe({
      next: res => {
        this.departmentList = res || [];
        console.log('Departments loaded:', this.departmentList);

        this.filteredDepartmentList = [...this.departmentList];

        this.DepartmentSearchControl.valueChanges.subscribe((value) => {
          const filterValue = (value || '').toLowerCase();
          this.filteredDepartmentList = this.departmentList.filter(department =>
            department.DepartmentName?.toLowerCase().includes(filterValue)
          );
        });

        if (this.isEditMode && this.data?.relationship) {
          this.setDepartmentForEdit();
        }
      },
      error: err => console.error('Failed to load Department:', err)
    });
  }

  private setDepartmentForEdit(): void {
    const departmentData = this.data.relationship;
    if (!departmentData?.DepartmentName) return;

    const foundDept = this.departmentList.find(
      p => p.DepartmentName?.trim().toLowerCase() === departmentData.DepartmentName?.trim().toLowerCase()
    );

    if (foundDept) {
      this.ERPForm.patchValue({
        ErppageAssignmentRelationshipDepartmentId: foundDept.DepartmentId
      });
      console.log('Department set in form:', foundDept.DepartmentId);
    }
  }

  loadAllProfitcenter(): void {
    this.ERPpageassignmentrelationshipservice.getAllProfitcenter().subscribe({
      next: res => {
        this.profitCenterList = res;
        console.log('All profitcenter budgets:', this.profitCenterList);
        if (this.isEditMode && this.data) {
          this.setProfitcenterbudgetForEdit();
        }
      },
      error: err => console.error('Error loading profitcenters', err)
    });
  }

  private setProfitcenterbudgetForEdit(): void {
    const ProfitCenterData = this.data.relationship;
    if (ProfitCenterData?.ProfitCenterName) {
      const match = this.profitCenterList.find(
        p => p.ProfitCenterName?.trim() === ProfitCenterData.ProfitCenterName?.trim()
      );
      if (match) {
        this.ERPForm.patchValue({
          ErppageAssignmentRelationshipProfitcenterId: match.ProfitCenterId
        });
      }
    }
  }

  onSubmit(): void {
    debugger
    if (this.ERPForm.valid) {
      this.ERPForm.enable(); // Ensure all fields included

      const payload = {
        ...this.ERPForm.value,
        RelationshipDetails: this.Details//this.recruitmentDetails  // Must match backend property name exactly
      };

      console.log('Final Payload Sent:', payload);

      this.dialogRef.close(payload);
    } else {
      this.ERPForm.markAllAsTouched();
    }
  }

  addDetailRow(): void {
    debugger
    if (this.ErppageAssignmentRelationshipDetailsPageId == null ||
      this.ErppageAssignmentRelationshipDetailschecker1PositiontId == null ||
      this.ErppageAssignmentRelationshipDetailschecker2PositiontId == null ||
      this.ErppageAssignmentRelationshipDetailschecker3PositiontId == null ||
      this.ErppageAssignmentRelationshipDetailschecker4PositiontId == null ||
      this.ErppageAssignmentRelationshipDetailschecker5PositiontId == null ||
      this.ErppageAssignmentRelationshipDetailsRemark == null) {
      return;
    }

    const exists = this.Details.some(

      d =>
        d.ErppageAssignmentRelationshipDetailsPageId == this.ErppageAssignmentRelationshipDetailsPageId &&
        d.ErppageAssignmentRelationshipDetailschecker1PositiontId == this.ErppageAssignmentRelationshipDetailschecker1PositiontId &&
        d.ErppageAssignmentRelationshipDetailschecker2PositiontId == this.ErppageAssignmentRelationshipDetailschecker2PositiontId &&
        d.ErppageAssignmentRelationshipDetailschecker3PositiontId == this.ErppageAssignmentRelationshipDetailschecker3PositiontId &&
        d.ErppageAssignmentRelationshipDetailschecker4PositiontId == this.ErppageAssignmentRelationshipDetailschecker4PositiontId &&
        d.ErppageAssignmentRelationshipDetailschecker5PositiontId == this.ErppageAssignmentRelationshipDetailschecker5PositiontId &&
        d.ErppageAssignmentRelationshipDetailsRemark == this.ErppageAssignmentRelationshipDetailsRemark
    );
    if (exists) {
      alert('This round with the selected attribute already exists!');
      return;
    }


    this.Details.push({

      ErppageAssignmentRelationshipDetailsPageId: this.ErppageAssignmentRelationshipDetailsPageId,
      ErppageAssignmentRelationshipDetailschecker1PositiontId: this.ErppageAssignmentRelationshipDetailschecker1PositiontId,
      ErppageAssignmentRelationshipDetailschecker2PositiontId: this.ErppageAssignmentRelationshipDetailschecker2PositiontId,
      ErppageAssignmentRelationshipDetailschecker3PositiontId: this.ErppageAssignmentRelationshipDetailschecker3PositiontId,
      ErppageAssignmentRelationshipDetailschecker4PositiontId: this.ErppageAssignmentRelationshipDetailschecker4PositiontId,
      ErppageAssignmentRelationshipDetailschecker5PositiontId: this.ErppageAssignmentRelationshipDetailschecker5PositiontId,
      ErppageAssignmentRelationshipDetailsRemark: this.ErppageAssignmentRelationshipDetailsRemark?.trim() || '',
      ErppageAssignmentRelationshipDetailsIsActive: true,   // default active
      ErppageAssignmentRelationshipDetailsIsDiscard: true  // default not discarded
    });

    // Reset all input fields after adding a row
    this.ErppageAssignmentRelationshipDetailsPageId = null;
    this.ErppageAssignmentRelationshipDetailschecker1PositiontId = null;
    this.ErppageAssignmentRelationshipDetailschecker2PositiontId = null;
    this.ErppageAssignmentRelationshipDetailschecker3PositiontId = null;
    this.ErppageAssignmentRelationshipDetailschecker4PositiontId = null;
    this.ErppageAssignmentRelationshipDetailschecker5PositiontId = null;
    this.ErppageAssignmentRelationshipDetailsRemark = '';
    // this.ErppageAssignmentRelationshipDetailsIsActive = true;
    // this.ErppageAssignmentRelationshipDetailsIsDiscard = false;
    console.log('RelationshipDetails:', this.Details)

  }

  editDetailRow(index: number): void {
    debugger
    const current = this.Details[index];
    this.Details[index] = {
      ...current,
      ErppageAssignmentRelationshipDetailsPageId: current.ErppageAssignmentRelationshipDetailsPageId,
      ErppageAssignmentRelationshipDetailschecker1PositiontId: current.ErppageAssignmentRelationshipDetailschecker1PositiontId,
      ErppageAssignmentRelationshipDetailschecker2PositiontId: current.ErppageAssignmentRelationshipDetailschecker2PositiontId,
      ErppageAssignmentRelationshipDetailschecker3PositiontId: current.ErppageAssignmentRelationshipDetailschecker3PositiontId,
      ErppageAssignmentRelationshipDetailschecker4PositiontId: current.ErppageAssignmentRelationshipDetailschecker4PositiontId,
      ErppageAssignmentRelationshipDetailschecker5PositiontId: current.ErppageAssignmentRelationshipDetailschecker5PositiontId,
      ErppageAssignmentRelationshipDetailsRemark: current.ErppageAssignmentRelationshipDetailsRemark
    };
    this.editIndex = index;
  }

  updateDetailRow(index: number): void {
    debugger
    const current = this.Details[index];

    // Duplicate check
    const duplicate = this.Details.some(
      (d, i) =>
        i !== index &&
        d.ErppageAssignmentRelationshipDetailsPageId == current.ErppageAssignmentRelationshipDetailsPageId &&
        d.ErppageAssignmentRelationshipDetailschecker1PositiontId == current.ErppageAssignmentRelationshipDetailschecker1PositiontId &&
        d.ErppageAssignmentRelationshipDetailschecker2PositiontId == current.ErppageAssignmentRelationshipDetailschecker2PositiontId &&
        d.ErppageAssignmentRelationshipDetailschecker3PositiontId == current.ErppageAssignmentRelationshipDetailschecker3PositiontId &&
        d.ErppageAssignmentRelationshipDetailschecker4PositiontId == current.ErppageAssignmentRelationshipDetailschecker4PositiontId &&
        d.ErppageAssignmentRelationshipDetailschecker5PositiontId == current.ErppageAssignmentRelationshipDetailschecker5PositiontId &&
        d.ErppageAssignmentRelationshipDetailsRemark == current.ErppageAssignmentRelationshipDetailsRemark
    );
    if (duplicate) {
      alert('This  already exists!');
      return;
    }

    // Update saved values
    this.Details[index] = {
      ...current,
      ErppageAssignmentRelationshipDetailsPageId: current.ErppageAssignmentRelationshipDetailsPageId,
      ErppageAssignmentRelationshipDetailschecker1PositiontId: current.ErppageAssignmentRelationshipDetailschecker1PositiontId,
      ErppageAssignmentRelationshipDetailschecker2PositiontId: current.ErppageAssignmentRelationshipDetailschecker2PositiontId,
      ErppageAssignmentRelationshipDetailschecker3PositiontId: current.ErppageAssignmentRelationshipDetailschecker3PositiontId,
      ErppageAssignmentRelationshipDetailschecker4PositiontId: current.ErppageAssignmentRelationshipDetailschecker4PositiontId,
      ErppageAssignmentRelationshipDetailschecker5PositiontId: current.ErppageAssignmentRelationshipDetailschecker5PositiontId,
      ErppageAssignmentRelationshipDetailsRemark: current.ErppageAssignmentRelationshipDetailsRemark

    };
    this.editIndex = null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  deleteDetailRow(index: number): void {
    this.Details.splice(index, 1);
  }


}




