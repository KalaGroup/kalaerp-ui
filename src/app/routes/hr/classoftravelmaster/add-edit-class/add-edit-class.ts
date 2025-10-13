import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { classoftravelservice } from '@shared/services/hr/classoftravel/classoftravelservice';

@Component({
  selector: 'app-add-edit-class',
  templateUrl: './add-edit-class.html',
  styleUrls: ['./add-edit-class.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule
  ]
})
export class AddEditClass implements OnInit {

  classoftravelForm!: FormGroup;
  isEditMode: boolean = false;

  // Search controls
  classoftravelSearchControl = new FormControl('');
  travelTypeSearchControl = new FormControl('');

  // Lists
  classoftravelList: any[] = [];
  filteredclassoftravelList: any[] = [];
  travelTierTypes: any[] = [];
  filteredtravelTypeList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ClassofTravelService: classoftravelservice,
    public dialogRef: MatDialogRef<AddEditClass>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.classoftravel;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllClassoftravel();
    this.loadTierTypes();
  }

  /** Initialize the reactive form */
  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy
    this.classoftravelForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      ClassOfTravelId: [''],
      ClassOfTravelCode: ['', Validators.required],
      ClassOfTravelName: ['', Validators.required],
      ClassOfTravelGradeId: ['', Validators.required],
      DafoodAllowancePerday: [''],
      ClassOfTravelTierType: [''],
      ClassOfTravelRemark: [''],
      ClassOfTravelIsAuth: [{ value: true, disabled: !this.isEditMode }],
      ClassOfTravelIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      ClassOfTravelIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
    });

    // If edit mode, patch values from data
    if (this.isEditMode && this.data?.classoftravel) {
      const travel = this.data.classoftravel;
      this.classoftravelForm.patchValue({
        ClassOfTravelId: travel.ClassOfTravelId,
        ClassOfTravelCode: travel.ClassOfTravelCode,
        ClassOfTravelName: travel.ClassOfTravelName,
        ClassOfTravelGradeId: travel.ClassOfTravelGradeId,
        DafoodAllowancePerday: travel.DafoodAllowancePerday,
        ClassOfTravelTierType: travel.ClassOfTravelTierType?.toString(),
        ClassOfTravelRemark: travel.ClassOfTravelRemark,
        ClassOfTravelIsAuth: travel.ClassOfTravelIsAuth ?? true,
        ClassOfTravelIsDiscard: travel.ClassOfTravelIsDiscard ?? false,
        ClassOfTravelIsActive: travel.ClassOfTravelIsActive ?? true,
        CreatedBy: travel.CreatedBy,
        CreatedDate: travel.CreatedDate,
      });
    }
  }

  loadAllClassoftravel(): void {
    this.ClassofTravelService.getAllClassOftravelGrade().subscribe({
      next: res => {
        this.classoftravelList = res;
        this.filteredclassoftravelList = [...this.classoftravelList];
        this.classoftravelSearchControl.valueChanges.subscribe((value: any) => {
          const filterValue = (value || '').toLowerCase();
          this.filteredclassoftravelList = this.classoftravelList.filter(classoftravel =>
            classoftravel.GradeName.toLowerCase().includes(filterValue)
          );
        });

        console.log('Loaded class:', res);

        // Now that the list is loaded, call the edit setup
        if (this.isEditMode && this.data) {
          this.setclassoftravelForEdit();
        }
      },
      error: (err: any) => console.error('Error loading class', err)
    });
  }

  private setclassoftravelForEdit(): void {

    let GradeId = null;
    const classoftravelData = this.data.classoftravel;

    // Find GradeId by name
    if (classoftravelData?.GradeName) {
      const classtype = this.classoftravelList.find(
        q => q.GradeName.trim() === classoftravelData.GradeName.trim()
      );
      GradeId = classtype ? classtype.GradeId : null;

      console.log('Found classoftravel by name:', GradeId, 'for name:', classoftravelData.GradeName);
    }

    // Patch all fields
    this.classoftravelForm.patchValue({
      ClassOfTravelGradeId: GradeId,
      ClassOfTravelTierType: classoftravelData?.ClassOfTravelTierType || null,
      ClassOfTravelRemark: classoftravelData?.ClassOfTravelRemark || ''
    });

    console.log('Form patched with:', this.classoftravelForm.value);
  }

  /** Load tier types (static) */
  private loadTierTypes(): void {
    this.travelTierTypes = [
      { id: '1', name: 'Economy' },
      { id: '2', name: 'Business' },
      { id: '3', name: 'First Class' }
    ];

    this.filteredtravelTypeList = [...this.travelTierTypes];

    // Filter while typing
    this.travelTypeSearchControl.valueChanges.subscribe((value: any) => {
      const filterValue = (value || '').toLowerCase();
      this.filteredtravelTypeList = this.travelTierTypes.filter(t =>
        t.name.toLowerCase().includes(filterValue)
      );
    });

    if (this.isEditMode && this.data) {
      this.setTierTypeForEdit();
    }
  }

  private setTierTypeForEdit(): void {
    const classData = this.data?.classoftravel;
    if (!classData?.ClassOfTravelTierType) return;

    const tier = this.travelTierTypes.find(
      t => t.id === classData.ClassOfTravelTierType?.toString()
    );

    if (tier) {
      this.classoftravelForm.patchValue({
        ClassOfTravelTierType: tier.id
      });
    }
  }

  /** Form submit */
  onSubmit(): void {
    if (this.classoftravelForm.valid) {
      this.dialogRef.close(this.classoftravelForm.value);
    } else {
      this.classoftravelForm.markAllAsTouched();
    }
  }

  blockSpaces(event: KeyboardEvent) {
    const pattern = /[A-Za-z0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  allowOnlyLettersAndSpaces(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const inputChar = event.key;

    // Block special characters and numbers
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }

    // Block leading space
    const input = event.target as HTMLInputElement;
    if (input.selectionStart === 0 && inputChar === ' ') {
      event.preventDefault();
    }
  }

  /** Cancel dialog */
  onCancel(): void {
    this.dialogRef.close();
  }
}
