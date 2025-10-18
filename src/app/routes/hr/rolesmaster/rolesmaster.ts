/* eslint-disable @angular-eslint/prefer-inject */
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
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
import { IRole } from '@shared/interfaces/hr/role';
import { Roleservice } from '@shared/services/hr/role/roleservice';
import { Toastservice } from 'app/routes/toastservice';

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

  role: IRole[] = [];
  showForm = false;
  stateModel: any = {};
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
  roleForm: any;

  constructor(
    private fb: FormBuilder,
    private roleService: Roleservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllRole();
  }

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
      header: this.translate.stream('Grade'),
      field: 'GradeName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Designation'),
      field: 'DesignationName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Division'),
      field: 'DivisionName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'RolesRemark',
      sortable: true,
      minWidth: 150,
    },
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

  loadAllRole() {
    this.roleService.getAllRole().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched Role with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching Role:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditRole, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added Role:', result);
        const payload: IRole = {
          RolesId: 0,
          RolesGradeId: result.RolesGradeId,
          RolesDesignationId: result.RolesDesignationId,
          RolesDivisionId: result.RolesDivisionId,
          RolesRemark: result.RolesRemark,
          RolesAuthRemark: result.RolesAuthRemark,
          RolesAuth: result.RolesAuth,
          RolesIsDiscard: result.RolesIsDiscard,
          RolesIsActive: result.RolesIsActive,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
          descriptions: result.descriptions,
        };
        console.log('Payload for adding Role:', payload);
        // Call the service to insert the Workstation
        this.roleService.insertRole(payload).subscribe({
          next: response => {
            this.toastService.showSuccess('Role  added successfully:', response);
            this.loadAllRole();

          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.roleForm.get(field)) {
                  this.roleForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {

            }
          },
        });
      }
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditRole, {
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { role: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Role Updated:', result);
          // Create update payload as per your reqirements
          const updatePayload = {
            RolesId: result.RolesId,
            RolesGradeId: result.RolesGradeId,
            RolesDesignationId: result.RolesDesignationId,
            RolesDivisionId: result.RolesDivisionId,
            RolesRemark: result.RolesRemark,
            RolesAuthRemark: result.RolesAuthRemark,
            RolesAuth: result.RolesAuth,
            RolesIsDiscard: result.RolesIsDiscard,
            RolesIsActive: result.RolesIsActive,
            CreatedBy: result.CreatedBy,
            descriptions: result.descriptions,
          };
          console.log('Update payload:', updatePayload);
          this.roleService.updateRole(updatePayload).subscribe({
            next: response => {
              this.toastService.showSuccess('Role updated successfully:', response);

              this.loadAllRole();
            },
            error: err => {
              console.error('Error updating Role:', err);
              this.loadAllRole();
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
    this.roleService.deleteRole(value.RolesId).subscribe({
      next: response => {
        this.toastService.showSuccess('Role deleted successfully:', response);

        this.loadAllRole();
      },
      error: err => {
        console.error('Error deleting Role:', err);
        this.loadAllRole();
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
