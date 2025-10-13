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
import { AddEditDepartmentbudget } from './add-edit-departmentbudget/add-edit-departmentbudget';
import { DepartmentbudgetServices } from '@shared/services/hr/Departmentbudget/departmentbudget-services';
import { IDepartment } from '@shared/interfaces/hr/department';
import { IDepartmentBudget } from '@shared/interfaces/hr/departmentmaster';

@Component({
  selector: 'app-departmentbudget',
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
  templateUrl: './departmentbudget.html',
  styleUrl: './departmentbudget.scss',
})
export class Departmentbudget implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  DepartmentBudget: IDepartmentBudget[] = [];
  showForm = false;
  DepartmentBudgetModel: any = {};
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
  DepartmentBudgetForm: any;
  constructor(
    private departmentbudgetservice: DepartmentbudgetServices,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.getAllDepartmentBudget();
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
      header: this.translate.stream('Department Name'),
      field: 'DepartmentName', // replace with joined name if available
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Financial Year'),
      field: 'DepartmentFy',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Budget Amount'),
      field: 'DepartmentBudgetAmt',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Budget Head Name'),
      field: 'EmployeeMasterFullName', // replace with lookup/display value
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'DepartmentBudgetRemark',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'DepartmentBudgetAuthRemark',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Auth'),
      field: 'DepartmentBudgetAuth',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Discard'),
      field: 'DepartmentBudgetIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Active'),
      field: 'DepartmentBudgetIsActive',
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

  getAllDepartmentBudget() {
    this.departmentbudgetservice.getAllDepartmentBudget().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
      },
      error: err => {
        console.error('Error fetching budget:', err);
      },
    });
  }

  edit(record: IDepartmentBudget) {
    this.dialog
      .open(AddEditDepartmentbudget, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { Departmentbudget: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('Department budget update canceled:', result);
          return;
        }
        const updatePayload: IDepartmentBudget = {

          DepartmentBudgetId: record.DepartmentBudgetId,
          DepartmentBudgetDepartmentId: result.DepartmentBudgetDepartmentId,
          DepartmentFy: result.DepartmentFy,
          DepartmentBudgetAmt: result.DepartmentBudgetAmt,
          DepartmentBudgetHeadId: result.DepartmentBudgetHeadId,
          DepartmentBudgetRemark: result.DepartmentBudgetRemark,
          DepartmentBudgetAuthRemark: result.DepartmentBudgetAuthRemark,
          DepartmentBudgetAuth: result.DepartmentBudgetAuth ?? true,
          DepartmentBudgetIsDiscard: result.DepartmentBudgetIsDiscard ?? false,
          DepartmentBudgetIsActive: result.DepartmentBudgetIsActive ?? true,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: record.CreatedDate ?? new Date(), // keep original if available
          UpdatedBy: record.UpdatedBy ?? 1,
          UpdatedDate: new Date(),
        };

        console.log('Update payload:', updatePayload);

        this.departmentbudgetservice.updateDepartmentBudget(updatePayload).subscribe({
          next: () => {

            this.toastService.showSuccess('Department budget updated successfully');
            this.getAllDepartmentBudget();
          },
          error: err => {
            console.error('Error updating Department budget:', err);
          },
        });
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditDepartmentbudget, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload: IDepartmentBudget = {
          DepartmentBudgetId: 0, // New entry
          DepartmentBudgetDepartmentId: result.DepartmentBudgetDepartmentId,
          DepartmentFy: result.DepartmentFy,
          DepartmentBudgetAmt: result.DepartmentBudgetAmt,
          DepartmentBudgetHeadId: result.DepartmentBudgetHeadId,
          DepartmentBudgetRemark: result.DepartmentBudgetRemark,
          DepartmentBudgetAuthRemark: result.DepartmentBudgetAuthRemark,
          DepartmentBudgetAuth: result.DepartmentBudgetAuth ?? true,
          DepartmentBudgetIsDiscard: result.DepartmentBudgetIsDiscard ?? false,
          DepartmentBudgetIsActive: result.DepartmentBudgetIsActive ?? true,
          CreatedBy: 1,
          CreatedDate: new Date(),
          UpdatedBy: 1,
          UpdatedDate: new Date(),
        };

        this.departmentbudgetservice.insertDepartmentBudget(payload).subscribe({
          next: () => {
            this.toastService.showSuccess('Department budget added successfully');
            this.getAllDepartmentBudget();
          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.DepartmentBudgetForm.get(field)) {
                  this.DepartmentBudgetForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            }
            else {
            }
          },
        });
      }
    });
  }

  delete(value: any) {
    this.departmentbudgetservice.deleteDepartmentBudget(value.DepartmentBudgetId).subscribe({
      next: response => {
        console.log('Delete success:', response);
        this.toastService.showSuccess('budget delete successfully');
        this.getAllDepartmentBudget();
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
