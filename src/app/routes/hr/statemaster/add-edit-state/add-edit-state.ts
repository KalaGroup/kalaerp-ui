import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Stateservice } from '@shared/services/hr/state/stateservice';
import { Countryservice } from '@shared/services/hr/country/countryservice';

@Component({
  selector: 'app-add-edit-state',
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
    MatIconModule,
  ],
  templateUrl: './add-edit-state.html',
  styleUrl: './add-edit-state.scss',
})
export class AddEditState {
  stateForm!: FormGroup;
  isEditMode: boolean = false;
  countrieslist: any[] = [];
  code: string = '';
  countriesSearchControl = new FormControl('');
  filteredContriesList: any[] = [];

  constructor(
    private stateService: Stateservice,
    private countryService: Countryservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.state;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCountries();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date();
    this.stateForm = this.fb.group({
      StateId: [''],
      CountryID: ['', [Validators.required]],
      StateCode: ['', [Validators.required]],
      StateName: ['', [Validators.required]],
      ShortName: ['', [Validators.required]],
      IsDiscard: [{ value: false, disabled: !this.isEditMode }],
      IsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      debugger;
      console.log('Patching form with country data:', this.data.state);
      this.stateForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        code: this.data.state.code,
        StateId: this.data.state.StateId,
        CountryID: this.data.state.CountryID,
        StateCode: this.data.state.StateCode,
        StateName: this.data.state.StateName,
        ShortName: this.data.state.ShortName,
        IsActive: this.data.state.IsActive,
        IsDiscard: this.data.state.IsDiscard,
        CreatedBy: this.data.state.CreatedBy,
      });
      this.stateForm.get('code')?.enable();
      this.stateForm.get('CreatedDate')?.disable();
      this.stateForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.stateForm.value);
    }
  }
    loadAllCountries(): void {
    this.countryService.getAllCountries().subscribe({
      next: res => {
        this.countrieslist = res;
        console.log('Countries loaded:', res);
        this.filteredContriesList = [...this.countrieslist];
        this.countriesSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredContriesList = this.countrieslist.filter(countries =>
            countries.CountryName.toLowerCase().includes(filterValue)
          );
        });
        // Handle currency selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCountryForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Countries:', err);
      },
    });
  }

  private setCountryForEdit(): void {
    debugger;
    let CountryId: number | null = null;
    const stateData = this.data.state;

    if (stateData?.CountryName) {
      const country = this.countrieslist.find(
        c => c.CountryName.trim().toLowerCase() === stateData.CountryName.trim().toLowerCase()
      );

      CountryId = country ? country.CountryId : null; // 🔥 use correct property name

      console.log('Found Country by name:', CountryId, 'for Country:', stateData.CountryName);
    }

    if (CountryId) {
      this.stateForm.patchValue({
        CountryID: CountryId,
      });
      console.log('Country set in form:', CountryId);
    } else {
      console.log('No Country ID found for Country name:', stateData?.CountryName);
    }
  }

  toUpperCase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.stateForm.get('ShortName')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    this.stateForm.enable(); //important for active boolean

    if (this.stateForm.valid) {
      this.dialogRef.close(this.stateForm.value);
    } else {
      this.stateForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
