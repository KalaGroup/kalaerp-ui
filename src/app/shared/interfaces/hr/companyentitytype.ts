export interface ICompanyentitytype{
  CompEntityTypeId?: number;
  CompanyEntityTypeName: string;
  CompanyEntityTypeShortName: string;
  CompanyEntityTypeRemark: string;
  CompanyEntityTypeAuth: boolean;
  CompanyEntityTypeIsDiscard:boolean;
  CompanyEntityTypeIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}