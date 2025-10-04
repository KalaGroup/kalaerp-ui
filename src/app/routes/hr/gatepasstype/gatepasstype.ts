import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { TranslateService } from '@ngx-translate/core';
import { Toastservice } from 'app/routes/toastservice';
import { AddEditGatepasstype } from './add-edit-gatepasstype/add-edit-gatepasstype';
import { IGatePassType } from '@shared/interfaces/hr/gatepasstype';
import { Gatepasstypeservice } from '@shared/services/hr/gatepasstype/gatepasstype';

@Component({
  selector: 'app-gatepasstype',
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
  templateUrl: './gatepasstype.html',
  styleUrl: './gatepasstype.scss',
})
export class Gatepasstype implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  gatepasstypes: IGatePassType[] = [];
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
  gatepasstypeForm: any;

  constructor(
    private fb: FormBuilder,
    private gatepasstypeService: Gatepasstypeservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllGatePassType();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  GatePassTypeColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('GatePassType Code'),
      field: 'GatePassTypesTypeCode',
      sortable: true,
      minWidth: 120,
      width: '200px',
    },
    {
      header: this.translate.stream('GatePassType Name'),
      field: 'GatePassTypesTypeName',
      sortable: true,
      minWidth: 150,
      width: '200px',
    },

    {
      header: this.translate.stream('GatePassTypes Description'),
      field: 'GatePassTypesDescription',
      sortable: true,
      minWidth: 150,
      width: '240px',
    },

    {
      header: this.translate.stream('GatePassTypes Requires Approval'),
      field: 'GatePassTypesRequiresApproval',
      sortable: true,
      minWidth: 150,
      width: '280px',
    },

    {
      header: this.translate.stream('Auth Remark'),
      field: 'GatePassTypesAuthRemark',
      sortable: true,
      minWidth: 150,
      width: '120px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'GatePassTypesIsActive',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Is Auth'),
      field: 'GatePassTypesIsAuth',
      sortable: true,
      minWidth: 100,
      width: '150px',
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

  loadAllGatePassType() {
    debugger;
    this.gatepasstypeService.getAllGatePassType().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched GatePassType with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching GatePassType:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditGatepasstype, {
      width: '70%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        console.log('Added City:', result);
        this.gatepasstypeService.insertGatePassType(result).subscribe({
          next: response => {
            this.toastService.showSuccess('GatePassType added successfully:', response);
            this.loadAllGatePassType();

          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.gatepasstypeForm.get(field)) {
                  this.gatepasstypeForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add GatePassType. Please verify GatePassType details and try again.'
              );
            }
          },
        });
      }
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditGatepasstype, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { gatepasstype: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          debugger;
          console.log('GatePassType Updated:', result);
          this.gatepasstypeService.updateGatePassType(result).subscribe({
            next: response => {
              this.toastService.showSuccess('GatePassType updated successfully:', response);

              this.loadAllGatePassType();
            },
            error: err => {
              if (err.status === 400 && err.error) {
                // Validation errors from FluentValidation
                err.error.forEach((validationErr: any) => {
                  const field = validationErr.PropertyName;
                  const message = validationErr.ErrorMessage;

                  // Mark field error in form
                  if (this.gatepasstypeForm.get(field)) {
                    this.gatepasstypeForm.get(field)?.setErrors({ serverError: message });
                  }
                  // Optionally show toast
                  this.toastService.showError(message);
                });
              } else {
                this.toastService.showError(
                  'Failed to add GatePassType. Please verify GatePassType details and try again.'
                );
              }
            },
          });
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  delete(value: any) {
    this.gatepasstypeService.deleteGatePassType(value.GatePassTypeId).subscribe({
      next: response => {
        this.toastService.showSuccess('GatePassType deleted successfully:', response);

        this.loadAllGatePassType();
      },
      error: err => {
        console.error('Error deleting GatePassType:', err);
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
