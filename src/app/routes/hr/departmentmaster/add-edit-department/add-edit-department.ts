/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  AbstractControl,
  ValidationErrors,
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
import { Departmentservice } from '@shared/services/hr/department/departmentservice';
import { Divisionservice } from '@shared/services/hr/division/divisionservice';
import { profitcenterservices } from '@shared/services/hr/profitcenter/profitcenterservices';
@Component({
  selector: 'app-add-edit-department',
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
  templateUrl: './add-edit-department.html',
  styleUrl: './add-edit-department.scss',
})
export class AddEditDepartment implements OnInit {
  departmentForm!: FormGroup;
  isEditMode: boolean = false;
  divisionlist: any[] = [];
  departmentlist: any[] = [];
  profitcenterlist: any[] = [];
  code: string = '';
  divisionSearchControl = new FormControl('');
  departmentSearchControl = new FormControl('');
  profitcenterSearchControl = new FormControl('');
  filtereddivisionList: any[] = [];
  filtereddepartmentList: any[] = [];
  filteredprofitcenterList: any[] = [];





  constructor(
    private departmentService: Departmentservice,
    private divisionService: Divisionservice,
    private profitcenterServices: profitcenterservices,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDepartment>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.department;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllDivision();
    this.loadAllDepartment();
    this.loadAllProfitcenter();
  }

  private initializeForm(): void {
    const currentDate = new Date();
    this.departmentForm = this.fb.group({
      DepartmentId: [''],
      DepartmentCode: ['', [Validators.required]],
      DepartmentName: ['', [Validators.required]],
      DepartmentShortName: ['', [Validators.required]],
      DepartmentDivisionId: ['', [Validators.required]],
      ParentDepartmentId: ['', [Validators.required]],
      DepartmentProfitcenterId: ['', [Validators.required]],
      DepartmentRemark: ['', [Validators.maxLength(200), this.noOnlySpacesValidator]],
      DepartmentType: ['', [Validators.required]],
      DepartmentAuthRemark: [''],
      DepartmentAuth: [{ value: true, disabled: !this.isEditMode }],
      DepartmentIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      DepartmentIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      console.log('Patching form with country data:', this.data.department);
      this.departmentForm.patchValue({
        //CreatedDate: currentDate, tommorow dicuss with Umar
        code: this.data.department.code,
        DepartmentId: this.data.department.DepartmentId,
        DepartmentCode: this.data.department.DepartmentCode,
        DepartmentName: this.data.department.DepartmentName,
        DepartmentShortName: this.data.department.DepartmentShortName,
        DepartmentDivisionId: this.data.department.DepartmentDivisionId,
        ParentDepartmentId: this.data.department.ParentDepartmentId,
        DepartmentProfitcenterId: this.data.department.DepartmentProfitcenterId,
        DepartmentRemark: this.data.department.DepartmentRemark,
        DepartmentType: this.data.department.DepartmentType,
        DepartmentAuthRemark: this.data.department.DepartmentAuthRemark,
        DepartmentAuth: this.data.department.DepartmentAuth,
        IsActive: this.data.department.IsActive,
        IsDiscard: this.data.department.IsDiscard,
        CreatedBy: this.data.department.CreatedBy,
      });
      this.departmentForm.get('code')?.enable();
      this.departmentForm.get('CreatedDate')?.disable();
      this.departmentForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.departmentForm.value);
    }
  }



