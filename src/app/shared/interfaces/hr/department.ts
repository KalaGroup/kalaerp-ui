export interface IDepartment {
  DepartmentId?: number;
  DepartmentCode?: number;
  DepartmentName: string;
  DepartmentShortName: string;
  DepartmentDivisionId: string;
  ParentDepartmentId: boolean;
  DepartmentProfitcenterId: boolean;
  DepartmentRemark?: string;
  DepartmentType?: string;
  DepartmentAuthRemark: string;
  DepartmentAuth: string;
  DepartmentIsDiscard: string;
  DepartmentIsActive: boolean;
  CreatedBy: number;
  CreatedDate?: string;
  [key: string]: any;
}
