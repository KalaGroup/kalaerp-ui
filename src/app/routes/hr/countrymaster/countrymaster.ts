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
import { Countryservice } from '@shared/services/hr/country/countryservice';
import { ICountry } from '@shared/interfaces/hr/country';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { AddEditCountry } from './add-edit-country/add-edit-country';
import { Toastservice } from 'app/routes/toastservice';

@Component({
  selector: 'app-countrymaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule
  ],
  templateUrl: './countrymaster.html',
  styleUrl: './countrymaster.scss'
})
export class Countrymaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  countries: ICountry[] = [];
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


  constructor(private fb: FormBuilder, private countryService: Countryservice, private dialog: MatDialog, private toastService: Toastservice) { }
  ngOnInit(): void {
    this.loadAllCountries();
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
      header: this.translate.stream('Country Code'),
      field: 'CountryCode',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Country Name'),
      field: 'CountryName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Country Short Name'),
      field: 'CountryShortName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Currency Name'),
      field: 'CurrencyName',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'IsActive',
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

  loadAllCountries() {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched countries with S.No:', this.list);
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
      }
    });
  }


  edit(record: any) {
    debugger
    // Open dialog, pass in the record
    this.dialog.open(AddEditCountry, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { country: record },
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Country Updated:', result);
        // Create update payload
        const updatePayload: ICountry = {
          CountryId: record.CountryId,
          CountryCode: result.CountryCode,
          CountryName: result.CountryName,
          CountryShortName: result.CountryShortName,
          CountryCurrencyId: result.CurrencyId,
          IsActive: result.IsActive,
        };
        console.log('Update payload:', updatePayload);
        this.countryService.updateCountry(updatePayload).subscribe({
          next: (response) => {
            console.log('Country updated successfully:', response);
            this.toastService.showSuccess(`Country "${result.CountryName}" updated successfully!`);
            this.loadAllCountries();
          },
          error: (err) => {
            console.error('Error updating country:', err);
          }
        });
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditCountry, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        console.log('Added country:', result);
        const payload: ICountry = {
          CountryCode: result.CountryCode,
          CountryName: result.CountryName,
          CountryShortName: result.CountryShortName,
          CountryCurrencyId: result.CurrencyId,
          IsActive: result.IsActive,
        };
        console.log('Payload for adding country:', payload);
        // Call the service to insert the country
        this.countryService.insertCountry(payload).subscribe({
          next: (response) => {
            console.log('Country added successfully:', response);
            this.loadAllCountries();
            this.toastService.showSuccess(`Country "${result.CountryName}" added successfully!`);
          },
          error: (err) => {
            console.error('Error while adding country:', err);
            this.toastService.showError('Failed to add country. Please verify country details and try again.');
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
    debugger
    this.countryService.deleteCountry(value.CountryId).subscribe({
      next: (response) => {
        console.log('Country deleted successfully:', response);
        this.toastService.showSuccess('Country deleted successfully!');
        this.loadAllCountries();
      },
      error: (err) => {
        console.error('Error deleting country:', err);
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
