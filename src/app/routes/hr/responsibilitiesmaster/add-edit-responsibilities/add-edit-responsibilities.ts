import { Component, inject, Inject, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormsModule,
} from '@angular/forms';
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
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

interface Row {
  description: string;
  isEdit?: boolean;
}
@Component({
  selector: 'app-add-edit-responsibilities',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatChipsModule,
    MatExpansionModule,
  ],
  templateUrl: './add-edit-responsibilities.html',
  styleUrl: './add-edit-responsibilities.scss',
})
export class AddEditResponsibilities {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  responsibilitiesMstForm!: FormGroup;
  list: any[] = [];
  descriptionDetails: any[] = [];
  gradeList: any[] = [];
  designationList: any[] = [];
  divisionList: any[] = [];
  filteredGradeList: any[] = [];
  filteredDesignationList: any[] = [];
  filteredDivisionList: any[] = [];
  responsibilitiesList: any[] = [];
  description: { srno: number; desc: string }[] = [];
  isLoading = false;
  isEditMode: boolean = false;

  GradeSearchControl = new FormControl('');
  DesignationSearchControl = new FormControl('');
  DivisionSearchControl = new FormControl('');
  responsibilityDetailsDataSource = new MatTableDataSource<any>([]);
  newResponsibilityDetail: string = '';
  newResponsibility: string = '';
  editIndex: number | null = null;
  newDescription: string = '';

  filteredGradeList: any[] = [];
  filteredDesignationList: any[] = [];
  filteredDivisionList: any[] = [];

  constructor(
    private responsibilitiesService: Responsibilitiesmstservice,
    private dialogRef: MatDialogRef<AddEditResponsibilities>,
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
    this.loadAllDescriptions();
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
      this.loadAllDescriptions();
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

  loadAllDescriptions(): void {
    const responsibilityMstId = this.data.responsibilities.ResponsibilitiesId;
    this.responsibilitiesService.getResponsibilitiesDetailsByMstId(responsibilityMstId).subscribe({
      next: res => {
        console.log('Responsibilities Details Fetched successfully:', res);
        this.descriptionDetails = res;
        this.description = res.map((d: any) => ({
          srno: d.SrNo,
          desc: d.ResponsibilitiesDetailsDescription,
        }));
      },
      error: err => {
        console.error('Error fetch responsibilities details:', err);
      },
    });
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

  onReset(): void {
    this.responsibilitiesMstForm.reset();
    this.responsibilityDetailsDataSource.data = [];
    this.newResponsibilityDetail = '';
    console.log('Reset all data');
  }

  onSubmit(): void {
    if (this.responsibilitiesMstForm.valid && this.description.length > 0) {
      this.responsibilitiesMstForm.enable();
      const descriptionString = this.description.map(item => ({
        srno: item.srno,
        desc: item.desc,
      }));
      const payload = {
        ...this.responsibilitiesMstForm.value,
        descriptions: descriptionString,
      };
      console.log('Form submitted with values:', payload);
      this.dialogRef?.close(payload); // safe null-check in case dialogRef is undefined
    } else {
      this.responsibilitiesMstForm.markAllAsTouched();
    }
  }

  addRow() {
    const desc = this.newDescription.trim();

    if (this.newDescription.trim() == undefined || this.newDescription.trim() == '') {
      alert('Please Add Description.');
      return;
  }

    if (desc !== '') {
      // check if already exists
      const exists = this.description.some(item => item.desc.toLowerCase() === desc.toLowerCase());
      if (exists) {
        alert('This description already exists!');
        return;
      }
      const srno = this.description.length + 1; // Sr.No = next index
      this.description.push({ srno, desc });
      this.newDescription = ''; // clear input
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  deleteRow(index: number) {
    this.description.splice(index, 1);
  }

  editRow(index: number) {
    this.editIndex = index; // mark row as editable
  }

  updateRow(index: number) {
    if (this.description.at(index)?.desc == undefined || this.description.at(index)?.desc == '') {
      alert('Please Add Description.');
      return;
    }
    let flg = 0;
    for (let part of this.description) {
      if (part.desc == this.description.at(index)?.desc) {
        flg += 1;
      }
    }

    if (flg > 1) {
      this.description.at(index)?.desc == '';
      alert('This description already exists!');
      return;
    }

    this.editIndex = null; // finish editing
  }
}
