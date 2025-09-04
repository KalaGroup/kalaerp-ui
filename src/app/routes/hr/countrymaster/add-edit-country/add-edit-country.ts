import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { countryService } from '../../hr.service';
import { Countryservice } from '@shared/services/hr/country/countryservice';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-edit-country',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './add-edit-country.html',
  styleUrl: './add-edit-country.scss',
})
export class AddEditCountry {
  countryForm!: FormGroup;
  isEditMode: boolean = false;
  currencyList: any[] = [];
  code: string ='';
  currencySearchControl = new FormControl('');
  filteredCurrencyList: any[] = [];


  constructor(private countryService: Countryservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCountry>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.country;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCurrencies();
  }

  private initializeForm(): void {
    //  const currentDate = new Date().toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // });
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.countryForm = this.fb.group({
       CreatedDate: [{ value: currentDate, disabled: true }],
       code: [{ value: '', disabled: !this.isEditMode }],
      CountryCode: ['', [Validators.required]],
      CountryName: ['', [Validators.required]],
      CountryShortName: ['', [Validators.required]],
      CurrencyId: ['', [Validators.required]],
      IsActive: [{ value: true, disabled: !this.isEditMode }],
    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.country) {
      console.log('Patching form with country data:', this.data.country);
      this.countryForm.patchValue({
         code: this.data.country.code || this.data.country.CountryCode || '',
        CountryCode: this.data.country.CountryCode || '',
        CountryName: this.data.country.CountryName || '',
        CountryShortName: this.data.country.CountryShortName || '',
        IsActive: this.data.country.IsActive ?? true
      });
       this.countryForm.get('code')?.enable();
      this.countryForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.countryForm.value);
    }
  }

  loadAllCurrencies(): void {
    this.countryService.getAllCurrencies().subscribe({
      next: (res) => {
        this.currencyList = res;
        console.log('Loaded currencies:', res);
         this.filteredCurrencyList = [...this.currencyList];
         this.currencySearchControl.valueChanges.subscribe(value => {
        const filterValue = (value || '').toLowerCase();
        this.filteredCurrencyList = this.currencyList.filter(currency =>
          currency.CurrencyName.toLowerCase().includes(filterValue)
        );
      });
        // Handle currency selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCurrencyForEdit();
        }
      },
      error: (err) => {
        console.error('Failed to load currencies:', err);
      }
    });
  }

   private setCurrencyForEdit(): void {
    let currencyId = null;
    const countryData = this.data.country;
    // Find currency by name (trim whitespace for comparison)
    if (countryData?.CurrencyName) {
      const currency = this.currencyList.find(c =>
        c.CurrencyName.trim() === countryData.CurrencyName.trim()
      );
      currencyId = currency ? currency.CurrencyId : null;
      console.log('Found currency by name:', currencyId, 'for currency:', countryData.CurrencyName);
    }

    if (currencyId) {
      this.countryForm.patchValue({
        CurrencyId: currencyId
      });
      console.log('Currency set in form:', currencyId);
    } else {
      console.log('No currency ID found for currency name:', countryData?.CurrencyName);
    }
  }

  onSubmit(): void {
    if (this.countryForm.valid) {
      this.dialogRef.close(this.countryForm.value);
    } else {
      this.countryForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
