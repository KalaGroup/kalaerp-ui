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
import { AddEditQualificationtype } from './add-edit-qualificationtype/add-edit-qualificationtype';
import { IQualificationtype } from '@shared/interfaces/hr/qualificationtype';
import { Qualificationtypeservice } from '@shared/services/hr/qualificationtype/qualificationtypeservice';

@Component({
  selector: 'app-qualificationtypemaster',
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
  templateUrl: './qualificationtypemaster.html',
  styleUrl: './qualificationtypemaster.scss'
})
export class Qualificationtypemaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  workstations: IQualificationtype[] = [];
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
  qualificationtypeForm: any;

  constructor(
    private fb: FormBuilder,
    private qualificationtypeService: Qualificationtypeservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {}
  ngOnInit(): void {
    this.loadAllQualificationtype();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  QualificationTypeColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },

    {
      header: this.translate.stream('Qualification Type Name'),
      field: 'QualificationTypeName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Qualification Type Code'),
      field: 'QualificationTypeCode',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark'),
      field: 'QualificationTypeRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },

    {
      header: this.translate.stream('Is Active'),
      field: 'QualificationTypeIsActive',
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

    loadAllQualificationtype() {
    this.qualificationtypeService.getAllQualificationtype().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched Workstation with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching Workstation:', err);
      },
    });
  }

    openAddDialog() {
      const dialogRef = this.dialog.open(AddEditQualificationtype, {
        width: '70%',
        height: '55%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: {},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Added Qualificationtype:', result);
          const payload: IQualificationtype = {
            QualificationTypeId: 0,
            QualificationTypeCode: result.QualificationTypeCode,
            QualificationTypeName: result.QualificationTypeName,
            QualificationTypeRemark: result.QualificationTypeRemark,
            QualificationTypeAuth: result.QualificationTypeAuth,
            QualificationTypeIsDiscard: result.QualificationTypeIsDiscard,
            QualificationTypeIsActive: result.QualificationTypeIsActive,
            CreatedBy: result.CreatedBy,
            CreatedDate: new Date().toISOString(),
          };
          console.log('Payload for adding Qualificationtype:', payload);
          // Call the service to insert the Workstation
          this.qualificationtypeService.insertQualificationtype(payload).subscribe({
            next: response => {
              this.toastService.showSuccess('Qualificationtype added successfully:', response);
              this.loadAllQualificationtype();
       
            },
            error: err => {
              if (err.status === 400 && err.error) {
                // Validation errors from FluentValidation
                err.error.forEach((validationErr: any) => {
                  const field = validationErr.PropertyName;
                  const message = validationErr.ErrorMessage;
  
                  // Mark field error in form
                  if (this.qualificationtypeForm.get(field)) {
                    this.qualificationtypeForm.get(field)?.setErrors({ serverError: message });
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
      .open(AddEditQualificationtype, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { qualificationtype: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Qualificationtype Updated:', result);
          // Create update payload as per your reqirements
          const updatePayload = {
            QualificationTypeId: result.QualificationTypeId,
            QualificationTypeCode: result.QualificationTypeCode,
            QualificationTypeName: result.QualificationTypeName,
            QualificationTypeRemark: result.QualificationTypeRemark,
            QualificationTypeAuth: result.QualificationTypeAuth,
            QualificationTypeIsDiscard: result.QualificationTypeIsDiscard,
            QualificationTypeIsActive: result.QualificationTypeIsActive,
            CreatedBy: result.CreatedBy,
            WorkStationAuth: false,
          };
         console.log('Update payload:', updatePayload);
          this.qualificationtypeService.updateQualificationtype(updatePayload).subscribe({
            next: (response) => {
              this.toastService.showSuccess('Qualificationtype updated successfully:', response);
            
              this.loadAllQualificationtype(); 
            },
            error: (err) => {
              console.error('Error updating Qualificationtype:', err);
            }
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
    this.qualificationtypeService.deleteQualificationtype(value.QualificationTypeId).subscribe({
      next: response => {
        this.toastService.showSuccess('Qualificationtype deleted successfully:', response);
      
        this.loadAllQualificationtype();
      },
      error: err => {
        console.error('Error deleting Qualificationtype:', err);
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