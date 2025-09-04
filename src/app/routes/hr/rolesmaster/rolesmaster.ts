/* eslint-disable @angular-eslint/prefer-inject */
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
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
import { AddEditRole } from './add-edit-role/add-edit-role';

@Component({
  selector: 'app-rolesmaster',
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
  templateUrl: './rolesmaster.html',
  styleUrls: ['./rolesmaster.scss'],
})
export class Rolesmaster {
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
  list: any[] = []; // bind to API later
  expandable: unknown;

  constructor(private dialog: MatDialog) {}

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  RoleColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      width: '80px',
      minWidth: 80,
    },
    {
      header: this.translate.stream('Designation'),
      field: 'RolesDesignationId',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Division'),
      field: 'RolesDivisionId',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'RolesRemark',
      sortable: true,
      minWidth: 150,
    },
    { header: this.translate.stream('Type'), field: 'RolesType', sortable: true, minWidth: 120 },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'RolesAuthRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'RolesIsActive',
      width: '120px',
      type: 'tag',
      tag: {
        1: { text: 'Active', color: 'green' },
        0: { text: 'Inactive', color: 'red' },
      },
    },
    {
      header: this.translate.stream('Is Discard'),
      field: 'RolesIsDiscard',
      width: '130px',
      type: 'tag',
      tag: {
        1: { text: 'Discarded', color: 'orange' },
        0: { text: 'Not Discarded', color: 'blue' },
      },
    },
    {
      header: this.translate.stream('Auth'),
      field: 'RolesAuth',
      width: '140px',
      type: 'tag',
      tag: {
        1: { text: 'Authorized', color: 'purple' },
        0: { text: 'Pending', color: 'red' },
      },
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
      .open(AddEditRole, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { ...record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Role Updated:', result);
          // TODO: call API to update role
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditRole, {
      width: '70%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added Role:', result);
        const newRole = {
          RolesGradeId: result.RolesGradeId,
          RolesDesignationId: result.RolesDesignationId,
          RolesDivisionId: result.RolesDivisionId,
          RolesRemark: result.RolesRemark,
          RolesType: result.RolesType,
          RolesAuthRemark: result.RolesAuthRemark,
          RolesAuth: result.RolesAuth,
          RolesIsDiscard: result.RolesIsDiscard,
          RolesIsActive: result.RolesIsActive,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
        };
        // TODO: call API to save newRole
      }
    });
  }

  delete(value: any) {
    console.log('Delete Role:', value);
    // TODO: call API to delete role
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
