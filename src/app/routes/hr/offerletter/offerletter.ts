import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
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
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import { AddEditOfferletter } from './add-edit-offerletter/add-edit-offerletter';
import { Offerletter as offerLetterService } from '@shared/services/hr/offerletter/offerletter';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-offerletter',
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
  ],
  templateUrl: './offerletter.html',
  styleUrl: './offerletter.scss',
})
export class Offerletter {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  @ViewChild('offerLetterPreviewTemplate') offerLetterPreviewTemplate!: TemplateRef<any>;
  previewDialogRef!: MatDialogRef<any>;
  selectedOfferLetter: any = null;

  //countries: ICompany[] = [];
  showForm = false;
  countryModel: any = {};
  editIndex: number | null = null;

  multiSelectable = true;
  rowSelectable = false;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = true;
  rowStriped = true;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private offerletterService: offerLetterService,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {}
  ngOnInit(): void {
    this.loadAllOfferLetters();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 60,
      width: '60px',
    },
    {
      header: this.translate.stream('Offer Letter ID'),
      field: 'OfferLetterId',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Position'),
      field: 'PositionMasterName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Candidate Name'),
      field: 'RecruitmentMasterNameOfCandidates',
      sortable: true,
      minWidth: 180,
      width: '180px',
    },
    {
      header: this.translate.stream('Joining Date'),
      field: 'OfferLetterJoinindate',
      sortable: true,
      minWidth: 130,
      width: '130px',
      type: 'date',
      typeParameter: {
        format: 'dd/MM/yyyy',
      },
    },
    {
      header: this.translate.stream('Basic Salary'),
      field: 'OfferLetterBasic',
      sortable: true,
      minWidth: 120,
      width: '120px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('Gross Salary'),
      field: 'OfferLetterGross',
      sortable: true,
      minWidth: 120,
      width: '120px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('DA'),
      field: 'OfferLetterDa',
      sortable: true,
      minWidth: 100,
      width: '100px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('HRA'),
      field: 'OfferLetterHra',
      sortable: true,
      minWidth: 100,
      width: '100px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('Conv Allowance'),
      field: 'OfferLetterConvAllowance',
      sortable: true,
      minWidth: 120,
      width: '120px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('PF Employee'),
      field: 'OfferLetterPfemployee',
      sortable: true,
      minWidth: 110,
      width: '110px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('PF Employer'),
      field: 'OfferLetterPfemployer',
      sortable: true,
      minWidth: 110,
      width: '110px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('Medical Insurance'),
      field: 'OfferLetterMedicalInsurance',
      sortable: true,
      minWidth: 130,
      width: '130px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('Performance KPA'),
      field: 'OfferLetterPerformanceKpa',
      sortable: true,
      minWidth: 120,
      width: '120px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('Bonus'),
      field: 'OfferLetterBonus',
      sortable: true,
      minWidth: 100,
      width: '100px',
      type: 'number',
      typeParameter: {
        digitsInfo: '1.0-2',
      },
    },
    {
      header: this.translate.stream('Level 1 Auth'),
      field: 'OfferLetterAuth1',
      sortable: true,
      minWidth: 100,
      width: '100px',
      type: 'tag',
      tag: {
        true: { text: 'Authorized', color: 'green-100' },
        false: { text: 'Pending', color: 'red-100' },
      },
    },
    {
      header: this.translate.stream('Level 2 Auth'),
      field: 'OfferLetterAuth2',
      sortable: true,
      minWidth: 100,
      width: '100px',
      type: 'tag',
      tag: {
        true: { text: 'Authorized', color: 'green-100' },
        false: { text: 'Pending', color: 'red-100' },
      },
    },
    {
      header: this.translate.stream('Level 3 Auth'),
      field: 'OfferLetterAuth3',
      sortable: true,
      minWidth: 100,
      width: '100px',
      type: 'tag',
      tag: {
        true: { text: 'Authorized', color: 'green-100' },
        false: { text: 'Pending', color: 'red-100' },
      },
    },
    {
      header: this.translate.stream('Status'),
      field: 'OfferLetterIsActive',
      sortable: true,
      minWidth: 100,
      width: '100px',
      type: 'tag',
      tag: {
        true: { text: 'Active', color: 'green-100' },
        false: { text: 'Inactive', color: 'red-100' },
      },
    },
    {
      header: this.translate.stream('Remarks'),
      field: 'OfferLetterRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Created Date'),
      field: 'CreatedDate',
      sortable: true,
      minWidth: 140,
      width: '140px',
      type: 'date',
      typeParameter: {
        format: 'dd/MM/yyyy HH:mm',
      },
    },
    {
      header: this.translate.stream('Action'),
      field: 'action',
      minWidth: 200,
      width: '200px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'visibility',
          tooltip: this.translate.stream('view'),
          color: 'primary',
          click: (record: any) => this.preview(record),
        },
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('edit'),
          color: 'accent',
          click: (record: any) => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('delete'),
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

  loadAllOfferLetters() {
    this.offerletterService.getAllOfferLetters().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => {
          // Extract CTC data from nested array (assuming first element)
          const ctcData =
            item.OfferLetterCtcs && item.OfferLetterCtcs[0] ? item.OfferLetterCtcs[0] : {};

          return {
            // Add serial number
            SNo: index + 1,

            // Main offer letter fields
            OfferLetterId: item.OfferLetterId,
            PositionMasterName: item.PositionMasterName,
            RecruitmentMasterNameOfCandidates: item.RecruitmentMasterNameOfCandidates,
            OfferLetterJoinindate: item.OfferLetterJoinindate,
            OfferLetterRemark: item.OfferLetterRemark,
            OfferLetterAuth1: item.OfferLetterAuth1,
            OfferLetterAuth1Remark: item.OfferLetterAuth1Remark,
            OfferLetterAuth2: item.OfferLetterAuth2,
            OfferLetterAuth2Remark: item.OfferLetterAuth2Remark,
            OfferLetterAuth3: item.OfferLetterAuth3,
            OfferLetterAuth3Remark: item.OfferLetterAuth3Remark,
            OfferLetterIsActive: item.OfferLetterIsActive,
            OfferLetterIsDiscard: item.OfferLetterIsDiscard,
            // CreatedBy: item.CreatedBy,
            CreatedDate: item.CreatedDate,
            // UpdatedBy: item.UpdatedBy,
            // UpdatedDate: item.UpdatedDate,

            // Flattened CTC data from nested OfferLetterCtcs array
            OfferLetterBasic: ctcData.OfferLetterBasic || 0,
            OfferLetterDa: ctcData.OfferLetterDa || 0,
            OfferLetterHra: ctcData.OfferLetterHra || 0,
            OfferLetterConvAllowance: ctcData.OfferLetterConvAllowance || 0,
            OfferLetterCityCompensatoryAlowance: ctcData.OfferLetterCityCompensatoryAlowance || 0,
            OfferLetterLeaveTravelAllowance: ctcData.OfferLetterLeaveTravelAllowance || 0,
            OfferLetterCarAllowance: ctcData.OfferLetterCarAllowance || 0,
            OfferLetterFuelAllowance: ctcData.OfferLetterFuelAllowance || 0,
            OfferLetterDriverAllowance: ctcData.OfferLetterDriverAllowance || 0,
            OfferLetterMiscAllowance: ctcData.OfferLetterMiscAllowance || 0,
            OfferLetterGross: ctcData.OfferLetterGross || 0,
            OfferLetterPt: ctcData.OfferLetterPt || 0,
            OfferLetterEsic: ctcData.OfferLetterEsic || 0,
            OfferLetterPfemployee: ctcData.OfferLetterPfemployee || 0,
            OfferLetterPfemployer: ctcData.OfferLetterPfemployer || 0,
            OfferLetterMedicalInsurance: ctcData.OfferLetterMedicalInsurance || 0,
            OfferLetterPerformanceKpa: ctcData.OfferLetterPerformanceKpa || 0,
            OfferLetterGraduity: ctcData.OfferLetterGraduity || 0,
            OfferLetterBonus: ctcData.OfferLetterBonus || 0,
            OfferLetterMlwf: ctcData.OfferLetterMlwf || 0,

            // Keep original nested structure if needed elsewhere
            OfferLetterCtcs: item.OfferLetterCtcs,
          };
        });
        console.log('Fetched Offer letters with flattened CTC data:', this.list);
      },
      error: err => {
        console.error('Error fetching offer letters:', err);
      },
    });
  }

  edit(record: any) {
    // Open dialog, pass in the record
    this.dialog
      .open(AddEditOfferletter, {
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { offerLetter: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          const updatePayload = {
            CreatedBy: result.CreatedBy,
            CreatedDate: result.CreatedDate,
            OfferLetterId: record.OfferLetterId,
            OfferLetterAuth1: result.OfferLetterAuth1,
            OfferLetterAuth1Remark: result.OfferLetterAuth1Remark,
            OfferLetterAuth2: result.OfferLetterAuth2,
            OfferLetterAuth2Remark: result.OfferLetterAuth2Remark,
            OfferLetterAuth3: result.OfferLetterAuth3,
            OfferLetterAuth3Remark: result.OfferLetterAuth3Remark,
            OfferLetterIsActive: result.OfferLetterIsActive,
            OfferLetterIsDiscard: result.OfferLetterIsDiscard,
            OfferLetterJoinindate: result.OfferLetterJoinindate,
            OfferLetterPositionId: result.OfferLetterPositionId,
            OfferLetterRecruitmentId: result.OfferLetterRecruitmentId,
            OfferLetterRemark: result.OfferLetterRemark,
            UpdatedBy: result.UpdatedBy,
            UpdatedDate: result.UpdatedDate,
            offerLetterCtcs: result.offerLetterCtcs,
          };
          console.log('Updated offer letter data:', updatePayload);
          this.offerletterService.updateOfferLetter(updatePayload).subscribe({
            next: res => {
              console.log('Offer Letter updated successfully:', res);
              this.loadAllOfferLetters();
              this.toastService.showSuccess('Offer Letter updated successfully');
            },
            error: err => {
              this.loadAllOfferLetters();
              console.error('Error updating offer letter:', err);
            },
          });
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditOfferletter, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}, // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New company added:', result);

        this.offerletterService.insertOfferLetter(result).subscribe({
          next: res => {
            console.log('Offer Letter Generated successfully:', res);
            this.loadAllOfferLetters();
            this.toastService.showSuccess('Offer Letter Generated successfully');
          },
          error: err => {
            this.loadAllOfferLetters();
            console.error('Error generating offer letter:', err);
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
    console.log('Deleting record:', value);
    const offerletterId = value.OfferLetterId;
    if (!offerletterId) {
      this.toastService.showError('Invalid Offer Letter ID');
      return;
    }
    this.offerletterService.deleteOfferLetter(offerletterId).subscribe({
      next: res => {
        console.log('Offer Letter deleted successfully:', res);
        this.toastService.showSuccess('Offer Letter deleted successfully');
        this.loadAllOfferLetters();
      },
      error: err => {
        this.loadAllOfferLetters();
        console.error('Error deleting offer letter:', err);
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

  preview(record: any): void {
    console.log('Previewing offer letter:', record);
    this.selectedOfferLetter = record;

    this.previewDialogRef = this.dialog.open(this.offerLetterPreviewTemplate, {
      maxWidth: '95vw',
      maxHeight: '100vh',
      panelClass: 'offer-letter-preview-dialog',
      disableClose: false,
      autoFocus: false,
    });
  }

  // 3. Add these helper methods for the preview dialog
  calculateTotalCTC(data: any): number {
    const earnings = [
      'OfferLetterBasic',
      'OfferLetterDa',
      'OfferLetterHra',
      'OfferLetterConvAllowance',
      'OfferLetterCityCompensatoryAlowance',
      'OfferLetterLeaveTravelAllowance',
      'OfferLetterCarAllowance',
      'OfferLetterFuelAllowance',
      'OfferLetterDriverAllowance',
      'OfferLetterMiscAllowance',
      'OfferLetterPerformanceKpa',
      'OfferLetterBonus',
    ];

    const employerContributions = [
      'OfferLetterPfemployer',
      'OfferLetterMedicalInsurance',
      'OfferLetterGraduity',
    ];

    let totalEarnings = 0;
    let totalEmployerContributions = 0;

    earnings.forEach(field => {
      totalEarnings += parseFloat(data[field]) || 0;
    });

    employerContributions.forEach(field => {
      totalEmployerContributions += parseFloat(data[field]) || 0;
    });

    return totalEarnings + totalEmployerContributions;
  }

  calculateTakeHomeSalary(data: any): number {
    const gross = parseFloat(data.OfferLetterGross) || 0;
    const deductions = [
      parseFloat(data.OfferLetterPt) || 0,
      parseFloat(data.OfferLetterEsic) || 0,
      parseFloat(data.OfferLetterPfemployee) || 0,
      parseFloat(data.OfferLetterMlwf) || 0
    ];

    const totalDeductions = deductions.reduce((sum, deduction) => sum + deduction, 0);
    return gross - totalDeductions;
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB');
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  //  generateKalaOfferLetterPDF(): void {
  //   if (!this.selectedOfferLetter) return;

  //   const doc = new jsPDF();
  //   const data = this.selectedOfferLetter;

  //   // Page margins
  //   const margin = 20;
  //   const pageWidth = doc.internal.pageSize.width;
  //   const pageHeight = doc.internal.pageSize.height;
  //   let yPosition = margin;

  //   // Company Header with dark background
  //   doc.setFillColor(52, 58, 64);
  //   doc.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'F');

  //   doc.setTextColor(255, 255, 255);
  //   doc.setFontSize(16);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('KALA Genset Pvt. Ltd.', pageWidth / 2, yPosition + 10, { align: 'center' });

  //   doc.setFontSize(8);
  //   doc.setFont('helvetica', 'normal');
  //   doc.text('CIN No.: U90000MH1997PTC112368', pageWidth / 2, yPosition + 16, { align: 'center' });
  //   doc.text('GST No.: 27AAACK6784C1ZH', pageWidth / 2, yPosition + 21, { align: 'center' });

  //   yPosition += 35;

  //   // Reset text color
  //   doc.setTextColor(0, 0, 0);

  //   // Reference and Date row
  //   doc.setFontSize(10);
  //   doc.setFont('helvetica', 'bold');
  //   doc.text(`Ref No: KGPL/HR/25-26/${data.OfferLetterId.toString().padStart(8, '0')}`, margin, yPosition);
  //   doc.text(`Date: ${this.formatDate(data.CreatedDate)}`, pageWidth - margin - 30, yPosition);
  //   yPosition += 15;

  //   // To section
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('To,', margin, yPosition);
  //   yPosition += 8;
  //   doc.setFont('helvetica', 'normal');
  //   doc.text(`${data.RecruitmentMasterNameOfCandidates}`, margin, yPosition);
  //   yPosition += 6;
  //   doc.text('Pune, Maharashtra', margin, yPosition);
  //   yPosition += 15;

  //   // Subject
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Sub: Offer Letter', pageWidth / 2, yPosition, { align: 'center' });
  //   yPosition += 15;

  //   // Letter body
  //   doc.setFont('helvetica', 'normal');
  //   doc.setFontSize(10);

  //   const letterText = [
  //     `Dear ${data.RecruitmentMasterNameOfCandidates},`,
  //     '',
  //     `With reference to your application and subsequent interview you had with us, we are pleased to offer you as "${data.PositionMasterName}" in our organization.`,
  //     '',
  //     `Your CTC (Cost To Company) will be Rs. ${this.formatCurrency(this.calculateTotalCTC(data) / 12)} per month. Details of the same are mentioned below:`,
  //     '',
  //     'The terms and conditions of employment will remain same as mutually agreed between you and the management of this company at the time of interview.',
  //     '',
  //     'You will be on probation for a period of 6 months.',
  //     'Leave will be applicable after 6 months from date of joining with continuous service.',
  //     '',
  //     `You are requested to join on or before ${this.formatDate(data.OfferLetterJoinindate)}. On joining, you are required to come with your educational certificates, 2 nos. passport size photographs, previous experience certificates & relieving letter etc at the time of joining.`,
  //     '',
  //     'Kindly return duplicate copy of this letter duly signed as acceptance of employment offer within next 7 working days.',
  //     '',
  //     'If Duplicate copy is not received within stipulated time this offer letter will stands cancelled.'
  //   ];

  //   letterText.forEach(line => {
  //     if (line === '') {
  //       yPosition += 4;
  //     } else {
  //       const splitText = doc.splitTextToSize(line, pageWidth - 2 * margin);
  //       doc.text(splitText, margin, yPosition);
  //       yPosition += splitText.length * 5;
  //     }
  //   });

  //   // Check if we need a new page for the table
  //   if (yPosition > pageHeight - 100) {
  //     doc.addPage();
  //     yPosition = margin;
  //   }

  //   yPosition += 10;

  //   // CTC Structure heading
  //   doc.setFont('helvetica', 'bold');
  //   doc.setFontSize(12);
  //   doc.text('CTC Structure', pageWidth / 2, yPosition, { align: 'center' });
  //   yPosition += 10;

  //   // Table setup
  //   const tableX = margin;
  //   const tableWidth = pageWidth - 2 * margin;
  //   const col1Width = tableWidth * 0.7;
  //   const col2Width = tableWidth * 0.3;

  //   // Table data matching the original format
  //   const tableData = [
  //     ['Cost To Company (CTC)', 'Amount (Rs.)'],
  //     ['Consolidated Salary', this.formatCurrency(data.OfferLetterBasic || 18000)],
  //     ['House Rent Allowance (H.R.A)', this.formatCurrency(data.OfferLetterHra || 0)],
  //     ['Conveyance', this.formatCurrency(data.OfferLetterConvAllowance || 0)],
  //     ['Education', '0'],
  //     ['City Compensatory Allowances (CCA)', this.formatCurrency(data.OfferLetterCityCompensatoryAlowance || 0)],
  //     ['Miscellaneous', this.formatCurrency(data.OfferLetterMiscAllowance || 0)],
  //     ['Gross Amount', this.formatCurrency(data.OfferLetterGross || 18000)],
  //     ['Employee Provident Fund (P.F)', this.formatCurrency(data.OfferLetterPfemployee || 0)],
  //     ['Professional Tax (P.T)', this.formatCurrency(data.OfferLetterPt || 200)],
  //     ['Employee ESIC', this.formatCurrency(data.OfferLetterEsic || 135)],
  //     ['Take Home Salary', this.formatCurrency(this.calculateTakeHomeSalary(data))],
  //     ['Employer ESIC', this.formatCurrency(data.OfferLetterPfemployer || 585)],
  //     ['Employer Provident Fund', '0'],
  //     ['Exgratia', '0'],
  //     ['Leave Traveling Allowances (LTA)', this.formatCurrency(data.OfferLetterLeaveTravelAllowance || 0)],
  //     ['Medical Reimbursement', this.formatCurrency(data.OfferLetterMedicalInsurance || 0)],
  //     ['Bonus', this.formatCurrency(data.OfferLetterBonus || 450)],
  //     ['Gratuity', this.formatCurrency(data.OfferLetterGraduity || 866)],
  //     ['Canteen', '2,860'],
  //     ['Mobile Limit', '353'],
  //     ['Uniform', '200'],
  //     ['Mediclaim', '0'],
  //     ['Performance Incentive', this.formatCurrency(data.OfferLetterPerformanceKpa || 0)],
  //     ['Cost To Company Per Month (CTC PM)', this.formatCurrency(this.calculateTotalCTC(data) / 12)],
  //     ['Cost To Company Per Annum (CTC PA)', this.formatCurrency(this.calculateTotalCTC(data))]
  //   ];

  //   // Draw table
  //   doc.setFontSize(9);
  //   let rowHeight = 7;

  //   tableData.forEach((row, index) => {
  //     // Check if we need a new page
  //     if (yPosition + rowHeight > pageHeight - margin) {
  //       doc.addPage();
  //       yPosition = margin;
  //     }

  //     // Header row styling
  //     if (index === 0) {
  //       doc.setFillColor(245, 245, 245);
  //       doc.rect(tableX, yPosition - 2, tableWidth, rowHeight, 'F');
  //       doc.setFont('helvetica', 'bold');
  //     } else {
  //       doc.setFont('helvetica', 'normal');
  //     }

  //     // Draw borders
  //     doc.rect(tableX, yPosition - 2, col1Width, rowHeight);
  //     doc.rect(tableX + col1Width, yPosition - 2, col2Width, rowHeight);

  //     // Add text
  //     doc.text(row[0], tableX + 3, yPosition + 3);
  //     doc.text(row[1], tableX + col1Width + col2Width - 5, yPosition + 3, { align: 'right' });

  //     yPosition += rowHeight;
  //   });

  //   yPosition += 15;

  //   // Closing section
  //   doc.setFont('helvetica', 'bold');
  //   doc.text('Thanking you,', margin, yPosition);
  //   yPosition += 15;
  //   doc.text('For Kala Genset Pvt Ltd.', margin, yPosition);
  //   yPosition += 25;

  //   // Signature section with seal representation
  //   // doc.circle(pageWidth - 60, yPosition, 15, 'S');
  //   // doc.setFontSize(6);
  //   // doc.text('KALA GENSET', pageWidth - 60, yPosition - 2, { align: 'center' });
  //   // doc.text('PVT. LTD.', pageWidth - 60, yPosition + 2, { align: 'center' });
  //   // doc.text('PUNE', pageWidth - 60, yPosition + 6, { align: 'center' });

  //   yPosition += 20;
  //   doc.setFontSize(10);
  //   doc.text('Authorized Signatory', pageWidth - 60, yPosition, { align: 'center' });

  //   // Footer address
  //   yPosition = pageHeight - 25;
  //   doc.setFontSize(6);
  //   doc.setFont('helvetica', 'normal');
  //   const footerText = [
  //     'Regd. Address: Gat No. 392/1, Mahalunge Ingale, Khed, Pune, Maharashtra 410501',
  //     'Head Office: A-37, H Block, MIDC, Pimpri, Pune - 411018, Maharashtra, India',
  //     'Tel: 020-2724 1881 / 020 2724 2212  Toll Free: 1800 123 0018',
  //     'Website: www.kalabiz.com | Email: kalagenset@kalabiz.com'
  //   ];

  //   footerText.forEach(line => {
  //     doc.text(line, pageWidth / 2, yPosition, { align: 'center' });
  //     yPosition += 3;
  //   });

  //   // Save the PDF
  //   doc.save(`Offer-Letter-${data.RecruitmentMasterNameOfCandidates}-${data.OfferLetterId}.pdf`);
  //   this.toastService.showSuccess('PDF downloaded successfully');
  // }

  printOfferLetter(): void {
    window.print();
  }


  // downloadPDF(): void {
    // this.generateKalaOfferLetterPDF();
  // }

  closePreviewDialog(): void {
    this.previewDialogRef.close();
    this.selectedOfferLetter = null;
  }

}
