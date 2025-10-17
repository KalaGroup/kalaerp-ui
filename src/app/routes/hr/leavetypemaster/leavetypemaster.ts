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
import { LeaveTypeMasterservice } from '@shared/services/hr/leavetypemaster/leavetypemaster';
import { ILeaveTypeMaster } from '@shared/interfaces/hr/leavetypemaster';
import { AddEditLeavetype } from './add-edit-leavetype/add-edit-leavetype';

@Component({
  selector: 'app-leavetypemaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './leavetypemaster.html',
  styleUrl: './leavetypemaster.scss'
})
export class Leavetypemaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  leaveType: ILeaveTypeMaster[] = [];
  showForm = false;
  LeaveTypeMasterModel: any = {};
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
    private LeaveTypeMasterservice: LeaveTypeMasterservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.getAllLeaveTypemaster();
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
      header: this.translate.stream('Leave Type Code'),
      field: 'LeaveTypeMasterCode',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Leave Type Name'),
      field: 'LeaveTypeMasterName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Max Days Per'),
      field: 'LeaveTypeMasterMaxDaysPer',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Continuous Days Per Year'),
      field: 'LeaveTypeMasterContinuosDaysPerYear',
      sortable: true,
      minWidth: 180,
    },
    {
      header: this.translate.stream('Can Carry Forward'),
      field: 'LeaveTypeMasterCanCarryForward',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Can EnCash'),
      field: 'LeaveTypeMasterCanEnCash',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Required Service Months'),
      field: 'LeaveTypeMasterRequiredServiceMonths',
      sortable: true,
      minWidth: 180,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'LeaveTypeMasterLeaveTypeRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'LeaveTypeMasterAuthRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth'),
      field: 'LeaveTypeMasterAuth',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Discard'),
      field: 'LeaveTypeMasterIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Active'),
      field: 'LeaveTypeMasterIsActive',
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
          click: record => this.delete(record),
        },
      ],
    },
  ];


  getAllLeaveTypemaster() {

    this.LeaveTypeMasterservice.getAllLeaveTypemaster().subscribe({
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
  edit(record: ILeaveTypeMaster) {
    this.dialog.open(AddEditLeavetype, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { leavetype: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('Leave Type update cancelled:', result);
          return;
        }
        const updatePayload: ILeaveTypeMaster = {
          LeaveTypeMasterId: record.LeaveTypeMasterId,
          LeaveTypeMasterCode: result.LeaveTypeMasterCode,
          LeaveTypeMasterName: result.LeaveTypeMasterName,
          LeaveTypeMasterMaxDaysPer: result.LeaveTypeMasterMaxDaysPer,
          LeaveTypeMasterContinuosDaysPerYear: result.LeaveTypeMasterContinuosDaysPerYear,
          LeaveTypeMasterCanCarryForward: result.LeaveTypeMasterCanCarryForward,
          LeaveTypeMasterCanEnCash: result.LeaveTypeMasterCanEnCash,
          LeaveTypeMasterRequiredServiceMonths: result.LeaveTypeMasterRequiredServiceMonths,
          LeaveTypeMasterLeaveTypeRemark: result.LeaveTypeMasterLeaveTypeRemark,
          LeaveTypeMasterAuthRemark: result.LeaveTypeMasterAuthRemark,
          LeaveTypeMasterAuth: result.LeaveTypeMasterAuth ?? true,
          LeaveTypeMasterIsDiscard: result.LeaveTypeMasterIsDiscard ?? false,
          LeaveTypeMasterIsActive: result.LeaveTypeMasterIsActive ?? true,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: record.CreatedDate ?? new Date(),
          UpdatedBy: record.UpdatedBy ?? 1,
          UpdatedDate: new Date()
        };
        console.log('Update payload (LeaveType):', updatePayload);
        this.LeaveTypeMasterservice.updateLeaveTypemaster(updatePayload).subscribe({
          next: () => {

            this.toastService.showSuccess("Leave Type updated successfully!");
            this.getAllLeaveTypemaster();
          },
          error: (err) => {
            console.error('Error updating Leave Type:', err);
            this.toastService.showError("Failed to update Leave Type.");
          }
        });
      });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditLeavetype, {
      width: '70%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload: ILeaveTypeMaster = {
          LeaveTypeMasterId: 0, // New entry
          LeaveTypeMasterCode: result.LeaveTypeMasterCode,
          LeaveTypeMasterName: result.LeaveTypeMasterName,
          LeaveTypeMasterMaxDaysPer: result.LeaveTypeMasterMaxDaysPer,
          LeaveTypeMasterContinuosDaysPerYear: result.LeaveTypeMasterContinuosDaysPerYear,
          LeaveTypeMasterCanCarryForward: result.LeaveTypeMasterCanCarryForward,
          LeaveTypeMasterCanEnCash: result.LeaveTypeMasterCanEnCash,
          LeaveTypeMasterRequiredServiceMonths: result.LeaveTypeMasterRequiredServiceMonths,
          LeaveTypeMasterLeaveTypeRemark: result.LeaveTypeMasterLeaveTypeRemark,
          LeaveTypeMasterAuthRemark: result.LeaveTypeMasterAuthRemark,
          LeaveTypeMasterAuth: result.LeaveTypeMasterAuth ?? true,
          LeaveTypeMasterIsDiscard: result.LeaveTypeMasterIsDiscard ?? false,
          LeaveTypeMasterIsActive: result.LeaveTypeMasterIsActive ?? true,
          CreatedBy: 1,
          CreatedDate: new Date(),
          UpdatedBy: 1,
          UpdatedDate: new Date()
        };

        console.log('Add payload (LeaveType):', payload);

        this.LeaveTypeMasterservice.insertLeaveTypemaster(payload).subscribe({
          next: () => {

            this.toastService.showSuccess("Leave Type added successfully!");
            this.getAllLeaveTypemaster();
          },
          error: (err) => {
            console.error('Error adding Leave Type:', err);
          }
        });
      }
    });
  }

  delete(value: any) {
    this.LeaveTypeMasterservice.deleteLeaveTypemaster(value.LeaveTypeMasterId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);

        this.toastService.showSuccess("Leave delete successfully");
        this.getAllLeaveTypemaster();
      },
      error: (err) => {
        console.error('Error deleting Leave:', err);
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
