import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
import { Ctcstructureservice } from '@shared/services/hr/ctcstructure/ctcstructureservice';

import { Gradeservice } from '@shared/services/hr/grade/gradeservice';
import { IGrade } from '@shared/interfaces/hr/grade';

@Component({
  selector: 'app-add-edit-ctc',
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
  templateUrl: './add-edit-ctc.html',
  styleUrl: './add-edit-ctc.scss',
})
export class AddEditCtc {
  ctcForm!: FormGroup;
  isEditMode = false;
  filteredGradeList: IGrade[] = [];
  GradeList: any[] = [];
  GradeSearchControl = new FormControl('');

  constructor(
    private gradeService: Gradeservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCtc>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.ctc;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllGrade();
  }

  private initializeForm(): void {
    this.ctcForm = this.fb.group({
      CtcstructureId: [''],
      CtcmasterGradeId: ['', [Validators.required]],
      CtcmasterBasic: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterDa: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterHra: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterLeaveTravelAllowance: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterDriverAllowance: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterPfemployee: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterPfemployer: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterGraduity: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],

      CtcmasterConvAllowance: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterCarAllowance: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterMiscAllowance: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterPt: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterMedicalInsurance: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterBonus: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],

      CtcmasterCityCompensatoryAlowance: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterFuelAllowance: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterGross: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterEsic: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterPerformanceKpa: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]],
      CtcmasterMlwf: ['', [Validators.required, Validators.pattern(/^[0-9]+([.,][0-9]+)*$/)]]
    });
    if (this.isEditMode) {
      console.log('Patching form with CTC Structure data:', this.data.ctc);
      this.ctcForm.patchValue({
        code: this.data.ctc.code,
        CtcstructureId: this.data.ctc.CtcstructureId,
        CtcmasterGradeId: this.data.ctc.CtcmasterGradeId,
        CtcmasterBasic: this.data.ctc.CtcmasterBasic,
        CtcmasterDa: this.data.ctc.CtcmasterDa,
        CtcmasterHra: this.data.ctc.CtcmasterHra,
        CtcmasterConvAllowance: this.data.ctc.CtcmasterConvAllowance,
        CtcmasterCityCompensatoryAlowance: this.data.ctc.CtcmasterCityCompensatoryAlowance,
        CtcmasterLeaveTravelAllowance: this.data.ctc.CtcmasterLeaveTravelAllowance,
        CtcmasterCarAllowance: this.data.ctc.CtcmasterCarAllowance,
        CtcmasterFuelAllowance: this.data.ctc.CtcmasterFuelAllowance,
        CtcmasterDriverAllowance: this.data.ctc.CtcmasterDriverAllowance,
        CtcmasterMiscAllowance: this.data.ctc.CtcmasterMiscAllowance,
        CtcmasterGross: this.data.ctc.CtcmasterGross,
        CtcmasterPfemployee: this.data.ctc.CtcmasterPfemployee,
        CtcmasterPt: this.data.ctc.CtcmasterPt,
        CtcmasterEsic: this.data.ctc.CtcmasterEsic,
        CtcmasterPfemployer: this.data.ctc.CtcmasterPfemployer,
        CtcmasterMedicalInsurance: this.data.ctc.CtcmasterMedicalInsurance,
        CtcmasterPerformanceKpa: this.data.ctc.CtcmasterPerformanceKpa,
        CtcmasterGraduity: this.data.ctc.CtcmasterGraduity,
        CtcmasterBonus: this.data.ctc.CtcmasterBonus,
        CtcmasterMlwf: this.data.ctc.CtcmasterMlwf,
      });
      this.ctcForm.get('code')?.enable();
      // this.ctcForm.get('CreatedDate')?.disable();
      // this.ctcForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.ctcForm.value);
    }
  }

  // Allow only numbers, commas, and decimals while typing
  validateNumberWithCommaDot(event: KeyboardEvent) {
    const allowedChars = /[0-9.,]/;
    const inputChar = String.fromCharCode(event.keyCode);
    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Prevent pasting invalid values
  onPasteNumberWithCommaDot(event: ClipboardEvent) {
    const pastedInput: string = event.clipboardData?.getData('text') ?? '';
    if (!/^[0-9]+([.,][0-9]+)*$/.test(pastedInput)) {
      event.preventDefault();
    }
  }




  loadAllGrade(): void {
    this.gradeService.getAllGrade().subscribe({
      next: res => {
        this.GradeList = res;
        console.log('CTC  loaded:', res);
        this.filteredGradeList = [...this.GradeList];
        this.GradeSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredGradeList = this.GradeList.filter(grade =>
            grade.GradeName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setGradeForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Grade:', err);
      },
    });
  }

  private setGradeForEdit(): void {
    let GradeId = null;
    const gradeData = this.data.grade;

    if (gradeData?.GradeName) {
      const Grade = this.GradeList.find(
        p => p.GradeName.trim().toLowerCase() === gradeData.GradeName.trim().toLowerCase()
      );

      GradeId = Grade ? Grade.GradeId : null; // 🔥 use correct property name

      console.log('Found GradeName by name:', GradeId, 'for Grade:', gradeData.GradeName);
    }

    if (GradeId) {
      this.ctcForm.patchValue({
        CtcmasterGradeId: GradeId,
      });
      console.log('Grade set in form:', GradeId);
    } else {
      console.log('No Grade ID found for Grade Name:', gradeData?.GradeName);
    }
  }

  toUpperCase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.ctcForm.get('WorkStationShortName')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.ctcForm.valid) {
      this.dialogRef.close(this.ctcForm.value);
    } else {
      this.ctcForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
