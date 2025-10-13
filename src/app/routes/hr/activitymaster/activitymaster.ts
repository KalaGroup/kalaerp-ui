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
import { AddEditActivity } from './add-edit-activity/add-edit-activity';
import { Activityservcie } from '@shared/services/hr/ActivityMaster/activityservice';
import { IActivity } from '@shared/interfaces/hr/activity';


@Component({
  selector: 'app-activitymaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './activitymaster.html',
  styleUrl: './activitymaster.scss'
})
export class Activitymaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  activity: IActivity[] = [];
  showForm = false;
  activtiyModel: any = {};
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
    private ActivityServices: Activityservcie,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }


  ngOnInit(): void {
    this.loadAllActivity();
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
      header: this.translate.stream('Grade ID'),
      field: 'GradeName',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Designation ID'),
      field: 'DesignationName',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Division ID'),
      field: 'DivisionName',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'ActivityRemark',
      sortable: true,
      minWidth: 150,
    },

    {
      header: this.translate.stream('Auth Remark'),
      field: 'ActivityAuthRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Authorized'),
      field: 'ActivityAuth',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'primary' },
        false: { text: 'No', color: 'warn' }
      }
    },
    {
      header: this.translate.stream('Discarded'),
      field: 'ActivityIsDiscard',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'warn' },
        false: { text: 'No', color: 'primary' }
      }
    },
    {
      header: this.translate.stream('Active'),
      field: 'ActivityIsActive',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'primary' },
        false: { text: 'No', color: 'warn' }
      }
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
          click: (record: any) => this.delete(record),
        },
      ],
    },
  ];


  loadAllActivity() {
    
    this.ActivityServices.getAllActivity().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
      },
      error: (err) => {
        console.error('Error fetching activity:', err);
      }
    });
  }

  edit(record: any) {
    
    this.dialog.open(AddEditActivity, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { activity: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('No update performed');
          return;
        }

        const updatePayload = {
          ActivityId: record.ActivityId,
          ActivityGradeId: result.ActivityGradeId,
          ActivityDesignationId: result.ActivityDesignationId,
          ActivityDivisionId: result.ActivityDivisionId,
          ActivityRemark: result.ActivityRemark,
          ActivityAuth: result.ActivityAuth,
          ActivityIsActive: result.ActivityIsActive,
          ActivityIsDiscard: result.ActivityIsDiscard,
          ActivityAuthRemark: result.ActivityAuthRemark,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: new Date(),
          //Desc details
          descriptions: result.descriptions,
        };

        console.log('Update payload:', updatePayload);
        this.ActivityServices.updateActivity(updatePayload).subscribe({
          next: () => {

            this.toastService.showSuccess("Activity updated successfully");
            this.loadAllActivity();
          },
          error: (err) => {
            console.error('Error updating activity:', err);
            this.loadAllActivity();
          }
        });
      });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditActivity, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        const payload = {
          ActivityId: 0, // New entry
          ActivityGradeId: result.ActivityGradeId,
          ActivityDesignationId: result.ActivityDesignationId,
          ActivityDivisionId: result.ActivityDivisionId,
          ActivityRemark: result.ActivityRemark,
          ActivityAuth: result.ActivityAuth,
          ActivityIsActive: result.ActivityIsActive,
          ActivityIsDiscard: result.ActivityIsDiscard,
          ActivityAuthRemark: result.ActivityAuthRemark,
          CreatedBy: 1,
          CreatedDate: new Date(),
          descriptions: result.descriptions,
        };

        this.ActivityServices.insertActivity(payload).subscribe({
          next: () => {
            this.toastService.showSuccess('Activity added successfully:');

            this.loadAllActivity();
          },
          error: (err) => {
            console.error('Error while adding activity:', err);
           
          }
        });
      }
    });
  }
  delete(value: any) {
    this.ActivityServices.deleteActivity(value.ActivityId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        this.toastService.showSuccess('Delete  successfully:');

        this.loadAllActivity();
      },
      error: (err) => {
        console.error('Error deleting activity:', err);
      }
    });
  }
  changeSelect(e: any) {
    console.log(e);
  }
  changeSort(e: any) {
    console.log(e);
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
