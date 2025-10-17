import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
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
import { DepartmentbudgetServices } from '@shared/services/hr/Departmentbudget/departmentbudget-services';

@Component({
  selector: 'app-add-edit-departmentbudget',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    MatIconModule],
  templateUrl: './add-edit-departmentbudget.html',
  styleUrl: './add-edit-departmentbudget.scss'
})
export class AddEditDepartmentbudget {
  DepartmentBudgetForm!: FormGroup;
  isEditMode = false;
  BudgettypeList: any[] = [];
  code = '';
  BudgettypeSearchControl = new FormControl('');
  filteredBudgettypeList: any[] = [];
  DepartmentList: any[] = [];
  EmployeeList: any[] = [];
  FinancialYearList: any[] = [];

  constructor(
    private departmentbudgetservice: DepartmentbudgetServices,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDepartmentbudget>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.Departmentbudget;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    //this.loadAllDepartmentBudget();
    this.loadAllEmployee();
    this.loadAllFinancialYear();
    this.loadAllDepartments();
  }


  private initializeForm(): void {
    const currentDate = new Date();

    this.DepartmentBudgetForm = this.fb.group({
      DepartmentBudgetId: [0],
      DepartmentBudgetDepartmentId: ['', Validators.required],
      DepartmentBudgetHeadId: ['', Validators.required],
      DepartmentFy: ['', Validators.required],
      DepartmentBudgetAmt: [0, [Validators.required, Validators.min(1)]],
      DepartmentBudgetRemark: ['', [Validators.required, this.noLeadingTrailingSpaceValidator]],
      DepartmentBudgetAuthRemark: ['', [Validators.required, this.noLeadingTrailingSpaceValidator]],
      DepartmentBudgetAuth: [{ value: true, disabled: !this.isEditMode }],
      DepartmentBudgetIsActive: [{ value: true, disabled: !this.isEditMode }],
      DepartmentBudgetIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: [1],
      CreatedDate: [currentDate],
      UpdatedBy: [1],
      UpdatedDate: [currentDate]
    });

    if (this.isEditMode && this.data.Departmentbudget) {
      this.DepartmentBudgetForm.patchValue(this.data.Departmentbudget);
    }
  }


  // loadAllDepartmentBudget(): void {
  //   this.departmentbudgetservice.getAllDepartmentBudget().subscribe({
  //     next: res => {
  //       this.DepartmentList = res;
  //       console.log('All Department budgets:', this.DepartmentList);
  //       if (this.isEditMode && this.data) {
  //         //this.setDepartmentbudgetForEdit();
  //       }
  //     },
  //     error: err => console.error('Error loading Department', err)
  //   });
  // }


  loadAllDepartments(): void {
    debugger
    this.departmentbudgetservice.getAllDepartments().subscribe({
      next: res => {
        this.DepartmentList = res;
        console.log('All Department:', this.DepartmentList);
        if (this.isEditMode && this.data) {
          this.setDepartmentbudgetForEdit();
        }
      },
      error: err => console.error('Error loading Department', err)
    });
  }



  private setDepartmentbudgetForEdit(): void {
    debugger
    const ProfitCenterData = this.data.Departmentbudget;
    if (ProfitCenterData?.DepartmentName) {
      const match = this.DepartmentList.find(
        p => p.DepartmentName?.trim() === ProfitCenterData.DepartmentName?.trim()
      );
      if (match) {
        this.DepartmentBudgetForm.patchValue({
          DepartmentBudgetDepartmentId: match.DepartmentId
        });
      }
    }
  }

  loadAllEmployee(): void {
    this.departmentbudgetservice.getAllEmployeeId().subscribe({
      next: res => {
        this.EmployeeList = res;
        console.log('EmployeeList', this.EmployeeList);
        if (this.isEditMode && this.data) {
          this.setEmployeeForEdit();
        }
      },
      error: err => console.error('Error loading employees', err)
    });
  }

  private setEmployeeForEdit(): void {
    const profitcenterData = this.data.Departmentbudget;
    if (profitcenterData?.EmployeeMasterFullName) {
      const match = this.EmployeeList.find(
        e => e.EmployeeMasterFullName?.trim() === profitcenterData.EmployeeMasterFullName?.trim()
      );
      if (match) {
        this.DepartmentBudgetForm.patchValue({
          DepartmentBudgetHeadId: match.EmployeeMasterId
        });
      }
    }
  }

  loadAllFinancialYear(): void {

    this.departmentbudgetservice.getAllFinancialYear().subscribe({
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
    const Departmentdata = this.data.Departmentbudget;

    if (Departmentdata?.DepartmentFy) {
      this.DepartmentBudgetForm.patchValue({
        DepartmentFy: Departmentdata.DepartmentFy
      });
      console.log('Financial Year patched:', Departmentdata.DepartmentFy);
    }
  }

  onSubmit(): void {
    this.DepartmentBudgetForm.enable();
    if (this.DepartmentBudgetForm.valid) {
      this.dialogRef.close(this.DepartmentBudgetForm.value);
    } else {
      this.DepartmentBudgetForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  // ✅ Allow only valid characters (letters, numbers, spaces, punctuation)
  allowLettersNumbersSpaces(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9\s.,-]*$/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // ✅ Disallow leading/trailing spaces
  noLeadingTrailingSpaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    if (value.trim().length !== value.length) {
      return { invalidSpaces: true };
    }
    return null;
  }

  // ✅ Trim on blur
  trimRemark(controlName: string) {
    const control = this.DepartmentBudgetForm.get(controlName);
    if (control && typeof control.value === 'string') {
      const trimmed = control.value.trim();
      if (trimmed !== control.value) {
        control.setValue(trimmed);
      }
    }
  }


}
