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
import { Empmstupdationforservice } from '@shared/services/hr/empmstupdationfor/empmstupdationforservice';
import { IEmpmstforupdationmst } from '@shared/interfaces/hr/empmstupdationformst';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
//import { Country, Currency } from '@shared/interfaces/hr';
//import { AddEditCurrency } from '../currencymaster/add-edit-currency/add-edit-currency';
//import { id } from 'date-fns/locale';
import { AddEditEmployeemasterupdationfor } from './add-edit-employeemasterupdationfor/add-edit-employeemasterupdationfor';

@Component({
  selector: 'app-employeemasterupdationformaster',
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
  templateUrl: './employeemasterupdationformaster.html',
  styleUrl: './employeemasterupdationformaster.scss'
})
export class Employeemasterupdationformaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  states: IEmpmstforupdationmst[] = [];
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
  stateForm: any;
  EmployeeMasterUpdationForForm: any;
  columns: any;

  constructor(private fb: FormBuilder, private empmstupdationforservice: Empmstupdationforservice, private dialog: MatDialog, private toastService: Toastservice) { }
  ngOnInit(): void {
    this.loadAllemployeemasterupdationfor();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }
  EmployeeupdationColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('Employee Master Updation For Name'),
      field: 'EmployeeMasterUpdationForName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark '),
      field: 'EmployeeMasterUpdationForRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'EmployeeMasterUpdationForAuthRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },

    {
      header: this.translate.stream('Is Active'),
      field: 'EmployeeMasterUpdationForIsActive',
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
  loadAllemployeemasterupdationfor() {
    this.empmstupdationforservice.getAllemployeeMasterUpdationFor().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched employeemasterupdation for  with S.No:', this.list);
      },
      error: (err) => {
        console.error('Error fetching employeemasterupdation for :', err);
      }
    });
  }

  edit(record: any) {

    // Open dialog, pass in the record
    this.dialog.open(AddEditEmployeemasterupdationfor, {
      width: '60%',
      height: '50%',
      maxWidth: '70vw',
      maxHeight: '60vh',
      data: { employeemasterupdationfor: record },
    }).afterClosed().subscribe(result => {

      if (result) {
        console.log('Employeemasterupdationfor Updated:', result);
        // Create update payload
        const updatePayload: IEmpmstforupdationmst = {
          EmployeeMasterUpdationForId: result.EmployeeMasterUpdationForId,
          EmployeeMasterUpdationForName: result.EmployeeMasterUpdationForName,
          EmployeeMasterUpdationForRemark: result.EmployeeMasterUpdationForRemark,
          EmployeeMasterUpdationForAuthRemark: result.EmployeeMasterUpdationForAuthRemark,
          EmployeeMasterUpdationForAuth: result.EmployeeMasterUpdationForAuth,
          EmployeeMasterUpdationForIsDiscard: result.EmployeeMasterUpdationForIsDiscard,
          EmployeeMasterUpdationForIsActive: result.EmployeeMasterUpdationForIsActive,
          CreatedBy: '1',



        };
        console.log('Update payload:', updatePayload);
        this.empmstupdationforservice.updateemployeeMasterUpdationFor(updatePayload).subscribe({
          next: (response) => {
            console.log('Employeemasterupdationfor updated successfully:', response);
            // alert(`Employeemasterupdationfor "${result.EmployeeMasterUpdationForName}" updated successfully!`);
            this.toastService.showSuccess('Employeemasterupdationfor updated successfully:', response);
            this.loadAllemployeemasterupdationfor();
          },
          error: (err) => {
            console.error('Error updating Employeemasterupdationfor:', err);
            this.toastService.showError('Failed to update Employeemasterupdationfor. Please check inputs.');
          }
        });
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditEmployeemasterupdationfor, {
      width: '60%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('Added Employeemasterupdationfor:', result);
        const payload: IEmpmstforupdationmst = {
          EmployeeMasterUpdationForId: 0,
          EmployeeMasterUpdationForName: result.EmployeeMasterUpdationForName,
          EmployeeMasterUpdationForRemark: result.EmployeeMasterUpdationForRemark,
          EmployeeMasterUpdationForAuthRemark: result.EmployeeMasterUpdationForAuthRemark,
          EmployeeMasterUpdationForAuth: result.EmployeeMasterUpdationForAuth,
          EmployeeMasterUpdationForIsDiscard: result.EmployeeMasterUpdationForIsDiscard,
          EmployeeMasterUpdationForIsActive: result.EmployeeMasterUpdationForIsActive,
          CreatedBy: result.CreatedBy, // or use actual user ID
          CreatedDate: new Date().toISOString()
        };
        console.log('Payload for adding Employeemasterupdationfor:', payload);
        // Call the service to insert the state
        this.empmstupdationforservice.insertemployeeMasterUpdationFor(payload).subscribe({
          next: (response) => {


            console.log('Employeemasterupdationfor type added successfully:', response);
            this.toastService.showSuccess('Employeemasterupdationfor added successfully:', response);
            this.loadAllemployeemasterupdationfor();
            //alert(`Employeemasterupdationfor "${result.EmployeeMasterUpdationForName}" added successfully!`);
          },
          error: (err) => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.EmployeeMasterUpdationForForm.get(field)) {
                  this.EmployeeMasterUpdationForForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError('Failed to add Employeemasterupdationfor. Please verify Employeemasterupdationfor details and try again.');
            }
          }
        });
      }
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(record: any): void {
    console.log('Saving record:', record);
    this.closeDialog();
  }

  delete(value: any) {
    this.empmstupdationforservice.deleteemployeeMasterUpdationFor(value.EmployeeMasterUpdationForId).subscribe({
      next: (response) => {
        console.log('Employeemasterupdationfor deleted successfully:', response);
        this.toastService.showSuccess('Employeemasterupdationfor deleted successfully:', response);
        // alert(`You have deleted ${value.EmployeeMasterUpdationForName} successfully!`);
        this.loadAllemployeemasterupdationfor();
      },
      error: (err) => {
        console.error('Error deleting Employeemasterupdationfor:', err);
        this.toastService.showError('Failed to delete Employeemasterupdationfor. It might be in use.');
      }
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