  loadAllDivision(): void {
    this.divisionService.getAllDivision().subscribe({
      next: res => {
        this.divisionlist = res;
        this.filtereddivisionList = [...this.divisionlist];

        // ✅ live filter as user types
        this.divisionSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filtereddivisionList = this.divisionlist.filter(division =>
            division.DivisionName.toLowerCase().includes(filterValue)
          );
        });

        // ✅ if in edit mode, preselect division
        if (this.isEditMode && this.data) {
          this.setDivisionForEdit();
        }
      },
      error: err => console.error('Failed to load Division:', err),
    });
  }

  private setDivisionForEdit(): void {
    const divisionData = this.data?.division;
    if (!divisionData) return;

    const found = this.divisionlist.find(
      d =>
        d.DivisionName.trim().toLowerCase() ===
        divisionData.DivisionName.trim().toLowerCase()
    );

    if (found) {
      this.departmentForm.patchValue({
        DepartmentDivisionId: found.DivisionId,
      });
      console.log('✅ Division set in form:', found.DivisionId);
    } else {
      console.log('⚠️ No matching Division found for:', divisionData.DivisionName);
    }
  }



  loadAllDepartment(): void {
    this.departmentService.getAllDepartment().subscribe({
      next: res => {
        this.departmentlist = res;
        console.log('Department loaded:', res);
        this.filtereddepartmentList = [...this.departmentlist];

        // 🔍 Live search filter
        this.departmentSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filtereddepartmentList = this.departmentlist.filter(d =>
            d.DepartmentName.toLowerCase().includes(filterValue)
          );
        });

        // ✅ Set value when in edit mode
        if (this.isEditMode && this.data) {
          this.setDepartmentForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Department:', err);
      },
    });
  }

  private setDepartmentForEdit(): void {
    let DepartmentId: number | null = null;
    const departmentData = this.data.department;

    if (departmentData?.DepartmentName) {
      const department = this.departmentlist.find(
        c =>
          c.DepartmentName.trim().toLowerCase() ===
          departmentData.DepartmentName.trim().toLowerCase()
      );

      DepartmentId = department ? department.DepartmentId : null;
      console.log('Found Department by name:', DepartmentId);
    }

    if (DepartmentId) {
      this.departmentForm.patchValue({
        ParentDepartmentId: DepartmentId,
      });
      console.log('Department set in form:', DepartmentId);
    } else {
      console.log('No Department ID found for Department name:', departmentData?.DepartmentName);
    }
  }



  loadAllProfitcenter(): void {
    this.profitcenterServices.getAllProfitcenter().subscribe({
      next: res => {
        this.profitcenterlist = res;
        this.filteredprofitcenterList = [...this.profitcenterlist];
        console.log('Profitcenter loaded:', res);

        // Setup search filter
        this.profitcenterSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredprofitcenterList = this.profitcenterlist.filter(p =>
            p.ProfitCenterName.toLowerCase().includes(filterValue)
          );
        });

        // Set value in edit mode
        if (this.isEditMode && this.data) {
          this.setProfitcenterForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Profitcenter:', err);
      },
    });
  }

  private setProfitcenterForEdit(): void {
    let ProfitCenterId: number | null = null;
    const profitcenterData = this.data.profitcenter;

    if (profitcenterData?.ProfitCenterName) {
      const profitcenter = this.profitcenterlist.find(
        c =>
          c.ProfitCenterName.trim().toLowerCase() ===
          profitcenterData.ProfitCenterName.trim().toLowerCase()
      );

      ProfitCenterId = profitcenter ? profitcenter.ProfitCenterId : null;
      console.log('Found Profitcenter by name:', ProfitCenterId);
    }

    if (ProfitCenterId) {
      this.departmentForm.patchValue({
        DepartmentProfitcenterId: ProfitCenterId,
      });
      console.log('Profitcenter set in form:', ProfitCenterId);
    } else {
      console.log('No Profitcenter ID found for name:', profitcenterData?.ProfitCenterName);
    }
  }


  toUpperCase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.departmentForm.get('ShortName')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    this.departmentForm.enable(); //important for active boolean

    if (this.departmentForm.valid) {
      this.dialogRef.close(this.departmentForm.value);
    } else {
      this.departmentForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }


  allowAlphanumeric(event: KeyboardEvent) {
    const pattern = /^[A-Za-z0-9]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  allowLettersAndSpaces(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  allowUppercaseLetters(event: KeyboardEvent) {
    const pattern = /^[A-Za-z]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  noOnlySpacesValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim().length === 0) {
      return { spacesOnly: true };
    }
    return null;
  }

  // 🚫 Remove leading spaces in real-time
  removeLeadingSpaces(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/^\s+/, '');
    this.departmentForm.get('DepartmentRemark')?.setValue(input.value, { emitEvent: false });
  }
}
