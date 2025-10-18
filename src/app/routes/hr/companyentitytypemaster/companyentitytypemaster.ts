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
import { AddEditCompanyentitytype } from './add-edit-companyentitytype/add-edit-companyentitytype';
import { ICompanyentitytype } from '@shared/interfaces/hr/companyentitytype';
import { Companyentitytypeservice } from '@shared/services/hr/companyentitytype/companyentitytypeservice';

@Component({
  selector: 'app-companyentitytypemaster',
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
  templateUrl: './companyentitytypemaster.html',
  styleUrl: './companyentitytypemaster.scss',
})
export class Companyentitytypemaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  workstations: ICompanyentitytype[] = [];
  showForm = false;
  stateModel: any = {};
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
  companyentitytypeForm: any;

  constructor(
    private fb: FormBuilder,
    private companyentitytypeService: Companyentitytypeservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllCompanyentitytype();
  }
  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  CompanyEntityColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('CompanyEntityType Name'),
      field: 'CompanyEntityTypeName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('CompanyEntityType Short Name'),
      field: 'CompanyEntityTypeShortName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark'),
      field: 'CompanyEntityTypeRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },

    {
      header: this.translate.stream('Is Active'),
      field: 'CompanyEntityTypeIsActive',
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

  loadAllCompanyentitytype() {
    this.companyentitytypeService.getAllCompanyentitytype().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched Companyentitytype with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching Companyentitytype:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditCompanyentitytype, {
      width: '60%',
      height: '45%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added Companyentitytype:', result);
        const payload: ICompanyentitytype = {
          CompEntityTypeId: 0,
          CompanyEntityTypeName: result.CompanyEntityTypeName,
          CompanyEntityTypeShortName: result.CompanyEntityTypeShortName,
          CompanyEntityTypeRemark: result.CompanyEntityTypeRemark,
          WorkStationAuthRemark: result.WorkStationAuthRemark,
          CompanyEntityTypeAuth: result.CompanyEntityTypeAuth,
          CompanyEntityTypeIsDiscard: result.CompanyEntityTypeIsDiscard,
          CompanyEntityTypeIsActive: result.CompanyEntityTypeIsActive,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
        };
        console.log('Payload for adding Companyentitytype:', payload);
        // Call the service to insert the Companyentitytype
        this.companyentitytypeService.insertCompanyentitytype(payload).subscribe({
          next: response => {
            this.toastService.showSuccess('Companyentitytype added successfully:', response);
            this.loadAllCompanyentitytype();

          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.companyentitytypeForm.get(field)) {
                  this.companyentitytypeForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
            }
          },
        });
      }
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditCompanyentitytype, {
        width: '60%',
        height: '45%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { companyentitytype: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Companyentitytype Updated:', result);
          const updatePayload = {
            CompEntityTypeId: result.CompEntityTypeId,
            CompanyEntityTypeName: result.CompanyEntityTypeName,
            CompanyEntityTypeShortName: result.CompanyEntityTypeShortName,
            CompanyEntityTypeRemark: result.CompanyEntityTypeRemark,
            WorkStationAuthRemark: result.WorkStationAuthRemark,
            CompanyEntityTypeAuth: result.CompanyEntityTypeAuth,
            CompanyEntityTypeIsDiscard: result.CompanyEntityTypeIsDiscard,
            CompanyEntityTypeIsActive: result.CompanyEntityTypeIsActive,
            CreatedBy: result.CreatedBy,
          };
          console.log('Update payload:', updatePayload);
          this.companyentitytypeService.updateCompanyentitytype(updatePayload).subscribe({
            next: response => {
              this.toastService.showSuccess('Companyentitytype updated successfully:', response);

              this.loadAllCompanyentitytype();
            },
            error: err => {
              console.error('Error updating Companyentitytype:', err);
            },
          });
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(record: any): void {
    console.log('Saving record:', record);
    this.closeDialog();
  }

  delete(value: any) {
    this.companyentitytypeService.deleteCompanyentitytype(value.CompEntityTypeId).subscribe({
      next: response => {
        this.toastService.showSuccess('Companyentitytype deleted successfully:', response);

        this.loadAllCompanyentitytype();
      },
      error: err => {
        console.error('Error deleting Companyentitytype:', err);
      },
    });
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
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

function toggleConfigSection() {
  throw new Error('Function not implemented.');
}
