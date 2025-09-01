export interface IEmployeetype {
  EmployeeTypeId?: number;
  EmployeeTypeCode?:number;
  EmployeeTypeName: string;
  EmployeeTypeDescription: string;
  EmployeeTypeRemark: string;
  EmployeeTypeAuthRemark?:string;
  EmployeeTypeAuth: boolean;
  EmployeeTypeIsDiscard?: boolean;
  EmployeeTypeIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}