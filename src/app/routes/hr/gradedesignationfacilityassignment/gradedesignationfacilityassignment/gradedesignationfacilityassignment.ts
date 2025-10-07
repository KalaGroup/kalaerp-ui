import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Gradectcdesignationfacilityservice } from '@shared/services/hr/gradectcdesignationfacility/gradectcdesignationfacilityservice';
import { IResponsibilities } from '@shared/interfaces/hr/responsibilitiesmaster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { AddEditGradedesignationfacilityassignment } from '../add-edit-gradedesignationfacilityassignment/add-edit-gradedesignationfacilityassignment';
import { Toastservice } from 'app/routes/toastservice';

@Component({
  selector: 'app-gradedesignationfacilityassignment',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeader,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './gradedesignationfacilityassignment.html',
  styleUrl: './gradedesignationfacilityassignment.scss',
})
export class Gradedesignationfacilityassignment {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  @ViewChild('facilityTooltipTemplate', { static: true })
  facilityTooltipTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  responsibilities: IResponsibilities[] = [];
  editIndex: number | null = null;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  isLoading = false;
  isConfigExpanded: boolean = false;
  list: any[] = [];

  constructor(
    private fb: FormBuilder,
    private gradeDesignationFacilityService: Gradectcdesignationfacilityservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {}
  ngOnInit(): void {
    this.loadAllGradeCtcDesignationFacility();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  columns: MtxGridColumn[] = [
    // --- Top-level Grade fields ---
    { header: 'SNo', field: 'SNo' },
    { header: 'Grade Code', field: 'GradeCode' },
    { header: 'Grade Name', field: 'GradeName' },
    { header: 'Grade Level', field: 'GradeLevel' },
    { header: 'Min CTC', field: 'MinSalCTC' },
    { header: 'Max CTC', field: 'MaxSalCTC' },
    { header: 'Currency Name', field: 'CurrencyName' },
    //{ header: 'Grade Description', field: 'GradeDescription', minWidth: 350, width: '350px' },
    {
      header: 'Grade Description',
      field: 'GradeDescription',
      minWidth: 200,
      width: '200px',
      formatter: (row: any) => {
        const text = row.GradeDescription || '';
        return text.length > 35 ? text.substring(0, 35) + '...' : text;
      },
      class: 'description-cell', // Add CSS class
    },
    { header: 'Leave Entitlement Annual', field: 'LeaveEntitlementAnnual' },
    { header: 'Probation Period', field: 'ProbationPeriod' },
    { header: 'Notice Period', field: 'NoticePeriod' },
    { header: 'Grade Remark', field: 'GradeRemark', minWidth: 250, width: '250px' },
    { header: 'Grade Auth', field: 'GradeAuth' },
    { header: 'Grade Is Discard', field: 'GradeIsDiscard' },
    { header: 'Grade Is Active', field: 'GradeIsActive' },
    { header: 'Experienced Required', field: 'ExperiencedRequired' },
    { header: 'Experienced Remark', field: 'ExperiencedRemark', minWidth: 250, width: '250px' },

    // --- CTC Structure (flattened) ---
    { header: 'Basic', field: 'CTCStructure.CTCMasterBasic' },
    { header: 'Bonus', field: 'CTCStructure.CTCMasterBonus' },
    { header: 'Car Allowance', field: 'CTCStructure.CTCMasterCarAllowance' },
    {
      header: 'City Compensatory Allowance',
      field: 'CTCStructure.CTCMasterCityCompensatoryAlowance',
    },
    { header: 'Conv Allowance', field: 'CTCStructure.CTCMasterConvAllowance' },
    { header: 'DA', field: 'CTCStructure.CTCMasterDA' },
    { header: 'Driver Allowance', field: 'CTCStructure.CTCMasterDriverAllowance' },
    { header: 'ESIC', field: 'CTCStructure.CTCMasterEsic' },
    { header: 'Fuel Allowance', field: 'CTCStructure.CTCMasterFuelAllowance' },
    { header: 'Gratuity', field: 'CTCStructure.CTCMasterGraduity' },
    { header: 'Gross', field: 'CTCStructure.CTCMasterGross' },
    { header: 'HRA', field: 'CTCStructure.CTCMasterHRA' },
    { header: 'Leave Travel Allowance', field: 'CTCStructure.CTCMasterLeaveTravelAllowance' },
    { header: 'MLWF', field: 'CTCStructure.CTCMasterMLWF' },
    { header: 'Medical Insurance', field: 'CTCStructure.CTCMasterMedicalInsurance' },
    { header: 'Misc Allowance', field: 'CTCStructure.CTCMasterMiscAllowance' },
    { header: 'PF Employee', field: 'CTCStructure.CTCMasterPFEmployee' },
    { header: 'PF Employer', field: 'CTCStructure.CTCMasterPFEmployer' },
    { header: 'PT', field: 'CTCStructure.CTCMasterPT' },
    { header: 'Performance KPA', field: 'CTCStructure.CTCMasterPerformanceKPA' },

    // --- Designations (CORRECTED - using flattened fields) ---
    { header: 'Designation Code', field: 'DesignationCode' },
    { header: 'Designation Name', field: 'DesignationName' },
    { header: 'Qualification Name', field: 'QualificationName' },
    {
      header: 'Designation Description',
      field: 'DesignationDescription',
      minWidth: 350,
      width: '350px',
    },
    {
      header: 'Grade Qualification Remark',
      field: 'GradeQualificationRemark',
      minWidth: 350,
      width: '350px',
    },
    { header: 'Required Skills', field: 'RequiredSkills', minWidth: 350, width: '350px' },
    { header: 'Designation Remark', field: 'DesignationRemark', minWidth: 350, width: '350px' },

    // --- Facility Assignments (array, show facility names joined) ---
    {
      header: 'Facility Names',
      field: 'FacilityAssignments',
      minWidth: 450,
      width: '450px',
      formatter: (row: any) => row.FacilityAssignments?.map((f: any) => f.FacilityName).join(', '),
    },

    // --- Action buttons (Edit/Delete) ---
    {
      header: 'Actions',
      field: 'action',
      minWidth: 140,
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('edit'),
          click: (record: any) => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('confirm_delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('close'),
            okText: this.translate.stream('ok'),
          },
          click: (record: any) => this.delete(record),
        },
      ],
    },
  ];

