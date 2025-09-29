import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { AddEditQualification } from './add-edit-qualification/add-edit-qualification';
import { Toastservice } from 'app/routes/toastservice';
import { qualificationservices } from '@shared/services/hr/qualification/qualificationservice';
import { IQualification } from '@shared/interfaces/hr/qualification';


@Component({
  selector: 'app-qualificationmaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './qualificationmaster.html',
  styleUrl: './qualificationmaster.scss'
})
export class Qualificationmaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  qualificationmaster: any[] = [];
  showForm = false;
  qualificationModel: any = {};
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
  list: any[] = [];
  isConfigExpanded: boolean = false;

  constructor(private fb: FormBuilder, private QualificationServices: qualificationservices, private dialog: MatDialog, private toastService: Toastservice) { }
  ngOnInit(): void {
    this.loadAllQualification();
  }
  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('Qualification Code'),
      field: 'QualificationCode',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Qualification Name'),
      field: 'QualificationName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('QualificationType Name '),
      field: 'QualificationTypeName',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Qualification Authority'),
      field: 'QualificationAuth',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Qualification Remark'),
      field: 'QualificationRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'QualificationIsActive',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Is Discard'),
      field: 'QualificationIsDiscard',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Action'),
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
          tooltip: this.translate.stream('delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('close'),
            okText: this.translate.stream('ok'),
          },
          click: record => this.delete(record),
        },
      ],
    },
  ];
  loadAllQualification() {
    this.QualificationServices.getAllQualification().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched qualification with S.No:', this.list);
      },
      error: (err) => {
        console.error('Error fetching qualification:', err);
      }
    });
  }

  edit(record: IQualification) { // If you have a Qualification interface, use it here
    // debugger; // Remove before production

    this.dialog.open<AddEditQualification, { qualification: IQualification }, IQualification>(AddEditQualification, {
      width: '70%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '90vh',
      data: { qualification: record },
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Qualification Updated:', result);


        const updatePayload: IQualification = {
          QualificationId: record.QualificationId,
          QualificationCode: result.QualificationCode,
          QualificationName: result.QualificationName,
          QualificationAuth: result.QualificationAuth,
          MasterQualificationTypeID: result.MasterQualificationTypeID, // Consistent casing
          QualificationIsActive: result.QualificationIsActive,
          QualificationIsDiscard: result.QualificationIsDiscard,
          QualificationRemark: result.QualificationRemark,
          CreatedBy: record.CreatedBy ?? 1,// fallback user id
          CreatedDate: record.CreatedDate ?? new Date() // fallback date if missing
        };

        console.log('Update payload:', updatePayload);

        this.QualificationServices.updateQualification(updatePayload).subscribe({
          next: (response) => {
            console.log('Qualification updated successfully:', response);
         
            this.toastService.showSuccess("Qualification updated successfully");
            this.loadAllQualification();
          },
          error: (err) => {
            console.error('Error updating Qualification:', err);
            this.toastService.showError('Failed to update Qualification. Please check inputs.');
          }
        });
      }
    });
  }


  //Add New
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditQualification, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // Empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(' Qualification data:', result);
        debugger
        const payload: IQualification = {
          QualificationId: 0,
          QualificationCode: result.QualificationCode,
          QualificationName: result.QualificationName,
          QualificationAuth: result.QualificationAuth,
          MasterQualificationTypeID: result.MasterQualificationTypeID, // Ensure ID casing is correct
          QualificationIsActive: result.QualificationIsActive,
          QualificationRemark: result.QualificationRemark,
          QualificationIsDiscard: result.QualificationIsDiscard,
          CreatedBy: result.CreatedBy,// Replace with actual user ID if available
          CreatedDate: new Date()
        };

        console.log('Payload for adding Qualification:', payload);

        this.QualificationServices.insertQualification(payload).subscribe({
          next: (response) => {
            console.log('Qualification added successfully:', response);
            this.loadAllQualification();
            this.toastService.showSuccess("Qualification added successfully");
           

          },
          error: (err) => {
            console.error('Error while adding Qualification:', err);
            this.toastService.showError('Failed to add Qualification. Please verify the details and try again.');
          }
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

    this.QualificationServices.deleteQualification(value.QualificationId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        console.log('Qualification deleted successfully:', response);
        this.toastService.showSuccess("Qualification delete successfully")
        this.loadAllQualification();
       
      },
      error: (err) => {
        console.error('Error deleting Qualification:', err);
        this.toastService.showError('Failed to delete Qualification. It might be in use.');
      }
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
