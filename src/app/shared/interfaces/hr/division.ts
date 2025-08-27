export interface IDivision {
  DivisionId?: number;
  DivisionCode?:number;
  DivisionName: string;
  DivisionShortName: string;
  DivisionMailId: string;
  DivisionRemark: string;
  DivisionAuthRemark: string;
  DivisionAuth: boolean;
  DivisionIsDiscard:boolean;
  DivisionIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}