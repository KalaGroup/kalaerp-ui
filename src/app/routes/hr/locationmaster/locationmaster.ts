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
import { AddEditLocation } from './add-edit-location/add-edit-location';
import { locationservices } from '@shared/services/hr/location/locationservice';
import { Ilocationmaster } from '@shared/interfaces/hr/location';

@Component({
  selector: 'app-locationmaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './locationmaster.html',
  styleUrl: './locationmaster.scss'
})
export class Locationmaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  locationmaster: any[] = [];
  showForm = false;
  locationModel: any = {};
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

  constructor(private fb: FormBuilder, private LocationServices: locationservices, private dialog: MatDialog, private toastService: Toastservice) { }
  ngOnInit(): void {
    this.loadAllLocation();
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
      header: this.translate.stream('Location Code'),
      field: 'LocationCode',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('Location Name'),
      field: 'LocationName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Profit Center'),
      field: 'ProfitCenterName', // From navigation property
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Location Type'),
      field: 'LocationType',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Location Auth'),
      field: 'LocationAuth',
      sortable: true,
      minWidth: 140,
      width: '140px',
    },
    {
      header: this.translate.stream('Location Auth Remark'),
      field: 'LocationAuthRemark',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'LocationIsActive',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('Is Discard'),
      field: 'LocationIsDiscard',
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
  loadAllLocation() {
    this.LocationServices.getAllLocation().subscribe({
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
  edit(record: Ilocationmaster) { // If you have a Qualification interface, use it here
    // debugger; // Remove before production

    this.dialog.open<AddEditLocation, { location: Ilocationmaster }, Ilocationmaster>(AddEditLocation, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { location: record },
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Qualification Updated:', result);
        console.log('Original record CreatedBy:', record.CreatedBy);

        const updatePayload: Ilocationmaster = {
          LocationId: record.LocationId,
          LocationCode: result.LocationCode,
          LocationName: result.LocationName,
          LocationRemark: result.LocationRemark,
          ProfitcenterLocationId: result.ProfitcenterLocationId, // Consistent casing
          LocationType: result.LocationType,
          LocationAuthRemark: result.LocationAuthRemark,
          LocationIsDiscard: result.LocationIsDiscard,
          LocationIsActive: result.LocationIsActive ?? true,
          LocationAuth: result.LocationAuth ?? true,
          CreatedBy: record.CreatedBy ?? 1, // fallback user id
          CreatedDate: record.CreatedDate ?? new Date() // fallback date if missing


        };

        console.log('Update payload:', updatePayload);

        this.LocationServices.updateLocation(updatePayload).subscribe({
          next: (response) => {
            console.log('Qualification updated successfully:', response);
            alert(`Qualification "${result.LocationName}" updated successfully!`);
            this.toastService.showSuccess;
            this.loadAllLocation();
          },
          error: (err) => {
            console.error('Error updating Qualification:', err);
            alert('Error updating qualification. Please try again.');
          }
        });
      }
    });
  }

  //Add New 
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditLocation, {
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
        const payload: Ilocationmaster = {
          LocationId: 0,
          LocationCode: result.LocationCode,
          LocationName: result.LocationName,
          LocationRemark: result.LocationRemark,
          ProfitcenterLocationId: result.ProfitcenterLocationId, // Ensure ID casing is correct
          LocationType: result.LocationType,
          LocationAuthRemark: result.LocationAuthRemark,
          LocationAuth: result.LocationAuth ?? true,
          LocationIsActive: result.LocationIsActive ?? true,
          LocationIsDiscard: result.LocationIsDiscard,
          CreatedBy: result.CreatedBy,// Replace with actual user ID if available
          CreatedDate: new Date()
        };

        console.log('Payload for adding Location:', payload);

        this.LocationServices.insertLocation(payload).subscribe({
          next: (response) => {
            console.log('Location added successfully:', response);
            this.loadAllLocation();
            this.toastService.showSuccess;
            alert(`Location added successfully!`);

          },
          error: (err) => {
            console.error('Error while adding Location:', err);
            this.toastService.showError('Failed to add Location. Please verify the details and try again.');
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

    this.LocationServices.deleteLocation(value.LocationId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        console.log('Location deleted successfully:', response);
        this.loadAllLocation();
        this.toastService.showSuccess;
        alert(`Location deleted successfully!`);
      },
      error: (err) => {
        console.error('Error deleting Location:', err);
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
