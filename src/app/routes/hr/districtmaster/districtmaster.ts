/* eslint-disable @angular-eslint/prefer-inject */
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import { AddEditDistrictComponent } from './add-edit-district/add-edit-district';
import { IDistict } from '@shared/interfaces/hr/districtMaster';
import { Districtmasterservice } from '@shared/services/hr/districtmaster/districtmasterservice';

@Component({
  selector: 'app-districtmaster',
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
  templateUrl: './districtmaster.html',
  styleUrl: './districtmaster.scss'
})
export class Districtmaster implements OnInit {
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
  list: IDistict[] = [];
  DistrictForm: any;

  constructor(
    private fb: FormBuilder,
    private districtservice: Districtmasterservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {

  }
  ngOnInit(): void {
    this.loadAllDistrict();
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  districtcolumns: MtxGridColumn[] = [
    { header: this.translate.stream('SNo'), field: 'SNo', sortable: true, minWidth: 80, width: '80px' },
    { header: this.translate.stream('District Code'), field: 'DistrictCode', sortable: true, minWidth: 120 },
    { header: this.translate.stream('District Name'), field: 'DistrictName', sortable: true, minWidth: 150 },
    { header: this.translate.stream('Short Name'), field: 'ShortName', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Country'), field: 'CountryName', sortable: true, minWidth: 120 },
    { header: this.translate.stream('State'), field: 'StateName', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Is Active'), field: 'IsActive',sortable: true,minWidth: 100},
    { header: this.translate.stream('Is Discard'),field: 'IsDiscard',sortable: true,minWidth: 100,},
    { header: this.translate.stream('Remark'), field: 'DistrictMasterRemark', sortable: true, minWidth: 150 },
    { header: this.translate.stream('Auth'), field: 'DistrictMasterAuth', sortable: true, minWidth: 100,
      formatter: (row: any) => row.IsDiscard ? 'Complete' : 'Pending'},
    { header: this.translate.stream('Auth Remark'), field: 'DistrictMasterAuthRemark', sortable: true, minWidth: 150 },
    { header: this.translate.stream('Created By'), field: 'CreatedBy', sortable: true, minWidth: 120 },
    { header: this.translate.stream('Created Date'), field: 'CreatedDate', sortable: true, minWidth: 100, type: 'date',  typeParameter: { format: 'dd/MM/yyyy hh:mm a' }  },

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

  loadAllDistrict() {
    this.districtservice.getAllDistricts().subscribe({
      next: (data: IDistict[]) => {
        console.log('District data:', data);
        this.list = data.map((item: IDistict, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
      },
      error: (err) => console.error('Error fetching cities:', err),
    });
  }

edit(record: any) {
  this.dialog.open(AddEditDistrictComponent, {

    width: '80%',
    height: '70%',
    maxWidth: '100vw',
    maxHeight: '100vh',
    data: { District: record },
  }).afterClosed().subscribe(result => {


    if (result) {
       console.log('District Updated:', result);
        // Create update payload
      const updatePayload: IDistict = {
        DistrictId: result.DistrictId || record.DistrictID,
        DistrictCode: result.DistrictCode,
        DistrictName: result.DistrictName,
        ShortName: result.ShortName,
        IsDiscard: result.IsDiscard,
        IsActive: result.IsActive,
        DistrictMasterAuth: result.DistrictMasterAuth,
        DistrictMasterRemark: result.DistrictMasterRemark,
        DistrictMasterAuthRemark: result.DistrictMasterAuthRemark,

        CountryId: result.CountryId,
        StateId: result.StateId,
        CreatedBy: result.CreatedBy,
        CreatedDate: new Date().toISOString()
      };

      console.log('Update payload:', updatePayload);
      this.districtservice.updateDistrict(updatePayload).subscribe({

        next: (response) => {
          this.toastService.showSuccess('District updated successfully:', response);
          console.log('District updated successfully:', response);

          this.loadAllDistrict();
        },
        error: (err) => {
          console.error('Error updating District:', err);
        }
      });
    }
  });

}

 openAddDialog() {
  const dialogRef = this.dialog.open(AddEditDistrictComponent, {
    width: '70%',
    height: '65%',
    maxWidth: '100vw',
    maxHeight: '100vh',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Added District:', result);
      const DistictData: IDistict = {
        DistrictId: 0,
        DistrictCode: result.DistrictCode,
        DistrictName: result.DistrictName,
        ShortName: result.ShortName,
        IsDiscard: result.IsDiscard,
        IsActive: result.IsActive,
        CountryId: result.CountryId,
        DistrictMasterAuth: result.DistrictMasterAuth,
        DistrictMasterRemark: result.DistrictMasterRemark,
        DistrictMasterAuthRemark: result.DistrictMasterAuthRemark,
        StateId: result.StateId,
        CreatedBy: result.CreatedBy,
        CreatedDate: new Date().toISOString()
      };
      console.log('Payload for adding District:', DistictData);
      // Call the service to insert the country
      this.districtservice.AddDistrict(DistictData).subscribe({
        next: (response) => {
          this.toastService.showSuccess('District added successfully:', response);
          console.log('District added successfully:', response);
          this.loadAllDistrict();
        },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.DistrictForm.get(field)) {
                  this.DistrictForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add District. Please verify District details and try again.'
              );
            }
          },
      });
    }
  });
}

   delete(value: any) {
    this.districtservice.deleteDistrict(value.DistrictId).subscribe({
      next: (response) => {
        this.toastService.showSuccess('District deleted successfully', response);
        console.log('District deleted successfully:', response);
        this.loadAllDistrict();
      },
      error: (err) => {
        console.error('Error deleting District:', err);
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
