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
import { AddEditRoleDetails } from './add-edit-rolesdetails/add-edit-rolesdetails';

@Component({
  selector: 'app-rolesdetails',
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
  templateUrl: './rolesdetails.html',
  styleUrl: './rolesdetails.scss'
})
export class Rolesdetails {
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

  RoleDetailsColumns: MtxGridColumn[] = [
    { header: this.translate.stream('Sr No'), field: 'SrNo', sortable: true, width: '80px', minWidth: 80 },
    { header: this.translate.stream('Role Id'), field: 'DetailsRolesId', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Description'), field: 'RolesDetailsDescription', sortable: true, minWidth: 200 },
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
      .open(AddEditRoleDetails, {
        width: '60%',
        height: '39%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { ...record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Role Detail Updated:', result);
          // TODO: call API to update role detail
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditRoleDetails, {
      width: '60%',
      height: '39%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added Role Detail:', result);
        const newDetail = {
          RolesDetailsId: result.RolesDetailsId,
          DetailsRolesId: result.DetailsRolesId,
          SrNo: result.SrNo,
          RolesDetailsDescription: result.RolesDetailsDescription,
        };
        // TODO: call API to save newDetail
      }
    });
  }

  delete(value: any) {
    console.log('Delete Role Detail:', value);
    // TODO: call API to delete role detail
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
