import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { shiftmasterservice } from '@shared/services/hr/shiftmaster/shiftmaster';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-add-edit-shift',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    MatIconModule,
    MatTimepickerModule
  ],
  templateUrl: './add-edit-shift.html',
  styleUrl: './add-edit-shift.scss'
})
export class AddEditShift {
  shiftMasterForm!: FormGroup;
  isEditMode = false;

  CompanyList: any[] = [];
  EmployeeList: any[] = [];
  filteredCompanyList: any[] = [];
  filteredEmployeeTypeList: any[] = [];

  CompanySearchControl = new FormControl('');
  EmployeeTypeSearchControl = new FormControl('');

  constructor(
    private shiftmasterservice: shiftmasterservice,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditShift>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.shiftmaster;
    console.log('Edit mode:', this.isEditMode, 'Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCompany();
    this.loadAllEmployeeType();
  }

  private initializeForm(): void {
    const currentDate = new Date();

    this.shiftMasterForm = this.fb.group({
      ShiftMasterId: [0],
      ShiftMasterCompanyId: ['', Validators.required],
      ShiftMasterEmployeeTypeId: ['', Validators.required],
      ShiftMasterName: ['', Validators.required],
      ShiftMasterAliseName: ['', Validators.required],
      ShiftMasterStartTime: ['', Validators.required],
      ShiftMasterEndTime: ['', Validators.required],
      ShiftMasterLunchStartTime: ['', Validators.required],
      ShiftMasterLunchEndTime: ['', Validators.required],
      ShiftMasterRemark: [''],
      ShiftMasterAuthRemark: [''],
      ShiftMasterAuth: [{ value: true, disabled: !this.isEditMode }],
      ShiftMasterIsActive: [{ value: true, disabled: !this.isEditMode }],
      ShiftMasterIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: [1],
      CreatedDate: [currentDate]
    });

    if (this.isEditMode && this.data.shiftmaster) {
      this.shiftMasterForm.patchValue(this.data.shiftmaster);
    }
  }

  loadAllCompany(): void {
    this.shiftmasterservice.getAllShiftMasterCompany().subscribe({
      next: res => {
        this.CompanyList = res;
        this.filteredCompanyList = [...this.CompanyList];

        this.CompanySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCompanyList = this.CompanyList.filter(company =>
            company.CompanyName.toLowerCase().includes(filterValue)
          );
        });

        if (this.isEditMode && this.data) {
          this.setCompanyForEdit();
        }
      },
      error: err => console.error('Error loading companies', err)
    });
  }

  private setCompanyForEdit(): void {
    const companyData = this.data.shiftmaster;

    if (companyData?.ShiftMasterCompanyId) {
      this.shiftMasterForm.patchValue({
        ShiftMasterCompanyId: companyData.ShiftMasterCompanyId
      });
      console.log('Company set by ID:', companyData.ShiftMasterCompanyId);
    } else if (companyData?.CompanyName) {
      const company = this.CompanyList.find(
        c => c.CompanyName?.trim().toLowerCase() === companyData.CompanyName?.trim().toLowerCase()
      );
      if (company) {
        this.shiftMasterForm.patchValue({ ShiftMasterCompanyId: company.CompanyId });
        console.log('Company set by name:', company.CompanyId);
      }
    }
  }

  loadAllEmployeeType(): void {
    this.shiftmasterservice.getAllemployeetypes().subscribe({
      next: res => {
        this.EmployeeList = res;
        this.filteredEmployeeTypeList = [...this.EmployeeList];

        this.EmployeeTypeSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredEmployeeTypeList = this.EmployeeList.filter(emp =>
            emp.EmployeeTypeName.toLowerCase().includes(filterValue)
          );
        });

        if (this.isEditMode && this.data) {
          this.setEmployeeTypeForEdit();
        }
      },
      error: err => console.error('Error loading employee types', err)
    });
  }

  private setEmployeeTypeForEdit(): void {
    const empData = this.data.shiftmaster;

    if (empData?.ShiftMasterEmployeeTypeId) {
      this.shiftMasterForm.patchValue({
        ShiftMasterEmployeeTypeId: empData.ShiftMasterEmployeeTypeId
      });
      console.log('Employee type set by ID:', empData.ShiftMasterEmployeeTypeId);
    } else if (empData?.EmployeeTypeName) {
      const empType = this.EmployeeList.find(
        e => e.EmployeeTypeName?.trim().toLowerCase() === empData.EmployeeTypeName?.trim().toLowerCase()
      );
      if (empType) {
        this.shiftMasterForm.patchValue({ ShiftMasterEmployeeTypeId: empType.EmployeeTypeId });
        console.log('Employee type set by name:', empType.EmployeeTypeId);
      }
    }
  }

  onSubmit(): void {
    if (this.shiftMasterForm.valid) {
      this.dialogRef.close(this.shiftMasterForm.value);
    } else {
      this.shiftMasterForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
