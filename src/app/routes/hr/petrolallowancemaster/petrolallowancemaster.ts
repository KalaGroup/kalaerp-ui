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
import { AddEditPetrolallowance } from './add-edit-petrolallowance/add-edit-petrolallowance';
import { IPetrolAllowance } from '@shared/interfaces/hr/petrolallowancemaster';
import { PetrolAllowanceservice } from '@shared/services/hr/PetrolAllowanceMaster/PetrolAllowanceservice';

@Component({
  selector: 'app-petrolallowancemaster',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule],
  templateUrl: './petrolallowancemaster.html',
  styleUrl: './petrolallowancemaster.scss'
})
export class Petrolallowancemaster implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  petrolallowance: IPetrolAllowance[] = [];
  showForm = false;
  petrolallowanceModel: any = {};
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
    private PetrolAllowanceservice: PetrolAllowanceservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) { }

  ngOnInit(): void {
    this.getAllPetrolAllowance();
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
      header: this.translate.stream('Two Wheeler / Km'),
      field: 'TwoWheelerPerKm',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Four Wheeler / Km'),
      field: 'FourWheelerPerKm',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'PetrolAllowanceRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Auth Remark'),
      field: 'PetrolAllowanceAuthRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Authorized'),
      field: 'PetrolAllowanceIsAuth',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Discarded'),
      field: 'PetrolAllowanceIsDiscard',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('Active'),
      field: 'PetrolAllowanceIsActive',
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


  getAllPetrolAllowance() {
    this.PetrolAllowanceservice.getAllPetrolAllowance().subscribe({
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

  edit(record: IPetrolAllowance) {
    this.dialog.open(AddEditPetrolallowance, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { petrolallowance: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          console.log('petrolallowance Updated:', result);
          return;
        }

        const updatePayload: IPetrolAllowance = {
          PetrolAllowanceId: record.PetrolAllowanceId,
          TwoWheelerPerKm: result.TwoWheelerPerKm,
          FourWheelerPerKm: result.FourWheelerPerKm,
          PetrolAllowanceRemark: result.PetrolAllowanceRemark,
          PetrolAllowanceAuthRemark: result.PetrolAllowanceAuthRemark,
          PetrolAllowanceIsAuth: result.PetrolAllowanceIsAuth,
          PetrolAllowanceIsDiscard: result.PetrolAllowanceIsDiscard,
          PetrolAllowanceIsActive: result.PetrolAllowanceIsActive,
          CreatedBy: record.CreatedBy ?? 1,
          CreatedDate: new Date()
        };
        console.log('Update payload:', updatePayload);
        this.PetrolAllowanceservice.updatePetrolAllowance(updatePayload).subscribe({
          next: () => {
            alert(`petrolallowance updated successfully!`);
            this.getAllPetrolAllowance();
          },
          error: (err) => {
            console.error('Error updating petrolallowance:', err);
          }
        });
      });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditPetrolallowance, {
      width: '60%',
      height: '60%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload: IPetrolAllowance = {
          PetrolAllowanceId: 0, // New entry
          TwoWheelerPerKm: result.TwoWheelerPerKm,
          FourWheelerPerKm: result.FourWheelerPerKm,
          PetrolAllowanceRemark: result.PetrolAllowanceRemark,
          PetrolAllowanceAuthRemark: result.PetrolAllowanceAuthRemark,
          PetrolAllowanceIsAuth: result.PetrolAllowanceIsAuth,
          PetrolAllowanceIsDiscard: result.PetrolAllowanceIsDiscard,
          PetrolAllowanceIsActive: result.PetrolAllowanceIsActive,
          CreatedBy: 1, // Set appropriately
          CreatedDate: new Date()
        };

        this.PetrolAllowanceservice.insertPetrolAllowance(payload).subscribe({
          next: () => {
            alert(`petrolallowance added successfully!`);
            this.getAllPetrolAllowance();
          },
          error: (err) => {
            console.error('Error while adding petrolallowance:', err);
            this.toastService.showError('Failed to add petrolallowance. Please check inputs.');
          }
        });
      }
    });
  }

  delete(value: any) {

    this.PetrolAllowanceservice.deletePetrolAllowance(value.PetrolAllowanceId).subscribe({
      next: (response) => {
        console.log('Delete success:', response);
        alert(`Petrol Allowance deleted successfully!`);
        this.getAllPetrolAllowance();
      },
      error: (err) => {
        console.error('Error deleting Petrol:', err);
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
