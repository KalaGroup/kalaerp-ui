export interface IEmpmstforupdationmst {
  EmployeeMasterUpdationForId?: number;
  EmployeeMasterUpdationForName: string;
  EmployeeMasterUpdationForRemark: string;
  EmployeeMasterUpdationForAuthRemark?:string;
  EmployeeMasterUpdationForAuth : boolean;
  EmployeeMasterUpdationForIsDiscard?: boolean;
  EmployeeMasterUpdationForIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}