import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
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
import { dailyattendanceservice } from '@shared/services/hr/dailyattendance/dailyattendance';
import { IDailyAttendance } from '@shared/interfaces/hr/dailyattendance';
import { AddEditAttendance } from './add-edit-attendance/add-edit-attendance';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModel } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dailyattendance',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MtxGridModule,
    PageHeader, MatDialogModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './dailyattendance.html',
  styleUrl: './dailyattendance.scss'
})
export class Dailyattendance implements OnInit {
  private readonly translate = inject(TranslateService);
  @ViewChild('editTemplate') editTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  DailyAttendance: IDailyAttendance[] = [];
  showForm = false;
  editIndex: number | null = null;
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
  isLoading = false;
  list: any[] = [];
  isConfigExpanded: boolean = false;

  // Filter form
  filterForm!: FormGroup;
  originalList: any[] = [];
  filteredList: any[] = [];
  EmployeeList: any[] = [];
  companyList: any[] = [];
  filteredEmployeeList: any[] = [];
  DailyAttendancefrom!: FormGroup;

  // Dropdown data
  employeeList: any[] = [];
  // companyList: any[] = [];
  // EmployeeList: any[] = [];
  isEditMode: any;
  data: any;
  // DailyAttendancefrom: any;

  constructor(
    private fb: FormBuilder,
    private DailyAttendanceservice: dailyattendanceservice,
    private dialog: MatDialog,
    private toastService: Toastservice
  ) {
    // Initialize filter form
    this.filterForm = this.fb.group({
      fromDate: [null],
      toDate: [null],
      EmployeeMasterFullName: [''],
      CompanyName: ['']
    });
  }

  ngOnInit(): void {
    this.getAllDailyAttendance();
    this.getAllEmployeeName();
    this.getAllCompanyName();
  }

  initializeForm() {
    this.DailyAttendancefrom = this.fb.group({
      fromDate: [''],
      toDate: [''],
      companyId: [''],
      employeeId: [''],
      // other form controls
    });

  }


  toggleConfigSection(): void {
    this.isConfigExpanded = !this.isConfigExpanded;
  }

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



  // Get all daily attendance data
  getAllDailyAttendance() {
    this.isLoading = true;
    this.DailyAttendanceservice.getAllDailyAttendance().subscribe({
      next: (data) => {
        this.originalList = data.map((item: any, index: number) => ({
          ...item,
          SNo: index + 1
        }));
        this.list = [...this.originalList];
        this.filteredList = [...this.originalList];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching daily attendance:', err);
        this.isLoading = false;
        this.toastService.showError('Error fetching daily attendance data');
      }
    });
  }

  // // Get all employee names for dropdown
  // getAllEmployeeName() {
  //   this.DailyAttendanceservice.getEmployeeName().subscribe({
  //     next: (data) => {
  //       this.employeeList = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching employee names:', err);
  //     }
  //   });
  // }

  // getAllEmployeeName(): void {
  //   this.DailyAttendanceservice.getEmployeeName().subscribe({
  //     next: res => {
  //       this.EmployeeList = res;
  //       console.log('EmployeeList', this.EmployeeList);
  //       if (this.isEditMode && this.data) {
  //         this.setEmployeeForEdit();
  //       }
  //     },
  //     error: err => console.error('Error loading employees', err)
  //   });
  // }

  // private setEmployeeForEdit(): void {
  //   const profitcenterData = this.data.profitcenterbudget;
  //   if (profitcenterData?.EmployeeMasterFullName) {
  //     const match = this.EmployeeList.find(
  //       e => e.EmployeeMasterFullName?.trim() === profitcenterData.EmployeeMasterFullName?.trim()
  //     );
  //     if (match) {
  //       this.DailyAttendancefrom.patchValue({
  //         AttendanceEmployeeId: match.EmployeeMasterId
  //       });
  //     }
  //   }
  // }
  getAllEmployeeName(): void {
    this.DailyAttendanceservice.getEmployeeName().subscribe({
      next: res => {
        this.EmployeeList = res;
        this.filteredEmployeeList = [...res]; // Initialize filtered list
        console.log('EmployeeList', this.EmployeeList);
        if (this.isEditMode && this.data) {
          this.setEmployeeForEdit();
        }
      },
      error: err => console.error('Error loading employees', err)
    });
  }

