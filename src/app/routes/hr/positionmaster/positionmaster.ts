import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import { IPositionMaster } from '@shared/interfaces/hr/position';
import { Positionservice } from '@shared/services/hr/position/positionservice';
import { AddEditPosition } from './add-edit-position/add-edit-position';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-positionmaster',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MtxGridModule,
    PageHeader,
    MatDialogModule,
  ],
  templateUrl: './positionmaster.html',
  styleUrl: './positionmaster.scss',
})
export class Positionmaster {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  displayedColumns: string[] = ['srno', 'desc', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  position: IPositionMaster[] = [];
  showForm = false;
  stateModel: any = {};
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
  positionForm: any;

  constructor(
    private fb: FormBuilder,
    private positionService: Positionservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {}
  ngOnInit(): void {
    this.loadAllPosition();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      width: '80px',
      minWidth: 80,
    },
    {
      header: this.translate.stream('Position Name'),
      field: 'PositionMasterName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Position Count'),
      field: 'PositionMasterPositionCount',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Designation'),
      field: 'DesignationName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Department'),
      field: 'DepartmentName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Division'),
      field: 'DivisionName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('ProfitCenter'),
      field: 'ProfitCenterName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Grade'),
      field: 'GradeName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('WorkStation'),
      field: 'WorkStationName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'PositionMasterRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'PositionMasterAuthRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'PositionMasterIsActive',
      width: '120px',
      type: 'tag',
      tag: {
        1: { text: 'Active', color: 'green' },
        0: { text: 'Inactive', color: 'red' },
      },
    },
    {
      header: this.translate.stream('Is Discard'),
      field: 'PositionMasterIsDiscard',
      width: '130px',
      type: 'tag',
      tag: {
        1: { text: 'Discarded', color: 'orange' },
        0: { text: 'Not Discarded', color: 'blue' },
      },
    },
    {
      header: this.translate.stream('Auth'),
      field: 'PositionMasterAuth',
      width: '140px',
      type: 'tag',
      tag: {
        1: { text: 'Authorized', color: 'purple' },
        0: { text: 'Pending', color: 'red' },
      },
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

  loadAllPosition() {
    this.positionService.getAllPosition().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched Position with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching Position:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditPosition, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added Position:', result);
      }
      this.positionService.insertPosition(result).subscribe({
        next: response => {
          this.toastService.showSuccess('Position  added successfully:', response);
          this.loadAllPosition();
        
        },
        error: err => {
          console.error('Error while adding Position:', err);
        },
      });
    });
  }

  edit(record: any) {
    this.dialog
      .open(AddEditPosition, {
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { position: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('Position Updated:', result);
          // Create update payload as per your reqirements
          console.log('Update payload:', result);
          this.positionService.updatePosition(result).subscribe({
            next: response => {
              this.toastService.showSuccess('Position updated successfully:', response);
           
              this.loadAllPosition();
            },
            error: err => {
              console.error('Error updating Position:', err);
              this.loadAllPosition();
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
    this.positionService.deletePosition(value.PositionMasterId).subscribe({
      next: response => {
        this.toastService.showSuccess('Position deleted successfully:', response);
   
        this.loadAllPosition();
      },
      error: err => {
        console.error('Error deleting Position:', err);
        this.loadAllPosition();
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
