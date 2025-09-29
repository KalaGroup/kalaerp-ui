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
import { AddEditHoliday } from './add-edit-holiday/add-edit-holiday';
import { IHoliday } from '@shared/interfaces/hr/holiday';
import { Holidayservice } from '@shared/services/hr/holiday/holidayservice';

@Component({
  selector: 'app-holidaymaster',
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
  templateUrl: './holidaymaster.html',
  styleUrl: './holidaymaster.scss',
})
export class Holidaymaster implements OnInit {
  expandable: any;
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  workstations: IHoliday[] = [];
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
  columnResizable = false;

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;
  holidayForm: any;

  constructor(
    private fb: FormBuilder,
    private holidayService: Holidayservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllHoliday();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  HolidayColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('Holiday FY'),
      field: 'HolidayFy',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Holiday Date'),
      field: 'HolidayDate',
      sortable: true,
      minWidth: 150,
      width: '250px',
    },
    {
      header: this.translate.stream('Holiday For'),
      field: 'HolidayFor',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('HolidayCompany'),
      field: 'CompanyName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark'),
      field: 'HolidayRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('AuthRemark'),
      field: 'HolidayAuthRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },

    {
      header: this.translate.stream('Is Active'),
      field: 'HolidayIsActive',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Auth'),
      field: 'HolidayAuth',
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

  loadAllHoliday() {
    debugger;
    this.holidayService.getAllHoliday().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched Holiday with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching Holiday:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditHoliday, {
      width: '70%',
      height: '55%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        console.log('Added Holiday:', result);
        const payload: IHoliday = {
          HolidayId: 0,
          HolidayFy: result.HolidayFy,
          HolidayDate: result.HolidayDate,
          HolidayFor: result.HolidayFor,
          HolidayCompanyId: result.HolidayCompanyId,
          HolidayRemark: result.HolidayRemark,
          HolidayAuthRemark: result.HolidayAuthRemark,
          HolidayAuth: result.HolidayAuth,
          HolidayIsDiscard: result.HolidayIsDiscard,
          HolidayIsActive: result.HolidayIsActive,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
        };
        console.log('Payload for adding Holiday:', payload);
        // Call the service to insert the Workstation
        this.holidayService.insertHoliday(payload).subscribe({
          next: response => {
            this.toastService.showSuccess('Holiday added successfully:', response);
            this.loadAllHoliday();

          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.holidayForm.get(field)) {
                  this.holidayForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add Holiday. Please verify Holiday details and try again.'
              );
            }
          },
        });
      }
    });
  }

  edit(record: any) {
    debugger;
    this.dialog
      .open(AddEditHoliday, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { holiday: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          debugger;
          console.log('Holiday Updated:', result);
          // Create update payload as per your reqirements
          const updatePayload = {
            HolidayId: result.HolidayId,
            HolidayFy: result.HolidayFy,
            HolidayDate: result.HolidayDate,
            HolidayFor: result.HolidayFor,
            HolidayCompanyId: result.HolidayCompanyId,
            HolidayRemark: result.HolidayRemark,
            HolidayAuthRemark: result.HolidayAuthRemark,
            HolidayAuth: result.HolidayAuth,
            HolidayIsDiscard: result.HolidayIsDiscard,
            HolidayIsActive: result.HolidayIsActive,
            CreatedBy: result.CreatedBy,
          };
          console.log('Update payload:', updatePayload);
          this.holidayService.updateHoliday(updatePayload).subscribe({
            next: response => {
              this.toastService.showSuccess('Holiday updated successfully:', response);

              this.loadAllHoliday();
            },
            error: err => {
              console.error('Error updating Holiday:', err);
              this.toastService.showError('Failed to update Holiday. Please check inputs.');
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
    this.holidayService.deleteHoliday(value.HolidayId).subscribe({
      next: response => {
        console.log('Holiday deleted successfully:', response);
        this.toastService.showSuccess('Holiday deleted successfully:', response);

        this.loadAllHoliday();
      },

      error: err => {
        console.error('Error deleting Holiday:', err);
        this.toastService.showError('Failed to delete Holiday. It might be in use.');
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
