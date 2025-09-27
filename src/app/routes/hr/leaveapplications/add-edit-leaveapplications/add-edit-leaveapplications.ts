

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
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LeaveApplicationServices } from '@shared/services/hr/LeaveApplication/leaveapplication';

@Component({
  selector: 'app-add-edit-leaveapplications',
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
    MatDatepickerModule,
  ],
  templateUrl: './add-edit-leaveapplications.html',
  styleUrl: './add-edit-leaveapplications.scss',
})
export class AddEditLeaveapplications {
  leaveapplicationsForm!: FormGroup;
  isEditMode = false;
  BudgettypeList: any[] = [];
  code = '';
  BudgettypeSearchControl = new FormControl('');
  filteredBudgettypeList: any[] = [];
  EmployeeList: any[] = [];
  today: Date = new Date();
  LeaveBalancesTypeList: any[] = [];
  LeaveTypeList: any[] = [];
  toastService: any;

  constructor(
    private http: HttpClient,
    private LeaveApplicationServices: LeaveApplicationServices,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditLeaveapplications>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.leaveApplication;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllEmployee();
    this.loadAllLeaveType();



    this.leaveapplicationsForm.get('LeaveApplicationsEmployeeId')?.valueChanges.subscribe(selectedId => {
      const selectedEmployee = this.EmployeeList.find(emp => emp.EmployeeMasterId === selectedId);
      if (selectedEmployee) {
        this.leaveapplicationsForm.patchValue({
          EmployeeCode: selectedEmployee.EmployeeMasterCode
        });
      } else {
        this.leaveapplicationsForm.patchValue({
          EmployeeCode: ''
        });
      }
    });

    // Watch for date changes → update leave count
    this.leaveapplicationsForm.get('range.LeaveApplicationsFromDate')?.valueChanges.subscribe(() => this.updateLeaveCount());
    this.leaveapplicationsForm.get('range.LeaveApplicationsToDate')?.valueChanges.subscribe(() => this.updateLeaveCount());
  }

  private initializeForm(): void {
    const currentDate = new Date();

    this.leaveapplicationsForm = this.fb.group({
      LeaveApplicationId: [0],
      LeaveApplicationsEmployeeId: [null, Validators.required],
      EmployeeMasterCode: [{ value: '', disabled: true }],
      LeaveApplicationsLeaveTypeId: [null, Validators.required],
      range: this.fb.group({
        LeaveApplicationsFromDate: [null, [Validators.required, this.futureDateValidator()]],
        LeaveApplicationsToDate: [null, [Validators.required, this.futureDateValidator()]],
      }),
      LeaveBalancesClosing: [{ value: '', disabled: true }],
      LeaveApplicationsLeaveCount: [{ value: '', disabled: true }],
      LeaveApplicationsRemark: [null, Validators.required],
      LeaveApplicationsAuthRemark: ['NIL'],
      LeaveApplicationsAuth: [{ value: true, disabled: !this.isEditMode }],
      LeaveApplicationsIsActive: [{ value: true, disabled: !this.isEditMode }],
      LeaveApplicationsIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: [3],
      CreatedDate: [currentDate],
      UpdatedBy: [3],
      UpdatedDate: [currentDate],
    });




    if (this.isEditMode && this.data.leaveApplication) {
      // For edit mode, patch the nested range values properly
      const leaveApp = this.data.leaveApplication;
      this.leaveapplicationsForm.patchValue({
        ...leaveApp,
        range: {
          LeaveApplicationsFromDate: leaveApp.LeaveApplicationsFromDate,
          LeaveApplicationsToDate: leaveApp.LeaveApplicationsToDate
        }
      });
    }
  }

  // private updateLeaveCount(): void {
  //   debugger
  //   const from = this.leaveapplicationsForm.get('range.LeaveApplicationsFromDate')?.value;
  //   const to = this.leaveapplicationsForm.get('range.LeaveApplicationsToDate')?.value;

  //   let count = 0;
  //   if (from && to) {
  //     const fromDate = new Date(from);
  //     const toDate = new Date(to);
  //     if (toDate >= fromDate) {
  //       count = Math.floor((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  //     }
  //   }

  //   this.leaveapplicationsForm.patchValue(
  //     { LeaveApplicationsLeaveCount: count },
  //     { emitEvent: false } // avoid infinite loops
  //   );
  // }


