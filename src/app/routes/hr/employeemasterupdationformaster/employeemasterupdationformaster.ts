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
import { AddEditEmployeemasterupdationfor } from './add-edit-employeemasterupdationfor/add-edit-employeemasterupdationfor';

@Component({
  selector: 'app-employeemasterupdationformaster',
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
  templateUrl: './employeemasterupdationformaster.html',
  styleUrl: './employeemasterupdationformaster.scss'
})
export class Employeemasterupdationformaster implements OnInit {
  expandable: any;
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  // Grid settings
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
  isConfigExpanded = false;
  list: [] = []; // Add your list type here (Interface)

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {

  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  EmployeeupdationColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('Employee Master Updation For Name'),
      field: 'EmployeeMasterUpdationForName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark '),
      field: 'EmployeeMasterUpdationForRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'EmployeeMasterUpdationForAuthRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },

    {
      header: this.translate.stream('Is Active'),
      field: 'IsActive',
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

  edit(record: any) {
    this.dialog
      .open(AddEditEmployeemasterupdationfor, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { City: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('City Updated:', result);
          const updatePayload = {
            // Add your update payload here
          };
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditEmployeemasterupdationfor, {
      width: '70%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added Employee Master Updation:', result);
        const EmployeeMasterUpdationForData = {
          // Change as per your reqirements Change FormControls
          EmployeeMasterUpdationForId: 0,
          EmployeeMasterUpdationForName: result.EmployeeMasterUpdationForName,
          EmployeeMasterUpdationForAuthRemark: result.EmployeeMasterUpdationForAuthRemark,
          EmployeeMasterUpdationForRemark: result.EmployeeMasterUpdationForRemark,
          EmployeeMasterUpdationForAuth: result.EmployeeMasterUpdationForAuth,
          EmployeeMasterUpdationForIsDiscard: result.EmployeeMasterUpdationForIsDiscard,
          EmployeeMasterUpdationForIsActive: result.EmployeeMasterUpdationForIsActive,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
        };
      }
    });
  }

  delete(value: any) {

  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    //this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    // this.list = this.list.map(item => {
    //   (item as any).RandomValue = Math.round(Math.random() * 1000) / 100;
    //   return item;
    // });
  }

  updateList() {
    //this.list = this.list.splice(-1).concat(this.list);
  }

}
