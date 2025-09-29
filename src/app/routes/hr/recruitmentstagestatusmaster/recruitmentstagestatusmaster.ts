/* eslint-disable @angular-eslint/prefer-inject */
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
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import { Country, Currency } from '@shared/interfaces/hr';
import { AddEditCurrency } from '../currencymaster/add-edit-currency/add-edit-currency';
import { id } from 'date-fns/locale';
import { AddEditRecruitmentstagestatus } from './add-edit-recruitmentstagestatus/add-edit-recruitmentstagestatus';
import { IRecruitmentstagestatusmaster } from '@shared/interfaces/hr/recruitmentstagestatusmaster';
import { Recruitmentstagestatusmasterservice } from '@shared/services/hr/Recruitmentstagestatusmaster/recruitmentstagestatusmasterservice';

@Component({
  selector: 'app-recruitmentstagestatusmaster',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MtxGridModule,
    PageHeader,
    MatDialogModule,
  ],
  templateUrl: './recruitmentstagestatusmaster.html',
  styleUrl: './recruitmentstagestatusmaster.scss',
})
export class Recruitmentstagestatusmaster implements OnInit {
  expandable: any;
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  // Grid settings
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
  columnResizable = false;

  isLoading = false;
  isConfigExpanded = false;
  list: IRecruitmentstagestatusmaster[] = [];
  RecruitmentStageStatusForm: any;

  constructor(
    private fb: FormBuilder,
    private hrService: Recruitmentstagestatusmasterservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {}

  ngOnInit(): void {
    this.loadAllRecruitmentStageStatuses();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  RecruitmentStageStatusMasterColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('Status Name'),
      field: 'RecruitmentStageStatusName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'RecruitmentStageStatusRemark',
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'RecruitmentStageStatusAuthRemark',
      minWidth: 150,
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'RecruitmentStageStatusIsActive',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Is Discarded'),
      field: 'RecruitmentStageStatusIsDiscard',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Action'),
      field: 'action',
      minWidth: 140,
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
          click: record => this.delete(record),
        },
      ],
    },
  ];

  loadAllRecruitmentStageStatuses() {
    this.hrService.getAll().subscribe({
      next: (data: IRecruitmentstagestatusmaster[]) => {
        console.log('Recruitment Stage Status data:', data);
        this.list = data.map((item: IRecruitmentstagestatusmaster, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
      },
      error: (err: any) => console.error('Error fetching recruitment stage statuses:', err),
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditRecruitmentstagestatus, {
        width: '80%',
        height: '40%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { RecruitmentStageStatus: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          const updatePayload: IRecruitmentstagestatusmaster = {
            RecruitmentStageStatusId: result.RecruitmentStageStatusId,
            RecruitmentStageStatusName: result.RecruitmentStageStatusName,
            RecruitmentStageStatusRemark: result.RecruitmentStageStatusRemark,
            RecruitmentStageStatusAuthRemark: result.RecruitmentStageStatusAuthRemark,
            RecruitmentStageStatusAuth: result.RecruitmentStageStatusAuth,
            RecruitmentStageStatusIsActive: result.RecruitmentStageStatusIsActive,
            RecruitmentStageStatusIsDiscard: result.RecruitmentStageStatusIsDiscard,
            CreatedBy: result.CreatedBy,
            CreatedDate: result.CreatedDate,
          };

          this.hrService.update(updatePayload).subscribe({
            next: response => {

               this.toastService.showSuccess('Recruitment Stage Status updated successfully');
              this.loadAllRecruitmentStageStatuses();
            },
            error: err => {
              console.error('Error updating Recruitment Stage Status:', err);
            }
          });
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditRecruitmentstagestatus, {
      width: '70%',
      height: '40%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('Added Recruitment Stage Status:', result);
        const statusData: IRecruitmentstagestatusmaster = {
          RecruitmentStageStatusId: 0,
          RecruitmentStageStatusName: result.RecruitmentStageStatusName,
          RecruitmentStageStatusRemark: result.RecruitmentStageStatusRemark,
          RecruitmentStageStatusAuthRemark: result.RecruitmentStageStatusAuthRemark,
          RecruitmentStageStatusAuth: result.RecruitmentStageStatusAuth,
          RecruitmentStageStatusIsActive: result.RecruitmentStageStatusIsActive,
          RecruitmentStageStatusIsDiscard: result.RecruitmentStageStatusIsDiscard,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date(),
        };
        console.log('Payload for adding Recruitment Stage Status:', statusData);
        // Call the service to insert the
        this.hrService.add(statusData).subscribe({
          next: response => {
            console.log('Recruitment Stage Status added successfully:', response);
             this.toastService.showSuccess('Recruitment Stage Status added successfully');

            this.loadAllRecruitmentStageStatuses();
          },
          error: err => {

            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.RecruitmentStageStatusForm.get(field)) {
                  this.RecruitmentStageStatusForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add Recruitment Stage Status. Please verify Recruitment Stage Status details and try again.'
              );
            }
          },
        });
      }
    });
  }
  delete(value: any) {
    this.hrService.delete(value.RecruitmentStageStatusId).subscribe({
      next: (response: any) => {
        console.log('Recruitment Stage Status deleted successfully:', response);
         this.toastService.showSuccess('Recruitment Stage Status deleted successfully');
      
        this.loadAllRecruitmentStageStatuses();
      },
      error: (err: any) => {
        console.error('Error deleting Recruitment Stage Status:', err);
      },
    });
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    //this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      (item as any).RandomValue = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
