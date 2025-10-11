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
import { locationservices } from '@shared/services/hr/location/locationservice';


@Component({
  selector: 'app-add-edit-location',
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
  templateUrl: './add-edit-location.html',
  styleUrl: './add-edit-location.scss'
})
export class AddEditLocation {

  locationForm!: FormGroup;
  isEditMode: boolean = false;
  locationtypeList: any[] = [];
  code: string = '';
  locationtypeSearchControl = new FormControl('');
  filteredLocationtypeList: any[] = [];
  constructor(private LocationServices: locationservices, private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditLocation>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.location;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllLocation();
  }
  private initializeForm(): void {

    const currentDate = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy format
    this.locationForm = this.fb.group({
      CreatedDate: [{ value: currentDate, disabled: true }],
      LocationId: [''],
      LocationCode: ['', [Validators.required]],
      LocationName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      ProfitcenterLocationId: ['', [Validators.required]],
      LocationRemark: ['', Validators.pattern(/^[A-Za-z ]+$/)],
      LocationType: [''],
      LocationAuthRemark: [''],
      LocationAuth: [{ value: true, disabled: !this.isEditMode }],
      LocationIsActive: [{ value: true, disabled: !this.isEditMode }],
      LocationIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
    });

    if (this.isEditMode && this.data.location) {
      console.log('Patching form with location data:', this.data.location);
      this.locationForm.patchValue({
        LocationId: this.data.location.LocationId || '',
        LocationCode: this.data.location.LocationCode || '',
        LocationName: this.data.location.LocationName || '',
        ProfitcenterLocationId: this.data.location.ProfitcenterLocationId || '',
        LocationRemark: this.data.location.LocationRemark || '',
        LocationType: this.data.location.LocationType || '',
        LocationAuthRemark: this.data.location.LocationAuthRemark || '',
        LocationAuth: this.data.location.LocationAuth ?? true,
        LocationIsActive: this.data.location.LocationIsActive ?? true,
        LocationIsDiscard: this.data.location.LocationIsDiscard ?? false,
        CreatedBy: this.data.location.CreatedBy || '',
        CreatedDate: this.data.location.CreatedDate || currentDate
      });
    }
  }

  loadAllLocation(): void {
    this.LocationServices.getAllLocationProfitcenter().subscribe({
      next: res => {
        this.locationtypeList = res;
        this.filteredLocationtypeList = [...this.locationtypeList];
        this.locationtypeSearchControl.valueChanges.subscribe((value: any) => {
          const filterValue = (value || '').toLowerCase();
          this.filteredLocationtypeList = this.locationtypeList.filter(location =>
            location.ProfitCenterName.toLowerCase().includes(filterValue)
          );
        });

        console.log('Loaded location:', res);

        // Now that the list is loaded, call the edit setup
        if (this.isEditMode && this.data) {
          this.setlocationForEdit();
        }
      },
      error: (err: any) => console.error('Error loading location', err)
    });
  }
  private setlocationForEdit(): void {
    debugger;
    let ProfitCenterId = null;
    const locationData = this.data.location;

    // Find QualificationType by name
    if (locationData?.ProfitCenterName) {
      const qualificationType = this.locationtypeList.find(
        q => q.ProfitCenterName.trim() === locationData.ProfitCenterName.trim()
      );
      ProfitCenterId = qualificationType ? qualificationType.ProfitCenterId : null;

      console.log('Found location by name:', ProfitCenterId, 'for name:', locationData.ProfitCenterName);
    }

    if (ProfitCenterId) {
      this.locationForm.patchValue({
        ProfitcenterLocationId: ProfitCenterId,
      });
      console.log('QualificationType set in form:', ProfitCenterId);
    } else {
      console.log('No location ID found for name:', locationData?.ProfitCenterName);
    }
  }

  onSubmit(): void {
    if (this.locationForm.valid) {
      this.dialogRef.close(this.locationForm.value);
    } else {
      this.locationForm.markAllAsTouched();
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }


  // Allow only letters and space while typing
  allowLettersAndSpace(event: KeyboardEvent) {
    const char = event.key;
    if (!/^[A-Za-z ]$/.test(char)) {
      event.preventDefault();
    }
  }

  // Prevent pasting invalid characters
  blockInvalidPaste(event: ClipboardEvent) {
    const pastedInput = event.clipboardData?.getData('text') ?? '';
    if (!/^[A-Za-z ]+$/.test(pastedInput)) {
      event.preventDefault();
    }
  }


}


