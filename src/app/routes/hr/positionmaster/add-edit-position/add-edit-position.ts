import { Component, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IPositionMaster, IRoleDetails } from '@shared/interfaces/hr/position';
import { Positionservice } from '@shared/services/hr/position/positionservice';
import { IEmployeetype } from '@shared/interfaces/hr/employeetype';
import { ICompany } from '@shared/interfaces/hr/company';
import { Iprofitcentermaster } from '@shared/interfaces/hr/profitcenter';
import { IGrade } from '@shared/interfaces/hr/grade';
import { IDesignation } from '@shared/interfaces/hr/designation';
import { IWorkstation } from '@shared/interfaces/hr/workstation';
import { IDivision } from '@shared/interfaces/hr/division';
import { Companyservice } from '@shared/services/hr/company/companyservice';
import { Employeetypeservice } from '@shared/services/hr/employeetype/employeetypeservice';
import { profitcenterservices } from '@shared/services/hr/profitcenter/profitcenterservices';
import { Gradeservice } from '@shared/services/hr/grade/gradeservice';
import { Designationservice } from '@shared/services/hr/designation/designationservice';
import { Workstationservice } from '@shared/services/hr/workstation/workstationservice';
import { Divisionservice } from '@shared/services/hr/division/divisionservice';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IDepartment } from '@shared/interfaces/hr/department';
import { Departmentservice } from '@shared/services/hr/department/departmentservice';
import { Subscription } from 'rxjs';
import { qualificationservices } from '@shared/services/hr/qualification/qualificationservice';
import { de } from 'date-fns/locale';

interface Row {
  qual: number;
  srno: number;
  desc: string;
  description: string;
  isEdit?: boolean;
  attributeName?: string; // optional for display
}

@Component({
  selector: 'app-add-edit-position',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './add-edit-position.html',
  styleUrl: './add-edit-position.scss',
})
export class AddEditPosition {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedProfitCenterId: number | null = null;
  selectedDivisionId: number | null = null;

  departmentList: any[] = [];
  QualificationList: any[] = [];
  departmentSearchControl = new FormControl('');
  private departmentSearchSub?: Subscription;
  positionForm!: FormGroup;
  isEditMode = false;
  newDescription: string = '';
  newPositionDetailsMasterId: number | null = null;

  description: { qual: number; srno: number; desc: string }[] = [];

  qual: number | null = null;
  srno: number | null = null;
  desc: string | null = null;

  editIndex: number | null = null;
  filteredPositionList: IPositionMaster[] = [];
  PositionList: any[] = [];
  PositionSearchControl = new FormControl('');

  RolesDetailsList: any[] = []; // <-- add this at class level
  displayedColumnsRoles: string[] = ['SrNo', 'RolesDetailsDescription'];

  ResponsibilitiesDetailsList: any[] = []; // <-- add this at class level
  displayedColumnsResponsibilities: string[] = ['SrNo', 'ResponsibilitiesDetailsDescription'];

  ActivityDetailsList: any[] = []; // <-- add this at class level
  displayedColumnsActivity: string[] = ['SrNo', 'ActivityDetailsDescription'];

  AuthoritiesDetailsList: any[] = []; // <-- add this at class level
  displayedColumnsAuthorities: string[] = ['SrNo', 'AuthoritiesDetailsDescription'];

  KPADetailsList: any[] = []; // <-- add this at class level
  displayedColumnsKPA: string[] = ['SrNo', 'KpadetailsDescription', 'Marks'];

  filteredEmployeetypeList: IEmployeetype[] = [];
  EmployeetypeList: any[] = [];
  EmployeetypeSearchControl = new FormControl('');

  filteredCompanyList: ICompany[] = [];
  CompanyList: any[] = [];
  CompanySearchControl = new FormControl('');

  filteredProfitcenterList: Iprofitcentermaster[] = [];
  ProfitcenterList: any[] = [];
  ProfitcenterSearchControl = new FormControl('');

  filteredQualificationList: Iprofitcentermaster[] = [];
  QualificationSearchControl = new FormControl('');

  filteredGradeList: IGrade[] = [];
  GradeList: any[] = [];
  GradeSearchControl = new FormControl('');

  filteredDesignationList: IDesignation[] = [];
  DesignationList: any[] = [];
  DesignationSearchControl = new FormControl('');

