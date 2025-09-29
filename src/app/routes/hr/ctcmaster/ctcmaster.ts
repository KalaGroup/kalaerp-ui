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
import { IWorkstation } from '@shared/interfaces/hr/workstation';
import { Workstationservice } from '@shared/services/hr/workstation/workstationservice';
import { AddEditCtc } from './add-edit-ctc/add-edit-ctc';
import { ICtcstructure } from '@shared/interfaces/hr/ctcstructure';
import { Ctcstructureservice } from '@shared/services/hr/ctcstructure/ctcstructureservice';

@Component({
  selector: 'app-ctcmaster',
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
  templateUrl: './ctcmaster.html',
  styleUrl: './ctcmaster.scss',
})
export class Ctcmaster {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  ctc: ICtcstructure[] = [];
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
  ctcForm: any;

  constructor(
    private fb: FormBuilder,
    private ctcstructureService: Ctcstructureservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllCTC();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }
  ctcColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('Grade Name'),
      field: 'GradeName',
      sortable: true,
      minWidth: 120,
      width: '200px',
    },
    {
      header: this.translate.stream('Basic'),
      field: 'CtcmasterBasic',
      sortable: true,
      minWidth: 150,
      width: '200px',
    },

    {
      header: this.translate.stream('DA'),
      field: 'CtcmasterDa',
      sortable: true,
      minWidth: 150,
      width: '240px',
    },

    {
      header: this.translate.stream('HRA'),
      field: 'CtcmasterHra',
      sortable: true,
      minWidth: 150,
      width: '280px',
    },

    {
      header: this.translate.stream('Conv Allowance'),
      field: 'CtcmasterConvAllowance',
      sortable: true,
      minWidth: 150,
      width: '120px',
    },
    {
      header: this.translate.stream('City Compensatory Alowance'),
      field: 'CtcmasterCityCompensatoryAlowance',
      sortable: true,
      minWidth: 140,
      width: '180px',
    },
    {
      header: this.translate.stream('Leave Travel Allowance'),
      field: 'CtcmasterLeaveTravelAllowance',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Car Allowance'),
      field: 'CtcmasterCarAllowance',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Fuel Allowance'),
      field: 'CtcmasterFuelAllowance',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Driver Allowance'),
      field: 'CtcmasterDriverAllowance',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },

    {
      header: this.translate.stream('Misc Allowance'),
      field: 'CtcmasterMiscAllowance',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Gross'),
      field: 'CtcmasterGross',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Pf Employee'),
      field: 'CtcmasterPfemployee',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Personal Tax'),
      field: 'CtcmasterPt',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('ESIC'),
      field: 'CtcmasterEsic',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Pf Employer'),
      field: 'CtcmasterPfemployer',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Medical Insurance'),
      field: 'CtcmasterMedicalInsurance',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },

    {
      header: this.translate.stream('PerformanceKPA'),
      field: 'CtcmasterPerformanceKpa',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Graduity'),
      field: 'CtcmasterGraduity',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },
    {
      header: this.translate.stream('Bonus'),
      field: 'CtcmasterBonus',
      sortable: true,
      minWidth: 100,
      width: '150px',
    },

    {
      header: this.translate.stream('Mlwf'),
      field: 'CtcmasterMlwf',
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
        // {
        //   type: 'icon',
        //   color: 'warn',
        //   icon: 'delete',
        //   tooltip: this.translate.stream('delete'),
        //   pop: {
        //     title: this.translate.stream('confirm_delete'),
        //     closeText: this.translate.stream('close'),
        //     okText: this.translate.stream('ok'),
        //   },
        //   click: record => this.delete(record),
        // },
      ],
    },
  ];

  loadAllCTC() {
    this.ctcstructureService.getAllCtcstructure().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched CTCStructure with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching CTCStructure:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditCtc, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added CTCStructure:', result);
        const payload: ICtcstructure = {
          CtcstructureId: 0,
          CtcmasterGradeId: result.CtcmasterGradeId,
          CtcmasterBasic: result.CtcmasterBasic,
          CtcmasterDa: result.CtcmasterDa,
          CtcmasterHra: result.CtcmasterHra,
          CtcmasterConvAllowance: result.CtcmasterConvAllowance,
          CtcmasterCityCompensatoryAlowance: result.CtcmasterCityCompensatoryAlowance,
          CtcmasterLeaveTravelAllowance: result.CtcmasterLeaveTravelAllowance,
          CtcmasterCarAllowance: result.CtcmasterCarAllowance,
          CtcmasterFuelAllowance: result.CtcmasterFuelAllowance,
          CtcmasterDriverAllowance: result.CtcmasterDriverAllowance,
          CtcmasterMiscAllowance: result.CtcmasterMiscAllowance,
          CtcmasterGross: result.CtcmasterGross,
          CtcmasterPfemployee: result.CtcmasterPfemployee,
          CtcmasterPt: result.CtcmasterPt,
          CtcmasterEsic: result.CtcmasterEsic,
          CtcmasterPfemployer: result.CtcmasterPfemployer,
          CtcmasterMedicalInsurance: result.CtcmasterMedicalInsurance,
          CtcmasterPerformanceKpa: result.CtcmasterPerformanceKpa,
          CtcmasterGraduity: result.CtcmasterGraduity,
          CtcmasterBonus: result.CtcmasterBonus,
          CtcmasterMlwf: result.CtcmasterMlwf,
        };
        console.log('Payload for adding CTCStructure:', payload);
        this.ctcstructureService.insertCtcstructure(payload).subscribe({
          next: response => {
            this.toastService.showSuccess('CTCStructure added successfully:', response);
            this.loadAllCTC();

          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.ctcForm.get(field)) {
                  this.ctcForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add CTCStructure. Please verify CTCStructure details and try again.'
              );
            }
          },
        });
      }
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditCtc, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { ctc: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('CTCStructure Updated:', result);
          // Create update payload as per your reqirements
          const updatePayload = {
            CtcstructureId: record.CtcstructureId,
            CtcmasterGradeId: result.CtcmasterGradeId,
            CtcmasterBasic: result.CtcmasterBasic,
            CtcmasterDa: result.CtcmasterDa,
            CtcmasterHra: result.CtcmasterHra,
            CtcmasterConvAllowance: result.CtcmasterConvAllowance,
            CtcmasterCityCompensatoryAlowance: result.CtcmasterCityCompensatoryAlowance,
            CtcmasterLeaveTravelAllowance: result.CtcmasterLeaveTravelAllowance,
            CtcmasterCarAllowance: result.CtcmasterCarAllowance,
            CtcmasterFuelAllowance: result.CtcmasterFuelAllowance,
            CtcmasterDriverAllowance: result.CtcmasterDriverAllowance,
            CtcmasterMiscAllowance: result.CtcmasterMiscAllowance,
            CtcmasterGross: result.CtcmasterGross,
            CtcmasterPfemployee: result.CtcmasterPfemployee,
            CtcmasterPt: result.CtcmasterPt,
            CtcmasterEsic: result.CtcmasterEsic,
            CtcmasterPfemployer: result.CtcmasterPfemployer,
            CtcmasterMedicalInsurance: result.CtcmasterMedicalInsurance,
            CtcmasterPerformanceKpa: result.CtcmasterPerformanceKpa,
            CtcmasterGraduity: result.CtcmasterGraduity,
            CtcmasterBonus: result.CtcmasterBonus,
            CtcmasterMlwf: result.CtcmasterMlwf,
          };
          console.log('Update payload:', updatePayload);
          this.ctcstructureService.updateCtcstructure(updatePayload).subscribe({
            next: response => {
              this.toastService.showSuccess('CTCStructure updated successfully:', response);

              this.loadAllCTC();
            },
            error: err => {
              console.error('Error updating CTCStructure:', err);
              this.toastService.showError('Failed to update CTCStructure. Please check inputs.');
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
    this.ctcstructureService.deleteCtcstructure(value.CtcstructureId).subscribe({
      next: response => {
        this.toastService.showSuccess('CTCStructure deleted successfully:', response);

        this.loadAllCTC();
      },
      error: err => {
        console.error('Error deleting CTCStructure:', err);
        this.toastService.showError('Failed to delete CTCStructure. It might be in use.');
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
