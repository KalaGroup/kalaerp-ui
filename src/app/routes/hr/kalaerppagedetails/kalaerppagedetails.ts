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
import { IKalaErpPageDetails } from '@shared/interfaces/hr/kalaerppagedetails';
import { KalaErpPageDetailsservice } from '@shared/services/hr/KalaERPPageDetails/kalaerppagedetailsservice';
import { AddEditKalaerppagedetails } from './add-edit-kalaerppagedetails/add-edit-kalaerppagedetails';

@Component({
  selector: 'app-kalaerppagedetails',
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
  templateUrl: './kalaerppagedetails.html',
  styleUrl: './kalaerppagedetails.scss',
})
export class Kalaerppagedetails {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  ERPPageDetails: IKalaErpPageDetails[] = [];
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
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;
  erppagedetailsForm: any;

  constructor(
    private fb: FormBuilder,
    private kalaerppagedetailsService: KalaErpPageDetailsservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {}
  ngOnInit(): void {
    this.loadAllERPPageDetails();
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
      header: this.translate.stream('Division Name'),
      field: 'DivisionName',
      sortable: true,
      minWidth: 120,
      width: '200px',
    },
    {
      header: this.translate.stream('Page Tittle'),
      field: 'PageTittle',
      sortable: true,
      minWidth: 150,
      width: '200px',
    },

    {
      header: this.translate.stream('Page Url'),
      field: 'PageUrl',
      sortable: true,
      minWidth: 150,
      width: '240px',
    },

    {
      header: this.translate.stream('Page Type'),
      field: 'PageType',
      sortable: true,
      minWidth: 150,
      width: '280px',
    },

    {
      header: this.translate.stream('Page ISO Number'),
      field: 'PageIsonumber',
      sortable: true,
      minWidth: 150,
      width: '120px',
    },
    {
      header: this.translate.stream('Remark'),
      field: 'KalaErppageDetailsRemark',
      sortable: true,
      minWidth: 140,
      width: '180px',
    },
        {
      header: this.translate.stream('Auth Remark'),
      field: 'KalaErppageDetailsAuthRemark',
      sortable: true,
      minWidth: 140,
      width: '180px',
    },
    {
      header: this.translate.stream('Auth'),
      field: 'KalaErppageDetailsAuth',
      sortable: true,
      minWidth: 100,
      width: '150px',
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

  loadAllERPPageDetails() {
    debugger;
    this.kalaerppagedetailsService.getAllERPPageDetails().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched ERP Page Details with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching ERP Page Detail:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditKalaerppagedetails, {
      width: '70%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        console.log('Added City:', result);
        console.log('Payload for adding ERP Page Detail:', result);
        // Call the service to insert the ERP Page Detail
        this.kalaerppagedetailsService.insertERPPageDetails(result).subscribe({
          next: response => {
            this.toastService.showSuccess('ERP Page Detail added successfully:', response);
            this.loadAllERPPageDetails();
         
          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.erppagedetailsForm.get(field)) {
                  this.erppagedetailsForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add ERP Page Details. Please verify ERP Page Details details and try again.'
              );
            }
          },
        });
      }
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditKalaerppagedetails, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { kalaerppagedetails: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          debugger;
          console.log('ERP Page Detail Updated:', result);
          console.log('Update payload:', result);
          this.kalaerppagedetailsService.updateERPPageDetails(result).subscribe({
            next: response => {
              this.toastService.showSuccess('ERP Page Detail updated successfully:', response);
             
              this.loadAllERPPageDetails();
            },
            error: err => {
              console.error('Error updating ERP Page Details:', err);
              this.toastService.showError('Failed to update ERP Page Details. Please check inputs.');
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
    debugger;
    this.kalaerppagedetailsService.deleteERPPageDetails(value.KalaErppageDetailsId).subscribe({
      next: response => {
        this.toastService.showSuccess('ERP Page Details deleted successfully:', response);
     
        this.loadAllERPPageDetails();
      },
      error: err => {
        console.error('Error deleting ERP Page Details:', err);
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
