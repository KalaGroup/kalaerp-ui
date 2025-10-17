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
import { IRecruitmentReferenceMaster } from '@shared/interfaces/hr/RecruitmentReferenceMaster';
import { Recruitmentreferencemasterservice } from '@shared/services/hr/RecruitmentReferenceMaster/recruitmentreferencemaster';
import { AddEditRecruitmentreference } from './add-edit-recruitmentreference/add-edit-recruitmentreference';

@Component({
  selector: 'app-recruitmentreferencemaster',
  imports: [CommonModule,
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
  templateUrl: './recruitmentreferencemaster.html',
  styleUrl: './recruitmentreferencemaster.scss'
})
export class Recruitmentreferencemaster implements OnInit {
  expandable: any;
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = true;
  showPaginator = true;
  columnResizable = false;


  isLoading = false;
  isConfigExpanded = false;
  list: IRecruitmentReferenceMaster[] = [];
  RecruitmentReferenceMasterForm: any;

  constructor(
    private fb: FormBuilder,
    private recruitmentreferencemasterservice: Recruitmentreferencemasterservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.loadAllRecruitmentReference();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  cityColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('RecruitmentReferenceName'),
      field: 'RecruitmentReferenceName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'RecruitmentReferenceRemark',
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth'),
      field: 'RecruitmentReferenceAuth',
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'RecruitmentReferenceAuthRemark',
      minWidth: 150,
    },
    {
      header: this.translate.stream('Is Discarded'),
      field: 'RecruitmentReferenceIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'RecruitmentReferenceIsActive',
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

  loadAllRecruitmentReference() {
    this.recruitmentreferencemasterservice.getAllRecruitmentrefernce().subscribe({
      next: (data: IRecruitmentReferenceMaster[]) => {
        console.log('Recruitment reference data:', data);
        this.list = data.map((item: IRecruitmentReferenceMaster, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
      },
      error: (err: any) => console.error('Error fetching recruitment stage statuses:', err),
    });
  }

  edit(record: any) {

    this.dialog
      .open(AddEditRecruitmentreference, {
        width: '60%',
        height: '40%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { RecruitmentReference: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {

          console.log('RecruitmentReference Updated:', result);
          const updatePayload: IRecruitmentReferenceMaster = {
            RecruitmentReferenceId: record.RecruitmentReferenceId,
            RecruitmentReferenceAuthRemark: result.RecruitmentReferenceAuthRemark,
            RecruitmentReferenceName: result.RecruitmentReferenceName || '',
            RecruitmentReferenceRemark: result.RecruitmentReferenceRemark,
            RecruitmentReferenceAuth: result.RecruitmentReferenceAuth,
            RecruitmentReferenceIsDiscard: result.RecruitmentReferenceIsDiscard,
            RecruitmentReferenceIsActive: result.RecruitmentReferenceIsActive,
            CreatedBy: result.CreatedBy,
            CreatedDate: result.CreatedDate,
          };

          console.log('Update payload:', updatePayload);
          this.recruitmentreferencemasterservice.updateRecruitmentreference(updatePayload).subscribe({
            next: () => {

              this.toastService.showSuccess("Recruitment reference updated successfully");
              this.loadAllRecruitmentReference();
            },
            error: (err) => {
              console.error('Error updating recruitment:', err);
            }
          });
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditRecruitmentreference, {
      width: '60%',
      height: '30%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const payload: IRecruitmentReferenceMaster = {
          RecruitmentReferenceId: 0, // Assuming 0 for new entries
          RecruitmentReferenceName: result.RecruitmentReferenceName,
          RecruitmentReferenceRemark: result.RecruitmentReferenceRemark,
          RecruitmentReferenceAuthRemark: result.RecruitmentReferenceAuthRemark,
          RecruitmentReferenceAuth: result.RecruitmentReferenceAuth,
          RecruitmentReferenceIsDiscard: result.RecruitmentReferenceIsDiscard,
          RecruitmentReferenceIsActive: result.RecruitmentReferenceIsActive,
          CreatedBy: 1, // Set appropriately
          CreatedDate: new Date()
        };

        this.recruitmentreferencemasterservice.insertRecruitmentReference(payload).subscribe({
          next: () => {

            this.toastService.showSuccess("Recruitment reference added successfully ");
            this.loadAllRecruitmentReference();
          },
          error: (err) => {
            console.error('Error while adding recruitment:', err);
          }
        });
      }
    });
  }

  delete(value: any) {

    this.recruitmentreferencemasterservice.deleteRecruitmentreference(value.RecruitmentReferenceId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);

        this.toastService.showSuccess(" Recruitment reference delete success ");
        this.loadAllRecruitmentReference();
      },
      error: (err) => {
        console.error('Error deleting recruitment:', err);
      }
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
