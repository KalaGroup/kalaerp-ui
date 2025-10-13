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
import { LeaveTypeMasterservice } from '@shared/services/hr/leavetypemaster/leavetypemaster';

@Component({
  selector: 'app-add-edit-leavetype',
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
  templateUrl: './add-edit-leavetype.html',
  styleUrl: './add-edit-leavetype.scss'
})
export class AddEditLeavetype {

  leaveTypeForm!: FormGroup;
  isEditMode = false;
  leaveTypetypeList: any[] = [];
  code = '';
  leaveTypeSearchControl = new FormControl('');
  filteredeaveTypeList: any[] = [];


  constructor(
    private LeaveTypeMasterservice: LeaveTypeMasterservice,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditLeavetype>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.leavetype;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();


  }

  private initializeForm(): void {
    const currentDate = new Date();

    this.leaveTypeForm = this.fb.group({
      LeaveTypeMasterId: [0],
      LeaveTypeMasterCode: [''],
      LeaveTypeMasterName: ['', Validators.required, Validators.pattern(/^[A-Za-z]+$/)],
      LeaveTypeMasterMaxDaysPer: ['', [Validators.required, Validators.min(1)]],
      LeaveTypeMasterContinuosDaysPerYear: [''],
      LeaveTypeMasterCanCarryForward: [''],
      LeaveTypeMasterCanEnCash: [''],
      LeaveTypeMasterRequiredServiceMonths: [''],
      LeaveTypeMasterLeaveTypeRemark: [''],
      LeaveTypeMasterAuthRemark: [''],
      LeaveTypeMasterAuth: [{ value: true, disabled: !this.isEditMode }],
      LeaveTypeMasterIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      LeaveTypeMasterIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: [1],
      CreatedDate: [currentDate],
      UpdatedBy: [1],
      UpdatedDate: [currentDate]
    });

    // Patch values if editing
    if (this.isEditMode && this.data?.leavetype) {
      this.leaveTypeForm.patchValue(this.data.leavetype);
    }
  }




  onSubmit(): void {
    if (this.leaveTypeForm.valid) {
      this.dialogRef.close(this.leaveTypeForm.value);
    } else {
      this.leaveTypeForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Allow only letters and space while typing
  allowLettersAndSpace(event: KeyboardEvent) {
    const char = event.key;
    if (!/^[A-Za-z ]$/.test(char)) {
      event.preventDefault();
    }
  }

  // Prevent pasting invalid characters
  blockInvalidPaste(event: ClipboardEvent) {
    const pastedInput = event.clipboardData?.getData('text') ?? '';
    if (!/^[A-Za-z ]+$/.test(pastedInput)) {
      event.preventDefault();
    }
  }
  allowAlphanumeric(event: KeyboardEvent) {
    const pattern = /^[A-Za-z0-9]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }



}
