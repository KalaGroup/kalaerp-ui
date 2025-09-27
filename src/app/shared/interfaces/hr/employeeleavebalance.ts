export interface IEmployeeLeaveBalance {
  LeaveBalancesId?: number;
  LeaveBalancesEmployeeId?: number;
  LeaveBalancesTypeId: number;
  EmployeeMasterFullName?: string;
  EmployeeMasterId?: number;
  LeaveBalancesYear: number;
  LeaveBalancesOpening: number;
  LeaveBalancesCredited?: number;
  LeaveBalancesUtilized: number;
  LeaveBalancesEncashed: number;
  LeaveBalancesClosing: number;
  LeaveBalancesRemark: string;
  LeaveBalancesAuthRemark: string;
  LeaveBalancesIsDiscard?: boolean;
  LeaveBalancesIsActive?: boolean;
  CreatedBy?: string;
  CreatedDate?: string;
  UpdatedBy?: string;
  UpdatedDate?: string;
  [key: string]: any;
}

// export interface IEmployeeMasterPersonalDetails {
//   EmployeeMasterId?: number;
//   EmployeeMasterCode?: number;
//   EmployeeMasterFirstName: string;
//   EmployeeMasterMiddleName: string;
//   EmployeeMasterLastName: string;
//   EmployeeMasterFullName?: string;
// }


