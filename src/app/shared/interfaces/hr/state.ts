export interface IState {
  StateId?: number;
  CountryId?:number;
  StateCode: string;
  StateName: string;
  ShortName: string;
  IsDiscard:boolean;
  IsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}