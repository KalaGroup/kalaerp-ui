/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, } from '@angular/forms';
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
import { Workstationservice } from '@shared/services/hr/workstation/workstationservice';
import { profitcenterservices } from '@shared/services/hr/profitcenter/profitcenterservices';
import { de } from 'date-fns/locale';
import { Iprofitcentermaster } from '@shared/interfaces/hr/profitcenter';

@Component({
  selector: 'app-add-edit-workstation',
  standalone: true,
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
  templateUrl: './add-edit-workstation.html',
  styleUrl: './add-edit-workstation.scss',
})
export class AddEditWorkstation {
  workstationForm!: FormGroup;
  isEditMode = false;
  filteredprofitcenterList: Iprofitcentermaster[] = [];
  profitcenterList: any[] = [];
  selectedCountryId: number | null = null;
  selectedStateId: number | null = null;
  profitcenterSearchControl = new FormControl('');

  constructor(
    private profitcenterService: profitcenterservices,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditWorkstation>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.workstation;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllProfitCenter();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date();
    this.workstationForm = this.fb.group({
      WorkStationId: [''],
      WorkStationProfitcenterId: ['', [Validators.required]],
      WorkStationCode: ['', [Validators.required]],
      WorkStationName: ['', [Validators.required]],
      WorkStationShortName: ['', [Validators.required]],
      WorkStationRemark: [''],
      WorkStationAuthRemark: [''],
      WorkStationIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      WorkStationIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      debugger;
      console.log('Patching form with workstation data:', this.data.workstation);
      this.workstationForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        code: this.data.workstation.code,
        WorkStationId: this.data.workstation.WorkStationId,
        WorkStationProfitcenterId: this.data.workstation.WorkStationProfitcenterId,
        WorkStationCode: this.data.workstation.WorkStationCode,
        WorkStationName: this.data.workstation.WorkStationName,
        WorkStationShortName: this.data.workstation.WorkStationShortName,
        WorkStationRemark: this.data.workstation.WorkStationRemark,
        WorkStationAuthRemark: this.data.workstation.WorkStationAuthRemark,
        WorkStationIsActive: this.data.workstation.WorkStationIsActive,
        WorkStationIsDiscard: this.data.workstation.WorkStationIsDiscard,
        CreatedBy: this.data.workstation.CreatedBy,
      });
      this.workstationForm.get('code')?.enable();
      this.workstationForm.get('CreatedDate')?.disable();
      this.workstationForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.workstationForm.value);
    }
  }

  loadAllProfitCenter(): void {
    debugger;
    this.profitcenterService.getAllProfitcenter().subscribe({
      next: res => {
        this.profitcenterList = res;
        console.log('Profit Center loaded:', res);
        this.filteredprofitcenterList = [...this.profitcenterList];
        this.profitcenterSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredprofitcenterList = this.profitcenterList.filter(profitcenter =>
            profitcenter.ProfitCenterName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setProfitCenterForEdit();
        }
      },
      error: err => {
        console.error('Failed to load ProfitCenter:', err);
      },
    });
  }

  private setProfitCenterForEdit(): void {
    debugger;
    let ProfitCenterId: number | null = null;
    const stateData = this.data.workstation;

    if (stateData?.ProfitCenterName) {
      const ProfitCenter = this.profitcenterList.find(
        p =>
          p.ProfitCenterName.trim().toLowerCase() ===
          stateData.ProfitCenterName.trim().toLowerCase()
      );

      ProfitCenterId = ProfitCenter ? ProfitCenter.ProfitCenterId : null; // 🔥 use correct property name

      console.log(
        'Found ProfitCenterName by name:',
        ProfitCenterId,
        'for ProfitCenter:',
        stateData.ProfitCenterName
      );
    }

    if (ProfitCenterId) {
      this.workstationForm.patchValue({
        ProfitCenterId: ProfitCenterId,
      });
      console.log('ProfitCenter set in form:', ProfitCenterId);
    } else {
      console.log('No ProfitCenter ID found for ProfitCenter Name:', stateData?.ProfitCenterName);
    }
  }



  onSubmit(): void {
    this.workstationForm.enable();//important for active boolean
    if (this.workstationForm.valid) {
      this.dialogRef.close(this.workstationForm.value);
    } else {
      this.workstationForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  // Real-time typing restrictions
  allowAlphanumeric(event: KeyboardEvent) {
    const pattern = /^[A-Za-z0-9]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  allowLettersAndSpace(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const input = event.target as HTMLInputElement;
    if (!pattern.test(event.key) || (input.selectionStart === 0 && event.key === ' ')) {
      event.preventDefault();
    }
  }
  // Convert input to uppercase automatically
  toUpperCase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.workstationForm.get('WorkStationShortName')?.setValue(input.value, { emitEvent: false });
  }

  // Optional: prevent invalid paste
  blockInvalidPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text') || '';
    const pattern = /^[A-Za-z ]+$/;
    if (!pattern.test(clipboardData)) {
      event.preventDefault();
    }
  }
  // Allow only uppercase letters on keypress
  allowUppercase(event: KeyboardEvent) {
    const pattern = /[A-Z]/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
