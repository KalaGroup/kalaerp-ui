import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { de } from 'date-fns/locale';
import { Divisionservice } from '@shared/services/hr/division/divisionservice';

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
    MatIconModule
  ],
  templateUrl: './add-edit-division.html',
  styleUrl: './add-edit-division.scss'
})
export class AddEditDivision {
  DivisionForm!: FormGroup;
  isEditMode: boolean = false;
  countrieslist: any[] = [];
  code: string = '';
  countriesSearchControl = new FormControl('');
  filteredContriesList: any[] = [];

  constructor(private divisionService: Divisionservice,
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
    const currentDate = new Date();
    this.DivisionForm = this.fb.group({
      DivisionId: [''],
      DivisionCode: ['', [Validators.required]],
      DivisionName: ['', [Validators.required]],
      DivisionShortName: ['', [Validators.required]],
      DivisionMailId: ['', [Validators.required, Validators.email]],
      DivisionRemark: [''],
      DivisionAuthRemark: [''],
      DivisionAuth: [{ value: true, disabled: !this.isEditMode }],
      DivisionIsDiscard:[{ value: true, disabled: !this.isEditMode }],
      DivisionIsActive:[{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }]
    });
    if (this.isEditMode) {
      debugger;
      console.log('Patching form with country data:', this.data.division);
      this.DivisionForm.patchValue({
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
        CreatedDate: this.data.division.CreatedDate
      });
       this.DivisionForm.get('code')?.enable();
      this.DivisionForm.get('CreatedDate')?.disable();
      this.DivisionForm.get('DivisionIsActive')?.enable();
      this.DivisionForm.get('DivisionIsDiscard')?.enable();
      this.DivisionForm.get('DivisionAuth')?.enable();
      console.log('Form values after patch:', this.DivisionForm.value);
    }
  }
toUpperCase(event: Event) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.toUpperCase();
  this.DivisionForm.get('ShortName')?.setValue(input.value, { emitEvent: false });
}


  onSubmit(): void {
    debugger;
        if (this.DivisionForm.valid) {
      this.dialogRef.close(this.DivisionForm.value);
    } else {
      this.DivisionForm.markAllAsTouched();
    }
  if (this.DivisionForm.valid) {
    const divisionData = this.DivisionForm.value;

    this.divisionService.insertDivision(divisionData).subscribe({
      next: (res: any) => {
        console.log('Division saved successfully', res);
        alert(res.message);
        //alert('City saved successfully!');
        this.dialogRef.close(res);
      },
      // error: (err: any) => {
      //   console.error('Error saving Division', err);
      //   alert('Error saving Division!');
      // }
    });
  } else {
    this.DivisionForm.markAllAsTouched();
  }
}
 onCancel(): void {
    this.dialogRef.close();
  }
}
