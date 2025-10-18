import { Component, inject, OnInit, TemplateRef, ViewChild, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageHeader } from '@shared';
import { Toastservice } from 'app/routes/toastservice';
import { dailyattendanceservice } from '@shared/services/hr/dailyattendance/dailyattendance';
import { IDailyAttendance } from '@shared/interfaces/hr/dailyattendance';
import { AddEditAttendance } from './add-edit-attendance/add-edit-attendance';

@Component({
  selector: 'app-dailyattendance',
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
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './dailyattendance.html',
  styleUrl: './dailyattendance.scss'
})
export class Dailyattendance implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly fb = inject(FormBuilder);
  private readonly dailyattendanceservice = inject(dailyattendanceservice);
  private readonly dialog = inject(MatDialog);
  private readonly toastService = inject(Toastservice);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;

  // Data
  list: IDailyAttendance[] = [];
  originalList: IDailyAttendance[] = [];
  filteredList: IDailyAttendance[] = [];
  EmployeeList: any[] = [];
  companyList: any[] = [];
  filteredEmployeeList: any[] = [];

  // Form
  filterForm!: FormGroup;
  DailyAttendancefrom!: FormGroup;

  // State
  isLoading = false;
  multiSelectable = true;
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
  isConfigExpanded = false;

  Columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('SNo'),
      field: 'SNo',
      sortable: true,
      width: '80px',
    },
    {
      header: this.translate.stream('Employee Name'),
      field: 'EmployeeMasterFullName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Company Name'),
      field: 'CompanyName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Date'),
      field: 'AttendanceDate',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('In Time'),
      field: 'InTime',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Out Time'),
      field: 'OutTime',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Shift'),
      field: 'ShiftMasterName',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('In Time Auth'),
      field: 'InTimeAuth',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Out Time Auth'),
      field: 'OutTimeAuth',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Status'),
      field: 'AttendanceStatus',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('Remark'),
      field: 'AttendanceRemark',
      sortable: true,
      minWidth: 150,
    },
    {
      header: this.translate.stream('In Time Auth Remark'),
      field: 'AttendanceInTimeAuthRemark',
      sortable: true,
      minWidth: 180,
    },
    {
      header: this.translate.stream('Out Time Auth Remark'),
      field: 'AttendanceOutTimeAuthRemark',
      sortable: true,
      minWidth: 180,
    },
    {
      header: this.translate.stream('Discard'),
      field: 'AttendanceIsDiscard',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('Active'),
      field: 'AttendanceIsActive',
      sortable: true,
      minWidth: 120,
    }
  ];

  constructor() {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.filterByDate();
    this.initializeForm();
  }

  private initializeForms(): void {
    this.filterForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  initializeForm(): void {
    this.DailyAttendancefrom = this.fb.group({
      fromDate: [''],
      toDate: [''],
      companyId: [''],
      employeeId: ['']
    });
  }

  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

  filterByDate(): void {
    const formValues = this.filterForm.value;

    if (!formValues.fromDate || !formValues.toDate) {
      this.toastService.showError('Please select From and To dates');
      return;
    }

    const fromDate = new Date(formValues.fromDate);
    const toDate = new Date(formValues.toDate);
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);

    this.isLoading = true;

    this.dailyattendanceservice.getAllDailyAttendance()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          // Store original data
          this.originalList = data || [];

          // Filter by date range
          const filtered = this.originalList.filter(item => {
            const itemDate = new Date(item.AttendanceDate);
            itemDate.setHours(0, 0, 0, 0);
            return itemDate >= fromDate && itemDate <= toDate;
          });

          // Add serial numbers
          this.list = filtered.map((item, index) => ({
            ...item,
            SNo: index + 1
          }));

          this.filteredList = [...this.list];
          this.isLoading = false;

          if (this.list.length > 0) {
            this.toastService.showSuccess(`${this.list.length} record(s) found`);
          } else {
            this.toastService.showInfo('No records found');
          }
        },
        error: (err) => {
          console.error('Error fetching attendance data:', err);
          this.isLoading = false;
          this.toastService.showError('Error fetching attendance data');
        }
      });
  }

  resetFilter(): void {
    this.filterForm.reset();
    this.list = [];
    this.filteredList = [];
    this.originalList = [];
    this.toastService.showInfo('Filters reset successfully');
  }

  formatDate(date: string): string {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }

  exportToExcel(): void {
    if (this.list.length === 0) {
      this.toastService.showInfo('No data to export');
      return;
    }
    console.log('Exporting filtered data:', this.list);
    // Implement export functionality here
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditAttendance, {
      width: '70%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterByDate();
      }
    });
  }

  edit(record: IDailyAttendance): void {
    this.dialog.open(AddEditAttendance, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { isEditMode: true, attendance: record }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.filterByDate();
        }
      });
  }

  // delete(record: IDailyAttendance): void {
  //   if (confirm('Are you sure you want to delete this record?')) {
  //     this.isLoading = true;

  //     this.dailyattendanceservice.deleteAttendance(record.AttendanceId)
  //       .pipe(takeUntilDestroyed(this.destroyRef))
  //       .subscribe({
  //         next: () => {
  //           this.toastService.showSuccess('Record deleted successfully');
  //           this.filterByDate();
  //         },
  //         error: (err) => {
  //           console.error('Error deleting record:', err);
  //           this.isLoading = false;
  //           this.toastService.showError('Failed to delete record');
  //         }
  //       });
  //   }
  // }

  changeSelect(e: any): void {
    console.log('Selection changed:', e);
  }

  changeSort(e: any): void {
    console.log('Sort changed:', e);
  }

  updateCell(): void {
    this.list = this.list.map(item => {
      return item;
    });
  }

  updateList(): void {
    this.list = this.list.slice();
  }
}