  private updateLeaveCount(): void {
    const from = this.leaveapplicationsForm.get('range.LeaveApplicationsFromDate')?.value;
    const to = this.leaveapplicationsForm.get('range.LeaveApplicationsToDate')?.value;
    const empId = this.leaveapplicationsForm.get('LeaveApplicationsEmployeeId')?.value;

    let count = 0;

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      if (toDate >= fromDate) {
        count = Math.floor((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      }
    }

    // Get selected employee's leave balance
    const selectedEmployee = this.EmployeeList.find(emp => emp.EmployeeMasterId === empId);
    const balance = selectedEmployee?.LeaveBalancesClosing ?? 0;

    // Check if leave count exceeds balance
    if (count > balance) {
      alert(`Leave count (${count}) exceeds available balance (${balance})`);
      this.toastService.showError("Leave count exceeds available balance");
      count = balance; // optional: cap the count to balance
    }

    this.leaveapplicationsForm.patchValue(
      { LeaveApplicationsLeaveCount: count },
      { emitEvent: false }
    );
  }


  loadAllEmployee(): void {
    this.LeaveApplicationServices.getAllEmployeeId().subscribe({
      next: res => {
        this.EmployeeList = res;
        console.log('EmployeeList', this.EmployeeList);

        if (this.isEditMode && this.data) {
          this.setEmployeeForEdit();
        }

        this.leaveapplicationsForm.get('LeaveApplicationsEmployeeId')?.valueChanges.subscribe(empId => {
          this.onEmployeeChange(empId);
        });
      },
      error: err => console.error('Error loading employees', err)
    });
  }

  private setEmployeeForEdit(): void {
    const profitcenterData = this.data.leaveApplication;
    if (profitcenterData?.EmployeeMasterFullName) {
      const match = this.EmployeeList.find(
        e => e.EmployeeMasterFullName?.trim() === profitcenterData.EmployeeMasterFullName?.trim()
      );
      if (match) {
        this.leaveapplicationsForm.patchValue({
          LeaveApplicationsEmployeeId: match.EmployeeMasterId,
          EmployeeMasterCode: match.EmployeeMasterCode,
          LeaveBalancesClosing: match.LeaveBalancesClosing,


        });
      }
    }
  }

  private onEmployeeChange(empId: number): void {
    debugger
    const selectedEmp = this.EmployeeList.find(e => e.EmployeeMasterId === empId);
    if (selectedEmp) {
      this.leaveapplicationsForm.patchValue({
        EmployeeMasterCode: selectedEmp.EmployeeMasterCode,
        LeaveBalancesClosing: selectedEmp.LeaveBalancesClosing,
      });
      console.log('selectedEmp', selectedEmp)
    } else {
      this.leaveapplicationsForm.patchValue({
        EmployeeMasterCode: '',
        LeaveBalancesClosing: '',

      });
    }
  }

  loadAllLeaveType(): void {
    this.LeaveApplicationServices.getAllLeaveType().subscribe({
      next: res => {
        this.LeaveTypeList = res;
        console.log('LeaveTypeList', this.LeaveTypeList);
        if (this.isEditMode && this.data) {
          this.setleaveTypeForEdit();
        }
      },
      error: err => console.error('Error loading leave types', err)
    });
  }

  private setleaveTypeForEdit(): void {
    const leavetypeData = this.data.leaveApplication;
    if (leavetypeData?.LeaveTypeMasterName) {
      const match = this.LeaveTypeList.find(
        e => e.LeaveTypeMasterName?.trim() === leavetypeData.LeaveTypeMasterName?.trim()
      );
      if (match) {
        this.leaveapplicationsForm.patchValue({
          LeaveApplicationsLeaveTypeId: match.LeaveTypeMasterId
        });
      }
    }
  }

  onSubmit(): void {
    if (this.leaveapplicationsForm.valid) {
      // Get the form value
      const formValue = this.leaveapplicationsForm.value;

      // Extract dates from the nested range group and flatten the structure
      const payload = {
        ...formValue,
        LeaveApplicationsFromDate: formValue.range?.LeaveApplicationsFromDate,
        LeaveApplicationsToDate: formValue.range?.LeaveApplicationsToDate,
        // Remove the nested range object
        range: undefined
      };

      // Remove the range property completely
      delete payload.range;

      console.log('Final payload:', payload);
      this.dialogRef.close(payload);
    } else {
      this.leaveapplicationsForm.markAllAsTouched();
    }
  }


  onSave(): void {
    debugger
    if (this.leaveapplicationsForm.valid) {
      // Use getRawValue() to include disabled fields (like LeaveApplicationsLeaveCount)
      const result = this.leaveapplicationsForm.getRawValue();

      // If using range group
      const payload = {
        ...result,
        LeaveApplicationsFromDate: result.range.LeaveApplicationsFromDate,
        LeaveApplicationsToDate: result.range.LeaveApplicationsToDate,


      };
      delete payload.range;

      this.dialogRef.close(payload);
    }
  }



  calculateLeaveCount(): number {
    const from = this.leaveapplicationsForm.get('range.LeaveApplicationsFromDate')?.value;
    const to = this.leaveapplicationsForm.get('range.LeaveApplicationsToDate')?.value;

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      const diffTime = toDate.getTime() - fromDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // include both dates
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  // futureDateValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value;
  //     if (!value) return null;

  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);

  //     const selected = new Date(value);
  //     selected.setHours(0, 0, 0, 0);

  //     return selected < today ? { pastDate: true } : null;
  //   };
  // }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      oneWeekAgo.setHours(0, 0, 0, 0);


      if (selectedDate < oneWeekAgo) {
        return { pastWeek: true };
      }
      return null;
    };
  }


}
