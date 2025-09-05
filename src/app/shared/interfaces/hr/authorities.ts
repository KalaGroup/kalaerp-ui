export interface IAuthorities{
  AuthoritiesId?: number;
  AuthoritiesGradeId?:number;
  AuthoritiesDesignationId: number;
  AuthoritiesDivisionId: number;
  AuthoritiesRemark: string;
  AuthoritiesAuthRemark: string;
  AuthoritiesAuth: boolean;
  AuthoritiesIsDiscard:boolean;
  AuthoritiesIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}