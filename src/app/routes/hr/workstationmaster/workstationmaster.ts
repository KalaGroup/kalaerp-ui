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
import { AddEditWorkstation } from './add-edit-workstation/add-edit-workstation';
import { IWorkstation } from '@shared/interfaces/hr/workstation';
import { Workstationservice } from '@shared/services/hr/workstation/workstationservice';

@Component({
  selector: 'app-workstationmaster',
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

  templateUrl: './workstationmaster.html',
  styleUrl: './workstationmaster.scss',
})
export class Workstationmaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  workstations: IWorkstation[] = [];
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
  workstationForm: any;

  constructor(
    private fb: FormBuilder,
    private workstationService: Workstationservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllWorkstation();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  cityColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('WorkStation Code'),
      field: 'WorkStationCode',
      sortable: true,
      minWidth: 120,
      width: '200px',
    },
    {
      header: this.translate.stream('WorkStation Name'),
      field: 'WorkStationName',
      sortable: true,
      minWidth: 150,
      width: '200px',
    },

    {
      header: this.translate.stream('WorkStation Short Name'),
      field: 'WorkStationShortName',
      sortable: true,
      minWidth: 150,
      width: '240px',
    },

    {
      header: this.translate.stream('WorkStation Profitcenter Name'),
      field: 'ProfitCenterName',
      sortable: true,
      minWidth: 150,
      width: '280px',
    },

    {
      header: this.translate.stream('Remark'),
      field: 'WorkStationRemark',
      sortable: true,
      minWidth: 150,
      width: '120px',
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'WorkStationAuthRemark',
      sortable: true,
      minWidth: 140,
      width: '180px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'WorkStationIsActive',
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

  loadAllWorkstation() {
    debugger;
    this.workstationService.getAllWorkstation().subscribe({
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
    const dialogRef = this.dialog.open(AddEditWorkstation, {
      width: '70%',
      height: '55%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        console.log('Added City:', result);
        const payload: IWorkstation = {
          WorkStationId: 0,
          WorkStationProfitcenterId: result.WorkStationProfitcenterId,
          WorkStationCode: result.WorkStationCode,
          WorkStationName: result.WorkStationName,
          WorkStationShortName: result.WorkStationShortName,
          WorkStationRemark: result.WorkStationRemark,
          WorkStationAuthRemark: result.WorkStationAuthRemark,
          WorkStationIsActive: result.WorkStationIsActive,
          WorkStationIsDiscard: result.WorkStationIsDiscard,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
          WorkStationAuth: false,
        };
        console.log('Payload for adding Workstation:', payload);
        // Call the service to insert the Workstation
        this.workstationService.insertWorkstation(payload).subscribe({
          next: response => {
            this.toastService.showSuccess('Workstation added successfully:', response);
            this.loadAllWorkstation();

          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.workstationForm.get(field)) {
                  this.workstationForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add Workstation. Please verify Workstation details and try again.'
              );
            }
          },
        });
      }
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditWorkstation, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { workstation: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          debugger;
          console.log('workstation Updated:', result);
          // Create update payload as per your reqirements
          const updatePayload = {
            WorkStationId: result.WorkStationId,
            WorkStationProfitcenterId: result.WorkStationProfitcenterId,
            WorkStationCode: result.WorkStationCode,
            WorkStationName: result.WorkStationName,
            WorkStationShortName: result.WorkStationShortName,
            WorkStationRemark: result.WorkStationRemark,
            WorkStationAuthRemark: result.WorkStationAuthRemark,
            WorkStationIsActive: result.WorkStationIsActive,
            WorkStationIsDiscard: result.WorkStationIsDiscard,
            CreatedBy: result.CreatedBy,
            WorkStationAuth: false,
          };
          console.log('Update payload:', updatePayload);
          this.workstationService.updateWorkstation(updatePayload).subscribe({
            next: (response) => {
              this.toastService.showSuccess('Workstation updated successfully:', response);

              this.loadAllWorkstation();
            },
            error: (err) => {
              console.error('Error updating Workstation:', err);
            }
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
    debugger;
    this.workstationService.deleteWorkstation(value.WorkStationId).subscribe({
      next: response => {
        this.toastService.showSuccess('Workstation deleted successfully:', response);

        this.loadAllWorkstation();
      },
      error: err => {
        console.error('Error deleting Workstation:', err);
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
