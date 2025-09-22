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
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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
      field: 'LeaveBalancesEmployeeId',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Type'),
      field: 'LeaveBalancesTypeId',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Year'),
      field: 'LeaveBalancesYear',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Opening'),
      field: 'LeaveBalancesOpening', // replace with lookup/display value
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Credited'),
      field: 'LeaveBalancesCredited',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Utilized'),
      field: 'LeaveBalancesUtilized',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Encashed'),
      field: 'LeaveBalancesEncashed',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Closing'),
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

  edit(record: AddEditEmployeeleavebalances) {
    this.dialog.open(AddEditEmployeeleavebalances, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { employeeleavebalances: record },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditEmployeeleavebalances, {
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
