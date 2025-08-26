/* eslint-disable @angular-eslint/prefer-inject */
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
import { HrService } from '../hr.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import { Country, Currency } from '@shared/interfaces/hr';
import { AddEditCurrency } from '../currencymaster/add-edit-currency/add-edit-currency';
import { id } from 'date-fns/locale';
import { AddEditProfitcenter } from './add-edit-profitcenter/add-edit-profitcenter';

@Component({
  selector: 'app-profitcentermaster',
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
  templateUrl: './profitcentermaster.html',
  styleUrl: './profitcentermaster.scss',
})
export class Profitcentermaster implements OnInit {
  expandable: any;
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  // Grid settings
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
  //expandable = false;
  columnResizable = false;

  isLoading = false;
  isConfigExpanded = false;
  list: Country[] = []; // Example data, replace with your own data source Interface

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  cityColumns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('ProfitCenter Code'),
      field: 'ProfitCenterCode',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('ProfitCenter Name'),
      field: 'ProfitCenterName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Profit Center Company'),
      field: 'ProfitCenterCompanyId',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Parent Profit Center' ),
      field: 'ParentProfitCenterID',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Remark'),
      field: 'Remark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'Auth Remark',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'IsActive',
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

  edit(record: any) {
    this.dialog
      .open(AddEditProfitcenter, {
        width: '80%',
        height: '70%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { City: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('City Updated:', result);
          // Create update payload as per your reqirements
          const updatePayload = {
            CityId: result.CityId,
            CityCode: result.CityCode,
            CityName: result.CityName,
            CityShortName: result.CityShortName,
            CityLatitude: result.CityLatitude,
            CityLongitude: result.CityLongitude,
            CityRemark: result.CityRemark,
            CityAuth: result.CityAuth,
            CityIsDiscard: result.CityIsDiscard,
            CityIsActive: result.CityIsActive,
            CityCountryID: result.CityCountryID,
            CityStateID: result.CityStateID,
            CityDistrictID: result.CityDistrictID,
            CityTierTypeID: result.CityTierTypeID,
            CreatedBy: result.CreatedBy,
            CreatedDate: result.CreatedDate,
          };
        }
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditProfitcenter, {
      width: '70%',
      height: '55%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added City:', result);
        const cityData = {
          // Create Date as per your reqirements Change FormControls
          CityId: 0,
          CityCode: result.CityCode,
          CityName: result.CityName,
          CityShortName: result.CityShortName,
          CityLatitude: result.CityLatitude,
          CityLongitude: result.CityLongitude,
          CityRemark: result.CityRemark,
          CityAuth: result.CityAuth,
          CityIsDiscard: result.CityIsDiscard,
          CityIsActive: result.CityIsActive,
          CityCountryID: result.CityCountryID,
          CityStateID: result.CityStateID,
          CityDistrictID: result.CityDistrictID,
          CityTierTypeID: result.CityTierTypeID,
          CreatedBy: result.CreatedBy,
          CreatedDate: new Date().toISOString(),
        };
      }
    });
  }

  delete(value: any) {}

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    //this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      (item as any).RandomValue = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
