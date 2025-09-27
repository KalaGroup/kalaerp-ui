import { Component, Inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { IDivision } from '@shared/interfaces/hr/division';
import { Divisionservice } from '@shared/services/hr/division/divisionservice';

@Component({
  selector: 'app-add-edit-kalaerppagedetails',
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
  templateUrl: './add-edit-kalaerppagedetails.html',
  styleUrl: './add-edit-kalaerppagedetails.scss',
})
export class AddEditKalaerppagedetails {
  erppagedetailsForm!: FormGroup;
  isEditMode = false;

  pageTypeList = [
  { id: 1, name: 'Master' },
  { id: 2, name: 'Plan' },
  { id: 3, name: 'Trans' },
  { id: 4, name: 'Report' },
  { id: 5, name: 'Auth' }
];

  filtereddivisionList: IDivision[] = [];
  divisionList: any[] = [];
  divisionSearchControl = new FormControl('');

  constructor(
    private divisionService: Divisionservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditKalaerppagedetails>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.kalaerppagedetails;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllDivision();
  }

  private initializeForm(): void {
    debugger;
    const currentDate = new Date();
    this.erppagedetailsForm = this.fb.group({
      KalaErppageDetailsId: [''],
      KalaErppageDetailsDivisionId: ['', [Validators.required]],
      PageTittle: ['', [Validators.required]],
      PageUrl: ['', [Validators.required]],
      PageType: [null, [Validators.required]],
      PageIsonumber: [''],
      KalaErppageDetailsRemark: [''],
      KalaErppageDetailsAuthRemark: [''],
      KalaErppageDetailsAuth: [{ value: true, disabled: !this.isEditMode }],
      KalaErppageDetailsIsActive: [{ value: true, disabled: !this.isEditMode }],
      KalaErppageDetailsIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: ['3'],
      CreatedDate: [{ value: currentDate, disabled: true }],
      UpdatedBy: ['3'],
      UpdatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      debugger;
      console.log('Patching form with ERP Page Details data:', this.data.kalaerppagedetails);
      this.erppagedetailsForm.patchValue({
        KalaErppageDetailsId: this.data.kalaerppagedetails.KalaErppageDetailsId,
        KalaErppageDetailsDivisionId: this.data.kalaerppagedetails.KalaErppageDetailsDivisionId,
        PageTittle: this.data.kalaerppagedetails.PageTittle,
        PageUrl: this.data.kalaerppagedetails.PageUrl,
        PageType: this.data.kalaerppagedetails.PageType,
        PageIsonumber: this.data.kalaerppagedetails.PageIsonumber,
        KalaErppageDetailsRemark: this.data.kalaerppagedetails.KalaErppageDetailsRemark,
        KalaErppageDetailsAuthRemark: this.data.kalaerppagedetails.KalaErppageDetailsAuthRemark,
        KalaErppageDetailsAuth: this.data.kalaerppagedetails.KalaErppageDetailsAuth,
        KalaErppageDetailsIsActive: this.data.kalaerppagedetails.KalaErppageDetailsIsActive,
        KalaErppageDetailsIsDiscard: this.data.kalaerppagedetails.KalaErppageDetailsIsDiscard,
        CreatedBy: this.data.kalaerppagedetails.CreatedBy,
        UpdatedBy: this.data.kalaerppagedetails.UpdatedBy,
      });
      this.erppagedetailsForm.get('code')?.enable();
      this.erppagedetailsForm.get('CreatedDate')?.disable();
      this.erppagedetailsForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.erppagedetailsForm.value);
    }
  }

  loadAllDivision(): void {
    debugger;
    this.divisionService.getAllDivision().subscribe({
      next: res => {
        this.divisionList = res;
        console.log('Division loaded:', res);
        this.filtereddivisionList = [...this.divisionList];
        this.divisionSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filtereddivisionList = this.divisionList.filter(division =>
            division.DivisionName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setDivisionForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Division:', err);
      },
    });
  }

  private setDivisionForEdit(): void {
    debugger;
    let DivisionId: number | null = null;
    const divisionData = this.data.kalaerppagedetails;

    if (divisionData?.DivisionName) {
      const Division = this.divisionList.find(
        p =>
          p.DivisionName.trim().toLowerCase() ===
          divisionData.DivisionName.trim().toLowerCase()
      );

      DivisionId = Division ? Division.DivisionId : null; // 🔥 use correct property name
      console.log('Found DivisionName by name:',DivisionId,'for ProfitCenter:',divisionData.DivisionName);
    }

    if (DivisionId) {
      this.erppagedetailsForm.patchValue({
        KalaErppageDetailsDivisionId: DivisionId,
      });
      console.log('ProfitCenter set in form:', DivisionId);
    } else {
      console.log('No ProfitCenter ID found for ProfitCenter Name:', divisionData?.DivisionName);
    }
  }

  onSubmit(): void {
    this.erppagedetailsForm.enable(); //important for active boolean
    if (this.erppagedetailsForm.valid) {
      this.dialogRef.close(this.erppagedetailsForm.value);
    } else {
      this.erppagedetailsForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
