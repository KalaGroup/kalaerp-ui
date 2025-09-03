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
import { Responsibilitiesmstservice } from '@shared/services/hr/ResponsibilitiesMaster/responsibilitiesmstservice';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-edit-responsibilities',
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
  templateUrl: './add-edit-responsibilities.html',
  styleUrl: './add-edit-responsibilities.scss',
})
export class AddEditResponsibilities {
  responsibilitiesMstForm!: FormGroup;
  isEditMode: boolean = false;
  gradeList: any[] = [];
  designationList: any[] = [];
  divisionList: any[] = [];

  GradeSearchControl = new FormControl('');
  DesignationSearchControl = new FormControl('');
  DivisionSearchControl = new FormControl('');

  filteredGradeList: any[] = [];
  filteredDesignationList: any[] = [];
  filteredDivisionList: any[] = [];

  constructor(
    private responsibilitiesService: Responsibilitiesmstservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditResponsibilities>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.responsibilities;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }
  ngOnInit(): void {
    this.initializeForm();
    this.loadAllGrades();
    this.loadAllDesignations();
    this.loadAllDivisions();
  }
  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.responsibilitiesMstForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      GradeID: ['', [Validators.required]],
      DesignationID: ['', [Validators.required]],
      DivisionID: ['', [Validators.required]],
      // Text input fields
      responsibilitiesType: ['', [Validators.maxLength(100)]],
      responsibilitiesRemark: ['', [Validators.maxLength(500)]],
      responsibilitiesAuthRemark: ['', [Validators.maxLength(500)]],

      // Status fields
      responsibilitiesAuth: [{ value: true, disabled: !this.isEditMode }],
      responsibilitiesIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      responsibilitiesIsActive: [{ value: true, disabled: !this.isEditMode }],
    });

    if (this.isEditMode && this.data.responsibilities) {
      this.responsibilitiesMstForm.patchValue({
        // Text input fields
        responsibilitiesType: this.data.responsibilities.ResponsibilitiesType || '',
        responsibilitiesRemark: this.data.responsibilities.ResponsibilitiesRemark || '',
        responsibilitiesAuthRemark: this.data.responsibilities.ResponsibilitiesAuthRemark || '',

        // Status fields
        responsibilitiesAuth: this.data.responsibilities.ResponsibilitiesAuth ?? true,
        responsibilitiesIsDiscard: this.data.responsibilities.ResponsibilitiesIsDiscard ?? false,
        responsibilitiesIsActive: this.data.responsibilities.ResponsibilitiesIsActive ?? true,
      });
      this.responsibilitiesMstForm.get('responsibilitiesAuth')?.enable();
      this.responsibilitiesMstForm.get('responsibilitiesIsDiscard')?.enable();
      this.responsibilitiesMstForm.get('responsibilitiesIsActive')?.enable();
    }
    console.log('Form patched with values:', this.responsibilitiesMstForm.value);
  }

  loadAllGrades(): void {
    this.responsibilitiesService.getGradeList().subscribe({
      next: grades => {
        this.gradeList = grades;
        this.filteredGradeList = [...this.gradeList];
        this.GradeSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredGradeList = this.gradeList.filter(grade =>
            grade.GradeName.toLowerCase().includes(filterValue.toLowerCase())
          );
        });
        if (this.isEditMode && this.data.responsibilities) {
          this.setGradeForEdit();
        }
      },
      error: err => {
        console.error('Error loading grades:', err);
      },
    });
  }

  private setGradeForEdit(): void {
    let gradeId = null;
    const gradeData = this.data.responsibilities;
    // Find company entity type by name (trim whitespace for comparison)
    if (gradeData?.ResponsibilitiesGradeName) {
      const _gradeData = this.gradeList.find(
        c => c.GradeName.trim() === gradeData.ResponsibilitiesGradeName.trim()
      );
      gradeId = _gradeData ? _gradeData.GradeId : null;
      console.log('Found grade by id:', gradeId, 'for grade name:', gradeData.GradeName);
    }

    if (gradeId) {
      this.responsibilitiesMstForm.patchValue({
        GradeID: gradeId,
      });
      console.log('Grade set in form:', gradeId);
    } else {
      console.log('No Grade id found for grade name:', gradeData?.GradeName);
    }
  }

  loadAllDesignations(): void {
    this.responsibilitiesService.getDesignationList().subscribe({
      next: designations => {
        this.designationList = designations;
        this.filteredDesignationList = [...this.designationList];
        this.DesignationSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredDesignationList = this.designationList.filter(designation =>
            designation.DesignationName.toLowerCase().includes(filterValue.toLowerCase())
          );
        });
        if (this.isEditMode && this.data.responsibilities) {
          this.setDesignationForEdit();
        }
      },
      error: err => {
        console.error('Error loading designations:', err);
      },
    });
  }

  private setDesignationForEdit(): void {
    let designationId = null;
    const designationData = this.data.responsibilities;
    // Find designation by name (trim whitespace for comparison)
    if (designationData?.ResponsibilitiesDesignationName) {
      const designation = this.designationList.find(
        c => c.DesignationName.trim() === designationData.ResponsibilitiesDesignationName.trim()
      );
      designationId = designation ? designation.DesignationId : null;
      console.log(
        'Found designation by id:',
        designationId,
        'for designation:',
        designationData.ResponsibilitiesDesignationName
      );
    }
    if (designationId) {
      this.responsibilitiesMstForm.patchValue({
        DesignationID: designationId,
      });
      console.log('Designation set in form:', designationId);
    } else {
      console.log(
        'No designation ID found for designation name:',
        designationData?.ResponsibilitiesDesignationName
      );
    }
  }

  loadAllDivisions(): void {
    this.responsibilitiesService.getDivisionList().subscribe({
      next: divisions => {
        this.divisionList = divisions;
        this.filteredDivisionList = [...this.divisionList];
        this.DivisionSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredDivisionList = this.divisionList.filter(division =>
            division.DivisionName.toLowerCase().includes(filterValue.toLowerCase())
          );
        });
        if (this.isEditMode && this.data.responsibilities) {
          this.setDivisionForEdit();
        }
      },
      error: err => {
        console.error('Error loading divisions:', err);
      },
    });
  }

  private setDivisionForEdit(): void {
    let divisionId = null;
    const divisionData = this.data.responsibilities;
    // Find division by name (trim whitespace for comparison)
    if (divisionData?.ResponsibilitiesDivisionName) {
      const division = this.divisionList.find(
        c => c.DivisionName.trim() === divisionData.ResponsibilitiesDivisionName.trim()
      );
      divisionId = division ? division.DivisionId : null;
      console.log(
        'Found division by id:',
        divisionId,
        'for division:',
        divisionData.ResponsibilitiesDivisionName
      );
    }
    if (divisionId) {
      this.responsibilitiesMstForm.patchValue({
        DivisionID: divisionId,
      });
      console.log('Division set in form:', divisionId);
    } else {
      console.log(
        'No division ID found for division name:',
        divisionData?.ResponsibilitiesDivisionName
      );
    }
  }

  onSubmit(): void {
    debugger;
    if (this.responsibilitiesMstForm.valid) {
      this.responsibilitiesMstForm.enable(); // Enable all controls to include their values
      console.log('Form submitted with values:', this.responsibilitiesMstForm.value);
      this.dialogRef.close(this.responsibilitiesMstForm.value);
    } else {
      this.responsibilitiesMstForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onReset(): void {}
}
