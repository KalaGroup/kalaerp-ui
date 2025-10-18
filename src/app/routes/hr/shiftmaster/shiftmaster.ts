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
import { IShiftMaster } from '@shared/interfaces/hr/shiftmaster';
import { shiftmasterservice } from '@shared/services/hr/shiftmaster/shiftmaster';
import { Toastservice } from 'app/routes/toastservice';
import { AddEditShift } from './add-edit-shift/add-edit-shift';

@Component({
  selector: 'app-shiftmaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './shiftmaster.html',
  styleUrl: './shiftmaster.scss'
})
export class Shiftmaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  Shiftmaster: IShiftMaster[] = [];
  showForm = false;
  shiftmasterModel: any = {};
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
    private ShiftMasterservice: shiftmasterservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.GetAllShiftMaster();
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
      header: this.translate.stream('Company'),
      field: 'CompanyName',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Employee Type'),
      field: 'EmployeeTypeName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Shift Name'),
      field: 'ShiftMasterName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Alias Name'),
      field: 'ShiftMasterAliseName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Start Time'),
      field: 'ShiftMasterStartTime',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('End Time'),
      field: 'ShiftMasterEndTime',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Lunch Start Time'),
      field: 'ShiftMasterLunchStartTime',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Lunch End Time'),
      field: 'ShiftMasterLunchEndTime',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'ShiftMasterRemark',
      sortable: true,
      minWidth: 200,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'ShiftMasterAuthRemark',
      sortable: true,
      minWidth: 200,
    },
    {
      header: this.translate.stream('Auth'),
      field: 'ShiftMasterAuth',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Discard'),
      field: 'ShiftMasterIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Active'),
      field: 'ShiftMasterIsActive',
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

  GetAllShiftMaster() {

    this.ShiftMasterservice.getAllShiftMaster().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
      },
      error: (err) => {
        console.error('Error fetching shift:', err);
      }
    });

  }


  edit(record: IShiftMaster) {

    this.dialog.open(AddEditShift, {
      width: '70%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { shiftmaster: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('shift update cancelled:', result);
          return;
        }

        // conversion helpers
        function toApiTime(value: string | null | undefined): string {
          if (!value) return "00:00:00";
          return value.length === 5 ? value + ":00" : value; // add seconds if missing
        }

        function toUiTime(value: string | null | undefined): string {
          if (!value) return "";
          return value.substring(0, 5); // strip seconds
        }

        const updatePayload: IShiftMaster = {
          ShiftMasterId: record.ShiftMasterId,
          ShiftMasterCompanyId: result.ShiftMasterCompanyId,
          ShiftMasterEmployeeTypeId: result.ShiftMasterEmployeeTypeId,
          ShiftMasterName: result.ShiftMasterName,
          ShiftMasterAliseName: result.ShiftMasterAliseName,

          // ✅ Use conversion here
          ShiftMasterStartTime: toApiTime(result.ShiftMasterStartTime),
          ShiftMasterEndTime: toApiTime(result.ShiftMasterEndTime),
          ShiftMasterLunchStartTime: toApiTime(result.ShiftMasterLunchStartTime),
          ShiftMasterLunchEndTime: toApiTime(result.ShiftMasterLunchEndTime),

          ShiftMasterRemark: result.ShiftMasterRemark,
          ShiftMasterAuthRemark: result.ShiftMasterAuthRemark,
          ShiftMasterAuth: result.ShiftMasterAuth ?? true,
          ShiftMasterIsDiscard: result.ShiftMasterIsDiscard ?? false,
          ShiftMasterIsActive: result.ShiftMasterIsActive ?? true,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: new Date()
        };

        console.log('Update payload:', updatePayload);
        this.ShiftMasterservice.UpdateShiftMaster(updatePayload).subscribe({
          next: () => {

            this.toastService.showSuccess("shift updated successfully");
            this.GetAllShiftMaster();
          },
          error: (err) => {
            console.error('Error updating shift:', err);
          }
        });
      });
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditShift, {
      width: '70%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // UI ("HH:mm") -> API ("HH:mm:ss")
        function toApiTime(value: string | null | undefined): string {
          if (!value) return "00:00:00";
          return value.length === 5 ? value + ":00" : value; // add seconds if missing
        }

        // API ("HH:mm:ss") -> UI ("HH:mm")
        function toUiTime(value: string | null | undefined): string {
          if (!value) return "";
          return value.substring(0, 5); // take only "HH:mm"
        }

        const payload: IShiftMaster = {
          ShiftMasterId: 0, // New entry
          ShiftMasterCompanyId: result.ShiftMasterCompanyId,
          ShiftMasterEmployeeTypeId: result.ShiftMasterEmployeeTypeId,
          ShiftMasterName: result.ShiftMasterName,
          ShiftMasterAliseName: result.ShiftMasterAliseName,

          // ✅ Apply conversion here
          ShiftMasterStartTime: toApiTime(result.ShiftMasterStartTime),
          ShiftMasterEndTime: toApiTime(result.ShiftMasterEndTime),
          ShiftMasterLunchStartTime: toApiTime(result.ShiftMasterLunchStartTime),
          ShiftMasterLunchEndTime: toApiTime(result.ShiftMasterLunchEndTime),

          ShiftMasterRemark: result.ShiftMasterRemark,
          ShiftMasterAuthRemark: result.ShiftMasterAuthRemark,
          ShiftMasterAuth: result.ShiftMasterAuth ?? true,
          ShiftMasterIsDiscard: result.ShiftMasterIsDiscard ?? false,
          ShiftMasterIsActive: result.ShiftMasterIsActive ?? true,
          CreatedBy: 1,
          CreatedDate: new Date()
        };
        this.ShiftMasterservice.insertShiftMaster(payload).subscribe({
          next: () => {

            this.toastService.showSuccess("shift added successfully");
            this.GetAllShiftMaster();
          },
          error: (err) => {

          }
        });
      }
    });
  }

  delete(value: any) {
    this.ShiftMasterservice.deleteShiftMaster(value.ShiftMasterId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);

        this.toastService.showSuccess("shift delete successfully");
        this.GetAllShiftMaster();
      },
      error: (err) => {
        console.error('Error deleting shift:', err);
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
