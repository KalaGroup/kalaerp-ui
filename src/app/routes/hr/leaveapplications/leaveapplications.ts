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
import { AddEditLeaveapplications } from './add-edit-leaveapplications/add-edit-leaveapplications';
import { Toastservice } from 'app/routes/toastservice';
import { LeaveApplicationServices } from '@shared/services/hr/LeaveApplication/leaveapplication';
import { ILeaveApplication } from '@shared/interfaces/hr/LeaveApplication';

@Component({
  selector: 'app-leaveapplications',
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
  templateUrl: './leaveapplications.html',
  styleUrl: './leaveapplications.scss'
})
export class Leaveapplications {
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
  leaveapplicationsForm: any;

  constructor(

    private fb: FormBuilder,
    private LeaveApplicationServices: LeaveApplicationServices,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.getAllLeaveApplication();
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
      header: this.translate.stream('Employee'),
      field: 'EmployeeMasterFullName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Type'),
      field: 'LeaveTypeMasterName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('From Date'),
      field: 'LeaveApplicationsFromDate',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('To Date'),
      field: 'LeaveApplicationsToDate',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'LeaveApplicationsRemark',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'LeaveApplicationsAuthRemark',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Auth'),
      field: 'LeaveApplicationsAuth',
      sortable: true,
      minWidth: 100,

    },
    {
      header: this.translate.stream('Discard'),
      field: 'LeaveApplicationsIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Active'),
      field: 'LeaveApplicationsIsActive',
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

  getAllLeaveApplication() {

    this.LeaveApplicationServices.getAllLeaveApplication().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
      },
      error: (err) => {
        console.error('Error fetching budget:', err);
      }
    });

  }

  edit(record: ILeaveApplication) {
    debugger
    // Ensure Angular Material datepickers receive Date objects
    const dialogRef = this.dialog.open(AddEditLeaveapplications, {

      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {

        leaveApplication: {
          ...record,
          LeaveApplicationsFromDate: record.LeaveApplicationsFromDate ? new Date(record.LeaveApplicationsFromDate) : null,
          LeaveApplicationsToDate: record.LeaveApplicationsToDate ? new Date(record.LeaveApplicationsToDate) : null
        }
      }
    });
    debugger
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('Leave Application update canceled.');
        return;
      }

      const fromDate = result.LeaveApplicationsFromDate
        ? new Date(result.LeaveApplicationsFromDate).toISOString().split('T')[0]
        : '';
      const toDate = result.LeaveApplicationsToDate
        ? new Date(result.LeaveApplicationsToDate).toISOString().split('T')[0]
        : '';

      // Calculate leave count here instead of relying on result
      let leaveCount = 0;
      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        leaveCount = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      }

      // Prepare the payload
      const updatePayload: ILeaveApplication = {
        LeaveApplicationId: record.LeaveApplicationId,
        LeaveApplicationsEmployeeId: result.LeaveApplicationsEmployeeId,
        LeaveApplicationsLeaveTypeId: result.LeaveApplicationsLeaveTypeId,
        LeaveApplicationsFromDate: fromDate,
        LeaveApplicationsToDate: toDate,
        LeaveApplicationsLeaveCount: result.LeaveApplicationsLeaveCount || leaveCount,
        LeaveBalancesClosing: result.LeaveBalancesClosing,
        LeaveApplicationsRemark: result.LeaveApplicationsRemark,
        LeaveApplicationsAuthRemark: result.LeaveApplicationsAuthRemark,
        LeaveApplicationsAuth: result.LeaveApplicationsAuth ?? true,
        LeaveApplicationsIsDiscard: result.LeaveApplicationsIsDiscard ?? false,
        LeaveApplicationsIsActive: result.LeaveApplicationsIsActive ?? true,
        CreatedBy: record.CreatedBy ?? 3,   // Preserve original created info
        CreatedDate: record.CreatedDate ?? new Date(),
        UpdatedBy: record.UpdatedBy ?? 3,
        UpdatedDate: new Date()
      };

      console.log('Update payload (LeaveApplication):', updatePayload);

      // Call the backend API
      this.LeaveApplicationServices.updateLeaveApplication(updatePayload).subscribe({
        next: () => {
          this.toastService.showSuccess("Leave Application updated successfully");
          this.getAllLeaveApplication();
        },
        error: (err) => {
          console.error('Error updating Leave Application:', err);
          this.toastService.showError("Error updating Leave Application");
        }
      });
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditLeaveapplications, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // empty for add
    });
    debugger
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // user cancelled

      const fromDate = result.LeaveApplicationsFromDate
        ? new Date(result.LeaveApplicationsFromDate).toISOString().split('T')[0]
        : '';
      const toDate = result.LeaveApplicationsToDate
        ? new Date(result.LeaveApplicationsToDate).toISOString().split('T')[0]
        : '';

      // Calculate leave count here instead of relying on result
      let leaveCount = 0;
      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        leaveCount = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      }
      console.log('Dialog result:', result);
      debugger
      const payload: ILeaveApplication = {
        LeaveApplicationId: 0,
        LeaveApplicationsEmployeeId: result.LeaveApplicationsEmployeeId,
        LeaveApplicationsLeaveTypeId: result.LeaveApplicationsLeaveTypeId,
        LeaveApplicationsFromDate: fromDate,
        LeaveApplicationsToDate: toDate,
        LeaveApplicationsLeaveCount: leaveCount,
        LeaveApplicationsRemark: result.LeaveApplicationsRemark,
        LeaveApplicationsAuthRemark: result.LeaveApplicationsAuthRemark,
        LeaveApplicationsAuth: result.LeaveApplicationsAuth ?? true,
        LeaveApplicationsIsDiscard: result.LeaveApplicationsIsDiscard ?? false,
        LeaveApplicationsIsActive: result.LeaveApplicationsIsActive ?? true,
        LeaveBalancesClosing: result.LeaveBalancesClosing,
        CreatedBy: 3,
        CreatedDate: new Date(),
        UpdatedBy: 3,
        UpdatedDate: new Date()
      };

      this.LeaveApplicationServices.insertLeaveApplication(payload).subscribe({
        next: () => {
          this.toastService.showSuccess('Leave application added successfully');
          this.getAllLeaveApplication();
        },
        error: (err) => {
          console.error('Error adding Leave application:', err);
          this.toastService.showError('Failed to add leave application. Check inputs.');
        }
      });
    });
  }





  delete(value: any) {
    debugger
    this.LeaveApplicationServices.deleteLeaveApplication(value.LeaveApplicationId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        alert(`Leave Application deleted successfully!`);
        this.toastService.showSuccess("Leave Application delete successfully");
        this.getAllLeaveApplication();
      },
      error: (err) => {
        console.error('Error deleting Petrol:', err);
      }
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
