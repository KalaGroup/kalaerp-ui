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
import { qualificationservices } from '@shared/services/hr/qualification/qualificationservice';

@Component({
  selector: 'app-add-edit-qualification',
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
  templateUrl: './add-edit-qualification.html',
  styleUrl: './add-edit-qualification.scss'
})
export class AddEditQualification {
  qualificationForm!: FormGroup;
  isEditMode: boolean = false;

  qualificationtypeList: any[] = [];
  code: string = '';
  qualificationtypeSearchControl = new FormControl('');
  filteredQualificationtypeList: any[] = [];

  constructor(private QualificationServices: qualificationservices, private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditQualification>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.qualification;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllQualification();


  }
  private initializeForm(): void {

    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.qualificationForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      QualificationId: [''],
      QualificationCode: [''],
      QualificationName: ['', [Validators.required]],
      MasterQualificationTypeID: ['', [Validators.required]],
      QualificationAuth: [{ value: true, disabled: !this.isEditMode }],
      QualificationRemark: [''],
      QualificationIsActive: [{ value: true, disabled: !this.isEditMode }],
      QualificationIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
    });

    if (this.isEditMode && this.data.qualification) {
      console.log('Patching form with qualification data:', this.data.qualification);
      this.qualificationForm.patchValue({
        QualificationId: this.data.qualification.QualificationId || '',
        QualificationCode: this.data.qualification.QualificationCode || '',
        MasterQualificationTypeID: this.data.qualification.MasterQualificationTypeID || '',
        QualificationName: this.data.qualification.QualificationName || '',
        QualificationAuth: this.data.qualification.QualificationAuth ?? true,
        QualificationRemark: this.data.qualification.QualificationRemark || '',
        QualificationIsActive: this.data.qualification.QualificationIsActive ?? true,
        QualificationIsDiscard: this.data.qualification.QualificationIsDiscard ?? false,
        CreatedBy: this.data.qualification.CreatedBy ?? 1,
        CreatedDate: this.data.qualification.CreatedDate || currentDate
      });
    }
  }
  loadAllQualification(): void {
    this.QualificationServices.getAllQualificationType().subscribe({
      next: res => {
        this.qualificationtypeList = res;
        this.filteredQualificationtypeList = [...this.qualificationtypeList];
        this.qualificationtypeSearchControl.valueChanges.subscribe((value: any) => {
          const filterValue = (value || '').toLowerCase();
          this.filteredQualificationtypeList = this.qualificationtypeList.filter(QUALIFICATION =>
            QUALIFICATION.QualificationTypeName.toLowerCase().includes(filterValue)
          );
        });

        console.log('Loaded qualification:', res);

        // Now that the list is loaded, call the edit setup
        if (this.isEditMode && this.data) {
          this.setQualificationForEdit();
        }
      },
      error: (err: any) => console.error('Error loading qualification', err)
    });
  }

  private setQualificationForEdit(): void {
    debugger;
    let QualificationTypeId = null;
    const qualificationData = this.data.qualification;

    // Find QualificationType by name
    if (qualificationData?.QualificationTypeName) {
      const qualificationType = this.qualificationtypeList.find(
        q => q.QualificationTypeName.trim() === qualificationData.QualificationTypeName.trim()
      );
      QualificationTypeId = qualificationType ? qualificationType.QualificationTypeId : null;

      console.log('Found QualificationType by name:', QualificationTypeId, 'for name:', qualificationData.QualificationTypeName);
    }

    if (QualificationTypeId) {
      this.qualificationForm.patchValue({
        MasterQualificationTypeID: QualificationTypeId,
      });
      console.log('QualificationType set in form:', QualificationTypeId);
    } else {
      console.log('No QualificationType ID found for name:', qualificationData?.QualificationTypeName);
    }
  }

  onSubmit(): void {

    if (this.qualificationForm.valid) {
      this.qualificationForm.enable(); // Enable the form to include disabled fields
      console.log('Form Value:', this.qualificationForm.value);
      this.dialogRef.close(this.qualificationForm.value);
    } else {
      this.qualificationForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
