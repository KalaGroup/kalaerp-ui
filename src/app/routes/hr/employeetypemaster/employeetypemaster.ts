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
//import { countryService } from '../hr.service';
import { Employeetypeservice } from '@shared/services/hr/employeetype/employeetypeservice';
import { IEmployeetype } from '@shared/interfaces/hr/employeetype';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { AddEditEmployeetype } from './add-edit-employeetype/add-edit-employeetype';
import { Toastservice } from 'app/routes/toastservice';

@Component({
  selector: 'app-employeetypemaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule
  ],
  templateUrl: './employeetypemaster.html',
  styleUrl: './employeetypemaster.scss'
})
export class employeetypemaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  employeetypes: IEmployeetype[] = [];
  showForm = false;
  employeeetypeModel: any = {};
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


  constructor(private fb: FormBuilder, private employeetypeService: Employeetypeservice, private dialog: MatDialog, private toastService: Toastservice) { }
  ngOnInit(): void {
    this.loadAllemployeetypes();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('EmployeeType Name'),
      field: 'EmployeeTypeName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('EmployeeTypeDescription'),
      field: 'EmployeeTypeDescription',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('EmployeeTypeRemark'),
      field: 'EmployeeTypeRemark',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('EmployeeTypeIsActive Active'),
      field: 'EmployeeTypeIsActive',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Action'),
      field: 'Action',
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

  loadAllemployeetypes() {
    this.employeetypeService.getAllemployeetypes().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched employee types with S.No:', this.list);
      },
      error: (err) => {
        console.error('Error fetching employeetypes:', err);
        this.toastService.showError('Failed to fetch employee types. Please try again later.');
      }
    });
  }


  edit(record: any) {
    // Open dialog, pass in the record
    this.dialog.open(AddEditEmployeetype, {
      width: '65%',
      height: '65%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { employeetype: record },
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('employeetype Updated:', result);
        // Create update payload
        const updatePayload: IEmployeetype = {
          EmployeeTypeId: record.EmployeeTypeId,
          // EmployeeTypeCode: result.EmployeeTypeCode,
          EmployeeTypeName: result.EmployeeTypeName,
          EmployeeTypeDescription: result.EmployeeTypeDescription,
          EmployeeTypeRemark: result.EmployeeTypeRemark,
          EmployeeTypeIsDiscard: false,
          EmployeeTypeAuth: result.EmployeeTypeAuth,
          EmployeeTypeIsActive: result.EmployeeTypeIsActive,
        };
        console.log('Update payload:', updatePayload);
        this.employeetypeService.updateemployeetype(updatePayload).subscribe({
          next: (response) => {
            console.log('employeetype updated successfully:', response);

            this.loadAllemployeetypes();
            this.toastService.showSuccess(`EmployeeTypeName "${result.EmployeeTypeName}" updated successfully!`);
          },
          error: (err) => {
            console.error('Error updating employeetype:', err);
          }
        });
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditEmployeetype, {
      width: '65%',
      height: '65%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added employeetype:', result);
        const payload: IEmployeetype = {
          // EmployeeTypeCode: result.EmployeeTypeCode,
          EmployeeTypeName: result.EmployeeTypeName,
          EmployeeTypeDescription: result.EmployeeTypeDescription,
          EmployeeTypeRemark: result.EmployeeTypeRemark,
          EmployeeTypeAuth: result.EmployeeTypeAuth,
          EmployeeTypeIsDiscard: false,
          EmployeeTypeIsActive: result.EmployeeTypeIsActive,
        };
        console.log('Payload for adding employee type:', payload);
        // Call the service to insert the country
        this.employeetypeService.insertemployeetype(payload).subscribe({
          next: (response) => {
            console.log('employee type added successfully:', response);
            this.loadAllemployeetypes();

            this.toastService.showSuccess(`EmployeeTypeName "${result.EmployeeTypeName}" added successfully!`);
          },
          error: (err) => {
            console.error('Error while adding employee type:', err);
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
    this.employeetypeService.deleteemployeetype(value.EmployeeTypeId).subscribe({
      next: (response) => {
        console.log('employeetype deleted successfully:', response);

        this.toastService.showSuccess(`EmployeeTypeName "${value.EmployeeTypeName}" deleted successfully!`);
        this.loadAllemployeetypes();
      },
      error: (err) => {
        console.error('Error deleting employeetype:', err);
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

