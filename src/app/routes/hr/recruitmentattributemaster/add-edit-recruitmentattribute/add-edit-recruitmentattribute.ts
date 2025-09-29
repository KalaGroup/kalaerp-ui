/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { Country } from '@shared/interfaces/hr';
import { AddEditWorkstation } from '../../workstationmaster/add-edit-workstation/add-edit-workstation';
import { IRecruitmentAttribute } from '@shared/interfaces/hr/RecruitmentAttributeMaster';
import { RecruitmentAttributeservices } from '@shared/services/hr/RecruitmentAttributeMaster/RecruitmentAttributeMasterservice';

@Component({
  selector: 'app-add-edit-recruitmentattribute',
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
  templateUrl: './add-edit-recruitmentattribute.html',
  styleUrl: './add-edit-recruitmentattribute.scss'
})
export class AddEditRecruitmentattribute {

  recruitmentattributeForm!: FormGroup;
  isEditMode = false;
  //filteredrecruitmentattributeList: IRecruitmentAttribute[] = [];



  constructor(
    private fb: FormBuilder,
    private RecruitmentAttributeServices: RecruitmentAttributeservices, // Properly inject the service
    public dialogRef: MatDialogRef<AddEditRecruitmentattribute>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.recruitmentattribute;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }


  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy

    this.recruitmentattributeForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      //FaciltyCode: [{ value: '', disabled: this.isEditMode }],
      RecruitmentAttributeId: [0],
      RecruitmentAttributeName: ['', [Validators.required]],
      RecruitmentAttributeMarks: [''],
      RecruitmentAttributeRemark: [''],
      RecruitmentAttributeAuthRemark: ['ok'],
      RecruitmentAttributeAuth: [{ value: true, disabled: !this.isEditMode }],
      RecruitmentAttributeIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      RecruitmentAttributeIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: [5]
    });

    if (this.isEditMode && this.data.recruitmentattribute) {
      console.log('Patching form with facility data:', this.data.recruitmentattribute);
      this.recruitmentattributeForm.patchValue({
        CreatedDate: this.data.recruitmentattribute.CreatedDate ? new Date(this.data.recruitmentattribute.CreatedDate).toLocaleDateString('en-GB') : currentDate,
        RecruitmentAttributeId: this.data.recruitmentattribute.RecruitmentAttributeId,
        RecruitmentAttributeName: this.data.recruitmentattribute.RecruitmentAttributeName || '',
        RecruitmentAttributeMarks: this.data.recruitmentattribute.RecruitmentAttributeMarks || '',
        RecruitmentAttributeRemark: this.data.recruitmentattribute.RecruitmentAttributeRemark || '',
        RecruitmentAttributeAuthRemark: this.data.recruitmentattribute.RecruitmentAttributeAuthRemark || '',
        RecruitmentAttributeIsActive: this.data.recruitmentattribute.RecruitmentAttributeIsActive ?? true,
        RecruitmentAttributeIsDiscard: this.data.recruitmentattribute.RecruitmentAttributeIsDiscard ?? false,
        RecruitmentAttributeAuth: this.data.recruitmentattribute.RecruitmentAttributeAuth ?? true,

        CreatedBy: this.data.recruitmentattribute.CreatedBy ?? 5
      });

    }
  }




  onSubmit(): void {
    if (this.recruitmentattributeForm.valid) {
      this.recruitmentattributeForm.enable(); // Enable the form to include disabled fields
      console.log('Form Value:', this.recruitmentattributeForm.value);
      this.dialogRef.close(this.recruitmentattributeForm.value);
    } else {
      this.recruitmentattributeForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}
