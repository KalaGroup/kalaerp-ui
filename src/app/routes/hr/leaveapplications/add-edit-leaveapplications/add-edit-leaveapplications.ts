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
  FinancialYearList: any[] = [];
  LeaveBalancesTypeList: any;
  today: Date = new Date();
  isDisabled: boolean = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditLeaveapplications>,
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

    this.leaveapplicationsForm = this.fb.group({
      LeaveApplicationID: [0],
      LeaveApplicationsEmployeeID: [null, Validators.required],
      LeaveApplicationsLeaveTypeID: [null, Validators.required],
      range: this.fb.group({
        LeaveApplicationsFromDate: [null, [Validators.required, this.futureDateValidator()]],
        LeaveApplicationsToDate: [null, [Validators.required, this.futureDateValidator()]],
      }),
      LeaveApplicationsLeaveCount: [null],
      LeaveApplicationsRemark: [null, Validators.required],
      LeaveApplicationsAuthRemark: ['NIL'],
      LeaveApplicationsAuth: [{ value: true, disabled: !this.isEditMode }],
      LeaveApplicationsIsActive: [{ value: true, disabled: !this.isEditMode }],
      LeaveApplicationsIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: [1],
      CreatedDate: [currentDate],
      UpdatedBy: [1],
      UpdatedDate: [currentDate],
    });

    if (this.isEditMode && this.data.employeeleavebalances) {
      this.leaveapplicationsForm.patchValue(this.data.employeeleavebalances);
    }
  }

  onSubmit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selected = new Date(value);
      selected.setHours(0, 0, 0, 0);

      return selected < today ? { pastDate: true } : null;
    };
  }
}
