import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { tr } from 'date-fns/locale';
import { PetrolAllowanceservice } from '@shared/services/hr/PetrolAllowanceMaster/PetrolAllowanceservice';

@Component({
  selector: 'app-add-edit-petrolallowance',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule],
  templateUrl: './add-edit-petrolallowance.html',
  styleUrl: './add-edit-petrolallowance.scss'
})
export class AddEditPetrolallowance {

  petrolForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private PetrolAllowanceservice: PetrolAllowanceservice, // Properly inject the service
    public dialogRef: MatDialogRef<AddEditPetrolallowance>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.petrolallowance;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy

    this.petrolForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      PetrolAllowanceId: [0],
      TwoWheelerPerKm: ['', [Validators.required]],
      FourWheelerPerKm: ['', [Validators.required]],
      PetrolAllowanceRemark: [''],
      PetrolAllowanceAuthRemark: [''],
      PetrolAllowanceIsAuth: [{ value: true, disabled: !this.isEditMode }],
      PetrolAllowanceIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      PetrolAllowanceIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: [0]

    });

    if (this.isEditMode && this.data.petrolallowance) {
      console.log('Patching form with petrolallowance data:', this.data.petrolallowance);
      this.petrolForm.patchValue({
        PetrolAllowanceId: this.data.petrolallowance.PetrolAllowanceId,
        TwoWheelerPerKm: this.data.petrolallowance.TwoWheelerPerKm,
        FourWheelerPerKm: this.data.petrolallowance.FourWheelerPerKm,
        PetrolAllowanceRemark: this.data.petrolallowance.PetrolAllowanceRemark,
        PetrolAllowanceAuthRemark: this.data.petrolallowance.PetrolAllowanceAuthRemark,
        PetrolAllowanceIsAuth: this.data.petrolallowance.PetrolAllowanceIsAuth,
        PetrolAllowanceIsDiscard: this.data.petrolallowance.PetrolAllowanceIsDiscard,
        PetrolAllowanceIsActive: this.data.petrolallowance.PetrolAllowanceIsActive,

        CreatedBy: this.data.petrolallowance.CreatedBy ?? 0
      });

    }
  }
  onSubmit(): void {
    if (this.petrolForm.valid) {
      this.dialogRef.close(this.petrolForm.value);
    } else {
      this.petrolForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}
