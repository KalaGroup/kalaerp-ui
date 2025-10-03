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
  selector: 'app-add-edit-recruitmentreference',
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
  templateUrl: './add-edit-recruitmentreference.html',
  styleUrl: './add-edit-recruitmentreference.scss'
})
export class AddEditRecruitmentreference implements OnInit {
  RecruitmentReferenceMasterForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditRecruitmentreference>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // ✅ Fix: use RecruitmentReference instead of RecruitmentStageStatus
    this.isEditMode = !!this.data && !!this.data.RecruitmentReference;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date();
    this.RecruitmentReferenceMasterForm = this.fb.group({
      RecruitmentReferenceId: [0],
      RecruitmentReferenceName: ['', Validators.required],
      RecruitmentReferenceRemark: [''],
      RecruitmentReferenceAuthRemark: ['ok'],
      RecruitmentReferenceAuth: [{ value: true, disabled: !this.isEditMode }],
      RecruitmentReferenceIsActive: [{ value: true, disabled: !this.isEditMode }],
      RecruitmentReferenceIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: [1], // default user ID, replace with logged-in user if available
      CreatedDate: [currentDate]
    });

    // ✅ Fix: patch with RecruitmentReference (not RecruitmentStageStatus)
    if (this.isEditMode && this.data?.RecruitmentReference) {
      const record = this.data.RecruitmentReference;
      console.log('Patching form with Recruitment Reference data:', record);

      this.RecruitmentReferenceMasterForm.patchValue({
        RecruitmentReferenceId: record.RecruitmentReferenceId,
        RecruitmentReferenceName: record.RecruitmentReferenceName,
        RecruitmentReferenceRemark: record.RecruitmentReferenceRemark,
        RecruitmentReferenceAuthRemark: record.RecruitmentReferenceAuthRemark,
        RecruitmentReferenceAuth: record.RecruitmentReferenceAuth,
        RecruitmentReferenceIsActive: record.RecruitmentReferenceIsActive,
        RecruitmentReferenceIsDiscard: record.RecruitmentReferenceIsDiscard,
        CreatedBy: record.CreatedBy,
        CreatedDate: record.CreatedDate,
      });
    }
  }
  

  onSubmit(): void {
    if (this.RecruitmentReferenceMasterForm.valid) {
      console.log('Form Submitted:', this.RecruitmentReferenceMasterForm.getRawValue());
      this.dialogRef.close(this.RecruitmentReferenceMasterForm.getRawValue());
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}







