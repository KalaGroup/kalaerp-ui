/* eslint-disable @angular-eslint/prefer-inject */
import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { AddEditDepartment } from './add-edit-department/add-edit-department';

@Component({
  selector: 'app-departmentmaster',
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
  templateUrl: './departmentmaster.html',
  styleUrl: './departmentmaster.scss',
})
export class Departmentmaster implements OnInit {
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
  list: any[] = []; // Ideally bind with Department API response

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  DepartmentColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('Department Code'),
      field: 'DepartmentCode',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Department Name'),
      field: 'DepartmentName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Short Name'),
      field: 'DepartmentShortName',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Division'),
      field: 'DepartmentDivisionID',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Parent Department'),
      field: 'ParentDepartmentID',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Profit Center'),
      field: 'DepartmentProfitcenterID',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark'),
      field: 'DepartmentRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Type'),
      field: 'DepartmentType',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'DepartmentIsActive',
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
      .open(AddEditDepartment, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { ...record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Department Updated:', result);
          // TODO: call API to update department
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditDepartment, {
      width: '70%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added Department:', result);
        const newDept = {
          DepartmentCode: result.DepartmentCode,
          DepartmentName: result.DepartmentName,
          DepartmentShortName: result.DepartmentShortName,
          DepartmentDivisionID: result.DepartmentDivisionID,
          ParentDepartmentID: result.ParentDepartmentID,
          DepartmentProfitcenterID: result.DepartmentProfitcenterID,
          DepartmentRemark: result.DepartmentRemark,
          DepartmentType: result.DepartmentType,
          DepartmentAuth: result.DepartmentAuth,
          DepartmentAuthRemark: result.DepartmentAuthRemark,
          DepartmentIsDiscard: result.DepartmentIsDiscard,
          DepartmentIsActive: result.DepartmentIsActive,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
        };

        // TODO: call API to save newDept
      }
    });
  }

  delete(value: any) {
    console.log('Delete Department:', value);
    // TODO: call API to delete department
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  updateCell(): void {
    console.log('updateCell called');
  }

  updateList(): void {
    console.log('updateList called');
  }
}
