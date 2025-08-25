import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule }   from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
//import { currencyService } from '../hr.service';
import { Currencyservice } from '@shared/services/hr/currency/currencyservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { AddEditCurrency } from './add-edit-currency/add-edit-currency';
import { Toastservice } from 'app/routes/toastservice';
import { ICurrency } from '@shared/interfaces/hr/currency';

@Component({
  selector: 'app-currencymaster',
  imports: [
    CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule,
    MtxGridModule, PageHeader, MatDialogModule,
  ],
  templateUrl: './currencymaster.html',
  styleUrl: './currencymaster.scss'
})
export class Currencymaster implements OnInit {
  private readonly translate = inject(TranslateService);



  // Grid configuration
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

  isLoading = true;
  list: ICurrency[] = [];
  selectedCurrency: ICurrency | null = null;
  currencyForm: FormGroup;

  constructor(private fb: FormBuilder,private currencyService: Currencyservice,private dialog: MatDialog,private toastService:Toastservice) {
    this.currencyForm = this.fb.group({
      CurrencyName: ['', [Validators.required]],
      CurrencySymbol: ['', [Validators.required]],
      CurrencyRemark: [''],
      CurrencyAuth: [''],
      CurrencyIsDiscard: [false],
      CurrencyIsActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadAllCurrencies();
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
      header: this.translate.stream('Currency Name'),
      field: 'CurrencyName',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Currency Symbol'),
      field: 'CurrencySymbol',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Currency Remark'),
      field: 'CurrencyRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Currency Auth'),
      field: 'CurrencyAuth',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Is Discard'),
      field: 'CurrencyIsDiscard',
      sortable: true,
      minWidth: 140,
      width: '140px',
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'red-100' },
        false: { text: 'No', color: 'green-100' }
      }
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'CurrencyIsActive',
      sortable: true,
      minWidth: 100,
      width: '100px',
      type: 'tag',
      tag: {
        true: { text: 'Active', color: 'green-100' },
        false: { text: 'Inactive', color: 'red-100' }
      }
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
          click: (record: ICurrency) => this.edit(record),
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
          click: (record: ICurrency) => this.delete(record),
        },
      ],
    },
  ];

  loadAllCurrencies(): void {
    this.isLoading = true;
    this.currencyService.getAllCurrencies().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched currencies with S.No:', this.list);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching currencies:', err);
        this.isLoading = false;
      }
    });
  }

  edit(record: any) {
    debugger
    // Open dialog, pass in the record
    this.dialog.open(AddEditCurrency, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { currency: record },
    }).afterClosed().subscribe(result => {
      if (result) {
         console.log('Country Updated:', result);
          // Create update payload
        // const updatePayload: Country = {
        //   CountryId: record.CountryId,
        //   CountryCode: result.CountryCode,
        //   CountryName: result.CountryName,
        //   CountryShortName: result.CountryShortName,
        //   CountryCurrencyId: result.CurrencyId,
        //   IsActive: result.IsActive,
        // };
        // console.log('Update payload:', updatePayload);
        // this.currencyService.updateCountry(updatePayload).subscribe({
        //   next: (response) => {
        //     console.log('Country updated successfully:', response);
        //     alert(`Country "${result.CountryName}" updated successfully!`);
        //     this.loadAllCountries();
        //   },
        //   error: (err) => {
        //     console.error('Error updating country:', err);
        //   }
        // });
      }
    });
  }

   openAddDialog() {
    const dialogRef = this.dialog.open(AddEditCurrency, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        console.log('Added country:', result);
        // const payload: Country = {
        //   CountryCode: result.CountryCode,
        //   CountryName: result.CountryName,
        //   CountryShortName: result.CountryShortName,
        //   CountryCurrencyId: result.CurrencyId,
        //   IsActive: result.IsActive,
        // };
        // console.log('Payload for adding country:', payload);
        // Call the service to insert the country
        // this.currencyService.insertCountry(payload).subscribe({
        //   next: (response) => {
        //     console.log('Country added successfully:', response);
        //     this.loadAllCountries();
        //     alert(`Country "${result.CountryName}" added successfully!`);
        //    // this.toastService.showSuccess(`Country "${result.CountryName}" added successfully!`);
        //   },
        //   error: (err) => {
        //     console.error('Error while adding country:', err);
        //     this.toastService.showError('Failed to add country. Please verify country details and try again.');
        //   }
        // });
      }
    });
  }

  // edit(record: Currency): void {
  //   this.selectedCurrency = record;
  //   this.currencyForm.patchValue(record);
  // }

  delete(record: ICurrency): void {
    console.log('Deleting currency:', record.CurrencyName);
    // Implement actual delete logic here
    // this.currencyService.deleteCurrency(record.id).subscribe({
    //   next: () => {
    //     this.loadAllCurrencies();
    //     // Show success message
    //   },
    //   error: (err) => {
    //     console.error('Error deleting currency:', err);
    //     // Show error message
    //   }
    // });
  }

  onFormSubmit(): void {
    if (this.currencyForm.valid) {
      const formData = this.currencyForm.value;

      if (this.selectedCurrency) {
        // Update existing currency
        console.log('Updating currency:', formData);
        // this.currencyService.updateCurrency(this.selectedCurrency.id, formData).subscribe({...});
      } else {
        // Create new currency
        console.log('Creating new currency:', formData);
        // this.currencyService.createCurrency(formData).subscribe({...});
      }

      this.loadAllCurrencies();
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      Object.keys(this.currencyForm.controls).forEach(key => {
        this.currencyForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.currencyForm.reset();
  }

  changeSelect(e: any): void {
    console.log('Selection changed:', e);
  }

  changeSort(e: any): void {
    console.log('Sort changed:', e);
  }

  enableRowExpandable(): void {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell(): void {
    this.list = this.list.map(item => ({
      ...item,
      // Update some random field for demo
      CurrencyRemark: `Updated ${new Date().getTime()}`
    }));
  }

  updateList(): void {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