  filteredWorkstationList: IWorkstation[] = [];
  WorkstationList: any[] = [];
  WorkstationSearchControl = new FormControl('');

  filteredDivisionList: IDivision[] = [];
  DivisionList: any[] = [];
  DivisionSearchControl = new FormControl('');

  filteredDepartmentList: IDepartment[] = [];
  DepartmentList: any[] = [];
  DepartmentSearchControl = new FormControl('');

  newQualification: number | null = null;
  newSrNo: number | null = null;

  RolesDetailsDataSource = new MatTableDataSource<any>([]);

  constructor(
    private positionService: Positionservice,
    private companyService: Companyservice,
    private employeetypeService: Employeetypeservice,
    private profitcenterService: profitcenterservices,
    private gradeService: Gradeservice,
    private designationService: Designationservice,
    private workstationService: Workstationservice,
    private divisionService: Divisionservice,
    private departmentService: Departmentservice,
    private qualificationServices: qualificationservices,

    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditPosition>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data && !!this.data.position;
    console.log('Edit mode:', this.isEditMode);
    console.log('Data received:', this.data);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllCompany();
    this.loadAllEmployeeType();
    this.loadAllProfitcenter();
    this.loadAllGrade();
    this.loadAllDesignation();
    this.loadAllWorkstation();
    this.loadAllDivision();
    this.loadAllDepartment();
    this.loadAllQualification();
    this.loadAllDetails();
    this.loadRolesDetails();
    this.loadResponsibiltiesDetails();
    this.loadActivityDetails();
    this.loadAuthoritiesDetails();
    this.loadKPADetails();

    // Dynamic loading of Roles, Responsibilities, Activity, Authorities, KPA based on Grade, Designation, Division
    this.positionForm.valueChanges.subscribe(values => {
      if (
        values.PositionMasterGradeId &&
        values.PositionMasterDesignationId &&
        values.PositionMasterDivisionId
      ) {
        this.loadRolesDetails();
      } else {
        this.RolesDetailsList = []; // reset if incomplete
      }
    });

    this.positionForm.valueChanges.subscribe(values => {
      if (
        values.PositionMasterGradeId &&
        values.PositionMasterDesignationId &&
        values.PositionMasterDivisionId
      ) {
        this.loadResponsibiltiesDetails();
      } else {
        this.ResponsibilitiesDetailsList = []; // reset if incomplete
      }
    });

    this.positionForm.valueChanges.subscribe(values => {
      if (
        values.PositionMasterGradeId &&
        values.PositionMasterDesignationId &&
        values.PositionMasterDivisionId
      ) {
        this.loadActivityDetails();
      } else {
        this.ActivityDetailsList = []; // reset if incomplete
      }
    });

    this.positionForm.valueChanges.subscribe(values => {
      if (
        values.PositionMasterGradeId &&
        values.PositionMasterDesignationId &&
        values.PositionMasterDivisionId
      ) {
        this.loadAuthoritiesDetails();
      } else {
        this.AuthoritiesDetailsList = []; // reset if incomplete
      }
    });

    this.positionForm.valueChanges.subscribe(values => {
      if (
        values.PositionMasterGradeId &&
        values.PositionMasterDesignationId &&
        values.PositionMasterDivisionId
      ) {
        this.loadKPADetails();
      } else {
        this.KPADetailsList = []; // reset if incomplete
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initializeForm(): void {
    const currentDate = new Date();
    this.positionForm = this.fb.group({
      PositionMasterId: [''],
      PositionMasterCode: ['', [Validators.required]],
      PositionMasterName: ['', [Validators.required]],
      PositionMasterCompanyId: ['', [Validators.required]],
      PositionMasterDivisionId: ['', [Validators.required]],
      PositionMasterDepartmentId: ['', [Validators.required]],
      PositionMasterProfitcenterId: ['', [Validators.required]],
      PositionMasterGradeId: ['', [Validators.required]],
      PositionMasterDesignationId: ['', [Validators.required]],
      PositionMasterWorkStationId: ['', [Validators.required]],
      PositionMasterPositionCount: ['', [Validators.required]],
      PositionMasterRolesId: [''],
      PositionMasterResponsibilitiesId: [''],
      PositionMasterActivityId: [''],
      PositionMasterAuthoritiesId: [''],
      PositionMasterKpaid: [''],
      PositionMasterEmployeeTypeId: ['', [Validators.required]],
      PositionMasterRemark: [''],
      PositionMasterAuthRemark: [''],
      PositionMasterAuth: [{ value: true, disabled: !this.isEditMode }],
      PositionMasterIsDiscard: [{ value: false, disabled: !this.isEditMode }],
      PositionMasterIsActive: [{ value: true, disabled: !this.isEditMode }],
      CreatedBy: ['1'],
      CreatedDate: [{ value: currentDate, disabled: true }],
    });
    if (this.isEditMode) {
      console.log('Patching form with Position Structure data:', this.data.position);
      this.positionForm.patchValue({
        code: this.data.position.code,
        PositionMasterId: this.data.position.PositionMasterId,
        PositionMasterCode: this.data.position.PositionMasterCode,
        PositionMasterName: this.data.position.PositionMasterName,
        PositionMasterCompanyId: this.data.position.PositionMasterCompanyId,
        PositionMasterDivisionId: this.data.position.PositionMasterDivisionId,
        PositionMasterDepartmentId: this.data.position.PositionMasterDepartmentId,
        PositionMasterProfitcenterId: this.data.position.PositionMasterProfitcenterId,
        PositionMasterGradeId: this.data.position.PositionMasterGradeId,
        PositionMasterDesignationId: this.data.position.PositionMasterDesignationId,
        PositionMasterWorkStationId: this.data.position.PositionMasterWorkStationId,
        PositionMasterPositionCount: this.data.position.PositionMasterPositionCount,
        PositionMasterRolesId: this.data.position.PositionMasterRolesId,
        PositionMasterResponsibilitiesId: this.data.position.PositionMasterResponsibilitiesId,
        PositionMasterActivityId: this.data.position.PositionMasterActivityId,
        PositionMasterAuthoritiesId: this.data.position.PositionMasterAuthoritiesId,
        PositionMasterKpaid: this.data.position.PositionMasterKpaid,
        PositionMasterEmployeeTypeId: this.data.position.PositionMasterEmployeeTypeId,
        PositionMasterRemark: this.data.position.PositionMasterRemark,
        PositionMasterAuthRemark: this.data.position.PositionMasterAuthRemark,
        PositionMasterAuth: this.data.position.PositionMasterAuth,
        PositionMasterIsDiscard: this.data.position.PositionMasterIsDiscard,
        PositionMasterIsActive: this.data.position.PositionMasterIsActive,
        CreatedBy: this.data.position.CreatedBy,
      });
      this.positionForm.get('code')?.enable();
      this.positionForm.get('CreatedDate')?.disable();
      this.positionForm.get('IsActive')?.enable();
      console.log('Form values after patch:', this.positionForm.value);
    }
  }

  loadAllCompany(): void {
    this.companyService.getAllCompanies().subscribe({
      next: res => {
        this.CompanyList = res;
        console.log('Company  loaded:', res);
        this.filteredCompanyList = [...this.CompanyList];
        this.CompanySearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredCompanyList = this.CompanyList.filter(company =>
            company.CompanyName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setCompanyForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Company:', err);
      },
    });
  }

  private setCompanyForEdit(): void {
    let CompanyId = null;
    const companyData = this.data.company;

    if (companyData?.CompanyName) {
      const Company = this.CompanyList.find(
        p => p.CompanyName.trim().toLowerCase() === companyData.CompanyName.trim().toLowerCase()
      );
      CompanyId = Company ? Company.CompanyId : null; // 🔥 use correct property name
      console.log(
        'Found Company Name by name:',
        CompanyId,
        'for Company:',
        companyData.CompanyName
      );
    }

    if (CompanyId) {
      this.positionForm.patchValue({
        PositionMasterCompanyId: CompanyId,
      });
      console.log('Company set in form:', CompanyId);
    } else {
      console.log('No Company ID found for Company Name:', companyData?.CompanyName);
    }
  }

  loadAllEmployeeType(): void {
    this.employeetypeService.getAllemployeetypes().subscribe({
      next: res => {
        this.EmployeetypeList = res;
        console.log('Employee Type  loaded:', res);
        this.filteredEmployeetypeList = [...this.EmployeetypeList];
        this.EmployeetypeSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredEmployeetypeList = this.EmployeetypeList.filter(employeetype =>
            employeetype.EmployeeTypeName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setEmployeeTypeForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Employee Type:', err);
      },
    });
  }

  private setEmployeeTypeForEdit(): void {
    let EmployeeTypeId = null;
    const employeetypeData = this.data.employeetype;

    if (employeetypeData?.EmployeeTypeName) {
      const Employeetype = this.EmployeetypeList.find(
        p =>
          p.EmployeeTypeName.trim().toLowerCase() ===
          employeetypeData.EmployeeTypeName.trim().toLowerCase()
      );
      EmployeeTypeId = Employeetype ? Employeetype.EmployeeTypeId : null; // 🔥 use correct property name
      console.log(
        'Found Employee Type by name:',
        EmployeeTypeId,
        'for Employee Type:',
        employeetypeData.EmployeeTypeName
      );
    }

    if (EmployeeTypeId) {
      this.positionForm.patchValue({
        PositionMasterEmployeeTypeId: EmployeeTypeId,
      });
      console.log('Employee Type set in form:', EmployeeTypeId);
    } else {
      console.log('No Employee Type found for Employee Type:', employeetypeData?.EmployeeTypeName);
    }
  }

  loadAllProfitcenter(): void {
    this.profitcenterService.getAllProfitcenter().subscribe({
      next: res => {
        this.ProfitcenterList = res;
        console.log('Employee Type  loaded:', res);
        this.filteredProfitcenterList = [...this.ProfitcenterList];
        this.ProfitcenterSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredProfitcenterList = this.ProfitcenterList.filter(profitcenter =>
            profitcenter.ProfitCenterName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setProfitcenterForEdit();
        }
      },
      error: err => {
        console.error('Failed to load ProfitCenter:', err);
      },
    });
  }

  private setProfitcenterForEdit(): void {
    let ProfitCenterId = null;
    const profitcenterData = this.data.profitcenter;

    if (profitcenterData?.ProfitCenterName) {
      const Profitcenter = this.ProfitcenterList.find(
        p =>
          p.ProfitCenterName.trim().toLowerCase() ===
          profitcenterData.ProfitCenterName.trim().toLowerCase()
      );
      ProfitCenterId = Profitcenter ? Profitcenter.ProfitCenterId : null; // 🔥 use correct property name
      console.log(
        'Found ProfitCenter by name:',
        ProfitCenterId,
        'for ProfitCenter:',
        profitcenterData.ProfitCenterName
      );
    }

    if (ProfitCenterId) {
      this.positionForm.patchValue({
        PositionMasterProfitcenterId: ProfitCenterId,
      });
      console.log('ProfitCenter set in form:', ProfitCenterId);
    } else {
      console.log(
        'No ProfitCenterv ID found for ProfitCenter:',
        profitcenterData?.ProfitCenterName
      );
    }
  }

  loadAllGrade(): void {
    this.gradeService.getAllGrade().subscribe({
      next: res => {
        this.GradeList = res;
        console.log('Grade  loaded:', res);
        this.filteredGradeList = [...this.GradeList];
        this.GradeSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredGradeList = this.GradeList.filter(grade =>
            grade.GradeName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setGradeForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Grade:', err);
      },
    });
  }

  private setGradeForEdit(): void {
    let GradeId = null;
    const gradeData = this.data.grade;

    if (gradeData?.GradeName) {
      const Grade = this.GradeList.find(
        p => p.GradeName.trim().toLowerCase() === gradeData.GradeName.trim().toLowerCase()
      );
      GradeId = Grade ? Grade.GradeId : null; // 🔥 use correct property name
      console.log('Found Grade by name:', GradeId, 'for Grade:', gradeData.GradeName);
    }

    if (GradeId) {
      this.positionForm.patchValue({
        PositionMasterGradeId: GradeId,
      });
      console.log('Grade set in form:', GradeId);
    } else {
      console.log('No Grade ID found for Grade:', gradeData?.GradeName);
    }
  }

  loadAllDesignation(): void {
    this.designationService.getAllDesignation().subscribe({
      next: res => {
        this.DesignationList = res;
        console.log('Designation  loaded:', res);
        this.filteredDesignationList = [...this.DesignationList];
        this.DesignationSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredDesignationList = this.DesignationList.filter(designation =>
            designation.DesignationName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setDesignationForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Designation:', err);
      },
    });
  }

  private setDesignationForEdit(): void {
    let DesignationId = null;
    const designationData = this.data.designation;

    if (designationData?.DesignationName) {
      const Designation = this.DesignationList.find(
        p =>
          p.DesignationName.trim().toLowerCase() ===
          designationData.DesignationName.trim().toLowerCase()
      );
      DesignationId = Designation ? Designation.DesignationId : null; // 🔥 use correct property name
      console.log(
        'Found Designation by name:',
        DesignationId,
        'for Designation:',
        designationData.DesignationName
      );
    }

    if (DesignationId) {
      this.positionForm.patchValue({
        PositionMasterDesignationId: DesignationId,
      });
      console.log('Designation set in form:', DesignationId);
    } else {
      console.log('No Designation ID found for Designation:', designationData?.DesignationName);
    }
  }

  loadAllWorkstation(): void {
    this.workstationService.getAllWorkstation().subscribe({
      next: res => {
        this.WorkstationList = res;
        console.log('Workstation  loaded:', res);
        this.filteredWorkstationList = [...this.WorkstationList];
        this.WorkstationSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredWorkstationList = this.WorkstationList.filter(workstation =>
            workstation.WorkStationName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setWorkstationForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Workstation:', err);
      },
    });
  }

  private setWorkstationForEdit(): void {
    let WorkStationId = null;
    const workstationData = this.data.workstation;

    if (workstationData?.WorkStationName) {
      const Workstation = this.WorkstationList.find(
        p =>
          p.WorkStationName.trim().toLowerCase() ===
          workstationData.WorkStationName.trim().toLowerCase()
      );
      WorkStationId = Workstation ? Workstation.WorkStationId : null; // 🔥 use correct property name
      console.log(
        'Found Workstation by name:',
        WorkStationId,
        'for Workstation:',
        workstationData.WorkStationName
      );
    }

    if (WorkStationId) {
      this.positionForm.patchValue({
        PositionMasterWorkStationId: WorkStationId,
      });
      console.log('Workstation set in form:', WorkStationId);
    } else {
      console.log('No Workstation ID found for Workstation:', workstationData?.WorkStationName);
    }
  }

  loadAllDepartment(): void {
    this.departmentService.getAllDepartment().subscribe({
      next: res => {
        this.DepartmentList = res;
        console.log('Department  loaded:', res);
        this.filteredDepartmentList = [...this.DepartmentList];
        this.DepartmentSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredDepartmentList = this.DepartmentList.filter(department =>
            department.DepartmentName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setDepartmentForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Department:', err);
      },
    });
  }

  private setDepartmentForEdit(): void {
    let DepartmentId = null;
    const departmentData = this.data.department;

    if (departmentData?.DepartmentName) {
      const Department = this.DepartmentList.find(
        p =>
          p.DepartmentName.trim().toLowerCase() ===
          departmentData.DepartmentName.trim().toLowerCase()
      );
      DepartmentId = Department ? Department.DepartmentId : null; // 🔥 use correct property name
      console.log(
        'Found Department by name:',
        DepartmentId,
        'for Department:',
        departmentData.DepartmentName
      );
    }

    if (DepartmentId) {
      this.positionForm.patchValue({
        PositionMasterDepartmentId: DepartmentId,
      });
      console.log('Department set in form:', DepartmentId);
    } else {
      console.log('No Department ID found for Department:', departmentData?.DepartmentName);
    }
  }

  onProfitCenterChange(profitCenterId: number | null): void {
    console.log('Selected ProfitCenter ID:', profitCenterId);
    this.selectedProfitCenterId = profitCenterId;

    // Reset Department field in form
    this.positionForm.patchValue({ PositionMasterDepartmentId: '' });

    // Clear old department lists
    this.departmentList = [];
    this.filteredDepartmentList = [];
    // clear search input (optional)
    this.departmentSearchControl.setValue('');

    this.loadDepartmentsIfReady();
  }

  // When division changes
  onDivisionChange(divisionId: number | null): void {
    console.log('Selected Division ID:', divisionId);
    this.selectedDivisionId = divisionId;

    // Reset Department field in form
    this.positionForm.patchValue({ PositionMasterDepartmentId: '' });

    // Clear old department lists
    this.departmentList = [];
    this.filteredDepartmentList = [];
    this.departmentSearchControl.setValue('');

    this.loadDepartmentsIfReady();
  }

  // Helper: load departments only if both IDs are present
  private loadDepartmentsIfReady(): void {
    // ensure both are selected; check for null/undefined explicitly
    if (this.selectedProfitCenterId == null || this.selectedDivisionId == null) {
      return;
    }

    // Call the API
    this.positionService
      .getDepartmentByProfitcenterAndDivisionId(
        this.selectedProfitCenterId,
        this.selectedDivisionId
      )
      .subscribe({
        next: departments => {
          this.departmentList = departments;
          this.filteredDepartmentList = [...this.departmentList];
          console.log('Loaded departments:', departments);

          // Safe (re)subscribe to search changes:
          if (this.departmentSearchSub) {
            this.departmentSearchSub.unsubscribe();
          }
          this.departmentSearchSub = this.departmentSearchControl.valueChanges.subscribe(value => {
            const filterValue = (value || '').toLowerCase();
            this.filteredDepartmentList = this.departmentList.filter(d =>
              (d.DepartmentName || '').toLowerCase().includes(filterValue)
            );
          });

          // If editing, set preselection
          if (this.isEditMode && this.data) {
            this.setDepartmentForEdit();
          }
        },
        error: err => console.error('Failed to load departments:', err),
      });
  }

  onGradeChange(gradeId: number): void {
    console.log('Selected Grade ID:', gradeId);

    // Reset designation field
    this.positionForm.patchValue({
      PositionMasterDesignationId: '',
    });

    // Clear old data
    this.DesignationList = [];
    this.filteredDesignationList = [];

    if (!gradeId) {
      return;
    }

    // Call API
    this.positionService.getDesignationsByGrade(gradeId).subscribe({
      next: designations => {
        this.DesignationList = designations;
        this.filteredDesignationList = [...this.DesignationList];
        console.log('Loaded designations:', designations);

        // Setup search filter for designation
        this.DesignationSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredDesignationList = this.DesignationList.filter(desig =>
            desig.DesignationName.toLowerCase().includes(filterValue)
          );
        });

        // Handle edit mode (preselect)
        if (this.isEditMode && this.data) {
          this.setDesignationForEdit();
        }
      },
      error: err => {
        console.error('Failed to load designations:', err);
      },
    });
  }

  loadRolesDetails(): void {
    const gradeId = this.positionForm.get('PositionMasterGradeId')?.value;
    const designationId = this.positionForm.get('PositionMasterDesignationId')?.value;
    const divisionId = this.positionForm.get('PositionMasterDivisionId')?.value;

    if (gradeId && designationId && divisionId) {
      this.positionService
        .getRolesDetailsByCombination(gradeId, designationId, divisionId)
        .subscribe({
          next: (details: any[]) => {
            this.RolesDetailsList = details || [];
            this.RolesDetailsDataSource.data = this.RolesDetailsList; // ✅ bind to datasource
            console.log('Loaded role details:', this.RolesDetailsList);
          },
          error: err => {
            console.error('Failed to load role details:', err);
          },
        });
    }
  }

  loadResponsibiltiesDetails(): void {
    const gradeId = this.positionForm.get('PositionMasterGradeId')?.value;
    const designationId = this.positionForm.get('PositionMasterDesignationId')?.value;
    const divisionId = this.positionForm.get('PositionMasterDivisionId')?.value;

    if (gradeId && designationId && divisionId) {
      this.positionService
        .getResponsibilitiesDetailsByCombination(gradeId, designationId, divisionId)
        .subscribe({
          next: (details: any[]) => {
            this.ResponsibilitiesDetailsList = details || [];
            console.log('Loaded Responsibilties details:', this.ResponsibilitiesDetailsList);
          },
          error: err => {
            console.error('Failed to load role details:', err);
          },
        });
    }
  }

  loadActivityDetails(): void {
    const gradeId = this.positionForm.get('PositionMasterGradeId')?.value;
    const designationId = this.positionForm.get('PositionMasterDesignationId')?.value;
    const divisionId = this.positionForm.get('PositionMasterDivisionId')?.value;

    if (gradeId && designationId && divisionId) {
      this.positionService
        .getActivityDetailsByCombination(gradeId, designationId, divisionId)
        .subscribe({
          next: (details: any[]) => {
            this.ActivityDetailsList = details || [];
            console.log('Loaded Activity details:', this.ActivityDetailsList);
          },
          error: err => {
            console.error('Failed to load Activity details:', err);
          },
        });
    }
  }

  loadAuthoritiesDetails(): void {
    const gradeId = this.positionForm.get('PositionMasterGradeId')?.value;
    const designationId = this.positionForm.get('PositionMasterDesignationId')?.value;
    const divisionId = this.positionForm.get('PositionMasterDivisionId')?.value;

    if (gradeId && designationId && divisionId) {
      this.positionService
        .getAuthoritiesDetailsByCombination(gradeId, designationId, divisionId)
        .subscribe({
          next: (details: any[]) => {
            this.AuthoritiesDetailsList = details || [];
            console.log('Loaded Authorities details:', this.AuthoritiesDetailsList);
          },
          error: err => {
            console.error('Failed to load Authorities details:', err);
          },
        });
    }
  }

  loadKPADetails(): void {
    const gradeId = this.positionForm.get('PositionMasterGradeId')?.value;
    const designationId = this.positionForm.get('PositionMasterDesignationId')?.value;
    const divisionId = this.positionForm.get('PositionMasterDivisionId')?.value;

    if (gradeId && designationId && divisionId) {
      this.positionService
        .getKPADetailsByCombination(gradeId, designationId, divisionId)
        .subscribe({
          next: (details: any[]) => {
            this.KPADetailsList = details || [];
            console.log('Loaded KPA details:', this.KPADetailsList);
          },
          error: err => {
            console.error('Failed to load KPA details:', err);
          },
        });
    }
  }

  loadAllDivision(): void {
    this.divisionService.getAllDivision().subscribe({
      next: res => {
        this.DivisionList = res;
        console.log('Division  loaded:', res);
        this.filteredDivisionList = [...this.DivisionList];
        this.DivisionSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredDivisionList = this.DivisionList.filter(division =>
            division.DivisionName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setDivisionForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Division:', err);
      },
    });
  }

  private setDivisionForEdit(): void {
    let DivisionId = null;
    const divisionData = this.data.division;

    if (divisionData?.DivisionName) {
      const Division = this.DivisionList.find(
        p => p.DivisionName.trim().toLowerCase() === divisionData.DivisionName.trim().toLowerCase()
      );
      DivisionId = Division ? Division.DivisionId : null; // 🔥 use correct property name
      console.log(
        'Found Division by name:',
        DivisionId,
        'for Division:',
        divisionData.DivisionName
      );
    }

    if (DivisionId) {
      this.positionForm.patchValue({
        PositionMasterDivisionId: DivisionId,
      });
      console.log('Division set in form:', DivisionId);
    } else {
      console.log('No Division ID found for Division:', divisionData?.DivisionName);
    }
  }

  loadAllDetails(): void {
    const PositionMasterId = this.data.position.PositionMasterId;
    this.positionService.getPositionDetailsByMstId(PositionMasterId).subscribe({
      next: res => {
        console.log('Position Details Fetched successfully:', res);
        // this.recruitmentDetails = res;
        this.description = res;
        this.description = res.map((d: any) => ({
          qual: d.PositionQualificationId,
          srno: d.SrNo,
          desc: d.PositionMasterQualificationDetailsDescription,
        }));
      },
      error: err => {
        console.error('Error fetch Position details:', err);
      },
    });
  }

  loadAllQualification(): void {
    this.qualificationServices.getAllQualification().subscribe({
      next: res => {
        this.QualificationList = res;
        console.log('Employee Type  loaded:', res);
        this.filteredQualificationList = [...this.QualificationList];
        this.QualificationSearchControl.valueChanges.subscribe(value => {
          const filterValue = (value || '').toLowerCase();
          this.filteredQualificationList = this.QualificationList.filter(qualification =>
            qualification.QualificationName.toLowerCase().includes(filterValue)
          );
        });
        // Handle Profit Center selection for edit mode
        if (this.isEditMode && this.data) {
          this.setQualificationForEdit();
        }
      },
      error: err => {
        console.error('Failed to load Qualification:', err);
      },
    });
  }

  private setQualificationForEdit(): void {
    let QualificationId = null;
    const qualificationData = this.data.qualification;

    if (qualificationData?.QualificationName) {
      const Qualification = this.QualificationList.find(
        p =>
          p.QualificationName.trim().toLowerCase() ===
          qualificationData.QualificationName.trim().toLowerCase()
      );
      QualificationId = Qualification ? Qualification.QualificationId : null; // 🔥 use correct property name
      console.log(
        'Found Qualification by name:',
        QualificationId,
        'for Qualification:',
        qualificationData.QualificationName
      );
    }

    if (QualificationId) {
      this.positionForm.patchValue({
        PositionQualificationId: QualificationId,
      });
      console.log('Qualification set in form:', QualificationId);
    } else {
      console.log(
        'No Qualification ID found for Qualification:',
        qualificationData?.QualificationName
      );
    }
  }

  toUpperCase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.positionForm.get('WorkStationShortName')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    console.log('Form Value:', this.positionForm.value);
    if (this.positionForm.valid && this.description.length > 0) {
      this.positionForm.enable();
      this.positionForm.patchValue({
        PositionMasterRolesId: this.RolesDetailsList.length
          ? this.RolesDetailsList[0].RolesId
          : null,
      });
      this.positionForm.patchValue({
        PositionMasterResponsibilitiesId: this.ResponsibilitiesDetailsList.length
          ? this.ResponsibilitiesDetailsList[0].ResponsibilitiesId
          : null,
      });
      this.positionForm.patchValue({
        PositionMasterActivityId: this.ActivityDetailsList.length
          ? this.ActivityDetailsList[0].ActivityId
          : null,
      });
      this.positionForm.patchValue({
        PositionMasterAuthoritiesId: this.AuthoritiesDetailsList.length
          ? this.AuthoritiesDetailsList[0].AuthoritiesId
          : null,
      });
      this.positionForm.patchValue({
        PositionMasterKpaid: this.KPADetailsList.length ? this.KPADetailsList[0].Kpaid : null,
      });
      this.positionForm.value.PositionMasterQualificationDetails = this.description;
      console.log('Form submitted with values:', this.positionForm.value);
      this.dialogRef.close(this.positionForm.value); // ✅ will return PascalCase keys
    } else {
      this.positionForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.positionForm.reset();
    this.isEditMode = false;
    this.dialogRef.close();
  }

  addRow() {
    if (this.qual == null || this.srno == null || this.desc == null) {
      alert('Please fill all fields before adding.');
      return;
    }

    const exists = this.description.some(
      d => d.qual === this.qual && d.srno === this.srno && d.desc === this.desc
    );

    if (exists) {
      alert('This round with the selected attribute already exists!');
      return;
    }

    this.description.push({
      qual: this.qual,
      srno: this.srno,
      desc: this.desc,
    });

    this.qual = null;
    this.srno = null;
    this.desc = null;

    console.log('PositionDetails:', this.description);
  }

  getQualificationName(id: number): string {
    const qual = this.QualificationList?.find(q => q.QualificationId === id);
    return qual ? qual.QualificationName : '';
  }

  editRow(index: number): void {
    const current = this.description[index];
    this.description[index] = {
      ...current,
      qual: current.qual,
      srno: current.srno,
      desc: current.desc,
    };
    this.editIndex = index;
  }

  updateRow(index: number) {
    const current = this.description[index];

    // ✅ Validation (allow 0 values, just block null/undefined/empty)
    if (
      current.qual == null ||
      current.srno == null ||
      current.desc == null ||
      current.desc.trim() === ''
    ) {
      alert('Please fill all fields before updating.');
      return;
    }

    // ✅ Duplicate check
    const duplicate = this.description.some(
      (d, i) =>
        i !== index && d.qual === current.qual && d.srno === current.srno && d.desc === current.desc
    );

    if (duplicate) {
      alert('This qualification + srno + description combination already exists!');
      return;
    }

    // ✅ Update (spread is enough)
    this.description[index] = { ...current };

    // Exit edit mode
    this.editIndex = null;
  }

  deleteRow(index: number): void {
    this.description.splice(index, 1);
  }

  // Real-time typing restriction for Position Code
  allowAlphanumeric(event: KeyboardEvent) {
    const pattern = /^[A-Za-z0-9]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  // Real-time typing restriction
  allowLettersAndSpace(event: KeyboardEvent) {
    const pattern = /^[A-Za-z ]$/;
    const input = event.target as HTMLInputElement;
    if (!pattern.test(event.key) || (input.selectionStart === 0 && event.key === ' ')) {
      event.preventDefault();
    }
  }

  // Optional: block invalid paste
  blockInvalidPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text') || '';
    const pattern = /^[A-Za-z ]+$/;
    if (!pattern.test(clipboardData)) {
      event.preventDefault();
    }
  }
}
