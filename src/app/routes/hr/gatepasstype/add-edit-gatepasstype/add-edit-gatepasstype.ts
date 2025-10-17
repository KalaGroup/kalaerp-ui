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
import { Gatepasstypeservice } from '@shared/services/hr/gatepasstype/gatepasstype';

@Component({
  selector: 'app-add-edit-gatepasstype',
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
  templateUrl: './add-edit-gatepasstype.html',
  styleUrl: './add-edit-gatepasstype.scss',
})
export class AddEditGatepasstype {
  gatepasstypeForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private gatepasstypeService: Gatepasstypeservice,
    public dialogRef: MatDialogRef<AddEditGatepasstype>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.gatepasstype;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date();
    this.gatepasstypeForm = this.fb.group({
      GatePassTypeId: [''],
      GatePassTypesTypeCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]+$/), // Only uppercase letters and numbers
          Validators.maxLength(10),
        ],
      ],
      GatePassTypesTypeName: [
        '',
        [
          Validators.required,
          // Optional max length
        ],
      ],
      GatePassTypesDescription: ['', [Validators.required]],
      GatePassTypesRequiresApproval: [true],
      GatePassTypesAuthRemark: [''],
      GatePassTypesIsAuth: [{ value: true, disabled: !this.isEditMode }],
      GatePassTypesIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      GatePassTypesIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['3'],
      CreatedDate: [{ value: currentDate, disabled: true }],
      UpdatedBy: ['3'],
      UpdatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      debugger;
      console.log('Patching form with GatePassType data:', this.data.gatepasstype);
      this.gatepasstypeForm.patchValue({
        GatePassTypeId: this.data.gatepasstype.GatePassTypeId,
        GatePassTypesTypeCode: this.data.gatepasstype.GatePassTypesTypeCode,
        GatePassTypesTypeName: this.data.gatepasstype.GatePassTypesTypeName,
        GatePassTypesDescription: this.data.gatepasstype.GatePassTypesDescription,
        GatePassTypesRequiresApproval: this.data.gatepasstype.GatePassTypesRequiresApproval,
        GatePassTypesAuthRemark: this.data.gatepasstype.GatePassTypesAuthRemark,
        GatePassTypesIsAuth: this.data.gatepasstype.GatePassTypesIsAuth,
        GatePassTypesIsDiscard: this.data.gatepasstype.GatePassTypesIsDiscard,
        GatePassTypesIsActive: this.data.gatepasstype.GatePassTypesIsActive,
        CreatedBy: this.data.gatepasstype.CreatedBy,
        UpdatedBy: this.data.gatepasstype.UpdatedBy,
      });
      this.gatepasstypeForm.get('code')?.enable();
      this.gatepasstypeForm.get('CreatedDate')?.disable();
      this.gatepasstypeForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.gatepasstypeForm.value);
    }
  }

  onSubmit(): void {
    this.gatepasstypeForm.enable(); //important for active boolean
    if (this.gatepasstypeForm.valid) {
      this.dialogRef.close(this.gatepasstypeForm.value);
    } else {
      this.gatepasstypeForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  restrictInvalidChars(event: KeyboardEvent): void {
    const regex = /^[A-Za-z0-9]$/;
    if (!regex.test(event.key.toUpperCase())) {
      event.preventDefault();
    }
  }


  allowLettersAndSpaces(event: KeyboardEvent): void {
    const regex = /^[A-Za-z ]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }

    // prevent double space
    const input = event.target as HTMLInputElement;
    if (event.key === ' ' && input.value.endsWith(' ')) {
      event.preventDefault();
    }
  }


}
