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
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeeLeaveBalanceservice } from '@shared/services/hr/employeeleavebalance/employeeleavebalanceservice';
import { IEmployeeLeaveBalance } from '@shared/interfaces/hr/employeeleavebalance';
import { recruitmentmasterservice } from '@shared/services/hr/RecruitmentMaster/recruitmentmaster';
import { LeaveTypeMasterservice } from '@shared/services/hr/leavetypemaster/leavetypemaster';

@Component({
  selector: 'app-add-edit-employeeleavebalances',
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
  ],
  templateUrl: './add-edit-employeeleavebalances.html',
  styleUrl: './add-edit-employeeleavebalances.scss',
})
export class AddEditEmployeeleavebalances {
  employeeleavebalancesForm!: FormGroup;
  isEditMode = false;
  EmployeeList: any[] = [];
  TypeList: any[] = [];

  constructor(
    private Recruitmentmasterservice: recruitmentmasterservice,
    private LeaveTypemasterservice: LeaveTypeMasterservice,
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
    this.loadAllEmployee();
    this.loadAllType();
  }

  private initializeForm(): void {
    const currentDate = new Date();

    this.employeeleavebalancesForm = this.fb.group({
      LeaveBalancesId: [0],
      LeaveBalancesEmployeeId: [null, Validators.required],
      LeaveBalancesTypeId: [null, Validators.required],
      LeaveBalancesYear: [null, Validators.required],
      LeaveBalancesOpening: [null, Validators.required],
      LeaveBalancesCredited: [null, Validators.required],
      LeaveBalancesUtilized: [null, Validators.required],
      LeaveBalancesEncashed: [null, Validators.required],
      LeaveBalancesClosing: [null, Validators.required],
      LeaveBalancesRemark: [''],
      LeaveBalancesAuthRemark: ['NIL'],
      LeaveBalancesAuth: [{ value: true, disabled: !this.isEditMode }],
      LeaveBalancesIsActive: [{ value: true, disabled: !this.isEditMode }],
      LeaveBalancesIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: [1],
      CreatedDate: [currentDate],
      UpdatedBy: [1],
      UpdatedDate: [currentDate],
    });

    if (this.isEditMode) {
      debugger;
      console.log('Patching form with Leave Balances data:', this.data.employeeleavebalances);
      this.employeeleavebalancesForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        LeaveBalancesId: this.data.employeeleavebalances.LeaveBalancesId,
        LeaveBalancesEmployeeId: this.data.employeeleavebalances.LeaveBalancesEmployeeId,
        LeaveBalancesTypeId: this.data.employeeleavebalances.LeaveBalancesTypeId,
        LeaveBalancesYear: this.data.employeeleavebalances.LeaveBalancesYear,
        LeaveBalancesOpening: this.data.employeeleavebalances.LeaveBalancesOpening,
        LeaveBalancesCredited: this.data.employeeleavebalances.LeaveBalancesCredited,
        LeaveBalancesUtilized: this.data.employeeleavebalances.LeaveBalancesUtilized,
        LeaveBalancesEncashed: this.data.employeeleavebalances.LeaveBalancesEncashed,
        LeaveBalancesClosing: this.data.employeeleavebalances.LeaveBalancesClosing,
        LeaveBalancesRemark: this.data.employeeleavebalances.LeaveBalancesRemark,
        LeaveBalancesAuthRemark: this.data.employeeleavebalances.LeaveBalancesAuthRemark,
        LeaveBalancesIsActive: this.data.employeeleavebalances.LeaveBalancesIsActive,
        LeaveBalancesIsDiscard: this.data.employeeleavebalances.LeaveBalancesIsDiscard,
        CreatedBy: this.data.employeeleavebalances.CreatedBy,
        CreatedDate: this.data.employeeleavebalances.CreatedDate,
        UpdatedBy: this.data.employeeleavebalances.UpdatedBy,
        UpdatedDate: this.data.employeeleavebalances.UpdatedDate,
      });
      this.employeeleavebalancesForm.get('code')?.enable();
      this.employeeleavebalancesForm.get('CreatedDate')?.disable();
      this.employeeleavebalancesForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.employeeleavebalancesForm.value);
    }
  }

  loadAllEmployee(): void {
    this.Recruitmentmasterservice.getAllEmployeeId().subscribe({
      next: res => {
        this.EmployeeList = res;
        console.log('EmployeeList', this.EmployeeList);
        if (this.isEditMode && this.data) {
          this.setEmployeeForEdit();
        }
      },
      error: err => console.error('Error loading employees', err),
    });
  }

  private setEmployeeForEdit(): void {
    let EmployeeMasterId = null;
    const recruitmentData = this.data.employeeleavebalances;

    if (recruitmentData?.EmployeeMasterFullName) {
      const employee = this.EmployeeList.find(
        e => e.EmployeeMasterFullName?.trim() === recruitmentData.EmployeeMasterFullName?.trim()
      );
      EmployeeMasterId = employee ? employee.EmployeeMasterId : null;
      console.log(
        'Found employee by name:',
        EmployeeMasterId,
        'for name:',
        recruitmentData.EmployeeMasterFullName
      );
    }

    if (EmployeeMasterId) {
      this.employeeleavebalancesForm.patchValue({
        RecruitmentMasterInterviewerEmployeeId: EmployeeMasterId,
      });
      console.log('Employee set in form:', EmployeeMasterId);
    } else {
      console.log('No employee ID found for name:', recruitmentData?.EmployeeMasterFullName);
    }
  }

  loadAllType(): void {
    this.LeaveTypemasterservice.getAllLeaveTypemaster().subscribe({
      next: res => {
        this.TypeList = res;
        console.log('TypeList', this.TypeList);
        if (this.isEditMode && this.data) {
          this.setTypeForEdit();
        }
      },
      error: err => console.error('Error loading employees', err),
    });
  }

  private setTypeForEdit(): void {
    let LeaveTypeMasterId = null;
    const LeaveData = this.data.employeeleavebalances;

    if (LeaveData?.LeaveTypeMasterName) {
      const leave = this.TypeList.find(
        e => e.LeaveTypeMasterName?.trim() === LeaveData.LeaveTypeMasterName?.trim()
      );
      LeaveTypeMasterId = leave ? leave.LeaveTypeMasterId : null;
      console.log(
        'Found leave by name:',
        LeaveTypeMasterId,
        'for name:',
        LeaveData.LeaveTypeMasterName
      );
    }

    if (LeaveTypeMasterId) {
      this.employeeleavebalancesForm.patchValue({
        RecruitmentMasterInterviewerEmployeeId: LeaveTypeMasterId,
      });
      console.log('Employee set in form:', LeaveTypeMasterId);
    } else {
      console.log('No employee ID found for name:', LeaveData?.LeaveTypeMasterName);
    }
  }

  onSubmit(): void {
    this.employeeleavebalancesForm.enable(); //important for active boolean
    if (this.employeeleavebalancesForm.valid) {
      this.dialogRef.close(this.employeeleavebalancesForm.value);
    } else {
      this.employeeleavebalancesForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
