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
import { Divisionservice } from '@shared/services/hr/division/divisionservice';
import { debug } from 'console';

@Component({
  selector: 'app-add-edit-division',
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
  ],
  templateUrl: './add-edit-division.html',
  styleUrl: './add-edit-division.scss',
})
export class AddEditDivision {
  divisionForm!: FormGroup;
  isEditMode: boolean = false;
  countrieslist: any[] = [];
  code: string = '';
  countriesSearchControl = new FormControl('');
  filteredContriesList: any[] = [];

  constructor(
    private divisionService: Divisionservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDivision>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.division;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date();
    this.divisionForm = this.fb.group({
      DivisionId: [''],
      DivisionCode: ['', [Validators.required]],
      DivisionName: ['', [Validators.required]],
      DivisionShortName: ['', [Validators.required]],
      DivisionMailId: ['', [Validators.required, Validators.email]],
      DivisionRemark: [''],
      DivisionAuthRemark: [''],
      DivisionAuth: [{ value: true, disabled: !this.isEditMode }],
      DivisionIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      DivisionIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      console.log('Patching form with country data:', this.data.division);
      this.divisionForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        DivisionId: this.data.division.DivisionId,
        DivisionCode: this.data.division.DivisionCode,
        DivisionName: this.data.division.DivisionName,
        DivisionShortName: this.data.division.DivisionShortName,
        DivisionMailId: this.data.division.DivisionMailId,
        DivisionRemark: this.data.division.DivisionRemark,
        DivisionAuthRemark: this.data.division.DivisionAuthRemark,
        DivisionAuth: this.data.division.DivisionAuth,
        DivisionIsActive: this.data.division.DivisionIsActive,
        DivisionIsDiscard: this.data.division.DivisionIsDiscard,
        CreatedBy: this.data.division.CreatedBy,
        CreatedDate: this.data.division.CreatedDate,
      });
      this.divisionForm.get('code')?.enable();
      this.divisionForm.get('CreatedDate')?.disable();
      this.divisionForm.get('DivisionIsActive')?.enable();
      this.divisionForm.get('DivisionIsDiscard')?.enable();
      this.divisionForm.get('DivisionAuth')?.enable();
      console.log('Form values after patch:', this.divisionForm.value);
    }
  }
  toUpperCase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.divisionForm.get('ShortName')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    debugger
    this.divisionForm.enable();//important for active boolean
    
        if (this.divisionForm.valid) {
          console.log('Form submitted with values:', this.divisionForm.value);
      this.dialogRef.close(this.divisionForm.value);
    } else {
      this.divisionForm.markAllAsTouched();
    }
}
  onCancel(): void {
    this.dialogRef.close();
  }
}
