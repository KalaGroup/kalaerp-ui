import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule }   from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Responsibilitiesmstservice } from '@shared/services/hr/ResponsibilitiesMaster/responsibilitiesmstservice';
import{IResponsibilities} from '@shared/interfaces/hr/responsibilitiesmaster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { AddEditResponsibilities } from './add-edit-responsibilities/add-edit-responsibilities';
import { Toastservice } from 'app/routes/toastservice';

@Component({
  selector: 'app-responsibilitiesmaster',
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
  templateUrl: './responsibilitiesmaster.html',
  styleUrl: './responsibilitiesmaster.scss',
})
export class Responsibilitiesmaster {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
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
  list: any[] = [];
  isConfigExpanded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private responsibilitiesmstService: Responsibilitiesmstservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {}
  ngOnInit(): void {
     this.loadAllResponsibilities();
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
      header: this.translate.stream('Responsibilities Grade Name'),
      field: 'ResponsibilitiesGradeName',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Responsibilities Designation Name'),
      field: 'ResponsibilitiesDesignationName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Responsibilities Division Name'),
      field: 'ResponsibilitiesDivisionName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Responsibilities Remark'),
      field: 'ResponsibilitiesRemark',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
     {
      header: this.translate.stream('Responsibilities Type'),
      field: 'ResponsibilitiesType',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('IsActive'),
      field: 'ResponsibilitiesIsActive',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
     {
      header: this.translate.stream('IsAuth'),
      field: 'ResponsibilitiesAuth',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('IsDiscard'),
      field: 'ResponsibilitiesIsDiscard',
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
          click: (record: IResponsibilities) => this.edit(record),
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

  loadAllResponsibilities() {
    this.responsibilitiesmstService.getAllResponsibilities().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched responsibilities with S.No:', this.list);
      },
      error: (err) => {
        console.error('Error fetching responsibilities:', err);
      }
    });
  }

  edit(record: any) {
    debugger
    // Open dialog, pass in the record
    this.dialog.open(AddEditResponsibilities, {
      width: '75%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { responsibilities: record },
    }).afterClosed().subscribe(result => {
      if (result) {
        debugger
        const payload = {
          ResposibilitiesId: record.ResponsibilitiesId,
          ResposibilitiesGradeId: result.GradeID,
          ResposibilitiesDesignationId: result.DesignationID,
          ResponsibilitiesDivisionId: result.DivisionID,
          ResposibilitiesRemark: result.responsibilitiesRemark,
          ResposibilitiesType: result.responsibilitiesType,
          ResposibilitiesAuthRemark: result.responsibilitiesAuthRemark,
          ResposibilitiesIsActive: result.responsibilitiesIsActive,
          ResposibilitiesAuth: result.responsibilitiesAuth,
          ResposibilitiesIsDiscard: result.responsibilitiesIsDiscard,
        };
        this.responsibilitiesmstService.updateResponsibilities(payload).subscribe({
          next: (res) => {
            console.log('Responsibilities updated successfully:', res);
            this.toastService.showSuccess(`Responsibilities updated successfully!`);
            this.loadAllResponsibilities();
          },
          error: (err) => {
            console.error('Error updating responsibilities:', err);
            this.toastService.showError('Failed to update responsibilities. Please try again.');
             this.loadAllResponsibilities();
          }
        });
      }
    });
  }

   openAddDialog() {
    const dialogRef = this.dialog.open(AddEditResponsibilities, {
      width: '75%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger
       const payload = {
          ResposibilitiesGradeId: result.GradeID,
          ResposibilitiesDesignationId: result.DesignationID,
          ResponsibilitiesDivisionId: result.DivisionID,
          ResposibilitiesRemark: result.responsibilitiesRemark,
          ResposibilitiesType: result.responsibilitiesType,
          ResposibilitiesAuthRemark: result.responsibilitiesAuthRemark,
          ResposibilitiesIsActive: result.responsibilitiesIsActive,
          ResposibilitiesAuth: result.responsibilitiesAuth,
          ResposibilitiesIsDiscard: result.responsibilitiesIsDiscard,
      };
        this.responsibilitiesmstService.insertResponsibilities(payload).subscribe({
          next: (res) => {
            console.log('Responsibilities added successfully:', res);
            this.toastService.showSuccess(`Responsibilities added successfully!`);
            this.loadAllResponsibilities();
          },
          error: (err) => {
            console.error('Error adding responsibilities:', err);
            this.toastService.showError('Failed to add responsibilities. Please try again.');
             this.loadAllResponsibilities();
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
     debugger
      console.log('Deleting record:', value);
      this.responsibilitiesmstService.deleteResponsibilities(value.ResponsibilitiesId).subscribe({
        next: (res) => {
          console.log('Responsibilities deleted successfully:', res);
          this.toastService.showSuccess(`Responsibilities deleted successfully!`);
          this.loadAllResponsibilities();
        },
        error: (err) => {
          console.error('Error deleting responsibilities:', err);
          this.toastService.showError('Failed to delete responsibilities. Please try again.');
           this.loadAllResponsibilities();
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