  loadAllGradeCtcDesignationFacility(): void {
    this.gradeDesignationFacilityService.getAllGradeCtcDesignationFacility().subscribe({
      next: (data: any) => {
        console.log('Grade Designation Facility Ctc details', data);
        const records = Array.isArray(data) ? data : [data];
        let expandedList: any[] = [];
        let snoCounter = 1;

        records.forEach((item: any) => {
          const designations = item.Designations || [];

          if (designations.length === 0) {
            // No designations - add row with empty designation fields
            expandedList.push({
              ...item,
              SNo: snoCounter++,
              DesignationCode: '',
              DesignationName: '',
              QualificationName: '',
              DesignationDescription: '',
              RequiredSkills: '',
              GradeQualificationRemark: '',
              DesignationRemark: '',
            });
          } else {
            // Multiple designations - create separate row for each
            designations.forEach((designation: any, designationIndex: number) => {
              expandedList.push({
                ...item,
                SNo: snoCounter++,
                // Add designation indicator for multiple designations
                GradeName:
                  designationIndex > 0
                    ? `${item.GradeName} (${designationIndex + 1})`
                    : item.GradeName,

                // Flatten designation fields
                DesignationCode: designation.DesignationCode || '',
                DesignationName: designation.DesignationName || '',
                QualificationName: designation.QualificationName || '',
                DesignationDescription: designation.DesignationDescription || '',
                RequiredSkills: designation.RequiredSkills || '',
                GradeQualificationRemark: designation.GradeQualificationRemark || '',
                DesignationRemark: designation.DesignationRemark || '',
              });
            });
          }
        });

        this.list = expandedList;
      },
    });
  }

  edit(record: any) {
    console.log('Edit Grade', record);
    // Open dialog, pass in the record
    this.dialog
      .open(AddEditGradedesignationfacilityassignment, {
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { grade: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          debugger;
          console.table('result', result);
          this.gradeDesignationFacilityService
            .updateAllGradeCtcDesignationFacility(result.data)
            .subscribe({
              next: res => {
                console.log('Grade and its details updated successfully', res);
                this.toastService.showSuccess(`Grade and its details updated successfully`);
                this.loadAllGradeCtcDesignationFacility();
              },
              error: err => {
                console.log('Error updating Grade and its details:', err); // Debug log
              },
            });
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditGradedesignationfacilityassignment, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}, // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.table('result', result);
        this.gradeDesignationFacilityService.creatGradeDesignationFacility(result.data).subscribe({
          next: res => {
            console.log('Grade and its details added successfully:', res);
            this.toastService.showSuccess(`Grade and its details added successfully!`);
            this.loadAllGradeCtcDesignationFacility();
          },
          error: err => {
            console.log('Error object:', err); // Debug log
          },
        });
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(record: any): void {
    console.log('Saving record:', record);
    this.closeDialog();
  }

  delete(value: any) {
    debugger;
    console.log('Deleting record:', value);
    this.gradeDesignationFacilityService.deleteGrade(value.GradeId).subscribe({
      next: res => {
        console.log('Grade deleted successfully:', res);
        this.toastService.showSuccess(`Grade deleted successfully!`);
        this.loadAllGradeCtcDesignationFacility();
      },
      error: err => {
        console.error('Error deleting grade:', err);
        this.toastService.showError('Failed to delete grade. Please try again.');
        this.loadAllGradeCtcDesignationFacility();
      },
    });
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
