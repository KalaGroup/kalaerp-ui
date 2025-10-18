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
import { Toastservice } from 'app/routes/toastservice';
import { classoftravelservice } from '@shared/services/hr/classoftravel/classoftravelservice';
import { Iclassoftravelmaster } from '@shared/interfaces/hr/classoftravel';
import { AddEditClass } from './add-edit-class/add-edit-class';


@Component({
  selector: 'app-classoftravelmaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './classoftravelmaster.html',
  styleUrl: './classoftravelmaster.scss'
})
export class Classoftravelmaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  classoftravelmaster: any[] = [];
  showForm = false;
  classoftravelModel: any = {};
  editIndex: number | null = null;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = true;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;

  constructor(private fb: FormBuilder, private ClassofTravelService: classoftravelservice, private dialog: MatDialog, private toastService: Toastservice) { }
  ngOnInit(): void {
    this.loadAllClassoftravel();
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
      header: this.translate.stream('ClassOfTravel Code'),
      field: 'ClassOfTravelCode',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('ClassOfTravel Name'),
      field: 'ClassOfTravelName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('GradeName '),
      field: 'GradeName',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('DafoodAllowancePerday '),
      field: 'DafoodAllowancePerday',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('ClassOfTravelTierType '),
      field: 'ClassOfTravelTierType',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('ClassOfTravelRemark '),
      field: 'ClassOfTravelRemark',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream(' ClassOfTravelIsAuth'),
      field: 'ClassOfTravelIsAuth',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream(' ClassOfTravelIsDiscard'),
      field: 'ClassOfTravelIsDiscard',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream(' ClassOfTravelIsActive'),
      field: 'ClassOfTravelIsActive',
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

  loadAllClassoftravel() {
    this.ClassofTravelService.getAllClassOftravel().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched classs with S.No:', this.list);
      },
      error: (err) => {
        console.error('Error fetching class:', err);
      }
    });
  }

  edit(record: Iclassoftravelmaster) { // If you have a Qualification interface, use it here
    this.dialog.open<AddEditClass, { classoftravel: Iclassoftravelmaster }, Iclassoftravelmaster>(AddEditClass, {
      width: '80%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { classoftravel: record },
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('class Updated:', result);
        console.log('Original record CreatedBy:', record.CreatedBy);

        const updatePayload: Iclassoftravelmaster = {
          ClassOfTravelId: record.ClassOfTravelId,
          ClassOfTravelCode: result.ClassOfTravelCode,
          ClassOfTravelName: result.ClassOfTravelName,
          ClassOfTravelGradeId: result.ClassOfTravelGradeId,
          DafoodAllowancePerday: result.DafoodAllowancePerday, // Consistent casing
          ClassOfTravelTierType: result.ClassOfTravelTierType,
          ClassOfTravelRemark: result.ClassOfTravelRemark,
          ClassOfTravelIsAuth: result.ClassOfTravelIsAuth,
          ClassOfTravelIsDiscard: result.ClassOfTravelIsDiscard,
          ClassOfTravelIsActive: result.ClassOfTravelIsActive,
          CreatedBy: record.CreatedBy ?? 1, // fallback user id
          CreatedDate: record.CreatedDate ?? new Date() // fallback date if missing
        };

        console.log('Update payload:', updatePayload);

        this.ClassofTravelService.updateClassOftravel(updatePayload).subscribe({
          next: (response) => {
            this.toastService.showSuccess('class Travel update successfully:', response);

            this.loadAllClassoftravel();
          },
          error: (err) => {
            console.error('Error updating class:', err);
          }
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditClass, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // Empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(' class data:', result);
        const payload: Iclassoftravelmaster = {
          ClassOfTravelId: 0,
          ClassOfTravelCode: result.ClassOfTravelCode,
          ClassOfTravelName: result.ClassOfTravelName,
          DafoodAllowancePerday: result.DafoodAllowancePerday,
          ClassOfTravelGradeId: result.ClassOfTravelGradeId, // Ensure ID casing is correct
          ClassOfTravelTierType: result.ClassOfTravelTierType,
          ClassOfTravelRemark: result.ClassOfTravelRemark,
          ClassOfTravelIsAuth: result.ClassOfTravelIsAuth ?? true,
          ClassOfTravelIsDiscard: result.ClassOfTravelIsDiscard,
          ClassOfTravelIsActive: result.ClassOfTravelIsActive ?? true,
          CreatedBy: result.CreatedBy,// Replace with actual user ID if available
          CreatedDate: new Date()
        };

        console.log('Payload for adding class:', payload);

        this.ClassofTravelService.insertClassOftravel(payload).subscribe({
          next: (response) => {
            console.log('class added successfully:', response);
            this.loadAllClassoftravel();
            this.toastService.showSuccess('class Travel added successfully:');


          },
          error: (err) => {
            console.error('Error while adding class:', err);
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
    this.ClassofTravelService.deleteClassOftravel(value.ClassOfTravelId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        console.log('class deleted successfully:', response);
        this.loadAllClassoftravel();
        this.toastService.showSuccess('class Travel delete successfully:');

      },
      error: (err) => {
        console.error('Error deleting class:', err);
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
