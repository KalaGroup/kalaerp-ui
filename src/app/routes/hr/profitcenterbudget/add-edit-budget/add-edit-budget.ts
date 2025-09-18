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
import { ProfitcenterBudgetservice } from '@shared/services/hr/ProfitcenterBudget/ProfitcenterBudgetservice';

@Component({
  selector: 'app-add-edit-budget',
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
    MatIconModule
  ],
  templateUrl: './add-edit-budget.html',
  styleUrl: './add-edit-budget.scss'
})
export class AddEditBudget {
  profitcenterBudgetForm!: FormGroup;
  isEditMode = false;
  BudgettypeList: any[] = [];
  code = '';
  BudgettypeSearchControl = new FormControl('');
  filteredBudgettypeList: any[] = [];
  ProfitcenterList: any[] = [];
  EmployeeList: any[] = [];
  FinancialYearList: any[] = [];


  constructor(
    private Profitcenterbudgetservice: ProfitcenterBudgetservice,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditBudget>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.profitcenterbudget;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllProfitcenterBudget();
    this.loadAllEmployee();
    this.loadAllFinancialYear();
  }

  private initializeForm(): void {
    const currentDate = new Date();

    this.profitcenterBudgetForm = this.fb.group({
      ProfitcenterBudgetId: [0],
      ProfitcenterBudgetProfitcenterId: ['', Validators.required],
      ProfitCenterBudgetHeadId: ['', Validators.required],
      ProfitcenterFy: ['', Validators.required],
      ProfitcenterBudgetBudgetAmt: [0, [Validators.required, Validators.min(1)]],
      ProfitCenterBudgetRemark: [''],
      ProfitCenterBudgetAuthRemark: [''],
      ProfitCenterBudgetAuth: [{ value: true, disabled: !this.isEditMode }],
      ProfitCenterBudgetIsActive: [{ value: true, disabled: !this.isEditMode }],
      ProfitCenterBudgetIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: [1],
      CreatedDate: [currentDate],
      UpdatedBy: [1],
      UpdatedDate: [currentDate]
    });

    if (this.isEditMode && this.data.profitcenterbudget) {
      this.profitcenterBudgetForm.patchValue(this.data.profitcenterbudget);
    }
  }

  loadAllProfitcenterBudget(): void {
    this.Profitcenterbudgetservice.getAllProfitcenter().subscribe({
      next: res => {
        this.ProfitcenterList = res;
        console.log('All profitcenter budgets:', this.ProfitcenterList);
        if (this.isEditMode && this.data) {
          this.setProfitcenterbudgetForEdit();
        }
      },
      error: err => console.error('Error loading profitcenters', err)
    });
  }

  private setProfitcenterbudgetForEdit(): void {
    const ProfitCenterData = this.data.profitcenterbudget;
    if (ProfitCenterData?.ProfitCenterName) {
      const match = this.ProfitcenterList.find(
        p => p.ProfitCenterName?.trim() === ProfitCenterData.ProfitCenterName?.trim()
      );
      if (match) {
        this.profitcenterBudgetForm.patchValue({
          ProfitcenterBudgetProfitcenterId: match.ProfitCenterId
        });
      }
    }
  }

  loadAllEmployee(): void {
    this.Profitcenterbudgetservice.getAllEmployeeId().subscribe({
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
    const profitcenterData = this.data.profitcenterbudget;
    if (profitcenterData?.EmployeeMasterFullName) {
      const match = this.EmployeeList.find(
        e => e.EmployeeMasterFullName?.trim() === profitcenterData.EmployeeMasterFullName?.trim()
      );
      if (match) {
        this.profitcenterBudgetForm.patchValue({
          ProfitCenterBudgetHeadId: match.EmployeeMasterId
        });
      }
    }
  }




  loadAllFinancialYear(): void {

    this.Profitcenterbudgetservice.getAllFinancialYear().subscribe({
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
    const profitcenterData = this.data.profitcenterbudget;

    if (profitcenterData?.ProfitcenterFy) {
      this.profitcenterBudgetForm.patchValue({
        ProfitcenterFy: profitcenterData.ProfitcenterFy
      });
      console.log('Financial Year patched:', profitcenterData.ProfitcenterFy);
    }
  }





  onSubmit(): void {
    if (this.profitcenterBudgetForm.valid) {
      this.dialogRef.close(this.profitcenterBudgetForm.value);
    } else {
      this.profitcenterBudgetForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
