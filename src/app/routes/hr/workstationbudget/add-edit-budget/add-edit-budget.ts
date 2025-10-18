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
import { WorkstationBudgetservice } from '@shared/services/hr/workstationbudget/workstationbudget';

@Component({
  selector: 'app-add-edit-budget',
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
  templateUrl: './add-edit-budget.html',
  styleUrl: './add-edit-budget.scss'
})
export class AddEditBudget {
  workstationBudgetForm!: FormGroup;
  isEditMode = false;
  BudgettypeList: any[] = [];
  code = '';
  BudgettypeSearchControl = new FormControl('');
  filteredBudgettypeList: any[] = [];
  WorkstationList: any[] = [];
  EmployeeList: any[] = [];
  FinancialYearList: any[] = [];

  constructor(
    private WorkstationBudgetservice: WorkstationBudgetservice,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditBudget>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.workstationbudget;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllWorkStationBudget();
    this.loadAllEmployee();
    this.loadAllFinancialYear();
  }


  private initializeForm(): void {
    const currentDate = new Date();

    this.workstationBudgetForm = this.fb.group({
      WorkstationBudgetId: [0],
      WorkstationBudgetWorkstationId: ['', Validators.required],
      WorkstationBudgetHeadId: ['', Validators.required],
      WorkstationFy: ['', Validators.required],
      WorkstationBudgetAmt: [0, [Validators.required, Validators.min(1)]],
      WorkstationBudgetRemark: [''],
      WorkstationBudgetAuthRemark: [''],
      WorkstationBudgetAuth: [{ value: true, disabled: !this.isEditMode }],
      WorkstationBudgetIsActive: [{ value: true, disabled: !this.isEditMode }],
      WorkstationBudgetIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: [1],
      CreatedDate: [currentDate],
      UpdatedBy: [1],
      UpdatedDate: [currentDate]
    });

    if (this.isEditMode && this.data.workstationbudget) {
      this.workstationBudgetForm.patchValue(this.data.workstationbudget);
    }
  }


  loadAllWorkStationBudget(): void {
    this.WorkstationBudgetservice.getAllWorkStation().subscribe({
      next: res => {
        this.WorkstationList = res;
        console.log('All Workstation budgets:', this.WorkstationList);
        if (this.isEditMode && this.data) {
          this.setWorkStationbudgetForEdit();
        }
      },
      error: err => console.error('Error loading workstation', err)
    });
  }

  private setWorkStationbudgetForEdit(): void {
    const ProfitCenterData = this.data.workstationbudget;
    if (ProfitCenterData?.WorkStationName) {
      const match = this.WorkstationList.find(
        p => p.WorkStationName?.trim() === ProfitCenterData.WorkStationName?.trim()
      );
      if (match) {
        this.workstationBudgetForm.patchValue({
          WorkstationBudgetWorkstationId: match.WorkStationId
        });
      }
    }
  }

  loadAllEmployee(): void {
    
    this.WorkstationBudgetservice.getAllEmployeeId().subscribe({
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
    
    const profitcenterData = this.data.workstationbudget;
    if (profitcenterData?.EmployeeMasterFullName) {
      const match = this.EmployeeList.find(
        e => e.EmployeeMasterFullName?.trim() === profitcenterData.EmployeeMasterFullName?.trim()
      );
      if (match) {
        this.workstationBudgetForm.patchValue({
          WorkstationBudgetHeadId: match.EmployeeMasterId
        });
      }
    }
  }

  loadAllFinancialYear(): void {

    this.WorkstationBudgetservice.getAllFinancialYear().subscribe({
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
    
    const workstationdata = this.data.workstationbudget;

    if (workstationdata?.WorkstationFy) {
      this.workstationBudgetForm.patchValue({
        WorkstationFy: workstationdata.WorkstationFy
      });
      console.log('Financial Year patched:', workstationdata.WorkstationFy);
    }
  }

  onSubmit(): void {
    if (this.workstationBudgetForm.valid) {
      this.dialogRef.close(this.workstationBudgetForm.value);
    } else {
      this.workstationBudgetForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }



}
