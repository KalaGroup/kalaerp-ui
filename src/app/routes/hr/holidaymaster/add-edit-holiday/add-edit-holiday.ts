/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../../schematics/ng-add/files/module-files/app/material-module';
import { FormsModule } from '@angular/forms';
import { Holidayservice } from '@shared/services/hr/holiday/holidayservice';
import { Companyservice } from '@shared/services/hr/company/companyservice';
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-add-edit-holiday',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MaterialModule,
  ],
  templateUrl: './add-edit-holiday.html',
  styleUrl: './add-edit-holiday.scss',
})
export class AddEditHoliday implements OnInit {
  holidayForm!: FormGroup;
  isEditMode: boolean = false;
  companieslist: any[] = [];
  code: string = '';
  companiesSearchControl = new FormControl('');
  filteredCompaniesList: any[] = [];

  FinancialYearList: any[] = [];

  constructor(
    private holidayService: Holidayservice,
    private companyService: Companyservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditHoliday>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.holiday;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCompanies();
    this.loadAllFinancialYear();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.holidayForm = this.fb.group({
      HolidayId: [''],
      HolidayFy: ['', Validators.required],
      HolidayDate: ['', Validators.required],
      HolidayFor: ['', Validators.required],
      HolidayCompanyId: ['', Validators.required],
      HolidayRemark: [''],
      HolidayAuth: [{ value: true, disabled: !this.isEditMode }],
      HolidayAuthRemark: ['NIL'],
      HolidayIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      HolidayIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      debugger;
      console.log('Patching form with company data:', this.data.holiday);
      this.holidayForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        code: this.data.holiday.code,
        HolidayId: this.data.holiday.HolidayId,
        HolidayFy: this.data.holiday.HolidayFy,
        HolidayDate: this.data.holiday.HolidayDate,
        HolidayFor: this.data.holiday.HolidayFor,
        HolidayCompanyId: this.data.holiday.HolidayCompanyId,
        HolidayRemark: this.data.holiday.HolidayRemark,
        HolidayAuth: this.data.holiday.HolidayAuth,
        HolidayAuthRemark: this.data.holiday.HolidayAuthRemark,
        HolidayIsDiscard: this.data.holiday.HolidayIsDiscard,
        HolidayIsActive: this.data.holiday.HolidayIsActive,
        CreatedBy: this.data.holiday.CreatedBy,
      });
      this.holidayForm.get('code')?.enable();
      this.holidayForm.get('CreatedDate')?.disable();
      this.holidayForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.holidayForm.value);
    }
  }

  loadAllCompanies(): void {
    this.companyService.getAllCompanies().subscribe({
      next: res => {
        this.companieslist = res;
        console.log('Countries loaded:', res);
        this.filteredCompaniesList = [...this.companieslist];
        this.companiesSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCompaniesList = this.companieslist.filter(countries =>
            countries.CompanyName.toLowerCase().includes(filterValue)
          );
        });
        // Handle currency selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCompanyForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Company:', err);
      },
    });
  }

  private setCompanyForEdit(): void {
    debugger;
    let CompanyId: number | null = null;
    const companyData = this.data.holiday;

    if (companyData?.CountryName) {
      const company = this.companieslist.find(
        c => c.CountryName.trim().toLowerCase() === companyData.CompanyName.trim().toLowerCase()
      );

      CompanyId = company ? company.CountryId : null; // 🔥 use correct property name

      console.log('Found Company by name:', CompanyId, 'for Company:', companyData.CompanyName);
    }

    if (CompanyId) {
      this.holidayForm.patchValue({
        HolidayCompanyId: CompanyId,
      });
      console.log('Company set in form:', CompanyId);
    } else {
      console.log('No Company ID found for Company name:', companyData?.CompanyName);
    }
  }



  loadAllFinancialYear(): void {

    this.holidayService.getAllFinancialYear().subscribe({
      next: res => {
        this.FinancialYearList = res;
        console.log('FinancialYearList:', this.FinancialYearList);

        if (this.isEditMode && this.data) {
          this.setFinancialyearForEdit();
        }
      },
      error: err => console.error('Error loading Financial Years', err)
    });
  }

  private setFinancialyearForEdit(): void {
    debugger
    const profitcenterData = this.data.holiday;

    if (profitcenterData?.ProfitcenterFy) {
      this.holidayForm.patchValue({
        HolidayFy: profitcenterData.HolidayFy
      });
      console.log('Financial Year patched:', profitcenterData.HolidayFy);
    }
  }



  onSubmit(): void {
    debugger;
    this.holidayForm.enable(); //important for active boolean

    if (this.holidayForm.valid) {
      this.dialogRef.close(this.holidayForm.value);
    } else {
      this.holidayForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
