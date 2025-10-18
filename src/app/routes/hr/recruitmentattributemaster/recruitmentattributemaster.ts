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

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';

import { AddEditRecruitmentattribute } from './add-edit-recruitmentattribute/add-edit-recruitmentattribute';
import { IRecruitmentAttribute } from '@shared/interfaces/hr/RecruitmentAttributeMaster';
import { RecruitmentAttributeservices } from '@shared/services/hr/RecruitmentAttributeMaster/RecruitmentAttributeMasterservice';

@Component({
  selector: 'app-recruitmentattributemaster',
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
  templateUrl: './recruitmentattributemaster.html',
  styleUrl: './recruitmentattributemaster.scss',
})
export class Recruitmentattributemaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  recruitmentattribute: IRecruitmentAttribute[] = [];
  showForm = false;
  recruitmentattributeModel: any = {};
  editIndex: number | null = null;

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
  expandable = false;
  columnResizable = false;

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;
  constructor(
    private fb: FormBuilder,
    private RecruitmentAttributeServices: RecruitmentAttributeservices,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.getAllRecruitmentAttribute();
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
      header: this.translate.stream('Name'),
      field: 'RecruitmentAttributeName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Marks'),
      field: 'RecruitmentAttributeMarks',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark'),
      field: 'RecruitmentAttributeRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'RecruitmentAttributeAuthRemark',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'RecruitmentAttributeIsActive',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Action'),
      field: 'action',
      minWidth: 140,
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
          click: record => this.delete(record),
        },
      ],
    },
  ];

  getAllRecruitmentAttribute() {
    this.RecruitmentAttributeServices.getAllRecruitmentAttribute().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
      },
      error: (err) => {
        console.error('Error fetching facilities:', err);
      }
    });
  }
  edit(record: IRecruitmentAttribute) {
    this.dialog.open(AddEditRecruitmentattribute, {
      width: '60%',
      height: '50%',
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: { recruitmentattribute: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('recruitmentattribute Updated:', result);
          return;
        }

        const updatePayload: IRecruitmentAttribute = {
          RecruitmentAttributeId: record.RecruitmentAttributeId,
          RecruitmentAttributeName: result.RecruitmentAttributeName,
          RecruitmentAttributeMarks: result.RecruitmentAttributeMarks,
          RecruitmentAttributeRemark: result.RecruitmentAttributeRemark,
          RecruitmentAttributeAuthRemark: result.RecruitmentAttributeAuthRemark,
          RecruitmentAttributeAuth: result.RecruitmentAttributeAuth,
          RecruitmentAttributeIsDiscard: result.RecruitmentAttributeIsDiscard,
          RecruitmentAttributeIsActive: result.RecruitmentAttributeIsActive,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: new Date()
        };
        console.log('Update payload:', updatePayload);
        this.RecruitmentAttributeServices.updateRecruitmentAttribute(updatePayload).subscribe({
          next: () => {

            this.toastService.showSuccess("updated successfully");
            this.getAllRecruitmentAttribute();
          },
          error: (err) => {
            console.error('Error updating recruitment:', err);
          }
        });
      });
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditRecruitmentattribute, {
      width: '60%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '80vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload: IRecruitmentAttribute = {
          RecruitmentAttributeId: 0, // Assuming 0 for new entries
          RecruitmentAttributeName: result.RecruitmentAttributeName,
          RecruitmentAttributeMarks: result.RecruitmentAttributeMarks,
          RecruitmentAttributeRemark: result.RecruitmentAttributeRemark,
          RecruitmentAttributeAuthRemark: result.RecruitmentAttributeAuthRemark,
          RecruitmentAttributeAuth: result.RecruitmentAttributeAuth,
          RecruitmentAttributeIsDiscard: result.RecruitmentAttributeIsDiscard,
          RecruitmentAttributeIsActive: result.RecruitmentAttributeIsActive,
          CreatedBy: 1, // Set appropriately
          CreatedDate: new Date()
        };

        this.RecruitmentAttributeServices.insertRecruitmentAttribute(payload).subscribe({
          next: () => {

            this.toastService.showSuccess("recruitment added successfully ");
            this.getAllRecruitmentAttribute();
          },
          error: (err) => {
            console.error('Error while adding recruitment:', err);
          }
        });
      }
    });
  }

  delete(value: any) {

    this.RecruitmentAttributeServices.deleteRecruitmentAttribute(value.RecruitmentAttributeId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);

        this.toastService.showSuccess("delete success ");
        this.getAllRecruitmentAttribute();
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
