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
//import { countryService } from '../../hr.service';
//import { employeetypeservice } from '@shared/services/hr/emplpoyeetype/employeetypeservice';
import { Employeetypeservice } from '@shared/services/hr/employeetype/employeetypeservice';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-employeetype',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './add-edit-employeetype.html',
  styleUrl: './add-edit-employeetype.scss',
})
export class AddEditEmployeetype {
  employeetypeForm!: FormGroup;
  isEditMode: boolean = false;
  //currencyList: any[] = [];
  code: string = '';
  //  currencySearchControl = new FormControl('');
  //filteredCurrencyList: any[] = [];


  constructor(private employeetypeservice: Employeetypeservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEmployeetype>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.employeetype;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    // this.loadAllCurrencies();
  }

  private initializeForm(): void {

    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.employeetypeForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      //code: [{ value: '', disabled: !this.isEditMode }],
      // EmployeeTypeCode: ['', [Validators.required]],
      EmployeeTypeName: ['', [Validators.required]],
      EmployeeTypeDescription: ['', [Validators.required]],
      EmployeeTypeRemark: ['', [Validators.required]],
      EmployeeTypeIsActive: [{ value: true, disabled: !this.isEditMode }],
      EmployeeTypeAuth: [{ value: true, disabled: !this.isEditMode }],
    });

    // If editing, pre-fill form with available data
    if (this.isEditMode && this.data.employeetype) {
      
      console.log('Patching form with employeetype data:', this.data.employeetype);
      this.employeetypeForm.patchValue({
        code: this.data.employeetype.code || this.data.employeetype.EmployeeTypeCode || '',
        //EmployeeTypeCode: this.data.employeetype.EmployeeTypeCode || '',
        EmployeeTypeName: this.data.employeetype.EmployeeTypeName || '',
        EmployeeTypeDescription: this.data.employeetype.EmployeeTypeDescription || '',
        EmployeeTypeRemark: this.data.employeetype.EmployeeTypeRemark || '',
        EmployeeTypeIsActive: this.data.employeetype.EmployeeTypeIsActive ?? true,
        EmployeeTypeAuth: this.data.employeetype.EmployeeTypeAuth ?? true
      });
      this.employeetypeForm.get('EmployeeTypeIsActive')?.enable();
      this.employeetypeForm.get('EmployeeTypeAuth')?.enable();
      console.log('Form values after patch:', this.employeetypeForm.value);
    }
  }

  onSubmit(): void {
    
    if (this.employeetypeForm.valid) {
      this.employeetypeForm.enable();
      console.log('Form Values', this.employeetypeForm.value);
      this.dialogRef.close(this.employeetypeForm.value);
    } else {
      this.employeetypeForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  allowLettersAndSpaces(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const input = event.target as HTMLInputElement;
    if (!pattern.test(event.key) || (input.selectionStart === 0 && event.key === ' ')) {
      event.preventDefault();
    }
  }

  allowLettersNumbersAndPunctuation(event: KeyboardEvent) {
    const pattern = /^[A-Za-z0-9.,\- ]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

}
