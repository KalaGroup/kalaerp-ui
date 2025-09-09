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
import { AddEditProfitcenter } from './add-edit-profitcenter/add-edit-profitcenter';
import { profitcenterservices } from '@shared/services/hr/profitcenter/profitcenterservices';
import { Iprofitcentermaster } from '@shared/interfaces/hr/profitcenter';


@Component({
  selector: 'app-profitcentermaster',
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
  templateUrl: './profitcentermaster.html',
  styleUrl: './profitcentermaster.scss',
})
export class Profitcentermaster implements OnInit {
  expandable: any;
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  profitcentermaster: any[] = [];
  showForm = false;
  profitcenterModel: any = {};
  editIndex: number | null = null;

  // Grid settings
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
  //expandable = false;
  columnResizable = false;

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;


  constructor(private fb: FormBuilder, private profitCenterServices: profitcenterservices, private dialog: MatDialog, private toastService: Toastservice) { }
  ngOnInit(): void {
    this.loadAllProfitcenter();
  }
  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }
  profitcentercolumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('ProfitCenter Code'),
      field: 'ProfitCenterCode',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('ProfitCenter Name'),
      field: 'ProfitCenterName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Profit Center Company'),
      field: 'CompanyName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Parent Profit Center'),
      field: 'ParentProfitCenterId',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark'),
      field: 'ProfitCenterRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'ProfitCenterAuthRemark',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'ProfitCenterIsActive',
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

  loadAllProfitcenter() {
    this.profitCenterServices.getAllProfitcenter().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched qualification with S.No:', this.list);
      },
      error: (err) => {
        console.error('Error fetching qualification:', err);
      }
    });
  }
  edit(record: Iprofitcentermaster) { // If you have a Qualification interface, use it here
    // debugger; // Remove before production

    this.dialog.open<AddEditProfitcenter, { profitcenter: Iprofitcentermaster }, Iprofitcentermaster>(AddEditProfitcenter, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { profitcenter: record },
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Qualification Updated:', result);
        console.log('Original record CreatedBy:', record.CreatedBy);

        const updatePayload: Iprofitcentermaster = {
          ProfitCenterId: record.ProfitCenterId,
          ProfitCenterCode: result.ProfitCenterCode,
          ProfitCenterName: result.ProfitCenterName,
          ProfitCenterCompanyId: result.ProfitCenterCompanyId,
          ParentProfitCenterId: result.ParentProfitCenterId, // Consistent casing
          ProfitCenterRemark: result.ProfitCenterRemark,
          ProfitCenterAuthRemark: result.ProfitCenterAuthRemark,
          ProfitCenterAuth: result.ProfitCenterAuth,
          ProfitCenterIsDiscard: result.ProfitCenterIsDiscard,
          ProfitCenterIsActive: result.ProfitCenterIsActive,
          CreatedBy: record.CreatedBy ?? 1, // fallback user id
          CreatedDate: record.CreatedDate ?? new Date() // fallback date if missing
        };

        console.log('Update payload:', updatePayload);

        this.profitCenterServices.updateProfitcenter(updatePayload).subscribe({
          next: (response) => {
            this.toastService.showSuccess("updated successfully!");
            alert(`profit "${result.ProfitCenterName}" updated successfully!`);

            this.loadAllProfitcenter();
          },
          error: (err) => {
            console.error('Error updating profit:', err);
            alert('Error updating profit. Please try again.');
          }
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditProfitcenter, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // Empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(' profitcenter data:', result);

        const payload: Iprofitcentermaster = {
          ProfitCenterId: 0,
          ProfitCenterCode: result.ProfitCenterCode,
          ProfitCenterName: result.ProfitCenterName,
          ProfitCenterCompanyId: result.ProfitCenterCompanyId,
          ParentProfitCenterId: result.ParentProfitCenterId, // Ensure ID casing is correct
          ProfitCenterRemark: result.ProfitCenterRemark,
          ProfitCenterAuthRemark: result.ProfitCenterAuthRemark,
          ProfitCenterAuth: result.ProfitCenterAuth,
          ProfitCenterIsDiscard: result.ProfitCenterIsDiscard,
          ProfitCenterIsActive: result.ProfitCenterIsActive,
          CreatedBy: result.CreatedBy,// Replace with actual user ID if available
          CreatedDate: new Date()
        };

        console.log('Payload for adding profitcenter:', payload);

        this.profitCenterServices.insertProfitcenter(payload).subscribe({
          next: (response) => {
            console.log('profitcenter added successfully:', response);
            this.toastService.showSuccess("profitcenter added successfully");
            this.loadAllProfitcenter();
            alert(`profitcenter added successfully!`);

          },
          error: (err) => {
            console.error('Error while adding profitcenter:', err);
            this.toastService.showError('Failed to add profitcenter. Please verify the details and try again.');
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

    this.profitCenterServices.deleteProfitcenter(value.ProfitCenterId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        console.log('profitcenter deleted successfully:', response);
        this.toastService.showSuccess('profitcenter deleted successfully');
        this.loadAllProfitcenter();
        alert(`profitcenter deleted successfully!`);
      },
      error: (err) => {
        console.error('Error deleting profitcenter:', err);
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
    this.profitcentercolumns[0].showExpand = this.expandable;
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
