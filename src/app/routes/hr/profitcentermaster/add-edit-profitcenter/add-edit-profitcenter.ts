/* eslint-disable @angular-eslint/prefer-inject */
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
import { HrService } from '../../hr.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Country } from '@shared/interfaces/hr';
import { profitcenterservices } from '@shared/services/hr/profitcenter/profitcenterservices';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-profitcenter',
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
  templateUrl: './add-edit-profitcenter.html',
  styleUrl: './add-edit-profitcenter.scss'
})
export class AddEditProfitcenter {
  profitcenterForm!: FormGroup;
  isEditMode: boolean = false;

  profitcentertypeList: any[] = [];
  code: string = '';
  profitcentertypeSearchControl = new FormControl('');
  filteredprofitcentertypeList: any[] = [];

  constructor(private profitCenterServices: profitcenterservices, private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditProfitcenter>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.profitcenter;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllProfitCenter();
  }
  private initializeForm(): void {

    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.profitcenterForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      ProfitCenterId: [''],
      ProfitCenterCode: [''],
      ProfitCenterName: ['', [Validators.required]],
      ProfitCenterCompanyId: ['', [Validators.required]],
      ParentProfitCenterId: [null],
      ProfitCenterAuthRemark: [''],
      ProfitCenterAuth: [true],
      ProfitCenterRemark: [''],
      ProfitCenterIsActive: [true],
      ProfitCenterIsDiscard: [true],
      CreatedBy: ['1'],
    });

    if (this.isEditMode && this.data.profitcenter) {
      console.log('Patching form with qualification data:', this.data.profitcenter);
      this.profitcenterForm.patchValue({
        ProfitCenterId: this.data.profitcenter.ProfitCenterId || '',
        ProfitCenterCode: this.data.profitcenter.ProfitCenterCode || '',
        ProfitCenterName: this.data.profitcenter.ProfitCenterName || '',
        ProfitCenterCompanyId: this.data.profitcenter.ProfitCenterCompanyId || '',
        ParentProfitCenterId: this.data.profitcenter.ParentProfitCenterId || '',
        ProfitCenterAuth: this.data.profitcenter.ProfitCenterAuth || '',
        ProfitCenterRemark: this.data.profitcenter.ProfitCenterRemark || '',
        ProfitCenterIsActive: this.data.profitcenter.ProfitCenterIsActive ?? true,
        ProfitCenterIsDiscard: this.data.profitcenter.ProfitCenterIsDiscard ?? false,
        CreatedBy: this.data.profitcenter.CreatedBy || '',
        CreatedDate: this.data.profitcenter.CreatedDate || currentDate
      });

    }
  }
  loadAllProfitCenter(): void {
    this.profitCenterServices.getAllProfitcenterCompany().subscribe({
      next: res => {
        this.profitcentertypeList = res;
        this.filteredprofitcentertypeList = [...this.profitcentertypeList];
        this.profitcentertypeSearchControl.valueChanges.subscribe((value: any) => {
          const filterValue = (value || '').toLowerCase();
          this.filteredprofitcentertypeList = this.profitcentertypeList.filter(profitcenter =>
            profitcenter.CompanyName.toLowerCase().includes(filterValue)
          );
        });

        console.log('Loaded qualification:', res);

        // Now that the list is loaded, call the edit setup
        if (this.isEditMode && this.data) {
          this.setprofitcenterForEdit();
        }
      },
      error: (err: any) => console.error('Error loading qualification', err)
    });
  }
  private setprofitcenterForEdit(): void {
    debugger;
    let CompanyId = null;
    const profitcenterData = this.data.profitcenter;

    // Find QualificationType by name
    if (profitcenterData?.CompanyName) {
      const profitcenterType = this.profitcentertypeList.find(
        q => q.CompanyName.trim() === profitcenterData.CompanyName.trim()
      );
      CompanyId = profitcenterType ? profitcenterType.CompanyId : null;

      console.log('Found QualificationType by name:', CompanyId, 'for name:', profitcenterData.CompanyName);
    }

    if (CompanyId) {
      this.profitcenterForm.patchValue({
        ProfitCenterCompanyId: CompanyId,
      });
      console.log('QualificationType set in form:', CompanyId);
    } else {
      console.log('No QualificationType ID found for name:', profitcenterData?.CompanyName);
    }
  }

  onSubmit(): void {
    if (this.profitcenterForm.valid) {
      this.dialogRef.close(this.profitcenterForm.value);
    } else {
      this.profitcenterForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
