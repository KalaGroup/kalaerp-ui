/* eslint-disable @angular-eslint/prefer-inject */
import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { AddEditDepartment } from './add-edit-department/add-edit-department';
import { IDepartment } from '@shared/interfaces/hr/department';
import { Departmentservice } from '@shared/services/hr/department/departmentservice';
import { Toastservice } from 'app/routes/toastservice';

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
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  departments: IDepartment[] = [];
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
  departmentForm: any;

  constructor(
    private fb: FormBuilder,
    private departmentService: Departmentservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllDepartment();
  }

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
      field: 'DepartmentDivisionName',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Parent Department'),
      field: 'ParentDepartmentName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Profit Center'),
      field: 'DepartmentProfitcenterName',
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

  loadAllDepartment() {
    this.departmentService.getAllDepartment().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched Workstation with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching Workstation:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditDepartment, {
      width: '80%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}, // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added state:', result);
        const payload: IDepartment = {
          DepartmentId: 0,
          DepartmentCode: result.DepartmentCode,
          DepartmentName: result.DepartmentName,
          DepartmentShortName: result.DepartmentShortName,
          DepartmentDivisionId: result.DepartmentDivisionId,
          ParentDepartmentId: result.ParentDepartmentId,
          DepartmentProfitcenterId: result.DepartmentProfitcenterId,
          DepartmentRemark: result.DepartmentRemark,
          DepartmentType: result.DepartmentType,
          DepartmentAuthRemark: result.DepartmentAuthRemark,
          DepartmentAuth: result.DepartmentAuth,
          DepartmentIsDiscard: result.DepartmentIsDiscard,
          DepartmentIsActive: result.DepartmentIsActive,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
        };
        console.log('Payload for adding state:', payload);
        // Call the service to insert the state
        this.departmentService.insertDepartment(payload).subscribe({
          next: response => {
            this.toastService.showSuccess('Department added successfully:', response);
            this.loadAllDepartment();

          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.departmentForm.get(field)) {
                  this.departmentForm.get(field)?.setErrors({ serverError: message });
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
    // Open dialog, pass in the record
    this.dialog
      .open(AddEditDepartment, {
        width: '80%',
        height: '50%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { department: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Department Updated:', result);
          // Create update payload
          const updatePayload: IDepartment = {
            DepartmentId: result.DepartmentId,
            DepartmentCode: result.DepartmentCode,
            DepartmentName: result.DepartmentName,
            DepartmentShortName: result.DepartmentShortName,
            DepartmentDivisionId: result.DepartmentDivisionId,
            ParentDepartmentId: result.ParentDepartmentId,
            DepartmentProfitcenterId: result.DepartmentProfitcenterId,
            DepartmentRemark: result.DepartmentRemark,
            DepartmentType: result.DepartmentType,
            DepartmentAuthRemark: result.DepartmentAuthRemark,
            DepartmentAuth: result.DepartmentAuth,
            DepartmentIsDiscard: result.DepartmentIsDiscard,
            DepartmentIsActive: result.DepartmentIsActive,
            CreatedBy: 1, // or use actual user ID
          };
          console.log('Update payload:', updatePayload);
          this.departmentService.updateDepartment(updatePayload).subscribe({
            next: response => {
              this.toastService.showSuccess('Department updated successfully:', response);

              this.loadAllDepartment();
            },
            error: err => {
              console.error('Error updating state:', err);
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
    this.departmentService.deleteDepartment(value.DepartmentId).subscribe({
      next: response => {
        this.toastService.showSuccess('Department Deleted successfully:', response);

        this.loadAllDepartment();
      },
      error: err => {
        console.error('Error deleting Department:', err);
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
