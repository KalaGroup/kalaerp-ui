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
import { IWorkstationBudget } from '@shared/interfaces/hr/workstationbudget';
import { WorkstationBudgetservice } from '@shared/services/hr/workstationbudget/workstationbudget';
import { AddEditBudget } from './add-edit-budget/add-edit-budget';

@Component({
  selector: 'app-workstationbudget',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './workstationbudget.html',
  styleUrl: './workstationbudget.scss'
})
export class Workstationbudget implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  WorkstationBudget: IWorkstationBudget[] = [];
  showForm = false;
  WorkstationBudgetModel: any = {};
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
  workstationBudgetForm: any;
  constructor(
    private fb: FormBuilder,
    private WorkstationBudgetservice: WorkstationBudgetservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.getAllWorkstationBudget();
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
      header: this.translate.stream('Workstation Name'),
      field: 'WorkStationName', // replace with joined name if available
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Financial Year'),
      field: 'WorkstationFy',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Budget Amount'),
      field: 'WorkstationBudgetAmt',
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
      field: 'WorkstationBudgetRemark',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'WorkstationBudgetAuthRemark',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Auth'),
      field: 'WorkstationBudgetAuth',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Discard'),
      field: 'WorkstationBudgetIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Active'),
      field: 'WorkstationBudgetIsActive',
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

  getAllWorkstationBudget() {

    this.WorkstationBudgetservice.getAllWorkStationbudget().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
      },
      error: (err) => {
        console.error('Error fetching budget:', err);
      }
    });

  }

  edit(record: IWorkstationBudget) {
    debugger;
    this.dialog.open(AddEditBudget, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { workstationbudget: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('Workstation budget update canceled:', result);
          return;
        }
        const updatePayload: IWorkstationBudget = {
          WorkstationBudgetId: record.WorkstationBudgetId,
          WorkstationBudgetWorkstationId: result.WorkstationBudgetWorkstationId,
          WorkstationFy: result.WorkstationFy,
          WorkstationBudgetAmt: result.WorkstationBudgetAmt,
          WorkstationBudgetHeadId: result.WorkstationBudgetHeadId,
          WorkstationBudgetRemark: result.WorkstationBudgetRemark,
          WorkstationBudgetAuthRemark: result.WorkstationBudgetAuthRemark,
          WorkstationBudgetAuth: result.WorkstationBudgetAuth ?? true,
          WorkstationBudgetIsDiscard: result.WorkstationBudgetIsDiscard ?? false,
          WorkstationBudgetIsActive: result.WorkstationBudgetIsActive ?? true,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: record.CreatedDate ?? new Date(), // keep original if available
          UpdatedBy: record.UpdatedBy ?? 1,
          UpdatedDate: new Date()
        };

        console.log('Update payload:', updatePayload);

        this.WorkstationBudgetservice.updateworkstationbudget(updatePayload).subscribe({
          next: () => {
            alert('Workstation budget updated successfully!');
            this.toastService.showSuccess('Workstation budget updated successfully');
            this.getAllWorkstationBudget();
          },
          error: (err) => {
            console.error('Error updating workstation budget:', err);
            this.toastService.showError('Error updating workstation budget');
          }
        });
      });
  }

  openAddDialog() {
    debugger;
    const dialogRef = this.dialog.open(AddEditBudget, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        const payload: IWorkstationBudget = {
          WorkstationBudgetId: 0, // New entry
          WorkstationBudgetWorkstationId: result.WorkstationBudgetWorkstationId,
          WorkstationFy: result.WorkstationFy,
          WorkstationBudgetAmt: result.WorkstationBudgetAmt,
          WorkstationBudgetHeadId: result.WorkstationBudgetHeadId,
          WorkstationBudgetRemark: result.WorkstationBudgetRemark,
          WorkstationBudgetAuthRemark: result.WorkstationBudgetAuthRemark,
          WorkstationBudgetAuth: result.WorkstationBudgetAuth ?? true,
          WorkstationBudgetIsDiscard: result.WorkstationBudgetIsDiscard ?? false,
          WorkstationBudgetIsActive: result.WorkstationBudgetIsActive ?? true,
          CreatedBy: 1,
          CreatedDate: new Date(),
          UpdatedBy: 1,
          UpdatedDate: new Date()
        };

        this.WorkstationBudgetservice.insertworkstationbudget(payload).subscribe({
          next: () => {
            alert('Workstation budget added successfully!');
            this.toastService.showSuccess('Workstation budget added successfully');
            this.getAllWorkstationBudget();
          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.workstationBudgetForm.get(field)) {
                  this.workstationBudgetForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              alert(` Financial Year and workstation  already exists.!`);
              this.toastService.showError('A budget for this Financial Year and workstation already exists.');

            }
          },
        });
      }
    });
  }

  delete(value: any) {
    debugger
    this.WorkstationBudgetservice.deleteworkstationbudget(value.WorkstationBudgetId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        alert(`Petrol budget deleted successfully!`);
        this.toastService.showSuccess("budget delete successfully");
        this.getAllWorkstationBudget();
      },
      error: (err) => {
        console.error('Error deleting Petrol:', err);
      }
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