  private setEmployeeForEdit(): void {
    const profitcenterData = this.data.profitcenterbudget;
    if (profitcenterData?.EmployeeMasterFullName) {
      const match = this.EmployeeList.find(
        e => e.EmployeeMasterFullName?.trim() === profitcenterData.EmployeeMasterFullName?.trim()
      );
      if (match) {
        this.DailyAttendancefrom.patchValue({
          employeeId: match.EmployeeMasterId,
          companyId: match.CompanyId // Also set company if available
        });
      }
    }
  }
  // // Get all company names for dropdown
  // getAllCompanyName() {
  //   this.DailyAttendanceservice.getCompanyName().subscribe({
  //     next: (data) => {
  //       this.companyList = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching company names:', err);
  //     }
  //   });
  // }

  getAllCompanyName(): void {
    this.DailyAttendanceservice.getCompanyName().subscribe({
      next: (data) => {
        this.companyList = data;
        console.log('CompanyList', this.companyList);
      },
      error: (err) => {
        console.error('Error fetching company names:', err);
      }
    });
  }

  onCompanyChange(companyId: string): void {
    if (companyId) {
      // Filter employees by selected company
      this.filteredEmployeeList = this.EmployeeList.filter(
        employee => employee.CompanyId === companyId
      );

      // Reset employee selection when company changes
      this.DailyAttendancefrom.patchValue({
        employeeId: ''
      });
    } else {
      // Show all employees if no company selected
      this.filteredEmployeeList = [...this.EmployeeList];
    }
  }



  onReset(): void {
    this.DailyAttendancefrom.reset();
    this.filteredEmployeeList = [...this.EmployeeList];
  }




  // Main search/filter function
  filterByDate() {
    debugger
    const formValues = this.filterForm.value;

    this.filteredList = this.originalList.filter(item => {
      let matches = true;

      // Filter by From Date
      if (formValues.fromDate) {
        const fromDate = new Date(formValues.fromDate);
        const itemDate = new Date(item.AttendanceDate);
        fromDate.setHours(0, 0, 0, 0);
        itemDate.setHours(0, 0, 0, 0);
        matches = matches && itemDate >= fromDate;
      }

      // Filter by To Date
      if (formValues.toDate) {
        const toDate = new Date(formValues.toDate);
        const itemDate = new Date(item.AttendanceDate);
        toDate.setHours(23, 59, 59, 999);
        itemDate.setHours(0, 0, 0, 0);
        matches = matches && itemDate <= toDate;
      }

      // Filter by Employee Name
      if (formValues.EmployeeMasterFullName && formValues.EmployeeMasterFullName.trim() !== '') {
        const employeeName = item.EmployeeMasterFullName || '';
        matches = matches &&
          employeeName.toLowerCase().includes(formValues.EmployeeMasterFullName.toLowerCase().trim());
      }

      // Filter by Company Name
      if (formValues.CompanyName && formValues.CompanyName.trim() !== '') {
        const companyName = item.CompanyName || '';
        matches = matches &&
          companyName.toLowerCase().includes(formValues.CompanyName.toLowerCase().trim());
      }

      return matches;
    });

    // Update the list with filtered results and renumber
    this.list = this.filteredList.map((item, index) => ({
      ...item,
      SNo: index + 1
    }));

    // Show message if no results found
    if (this.list.length === 0) {
      this.toastService.showInfo('No records found matching your criteria');
    } else {
      this.toastService.showSuccess(`matching ${this.list.length} record`);
    }
  }

  // Reset filter function
  resetFilter() {
    this.filterForm.reset();
    this.list = [...this.originalList];
    this.filteredList = [...this.originalList];
    this.toastService.showInfo('Filters reset successfully');
  }

  // Format date for display
  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  // Export to Excel
  exportToExcel() {
    console.log('Exporting filtered data:', this.list);
    // Implement export functionality
  }

  // Open Add Dialog
  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditAttendance, {
      width: '70%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload: any = {

        };
        console.log('Add payload:', payload);
        // Add your save logic here
      }
    });
  }

  // Edit function
  edit(record: IDailyAttendance) {
    this.dialog.open(AddEditAttendance, {
      width: '80%',
      height: '70%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { attendance: record },
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          const updatePayload: any = {

          };
          console.log('Update payload:', updatePayload);
          // Add your update logic here
        }
      });
  }

  // Delete function
  delete(value: any) {
    console.log('Delete:', value);
    // Add your delete logic here
  }

  // Grid event handlers
  changeSelect(e: any) {
    console.log('Selection changed:', e);
  }

  changeSort(e: any) {
    console.log('Sort changed:', e);
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