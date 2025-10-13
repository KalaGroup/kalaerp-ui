/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
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

@Component({
  selector: 'app-add-edit-recruitmentstagestatus',
  imports: [
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
  ],
  templateUrl: './add-edit-recruitmentstagestatus.html',
  styleUrl: './add-edit-recruitmentstagestatus.scss'
})
export class AddEditRecruitmentstagestatus implements OnInit {
  RecruitmentStageStatusForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditRecruitmentstagestatus>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.RecruitmentStageStatus;

    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB');
    this.RecruitmentStageStatusForm = this.fb.group({
      RecruitmentStageStatusId: [0],
      RecruitmentStageStatusName: ['', Validators.required],
      RecruitmentStageStatusRemark: ['',],
      RecruitmentStageStatusAuthRemark: ['ok'],
      RecruitmentStageStatusAuth: [{ value: true, disabled: !this.isEditMode }],
      RecruitmentStageStatusIsActive: [{ value: true, disabled: !this.isEditMode }],
      RecruitmentStageStatusIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: ['10'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });

    if (this.isEditMode && this.data?.RecruitmentStageStatus) {
      const record = this.data.RecruitmentStageStatus;
      console.log('Patching form with Recruitment Stage Status data:', record);

      this.RecruitmentStageStatusForm.patchValue({
        RecruitmentStageStatusId: record.RecruitmentStageStatusId,
        RecruitmentStageStatusName: record.RecruitmentStageStatusName,
        RecruitmentStageStatusRemark: record.RecruitmentStageStatusRemark,
        RecruitmentStageStatusAuthRemark: record.RecruitmentStageStatusAuthRemark,
        RecruitmentStageStatusAuth: record.RecruitmentStageStatusAuth,
        RecruitmentStageStatusIsActive: record.RecruitmentStageStatusIsActive,
        RecruitmentStageStatusIsDiscard: record.RecruitmentStageStatusIsDiscard,
        CreatedBy: record.CreatedBy,
        CreatedDate: record.CreatedDate,
      });

      this.RecruitmentStageStatusForm.get('RecruitmentStageStatusIsActive')?.enable();
      this.RecruitmentStageStatusForm.get('RecruitmentStageStatusIsDiscard')?.enable();
      this.RecruitmentStageStatusForm.get('RecruitmentStageStatusAuth')?.enable();

      console.log('Form values after patch:', this.RecruitmentStageStatusForm.value);
    }
  }

  onSubmit(): void {
    if (this.RecruitmentStageStatusForm.valid) {
      console.log('Form Submitted:', this.RecruitmentStageStatusForm.getRawValue());
      this.dialogRef.close(this.RecruitmentStageStatusForm.getRawValue());
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  // Real-time typing restriction
  allowLettersAndSpace(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const input = event.target as HTMLInputElement;
    if (!pattern.test(event.key) || (input.selectionStart === 0 && event.key === ' ')) {
      event.preventDefault();
    }
  }

  // Optional: prevent invalid paste
  blockInvalidPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text') || '';
    const pattern = /^[A-Za-z ]+$/;
    if (!pattern.test(clipboardData)) {
      event.preventDefault();
    }
  }
}
