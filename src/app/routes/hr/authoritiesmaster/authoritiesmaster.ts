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
import { IRole } from '@shared/interfaces/hr/role';
import { Roleservice } from '@shared/services/hr/role/roleservice';
import { Toastservice } from 'app/routes/toastservice';
import { AddEditAuthorities } from './add-edit-authorities/add-edit-authorities';
import { Authoritiesservice } from '@shared/services/hr/authorities/authoritiesservice';
import { IAuthorities } from '@shared/interfaces/hr/authorities';

@Component({
  selector: 'app-authoritiesmaster',
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
  templateUrl: './authoritiesmaster.html',
  styleUrl: './authoritiesmaster.scss',
})
export class Authoritiesmaster {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  authorities: IAuthorities[] = [];
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
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;
  authoritiesForm: any;

  constructor(
    private fb: FormBuilder,
    private authoritiesService: Authoritiesservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllAuthorities();
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
      field: 'AuthoritiesRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'AuthoritiesAuthRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'AuthoritiesIsActive',
      width: '120px',
      type: 'tag',
      tag: {
        1: { text: 'Active', color: 'green' },
        0: { text: 'Inactive', color: 'red' },
      },
    },
    {
      header: this.translate.stream('Is Discard'),
      field: 'AuthoritiesIsDiscard',
      width: '130px',
      type: 'tag',
      tag: {
        1: { text: 'Discarded', color: 'orange' },
        0: { text: 'Not Discarded', color: 'blue' },
      },
    },
    {
      header: this.translate.stream('Auth'),
      field: 'AuthoritiesAuth',
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

  loadAllAuthorities() {
    this.authoritiesService.getAllAuthorities().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched Authorities with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching Authorities:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditAuthorities, {
      width: '100%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added Authorities:', result);
        const payload: IAuthorities = {
          AuthoritiesId: 0,
          AuthoritiesGradeId: result.AuthoritiesGradeId,
          AuthoritiesDesignationId: result.AuthoritiesDesignationId,
          AuthoritiesDivisionId: result.AuthoritiesDivisionId,
          AuthoritiesRemark: result.AuthoritiesRemark,
          AuthoritiesAuthRemark: result.AuthoritiesAuthRemark,
          AuthoritiesAuth: result.AuthoritiesAuth,
          AuthoritiesIsDiscard: result.AuthoritiesIsDiscard,
          AuthoritiesIsActive: result.AuthoritiesIsActive,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
          descriptions: result.descriptions,
        };
        console.log('Payload for adding Role:', payload);
        // Call the service to insert the Workstation
        this.authoritiesService.insertAuthorities(payload).subscribe({
          next: response => {

            this.toastService.showSuccess('Authorities  added successfully:', response);
            this.loadAllAuthorities();

          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.authoritiesForm.get(field)) {
                  this.authoritiesForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add Authorities. Please verify Authorities details and try again.'
              );
            }
          },
        });
      }
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditAuthorities, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { authorities: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Authorities Updated:', result);
          // Create update payload as per your reqirements
          const updatePayload = {
            AuthoritiesId: result.AuthoritiesId,
            AuthoritiesGradeId: result.AuthoritiesGradeId,
            AuthoritiesDesignationId: result.AuthoritiesDesignationId,
            AuthoritiesDivisionId: result.AuthoritiesDivisionId,
            AuthoritiesRemark: result.AuthoritiesRemark,
            AuthoritiesAuthRemark: result.AuthoritiesAuthRemark,
            AuthoritiesAuth: result.AuthoritiesAuth,
            AuthoritiesIsDiscard: result.AuthoritiesIsDiscard,
            AuthoritiesIsActive: result.AuthoritiesIsActive,
            CreatedBy: result.CreatedBy,
            descriptions: result.descriptions,
          };
          console.log('Update payload:', updatePayload);
          this.authoritiesService.updateAuthorities(updatePayload).subscribe({
            next: response => {
              this.toastService.showSuccess('Authorities updated successfully:', response);

              this.loadAllAuthorities();
            },
            error: err => {
              console.error('Error updating Authorities:', err);
              this.toastService.showError('Failed to update Authorities. Please check inputs.');
              this.loadAllAuthorities();
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
    this.authoritiesService.deleteAuthorities(value.AuthoritiesId).subscribe({
      next: response => {
        this.toastService.showSuccess('Authorities deleted successfully:', response);

        this.loadAllAuthorities();
      },
      error: err => {
        console.error('Error deleting Authorities:', err);
        this.toastService.showError('Failed to delete Authorities. It might be in use.');
        this.loadAllAuthorities();
      },
    });
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
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
