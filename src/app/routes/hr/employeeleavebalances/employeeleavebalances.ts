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
import { AddEditEmployeeleavebalances } from './add-edit-employeeleavebalances/add-edit-employeeleavebalances';
import { EmployeeLeaveBalanceservice } from '@shared/services/hr/employeeleavebalance/employeeleavebalanceservice';
import { IEmployeeLeaveBalance } from '@shared/interfaces/hr/employeeleavebalance';
import { Toastservice } from 'app/routes/toastservice';

@Component({
  selector: 'app-employeeleavebalances',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeader,
    MatDialogModule,
  ],
  templateUrl: './employeeleavebalances.html',
  styleUrl: './employeeleavebalances.scss',
})
export class Employeeleavebalances {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  showForm = false;
  employeeleavebalancesModel: any = {};
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
  employeeleavebalancesForm: any;

  constructor(
    private employeeleavebalanceService: EmployeeLeaveBalanceservice,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {}

  ngOnInit(): void {
    this.loadAllEmployeeLeaveBalance();
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
      header: this.translate.stream('Employee Name'),
      field: 'EmployeeMasterFullName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Leave Type'),
      field: 'LeaveTypeMasterName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Leave Year'),
      field: 'LeaveBalancesYear',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Leave Opening'),
      field: 'LeaveBalancesOpening', // replace with lookup/display value
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Leave Credited'),
      field: 'LeaveBalancesCredited',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Leave Utilized'),
      field: 'LeaveBalancesUtilized',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Leave Encashed'),
      field: 'LeaveBalancesEncashed',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Leave Closing'),
      field: 'LeaveBalancesClosing',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'LeaveBalancesRemark',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'LeaveBalancesAuthRemark',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Auth'),
      field: 'LeaveBalancesAuth',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Discard'),
      field: 'LeaveBalancesIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Active'),
      field: 'LeaveBalancesIsActive',
      sortable: true,
      minWidth: 100,
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

  loadAllEmployeeLeaveBalance() {
    this.employeeleavebalanceService.getAllEmployeeLeaveBalance().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched LeaveBalance with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching Leave Balance:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditEmployeeleavebalances, {
      width: '70%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Payload for adding Leave Balance:', result);
        // Call the service to insert the Leave Balance
        this.employeeleavebalanceService.insertEmployeeLeaveBalance(result).subscribe({
          next: response => {
            this.toastService.showSuccess('Leave Balance added successfully:', response);
            this.loadAllEmployeeLeaveBalance();
            alert(`Employee ID  "${result.LeaveBalancesEmployeeId}" added successfully!`);
          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.employeeleavebalancesForm.get(field)) {
                  this.employeeleavebalancesForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add Leave Balance. Please verify Leave Balance details and try again.'
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
      .open(AddEditEmployeeleavebalances, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { employeeleavebalances: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          debugger;
          console.log('Leave Balance Updated:', result);
          console.log('Update payload:', result);
          this.employeeleavebalanceService.updateEmployeeLeaveBalance(result).subscribe({
            next: response => {
              this.toastService.showSuccess('Leave Balance updated successfully:', response);
              alert(`Leave Balance "${result.LeaveBalancesEmployeeId}" updated successfully!`);
              this.loadAllEmployeeLeaveBalance();
            },
            error: err => {
              console.error('Error updating Leave Balance:', err);
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
    this.employeeleavebalanceService.deleteEmployeeLeaveBalance(value.LeaveBalancesId).subscribe({
      next: response => {
        this.toastService.showSuccess('Leave Balance deleted successfully:', response);
        alert(`You have deleted ${value.EmployeeMasterFullName} successfully!`);
        this.loadAllEmployeeLeaveBalance();
      },
      error: err => {
        console.error('Error deleting Leave Balance:', err);
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
