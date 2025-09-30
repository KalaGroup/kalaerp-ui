export interface IGatePassType{
  GatePassTypeId?: number;
  GatePassTypesTypeCode?:string;
  GatePassTypesTypeName: string;
  GatePassTypesDescription: string;
  GatePassTypesRequiresApproval: boolean;
  GatePassTypesIsAuth?:boolean; 
  GatePassTypesAuthRemark: string;
  GatePassTypesIsActive: boolean;
  GatePassTypesIsDiscard: boolean;
  CreatedBy:string;
  CreatedDate: string;
  UpdatedBy?: string;
  UpdatedDate?: string; 
  [key: string]: any;
}