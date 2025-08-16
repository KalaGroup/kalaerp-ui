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
import { HrService } from '../../hr.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-edit-currency',
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
  templateUrl: './add-edit-currency.html',
  styleUrl: './add-edit-currency.scss'
})
export class AddEditCurrency {
currencyForm!: FormGroup;
  isEditMode: boolean = false;
  currencyList: any[] = [];
  CurrencyId: string ='';
  currencySearchControl = new FormControl('');
  filteredCurrencyList: any[] = [];


  constructor(private hrService: HrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCurrency>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.currency;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCurrencies();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.currencyForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      CurrencyId: [{ value: '', disabled: !this.isEditMode }],
      CurrencyAuth: [{ value: true, disabled: !this.isEditMode }],
      CurrencyDiscard: [{ value: true, disabled: !this.isEditMode }],
      CurrencyIsActive: [{ value: true, disabled: !this.isEditMode }],
      CurrencyName: ['', [Validators.required]],
      CurrencySymbol: ['', [Validators.required]],
      CurrencyRemark: ['', [Validators.required]],
    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.currency) {
      console.log('Patching form with country data:', this.data.currency);
      this.currencyForm.patchValue({
        CurrencyId: this.data.currency.CurrencyId,
        CurrencyName: this.data.currency.CurrencyName || '',
        CurrencyRemark: this.data.currency.CurrencyRemark || '',
        CurrencyIsActive: this.data.currency.CurrencyIsActive ?? true,
        CurrencyDiscard: this.data.currency.CurrencyIsDiscard ?? false,
        CurrencyAuth: this.data.currency.CurrencyAuth ?? false
      });
       this.currencyForm.get('CurrencyIsActive')?.enable();
      this.currencyForm.get('CurrencyDiscard')?.enable();
      this.currencyForm.get('CurrencyAuth')?.enable();
      console.log('Form values after patch:', this.currencyForm.value);
    }
  }

  loadAllCurrencies(): void {
    this.hrService.getAllCurrencies().subscribe({
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
      this.currencyForm.patchValue({
        CurrencyId: currencyId
      });
      console.log('Currency set in form:', currencyId);
    } else {
      console.log('No currency ID found for currency name:', countryData?.CurrencyName);
    }
  }

  onSubmit(): void {
    if (this.currencyForm.valid) {
      this.dialogRef.close(this.currencyForm.value);
    } else {
      this.currencyForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
