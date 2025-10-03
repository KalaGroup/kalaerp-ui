

import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import { IRecruitmentMaster } from '@shared/interfaces/hr/RecruitmentMaster';
import { recruitmentmasterservice } from '@shared/services/hr/RecruitmentMaster/recruitmentmaster';
import { AddEditRecruitment } from './add-edit-recruitment/add-edit-recruitment';

@Component({
  selector: 'app-recruitmentmaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './recruitmentmaster.html',
  styleUrl: './recruitmentmaster.scss'
})
export class Recruitmentmaster {

  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  Recruitment: IRecruitmentMaster[] = [];
  showForm = false;
  activtiyModel: any = {};
  editIndex: number | null = null;
  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  recruitmentDetails: any[] = []; // table rows

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private Recruitmentmasterservice: recruitmentmasterservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.loadAllRecruitment();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      width: '80px',
    },
    {
      header: this.translate.stream('Position'),
      field: 'RecruitmentMasterPositionName', // ✅ Show name instead of ID
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Code'),
      field: 'RecruitmentMasterCode',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Reference'),
      field: 'RecruitmentReferenceName', // ✅ Show name instead of ID
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Candidate Name'),
      field: 'RecruitmentMasterNameOfCandidates',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('City'),
      field: 'CityName', // ✅ Show name instead of ID
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Company'),
      field: 'CompanyName', // ✅ Show name instead of ID
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Email'),
      field: 'RecruitmentMasterCandidateEmailId',
      sortable: true,
      minWidth: 180,
    },
    {
      header: this.translate.stream('Contact'),
      field: 'RecruitmentMasterCandidateContactNumber',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Job Role Fit'),
      field: 'RecruitmentMasterAppropriateForJobRole',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Interviewer'),
      field: 'RecruitmentMasterInterviewerComment', // ✅ Show name instead of ID
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Grade'),
      field: 'GradeName', // ✅ Show name instead of ID
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Designation'),
      field: 'DesignationName', // ✅ Show name instead of ID
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Current CTC'),
      field: 'RecruitmentMasterCurrentCTCPA',
      sortable: true,
      minWidth: 120,
      type: 'number'
    },
    {
      header: this.translate.stream('Expected CTC'),
      field: 'RecruitmentMasterExpectedCTCPA',
      sortable: true,
      minWidth: 120,
      type: 'number'
    },
    {
      header: this.translate.stream('Recommended CTC'),
      field: 'RecruitmentMasterRecommendedCTCPA',
      sortable: true,
      minWidth: 140,
      type: 'number'
    },
    {
      header: this.translate.stream('Expected Joining'),
      field: 'RecruitmentMasterExpectedJoiningDate',
      sortable: true,
      minWidth: 130,
      type: 'date'
    },
    {
      header: this.translate.stream('Stage Status'),
      field: 'RecruitmentStageStatusName', // ✅ Show name instead of ID
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Offer Letter Status'),
      field: 'RecruitmentMasterOfferLetterStatus',
      sortable: true,
      minWidth: 140,
    },
    {
      header: this.translate.stream('Authorized'),
      field: 'RecruitmentMasterAuth',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'primary' },
        false: { text: 'No', color: 'warn' }
      }
    },
    {
      header: this.translate.stream('Discarded'),
      field: 'RecruitmentMasterIsDiscard',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'warn' },
        false: { text: 'No', color: 'primary' }
      }
    },
    {
      header: this.translate.stream('Active'),
      field: 'RecruitmentMasterIsActive',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'primary' },
        false: { text: 'No', color: 'warn' }
      }
    },
    {
      header: this.translate.stream('Action'),
      field: 'action',
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('edit'),
          click: (record: any) => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('close'),
            okText: this.translate.stream('ok'),
          },
          click: (record: any) => this.delete(record),
        },
      ],
    },
  ];

  loadAllRecruitment() {
    debugger
    this.isLoading = true;
    this.Recruitmentmasterservice.getAllRecruitmentMaster().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        this.isLoading = false;
        console.log('Recruitment data loaded:', this.list);
      },
      error: (err) => {
        console.error('Error fetching recruitment data:', err);
        this.toastService.showError('Failed to load recruitment data');
        this.isLoading = false;
      }
    });
  }

  edit(record: any) {
    debugger
    const dialogRef = this.dialog.open(AddEditRecruitment, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { recruitment: record },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('payload', result);
        return;
      }
      debugger
      const updatePayload = {
        RecruitmentMasterId: record.RecruitmentMasterId,
        RecruitmentMasterPositionId: result.RecruitmentMasterPositionId,
        RecruitmentMasterCode: result.RecruitmentMasterCode,
        RecruitmentMasterReferenceId: result.RecruitmentMasterReferenceId,
        RecruitmentMasterReferenceName: result.RecruitmentMasterReferenceName,
        RecruitmentMasterReferenceCode: result.RecruitmentMasterReferenceCode,
        RecruitmentMasterNameOfCandidates: result.RecruitmentMasterNameOfCandidates,
        RecruitmentMasterCityId: result.RecruitmentMasterCityId,
        RecruitmentMasterCompanyId: result.RecruitmentMasterCompanyId,
        RecruitmentMasterCandidateEmailId: result.RecruitmentMasterCandidateEmailId,
        RecruitmentMasterCandidateContactNumber: result.RecruitmentMasterCandidateContactNumber,
        RecruitmentMasterAppropriateForJobRole: result.RecruitmentMasterAppropriateForJobRole,
        RecruitmentMasterInterviewerEmployeeId: result.RecruitmentMasterInterviewerEmployeeId,
        RecruitmentMasterInterviewerComment: result.RecruitmentMasterInterviewerComment,
        RecruitmentMasterGradeId: result.RecruitmentMasterGradeId,
        RecruitmentMasterDesignationId: result.RecruitmentMasterDesignationId,
        RecruitmentMasterCurrentCTCPA: result.RecruitmentMasterCurrentCTCPA,
        RecruitmentMasterExpectedCTCPA: result.RecruitmentMasterExpectedCTCPA,
        RecruitmentMasterRecommendedCTCPA: result.RecruitmentMasterRecommendedCTCPA,
        RecruitmentMasterExpectedJoiningDate: result.RecruitmentMasterExpectedJoiningDate,
        RecruitmentMasterHrcomment: result.RecruitmentMasterHrcomment,
        RecruitmentMasterRecruitmentStageStatusId: result.RecruitmentMasterRecruitmentStageStatusId,
        RecruitmentMasterOfferLetterStatus: result.RecruitmentMasterOfferLetterStatus,
        RecruitmentMasterRemark: result.RecruitmentMasterRemark,
        RecruitmentMasterAuthRemark: result.RecruitmentMasterAuthRemark,
        RecruitmentMasterAuth: result.RecruitmentMasterAuth ?? true,
        RecruitmentMasterIsDiscard: result.RecruitmentMasterIsDiscard ?? false,
        RecruitmentMasterIsActive: result.RecruitmentMasterIsActive ?? true,
        CreatedBy: record.CreatedBy ?? 1,
        CreatedDate: record.CreatedDate, // ✅ Keep original creation date
        // ✅ Use correct property name from form result
        RecruitmentDetails: result.RecruitmentDetails || []
      };

      console.log('Update payload:', updatePayload);

      this.Recruitmentmasterservice.UpdateRecruitmentMaster(updatePayload).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.toastService.showSuccess("Recruitment updated successfully");
          this.loadAllRecruitment();
        },
        error: (err) => {
          console.error('Error updating Recruitment:', err);
          this.toastService.showError('Failed to update recruitment');
          this.loadAllRecruitment();
        }
      });
    });
  }

  openAddDialog() {

    const dialogRef = this.dialog.open(AddEditRecruitment, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        debugger
        console.log('payload', result);
        return;
      }

      const payload = {
        RecruitmentMasterPositionId: result.RecruitmentMasterPositionId || null,
        RecruitmentMasterCode: result.RecruitmentMasterCode,
        RecruitmentMasterReferenceId: result.RecruitmentMasterReferenceId,
        RecruitmentMasterReferenceName: result.RecruitmentMasterReferenceName,
        RecruitmentMasterReferenceCode: result.RecruitmentMasterReferenceCode,
        RecruitmentMasterNameOfCandidates: result.RecruitmentMasterNameOfCandidates,
        RecruitmentMasterCityId: result.RecruitmentMasterCityId,
        RecruitmentMasterCompanyId: result.RecruitmentMasterCompanyId,
        RecruitmentMasterCandidateEmailId: result.RecruitmentMasterCandidateEmailId,
        RecruitmentMasterCandidateContactNumber: result.RecruitmentMasterCandidateContactNumber,
        RecruitmentMasterAppropriateForJobRole: result.RecruitmentMasterAppropriateForJobRole,
        RecruitmentMasterInterviewerEmployeeId: result.RecruitmentMasterInterviewerEmployeeId,
        RecruitmentMasterInterviewerComment: result.RecruitmentMasterInterviewerComment,
        RecruitmentMasterGradeId: result.RecruitmentMasterGradeId,
        RecruitmentMasterDesignationId: result.RecruitmentMasterDesignationId,
        RecruitmentMasterCurrentCtcpa: result.RecruitmentMasterCurrentCtcpa,
        RecruitmentMasterExpectedCtcpa: result.RecruitmentMasterExpectedCtcpa,
        RecruitmentMasterRecommendedCtcpa: result.RecruitmentMasterRecommendedCtcpa,
        RecruitmentMasterExpectedJoiningDate: result.RecruitmentMasterExpectedJoiningDate,
        RecruitmentMasterHrcomment: result.RecruitmentMasterHrcomment,
        RecruitmentMasterRecruitmentStageStatusId: result.RecruitmentMasterRecruitmentStageStatusId,
        RecruitmentMasterOfferLetterStatus: result.RecruitmentMasterOfferLetterStatus,
        RecruitmentMasterRemark: result.RecruitmentMasterRemark,
        RecruitmentMasterAuthRemark: result.RecruitmentMasterAuthRemark,
        RecruitmentMasterAuth: result.RecruitmentMasterAuth ?? true,
        RecruitmentMasterIsDiscard: result.RecruitmentMasterIsDiscard ?? false,
        RecruitmentMasterIsActive: result.RecruitmentMasterIsActive ?? true,
        CreatedBy: 1,
        // ✅ Use correct property name from form result
        RecruitmentDetails: result.RecruitmentDetails || []
      };

      console.log('Add payload:', payload);

      this.Recruitmentmasterservice.insertRecruitmentMaster(payload).subscribe({
        next: (response) => {
          console.log('Add successful:', response);
          this.toastService.showSuccess('Recruitment added successfully');
          this.loadAllRecruitment();
        },
        error: (err) => {
          console.error('Error while adding Recruitment:', err);
          this.toastService.showError('Failed to add Recruitment. Please check inputs.');
        }
      });
    });
  }

  delete(value: any) {
    debugger
    if (!confirm('Are you sure you want to delete this recruitment record?')) {
      return;
    }

    console.log("Deleting RecruitmentMasterId:", value.RecruitmentMasterId);

    this.Recruitmentmasterservice.deleteRecruitmentMaster(value.RecruitmentMasterId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        this.toastService.showSuccess('Recruitment deleted successfully');
        this.loadAllRecruitment();
      },
      error: (err) => {
        console.error('Error deleting Recruitment:', err);
        this.toastService.showError('Failed to delete recruitment');
      }
    });
  }

  changeSelect(e: any) {
    console.log('Selection changed:', e);
  }

  changeSort(e: any) {
    console.log('Sort changed:', e);
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
