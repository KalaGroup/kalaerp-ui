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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import { ICity } from '@shared/interfaces/hr/citymaster';
import { AddEditCityComponent } from './add-edit-city/add-edit-city';
import { CitymasterService } from '@shared/services/hr/Citymaster/citymaster-service';

@Component({
  selector: 'app-citymaster',
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
    MatDialogModule
  ],
  templateUrl: './citymaster.html',
  styleUrl: './citymaster.scss'
})
export class CitymasterComponent implements OnInit {
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
  list: ICity[] = [];

  constructor(

    private hrService: CitymasterService,
    private dialog: MatDialog,
    private toastService: Toastservice

  ) {

  }
  ngOnInit(): void {
    this.loadAllCities();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  cityColumns: MtxGridColumn[] = [
    { header: this.translate.stream('SNo'), field: 'SNo', sortable: true, minWidth: 80, width: '80px' },
    { header: this.translate.stream('City Code'), field: 'CityCode', sortable: true, minWidth: 120 },
    { header: this.translate.stream('City Name'), field: 'CityName', sortable: true, minWidth: 150 },
    { header: this.translate.stream('Short Name'), field: 'CityShortName', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Latitude'), field: 'CityLatitude', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Longitude'), field: 'CityLongitude', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Tier Type'), field: 'CityTierTypeId', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Country'), field: 'CountryName', sortable: true, minWidth: 120 },
    { header: this.translate.stream('State'), field: 'StateName', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Distict'), field: 'DistrictName', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Remark'), field: 'CityRemark', minWidth: 150 },
    { header: this.translate.stream('Is Active'), field: 'CityIsActive', sortable: true, minWidth: 100 },
    {
      header: this.translate.stream('Action'),
      field: 'action',
      minWidth: 140,
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

  loadAllCities() {
    this.hrService.getAllCity().subscribe({
      next: (data: ICity[]) => {
        console.log('City data:', data);
        this.list = data.map((item: ICity, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
      },
      error: (err) => console.error('Error fetching cities:', err),
    });
  }

  edit(record: any) {

    this.dialog.open(AddEditCityComponent, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { City: record },
    }).afterClosed().subscribe(result => {
      debugger;
      if (result) {
        console.log('City Updated:', result);
        // Create update payload
        const updatePayload: ICity = {
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
          CreatedDate: result.CreatedDate
        };

        console.log('Update payload:', updatePayload);
        this.hrService.updateCity(updatePayload).subscribe({
          next: (response) => {
            console.log('City updated successfully:', response);
            this.loadAllCities();
            this.toastService.showError('City updated successfully!');
          },
          error: (err) => {
            console.error('Error updating City:', err);
            this.toastService.showError('Failed to update City. Please check inputs.');
          }
        });
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditCityComponent, {
      width: '90%',
      height: '90%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });
    debugger
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added City:', result);
        const cityData: ICity = {
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
          CreatedDate: new Date().toISOString()
        };
        console.log('Payload for adding City:', cityData);
        // Call the service to insert the country
        this.hrService.AddCity(cityData).subscribe({
          next: (response) => {
            console.log('City added successfully:', response);
            this.toastService.showError('City added successfully!');
            this.loadAllCities();
          },
          error: (err) => {
            console.error('Error while adding country:', err);
            this.toastService.showError('Failed to add country. Please verify country details and try again.');
          }
        });
      }
    });
  }

  delete(value: any) {
    this.hrService.deleteCountry(value.CityId).subscribe({
      next: (response) => {
        console.log('Country deleted successfully:', response);
        this.toastService.showError('City Deleted successfully!');
        this.loadAllCities();
      },
      error: (err) => {
        console.error('Error deleting City:', err);
        this.toastService.showError('Failed to delete City. It might be in use.');
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
