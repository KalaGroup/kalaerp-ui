export interface IWorkstation{
  WorkStationId?: number;
  WorkStationCode?:number;
  WorkStationName: string;
  WorkStationShortName: string;
  WorkStationProfitcenterId: string;
  ProfitCenterName?:string; 
  WorkStationRemark: string;
  WorkStationAuthRemark: string;
  WorkStationAuth: boolean;
  WorkStationIsDiscard:boolean;
  WorkStationIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}