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
import { AddEditDivision } from './add-edit-division/add-edit-division';
import { Toastservice } from 'app/routes/toastservice';
import { Divisionservice } from '@shared/services/hr/division/divisionservice';
import { IDivision } from '@shared/interfaces/hr/division';

@Component({
  selector: 'app-divisionmaster',
  imports: [CommonModule,MatTableModule,MatCardModule,MatDividerModule,MatButtonModule,MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader,MatDialogModule
  ],
  templateUrl: './divisionmaster.html',
  styleUrl: './divisionmaster.scss'
})
export class Divisionmaster implements OnInit {
   private readonly translate = inject(TranslateService);
   @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
    dialogRef!: MatDialogRef<any>;

  division: IDivision[] = [];
  showForm = false;
  divisionModel: any = {};
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
  list: IDivision[] = [];
  isConfigExpanded: boolean = false;
    divisionForm: any;


  constructor(private fb: FormBuilder,private divisionService: Divisionservice,private dialog: MatDialog,private toastService:Toastservice) {}
    ngOnInit(): void {
     this.getAllDivision();
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
    width: '60px',
  },
    {
    header: this.translate.stream('Division Name'),
    field: 'DivisionName',
    sortable: true,
    minWidth: 80,
    width: '200px',
  },
  {
    header: this.translate.stream('Division Short Name'),
    field: 'DivisionShortName',
    sortable: true,
    minWidth: 120,
    width: '250px',
  },
  {
    header: this.translate.stream('Division Mail Id'),
    field: 'DivisionMailId',
    sortable: true,
    minWidth: 150,
    width: '250px',
  },
  {
    header: this.translate.stream('Division Remark'),
    field: 'DivisionRemark',
    sortable: true,
    minWidth: 150,
    width: '300px',
  },
    {
    header: this.translate.stream('Division Auth Remark'),
    field: 'DivisionAuthRemark',
    sortable: true,
    minWidth: 150,
    width: '300px',
  },
      {
    header: this.translate.stream('Division Is Active'),
    field: 'DivisionIsActive',
    sortable: true,
    minWidth: 150,
    width: '80px',
  },
      {
    header: this.translate.stream('Division Is Discard'),
    field: 'DivisionIsDiscard',
    sortable: true,
    minWidth: 150,
    width: '80px',
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

getAllDivision() {
  debugger;
  this.divisionService.getAllDivision().subscribe({
    next: (data) => {
      this.list = data.map((item: any, index: number) => ({
        ...item,
        SNo: index + 1
      }));
      console.log('Fetched Division with S.No:', this.list);
    },
    error: (err) => {
      console.error('Error fetching Division:', err);
    }
  });
}

edit(record: any) {
  // Open dialog, pass in the record
  this.dialog.open(AddEditDivision, {
    width: '80%',
    height: '70%',
    maxWidth: '100vw',
    maxHeight: '100vh',
    data: { division: record },
  }).afterClosed().subscribe(result => {
    if (result) {
       console.log('Division Updated:', result);
    //Create update payload
     const updatePayload: IDivision = {
       DivisionId: result.DivisionId,
       DivisionCode: result.DivisionCode,
       DivisionName: result.DivisionName,
       DivisionShortName: result.DivisionShortName,
        DivisionMailId: result.DivisionMailId,
        DivisionRemark: result.DivisionRemark,
        DivisionAuthRemark: result.DivisionAuthRemark,
        DivisionAuth: result.DivisionAuth,
        DivisionIsDiscard: result.DivisionIsDiscard,
        DivisionIsActive: result.DivisionIsActive,
        CreatedBy: '1', // or use actual user ID
        CreatedDate: result.CreatedDate,
     };
          console.log('Update payload:', updatePayload);
          this.divisionService.updateDivision(updatePayload).subscribe({
            next: (response) => {
              console.log('Division updated successfully:', response);
              alert(`Division "${result.DivisionName}" updated successfully!`);
              this.getAllDivision();
            },
            error: (err) => {
              console.error('Error updating Division:', err);
            }
          });
        }
      });
}

 openAddDialog() {
  const dialogRef = this.dialog.open(AddEditDivision, {
    width: '60%',
    height: '60%',
    maxWidth: '100vw',
    maxHeight: '100vh',
    data: {} // empty for add
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      debugger;
      console.log('Added Division:', result);
      const payload: IDivision = {
        DivisionId: 0,
        DivisionCode: result.DivisionCode,
        DivisionName: result.DivisionName,
        DivisionShortName: result.DivisionShortName,
        DivisionMailId: result.DivisionMailId,
        DivisionRemark: result.DivisionRemark,
        DivisionAuthRemark: result.DivisionAuthRemark,
        DivisionAuth: result.DivisionAuth,
        DivisionIsActive: result.DivisionIsActive,
        DivisionIsDiscard: result.DivisionIsDiscard,
      CreatedBy: result.CreatedBy, // or use actual user ID
      CreatedDate: new Date().toISOString()
      };
      console.log('Payload for adding state:', payload);
      // Call the service to insert the state
      this.divisionService.insertDivision(payload).subscribe({
        next: (response) => {
         this.toastService.showSuccess('Division added successfully:', response);  
          this.getAllDivision(); 
          alert(`Division "${result.DivisionName}" added successfully!`);
        },
        error: (err) => {
         if (err.status === 400 && err.error) {
      // Validation errors from FluentValidation
      err.error.forEach((validationErr: any) => {
        const field = validationErr.PropertyName;
        const message = validationErr.ErrorMessage;

        // Mark field error in form
        if (this.divisionForm.get(field)) {
          this.divisionForm.get(field)?.setErrors({ serverError: message });
        }
        // Optionally show toast
        this.toastService.showError(message);
      });
      } else {
      this.toastService.showError('Failed to add Division. Please verify Division details and try again.');
       }     
        },
        error: (err) => {
          console.error('Error while adding Division:', err);
          this.toastService.showError('Failed to add Division. Please verify Division details and try again.');
        }
      });
    }
  })
}

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(record: any): void {
    console.log('Saving record:', record);
    this.closeDialog();
  }

    delete(value: any) {
   debugger;
    this.divisionService.deleteDivision(value.divisionId).subscribe({
      next: (response) => {
         this.toastService.showSuccess('Division Deleted successfully:', response);  

        console.log('Division deleted successfully:', response);

        alert(`You have deleted ${value.DivisionName}..!`);
        this.getAllDivision();
      },
      error: (err) => {
        console.error('Error deleting Division:', err);
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
