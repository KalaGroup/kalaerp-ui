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
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
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
      field: 'LeaveApplicationsEmployeeID',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Type'),
      field: 'LeaveApplicationsLeaveTypeID',
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
      field: 'LeaveBalancesAuthRemark',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Auth'),
      field: 'LeaveApplicationsAuthRemark',
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

  edit(record: AddEditLeaveapplications) {
    this.dialog.open(AddEditLeaveapplications, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { employeeleavebalances: record },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditLeaveapplications, {
      width: '60%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });
  }

  delete(value: any) {}

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
