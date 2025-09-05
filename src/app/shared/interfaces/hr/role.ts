export interface IRole{
  RolesId?: number;
  RolesGradeId?:number;
  RolesDesignationId: number;
  RolesDivisionId: number;
  RolesRemark: string;
  RolesAuthRemark: string;
  RolesAuth: boolean;
  RolesIsDiscard:boolean;
  RolesIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}