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
import { IERPPageAssignmentRelationship } from '@shared/interfaces/hr/ERPPageAssignmentRelationshipDetails';
import { Erppageassignmentrelationshipservice } from '@shared/services/hr/ERPPageAssignmentRelationship/ERPPageAssignmentRelationshipservice';
import { AddEditPageassignmentrelationship } from './add-edit-pageassignmentrelationship/add-edit-pageassignmentrelationship';

@Component({
  selector: 'app-erppageassignmentrelationship',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './erppageassignmentrelationship.html',
  styleUrl: './erppageassignmentrelationship.scss'
})
export class Erppageassignmentrelationship implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  ERPPageAssignmentRelationship: IERPPageAssignmentRelationship[] = [];
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
  rowStriped = true;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  RelationshipDetails: any[] = [];

  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;
  constructor(
    private fb: FormBuilder,
    private ERPpageassignmentrelationshipservice: Erppageassignmentrelationshipservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.loadAllERPPageAssignmentRelationship();
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
      header: this.translate.stream('Division ID'),
      field: 'DivisionName',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Department ID'),
      field: 'DepartmentName',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Profit Center ID'),
      field: 'ProfitCenterName',
      sortable: true,
      minWidth: 130,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'ErppageAssignmentRelationshipRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth 1 Remark'),
      field: 'ErppageAssignmentRelationshipAuth1Remark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth 2 Remark'),
      field: 'ErppageAssignmentRelationshipAuth2Remark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth 1'),
      field: 'ErppageAssignmentRelationshipAuth1',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'primary' },
        false: { text: 'No', color: 'warn' },
      },
    },
    {
      header: this.translate.stream('Auth 2'),
      field: 'ErppageAssignmentRelationshipAuth2',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'primary' },
        false: { text: 'No', color: 'warn' },
      },
    },
    {
      header: this.translate.stream('Discarded'),
      field: 'ErppageAssignmentRelationshipIsDiscard',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'warn' },
        false: { text: 'No', color: 'primary' },
      },
    },
    {
      header: this.translate.stream('Active'),
      field: 'ErppageAssignmentRelationshipIsActive',
      sortable: true,
      minWidth: 100,
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'primary' },
        false: { text: 'No', color: 'warn' },
      },
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

  loadAllERPPageAssignmentRelationship() {
    this.ERPpageassignmentrelationshipservice.getAllERPPageAssignmentRelationships().subscribe({
      next: (data) => {

        this.list = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        console.log('Fetched ERPPageAssignmentRelationship:', this.list);
      },
      error: (err) => {
        console.error('Error fetching activity:', err);
      }
    });
  }




  edit(record: any) {
    this.dialog.open(AddEditPageassignmentrelationship, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { relationship: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('No update performed');
          return;
        }

        const updatePayload: any = {
          ErppageAssignmentRelationshipId: record.ErppageAssignmentRelationshipId,
          ErppageAssignmentRelationshipDivisionId: result.ErppageAssignmentRelationshipDivisionId,
          ErppageAssignmentRelationshipDepartmentId: result.ErppageAssignmentRelationshipDepartmentId,
          ErppageAssignmentRelationshipProfitcenterId: result.ErppageAssignmentRelationshipProfitcenterId,
          ErppageAssignmentRelationshipRemark: result.ErppageAssignmentRelationshipRemark,
          ErppageAssignmentRelationshipAuth1Remark: result.ErppageAssignmentRelationshipAuth1Remark,
          ErppageAssignmentRelationshipAuth2Remark: result.ErppageAssignmentRelationshipAuth2Remark,
          ErppageAssignmentRelationshipAuth1: result.ErppageAssignmentRelationshipAuth1,
          ErppageAssignmentRelationshipAuth2: result.ErppageAssignmentRelationshipAuth2,
          ErppageAssignmentRelationshipIsDiscard: result.ErppageAssignmentRelationshipIsDiscard,
          ErppageAssignmentRelationshipIsActive: result.ErppageAssignmentRelationshipIsActive,
          CreatedBy: record.CreatedBy ?? 3,
          CreatedDate: record.CreatedDate ?? new Date(),
          UpdatedBy: 3,
          UpdatedDate: new Date(),
          RelationshipDetails: result.RelationshipDetails || []
        };

        console.log('Update payload:', updatePayload);

        this.ERPpageassignmentrelationshipservice.updateERPPageAssignmentRelationship(updatePayload).subscribe({
          next: () => {
            this.toastService.showSuccess('Record updated successfully');
            this.loadAllERPPageAssignmentRelationship();
          },
          error: (err) => {
            console.error('Error updating record:', err);
            this.loadAllERPPageAssignmentRelationship();
          }
        });
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditPageassignmentrelationship, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {} // no existing data, since it's a new record
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('payload', result);
        const payload: any = {
          ErppageAssignmentRelationshipId: 0, // New entry
          ErppageAssignmentRelationshipDivisionId: result.ErppageAssignmentRelationshipDivisionId,
          ErppageAssignmentRelationshipDepartmentId: result.ErppageAssignmentRelationshipDepartmentId,
          ErppageAssignmentRelationshipProfitcenterId: result.ErppageAssignmentRelationshipProfitcenterId,
          ErppageAssignmentRelationshipRemark: result.ErppageAssignmentRelationshipRemark,
          ErppageAssignmentRelationshipAuth1Remark: result.ErppageAssignmentRelationshipAuth1Remark,
          ErppageAssignmentRelationshipAuth2Remark: result.ErppageAssignmentRelationshipAuth2Remark,
          ErppageAssignmentRelationshipAuth1: result.ErppageAssignmentRelationshipAuth1,
          ErppageAssignmentRelationshipAuth2: result.ErppageAssignmentRelationshipAuth2,
          ErppageAssignmentRelationshipIsDiscard: result.ErppageAssignmentRelationshipIsDiscard,
          ErppageAssignmentRelationshipIsActive: result.ErppageAssignmentRelationshipIsActive,
          CreatedBy: 3, // or dynamically get from logged-in user
          CreatedDate: new Date(),
          // ✅ Use correct property name from form result
          RelationshipDetails: result.RelationshipDetails || []
        };

        console.log('Insert payload:', payload);

        this.ERPpageassignmentrelationshipservice.createERPPageAssignmentRelationship(payload).subscribe({
          next: () => {
            this.toastService.showSuccess('Record added successfully');
            this.loadAllERPPageAssignmentRelationship();
          },
          error: (err) => {
            console.error('Error while adding record:', err);
          }
        });
      }
    });
  }

  delete(value: any) {
    this.ERPpageassignmentrelationshipservice.deleteERPPageAssignmentRelationship(value.ErppageAssignmentRelationshipId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        this.toastService.showSuccess('Delete  successfully:');

        this.loadAllERPPageAssignmentRelationship();
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
