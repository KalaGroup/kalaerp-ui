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
import { FormsModule } from '@angular/forms';
import { KalaErpPageDetailsservice } from '@shared/services/hr/KalaERPPageDetails/kalaerppagedetailsservice';


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

    FormsModule,
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
    { id: 5, name: 'checker1' },
    { id: 6, name: 'checker2' },
    { id: 7, name: 'checker3' },
    { id: 8, name: 'checker4' },
    { id: 9, name: 'checker5' },
  ];


  // Selected Maker ID
  MakerKalaErppageDetailsId: number | null = null;


  makerList: any[] = []; // All makers
  filteredMakerList: any[] = []; // Makers for selected division

  filtereddivisionList: IDivision[] = [];
  divisionList: any[] = [];
  divisionSearchControl = new FormControl('');
  KalaErpPageDetailsservice: any;
  makerSearchControl: any;


  constructor(
    private divisionService: Divisionservice,
    private kalaerppagedetailsService: KalaErpPageDetailsservice,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditKalaerppagedetails>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.kalaerppagedetails;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  selectedMakerOnly: any[] = []; // For edit mode single-value list
  showMakerField = false; // initially hidden
  disableMakerField = false; // track disabled state


  ngOnInit(): void {
    this.initializeForm();
    this.loadAllDivision();
    this.loadMakers();
    // 👇 Subscribe to PageType changes
    this.erppagedetailsForm.get('PageType')?.valueChanges.subscribe((pageTypeId: number) => {
      this.onPageTypeChange(pageTypeId);
    });
  }
  // onPageTypeChange(pageTypeId: number): void {
  //   // Map id to name
  //   const selectedType = this.pageTypeList.find(t => t.id === pageTypeId)?.name?.toLowerCase();
  //   if (!selectedType) return;

  //   console.log('Page Type selected:', selectedType);

  //   // Rules for when the Maker field should be disabled
  //   const disableFor = ['master', 'trans', 'report', 'plan'];
  //   const enableForCheckers = ['checker1', 'checker2', 'checker3', 'checker4', 'checker5'];

  //   // Always show Maker field, but control disable/enable
  //   this.showMakerField = true;

  //   if (disableFor.includes(selectedType)) {
  //     this.disableMakerField = true;  // disable the field
  //     this.erppagedetailsForm.patchValue({ MakerKalaErppageDetailsId: '' });
  //   } else if (enableForCheckers.includes(selectedType)) {
  //     this.disableMakerField = false; // enable the field
  //   } else {
  //     this.disableMakerField = true; // fallback
  //   }

  //   console.log('Maker field visible:', this.showMakerField, '| Disabled:', this.disableMakerField);
  // }
  onPageTypeChange(pageTypeId: number): void {
    if (!pageTypeId) return;

    // 1️⃣ Find selected Page Type name
    const selectedType = this.pageTypeList.find(t => t.id === pageTypeId)?.name?.toLowerCase();
    if (!selectedType) return;

    console.log('Page Type selected:', selectedType);

    // 2️⃣ Define logic groups
    const enableForMaker = ['master', 'plan', 'trans', 'report']; // Maker is used in these
    const disableForMaker = ['checker1', 'checker2', 'checker3', 'checker4', 'checker5',];

    // 3️⃣ Default: show Maker field
    this.showMakerField = true;

    // 4️⃣ Logic
    if (disableForMaker.includes(selectedType)) {
      // ✅ Maker field visible & enabled
      this.disableMakerField = false;
      console.log('Maker field ENABLED for:', selectedType);
    }
    else if (enableForMaker.includes(selectedType)) {
      // ❌ Maker field visible but disabled
      this.disableMakerField = true;
      console.log('Maker field DISABLED for:', selectedType);
    }
    else {
      // Unknown type — hide Maker field
      this.showMakerField = false;
      this.disableMakerField = true;
      console.log('Maker field HIDDEN for unrecognized type:', selectedType);
    }

    console.log('Maker Field => show:', this.showMakerField, '| disabled:', this.disableMakerField);
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
      PageIsonumber: ['', Validators.pattern(/^[0-9]+$/)],
      MakerKalaErppageDetailsId: ['1'],
      KalaErppageDetailsRemark: [''],
      KalaErppageDetailsAuthRemark: ['ok'],
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
        MakerKalaErppageDetailsId: this.data.kalaerppagedetails.MakerKalaErppageDetailsId ?? 2,
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

  loadMakers(): void {
    this.kalaerppagedetailsService.getAllPageTittle().subscribe({
      next: (res) => {
        this.makerList = res;
        console.log('Makers loaded:', this.makerList);

        // Create a filtered list for search/filter dropdowns
        this.filteredMakerList = [...this.makerList];

        // Optional: if you have a search control
        this.makerSearchControl?.valueChanges.subscribe((value: any) => {
          const filterValue = (value || '').toLowerCase();
          this.filteredMakerList = this.makerList.filter((maker: any) =>
            maker.PageTittle.toLowerCase().includes(filterValue)
          );
        });

        // Handle Maker selection for edit mode
        if (this.isEditMode && this.data) {
          this.setMakerForEdit();
        }
      },
      error: (error) => {
        console.error('Error loading makers:', error);
      },
    });
  }



  private setMakerForEdit(): void {
    const makerData = this.data?.kalaerppagedetails;
    if (!makerData) return;

    const makerId = makerData.MakerKalaErppageDetailsId;
    const pageTypeName = makerData.PageType?.toLowerCase();

    const checkerTypes = ['checker1', 'checker2', 'checker3', 'checker4', 'checker5'];
    this.showMakerField = checkerTypes.includes(pageTypeName);

    if (this.showMakerField && makerId) {
      const selectedMaker = this.filteredMakerList.find(
        (m: any) => m.KalaErppageDetailsId === makerId
      );

      if (selectedMaker) {
        this.selectedMakerOnly = [selectedMaker];

        // ✅ Allow changing the maker in edit mode
        this.disableMakerField = false;

        this.erppagedetailsForm.patchValue({
          MakerKalaErppageDetailsId: makerId,
        });
      } else {
        this.selectedMakerOnly = [];
        this.disableMakerField = false;
      }
    } else {
      this.showMakerField = false;
      this.disableMakerField = true;
    }
  }




  loadAllDivision(): void {

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
      console.log('Found DivisionName by name:', DivisionId, 'for ProfitCenter:', divisionData.DivisionName);
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
    this.erppagedetailsForm.enable();
    if (this.erppagedetailsForm.valid) {
      // const formValue = this.erppagedetailsForm.value;
      this.dialogRef.close(this.erppagedetailsForm.value);

    } else {
      this.erppagedetailsForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get makerOptions() {
    // When editing → show only the selected maker
    // When adding → show all makers
    if (this.isEditMode && this.showMakerField && this.selectedMakerOnly.length) {
      return this.selectedMakerOnly;
    }
    return this.filteredMakerList;
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only digits (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  blockNonNumericPaste(event: ClipboardEvent) {
    const pastedInput = event.clipboardData?.getData('text') ?? '';
    if (!/^[0-9]+$/.test(pastedInput)) {
      event.preventDefault();
    }
  }

}