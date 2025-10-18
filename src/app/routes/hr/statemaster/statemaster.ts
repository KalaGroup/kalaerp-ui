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
import { AddEditState } from './add-edit-state/add-edit-state';
import { Toastservice } from 'app/routes/toastservice';
import { IState } from '@shared/interfaces/hr/state';
import { Stateservice } from '@shared/services/hr/state/stateservice';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-statemaster',
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
  templateUrl: './statemaster.html',
  styleUrl: './statemaster.scss',
})
export class Statemaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  states: IState[] = [];
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
  stateForm: any;

  constructor(
    private fb: FormBuilder,
    private stateService: Stateservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }
  ngOnInit(): void {
    this.loadAllState();
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
      header: this.translate.stream('Country Name'),
      field: 'CountryName',
      sortable: true,
      minWidth: 80,
      width: '80px',
    },
    {
      header: this.translate.stream('State Code'),
      field: 'StateCode',
      sortable: true,
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('State Name'),
      field: 'StateName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('State Short Name'),
      field: 'ShortName',
      sortable: true,
      minWidth: 150,
      width: '150px',
    },
    {
      header: this.translate.stream('Is Active'),
      field: 'IsActive',
      sortable: true,
      minWidth: 150,
      width: '150px',
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

  loadAllState() {
    this.stateService.getAllState().subscribe({
      next: data => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1,
        }));
        console.log('Fetched State with S.No:', this.list);
      },
      error: err => {
        console.error('Error fetching State:', err);
      },
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditState, {
      width: '60%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // empty for add
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added state:', result);
        const payload: IState = {
          StateId: 0,
          StateCode: result.StateCode,
          StateName: result.StateName,
          ShortName: result.ShortName,
          CountryID: result.CountryID,
          IsActive: result.IsActive,
          IsDiscard: result.IsDiscard,
          CreatedBy: result.CreatedBy, // or use actual user ID
          CreatedDate: new Date().toISOString(),
        };
        console.log('Payload for adding state:', payload);
        // Call the service to insert the state
        this.stateService.insertState(payload).subscribe({
          next: response => {

            console.log('Line 229');
            this.toastService.showSuccess('State added successfully:', response);
            this.loadAllState();
          
          },
          error: err => {
            if (err.status === 400 && err.error) {
              // Validation errors from FluentValidation
              err.error.forEach((validationErr: any) => {
                const field = validationErr.PropertyName;
                const message = validationErr.ErrorMessage;

                // Mark field error in form
                if (this.stateForm.get(field)) {
                  this.stateForm.get(field)?.setErrors({ serverError: message });
                }
                // Optionally show toast
                this.toastService.showError(message);
              });
            } else {
              this.toastService.showError(
                'Failed to add state. Please verify state details and try again.'
              );
            }
          },
        });
      }
    });
  }

  edit(record: any) {
    // Open dialog, pass in the record
    this.dialog
      .open(AddEditState, {
        width: '60%',
        height: '50%',
        maxWidth: '70vw',
        maxHeight: '60vh',
        data: { state: record },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('State Updated:', result);
          // Create update payload
          const updatePayload: IState = {
            StateId: result.StateId,
            StateCode: result.StateCode,
            StateName: result.StateName,
            ShortName: result.ShortName,
            CountryID: result.CountryID,
            IsActive: result.IsActive,
            IsDiscard: result.IsDiscard,
            CreatedBy: '1', // or use actual user ID
          };
          console.log('Update payload:', updatePayload);
          this.stateService.updateState(updatePayload).subscribe({
            next: response => {
              console.log('State updated successfully:', response);
            
              this.loadAllState();
            },
            error: err => {
              console.error('Error updating state:', err);
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
    this.stateService.deleteState(value.StateId).subscribe({
      next: response => {
        console.log('State deleted successfully:', response);
        this.toastService.showSuccess('State deleted successfully');
       
        this.loadAllState();
      },
      error: err => {
        console.error('Error deleting state:', err);
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
