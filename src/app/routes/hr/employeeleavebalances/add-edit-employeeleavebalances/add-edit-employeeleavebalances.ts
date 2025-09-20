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

@Component({
  selector: 'app-add-edit-employeeleavebalances',
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
  templateUrl: './add-edit-employeeleavebalances.html',
  styleUrl: './add-edit-employeeleavebalances.scss'
})


export class AddEditEmployeeleavebalances {

  employeeleavebalancesForm!: FormGroup;
  isEditMode = false;
  BudgettypeList: any[] = [];
  code = '';
  BudgettypeSearchControl = new FormControl('');
  filteredBudgettypeList: any[] = [];
  EmployeeList: any[] = [];
  FinancialYearList: any[] = [];
LeaveBalancesTypeList: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEmployeeleavebalances>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.employeeleavebalances;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

    ngOnInit(): void {
    this.initializeForm();
  }


  private initializeForm(): void {
    const currentDate = new Date();

    this.employeeleavebalancesForm = this.fb.group({
  LeaveBalancesID: [0],
  LeaveBalancesEmployeeId: [null, Validators.required],
  LeaveBalancesTypeId: [null, Validators.required],
  LeaveBalancesYear: [null, Validators.required],
  LeaveBalancesOpening: [null, Validators.required],
  LeaveBalancesCredited: [null, Validators.required],
  LeaveBalancesUtilized: [null, Validators.required],
  LeaveBalancesEncashed:[null, Validators.required],
  LeaveBalancesClosing:[null, Validators.required],
  LeaveBalancesRemark:[''],
  LeaveBalancesAuthRemark:['NIL'],
  LeaveBalancesAuth: [{ value: true, disabled: !this.isEditMode }],
  LeaveBalancesIsActive: [{ value: true, disabled: !this.isEditMode }],
  LeaveBalancesIsDiscard: [{ value: false, disabled: !this.isEditMode }],
  CreatedBy: [1],
  CreatedDate: [currentDate],
  UpdatedBy: [1],
  UpdatedDate: [currentDate]
});


    if (this.isEditMode && this.data.employeeleavebalances) {
      this.employeeleavebalancesForm.patchValue(this.data.employeeleavebalances);
    }
  }

  onSubmit(): void {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  }


