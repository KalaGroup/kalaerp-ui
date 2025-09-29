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
import { Activityservcie } from '@shared/services/hr/ActivityMaster/activityservice';
import { IActivity } from '@shared/interfaces/hr/activity';
import { IKPA } from '@shared/interfaces/hr/kpa';
import { kpaservice } from '@shared/services/hr/KPA/kpaservice';
import { Toastservice } from 'app/routes/toastservice';
import { AddEditKpa } from './add-edit-kpa/add-edit-kpa';

@Component({
  selector: 'app-kpamaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './kpamaster.html',
  styleUrl: './kpamaster.scss'
})
export class Kpamaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  kpa: IKPA[] = [];
  showForm = false;
  kpaModel: any = {};
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
    private KPAservice: kpaservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.loadAllKPA();
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
      field: 'Kparemark',
      sortable: true,
      minWidth: 150,
    },

    {
      header: this.translate.stream('Auth Remark'),
      field: 'KpaauthRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Authorized'),
      field: 'Kpaauth',
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
      field: 'KpaisDiscard',
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
      field: 'KpaisActive',
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


  loadAllKPA() {
    debugger
    this.KPAservice.getAllKpa().subscribe({
      next: (data) => {
        this.list = data.map((item: any, index: number) => ({

          ...item,
          SNo: index + 1
        }));
        console.log("list", this.list)
      },
      error: (err) => {
        console.error('Error fetching kpa:', err);
      }
    });
  }

  edit(record: any) {
    this.dialog.open(AddEditKpa, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { kpa: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('No update performed');
          return;
        }
        debugger
        const updatePayload = {
          Kpaid: record.Kpaid,
          KpagradeId: result.KpagradeId,
          KpadesignationId: result.KpadesignationId,
          KpadivisionId: result.KpadivisionId,
          Kparemark: result.Kparemark,
          KpaauthRemark: result.KpaauthRemark,
          Kpaauth: result.Kpaauth,
          KpaisDiscard: result.KpaisDiscard,
          KpaisActive: result.KpaisActive,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: new Date(),
          descriptions: result.descriptions,
        };

        console.log('Update payload:', updatePayload);
        this.KPAservice.updateKPA(updatePayload).subscribe({
          next: () => {
           
            this.toastService.showSuccess("kpa updated successfully!");
            this.loadAllKPA();
          },
          error: (err) => {
            console.error('Error updating kpa:', err);
            this.toastService.showError('Failed to update kpa. Please check inputs.');
          }
        });
      });
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditKpa, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger
        const payload = {
          Kpaid: 0, // New entry
          KpagradeId: result.KpagradeId,
          KpadesignationId: result.KpadesignationId,
          KpadivisionId: result.KpadivisionId,
          Kparemark: result.Kparemark,
          KpaauthRemark: result.KpaauthRemark,
          Kpaauth: result.Kpaauth,
          KpaisDiscard: result.KpaisDiscard,
          KpaisActive: result.KpaisActive,
          CreatedBy: 1,
          CreatedDate: new Date(),
          descriptions: result.descriptions,
        };

        this.KPAservice.insertKPA(payload).subscribe({
          next: () => {
            this.toastService.showSuccess('kpa added successfully:');
          
            this.toastService.showSuccess("kpa added successfully!");

            this.loadAllKPA();
          },
          error: (err) => {
            console.error('Error while adding kpa:', err);
            this.toastService.showError('Failed to add kpa. Please check inputs.');
          }
        });
      }
    });
  }
  delete(value: any) {
    this.KPAservice.deleteKPA(value.Kpaid).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        this.toastService.showSuccess('Delete  successfully:');
       
        this.loadAllKPA();
      },
      error: (err) => {
        console.error('Error deleting Petrol:', err);
        this.toastService.showError('Failed to delete kpa. It might be in use.');
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
