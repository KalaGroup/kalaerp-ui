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
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';

import { Toastservice } from 'app/routes/toastservice';
import { AddEditFacility } from './add-edit-facility/add-edit-facility';

import { IFacilityMaster } from '@shared/interfaces/hr/facility';
import { facilityservices } from '@shared/services/hr/facilityservice.ts/facilityservice';

@Component({
  selector: 'app-facilitymaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './facilitymaster.html',
  styleUrl: './facilitymaster.scss'
})
export class Facilitymaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  Facility: IFacilityMaster[] = [];
  showForm = false;
  facilityModel: any = {};
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
    private Facilityservices: facilityservices,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.getAllFacility();
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
    },
    {
      header: this.translate.stream('Facility Code'),
      field: 'FaciltyCode',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Facility Name'),
      field: 'FacilityName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'FacilityRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Authorized'),
      field: 'FacilityAuth',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Discarded'),
      field: 'FacilityIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Active'),
      field: 'FacilityIsActive',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Action'),
      field: 'action',
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

  getAllFacility() {
    this.Facilityservices.getAllFacility().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
      },
      error: (err) => {
        console.error('Error fetching facilities:', err);
      }
    });
  }



  edit(record: IFacilityMaster) {
    this.dialog.open(AddEditFacility, {
      width: '50%',
      height: '50%',
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: { facility: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('facility Updated:', result);
          return;
        }
        const updatePayload: IFacilityMaster = {
          FacilityId: record.FacilityId,
          FaciltyCode: result.FaciltyCode,
          FacilityName: result.FacilityName,
          FacilityRemark: result.FacilityRemark,
          FacilityAuth: result.FacilityAuth,
          FacilityIsDiscard: false,
          FacilityIsActive: result.FacilityIsActive,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: new Date()
        };
        console.log('Update payload:', updatePayload);
        this.Facilityservices.updateFacility(updatePayload).subscribe({
          next: () => {

            this.toastService.showSuccess("Updating Facility Successfully");
            this.getAllFacility();
          },
          error: (err) => {
            console.error('Error updating facility:', err);
          }
        });
      });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditFacility, {
      width: '50%',
      height: '50%',
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload: IFacilityMaster = {
          FacilityId: 0,
          FaciltyCode: result.FaciltyCode,
          FacilityName: result.FacilityName,
          FacilityRemark: result.FacilityRemark,
          FacilityAuth: result.FacilityAuth,
          FacilityIsDiscard: false,
          FacilityIsActive: result.FacilityIsActive,
          CreatedBy: 1, // Set appropriately
          CreatedDate: new Date()
        };

        this.Facilityservices.insertFacility(payload).subscribe({
          next: () => {

            this.toastService.showSuccess("Added Facility Successfully");
            this.getAllFacility();
          },
          error: (err) => {
            console.error('Error while adding facility:', err);
          }
        });
      }
    });
  }

  delete(value: any) {
    this.Facilityservices.deleteFacility(value.FacilityId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        this.toastService.showSuccess;

        this.toastService.showSuccess("delete facility Successfully");
        this.getAllFacility();
      },
      error: (err) => {
        console.error('Error deleting Faciltiy:', err);
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
