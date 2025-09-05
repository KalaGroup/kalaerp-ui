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
import { classoftravelservice } from '@shared/services/hr/classoftravel/classoftravelservice';


@Component({
  selector: 'app-add-edit-class',
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
  templateUrl: './add-edit-class.html',
  styleUrl: './add-edit-class.scss'
})
export class AddEditClass {

  classoftravelForm!: FormGroup;
  isEditMode: boolean = false;

  classoftravelList: any[] = [];
  code: string = '';
  classoftravelSearchControl = new FormControl('');
  filteredclassoftravelList: any[] = [];
  travelTierTypes = [
    { id: '1', name: 'Economy' },
    { id: '2', name: 'Business' },
    { id: '3', name: 'First Class' }
  ];

  constructor(private ClassofTravelService: classoftravelservice, private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditClass>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.classoftravel;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllClassoftravel();
  }

  private initializeForm(): void {
    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.classoftravelForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      ClassOfTravelId: [''],
      ClassOfTravelCode: [''],
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
    if (this.isEditMode && this.data.classoftravel) {
      this.classoftravelForm.patchValue({
        ClassOfTravelId: this.data.classoftravel.ClassOfTravelId,
        ClassOfTravelCode: this.data.classoftravel.ClassOfTravelCode,
        ClassOfTravelName: this.data.classoftravel.ClassOfTravelName,
        ClassOfTravelGradeId: this.data.classoftravel.ClassOfTravelGradeId,
        DafoodAllowancePerday: this.data.classoftravel.DafoodAllowancePerday,
        ClassOfTravelTierType: this.data.classoftravel.ClassOfTravelTierType,
        ClassOfTravelRemark: this.data.classoftravel.ClassOfTravelRemark,
        ClassOfTravelIsAuth: this.data.classoftravel.ClassOfTravelIsAuth ?? true,
        ClassOfTravelIsDiscard: this.data.classoftravel.ClassOfTravelIsDiscard ?? false,
        ClassOfTravelIsActive: this.data.classoftravel.ClassOfTravelIsActive ?? true,
        CreatedBy: this.data.classoftravel.CreatedBy,
        CreatedDate: this.data.classoftravel.CreatedDate,
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
    debugger;
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


  onSubmit(): void {
    if (this.classoftravelForm.valid) {
      this.dialogRef.close(this.classoftravelForm.value);
    } else {
      this.classoftravelForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
