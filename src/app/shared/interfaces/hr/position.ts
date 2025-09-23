// export interface IPositionMaster {
//   PositionMasterId: number;
//   PositionMasterCode: string;
//   PositionMasterName: string;
//   PositionMasterCompanyId: number;
//   PositionMasterDivisionId: number;
//   PositionMasterDepartmentId: number;
//   PositionMasterProfitcenterId: number;
//   PositionMasterGradeId: number;
//   PositionMasterDesignationId: number;
//   PositionMasterWorkStationId: number;
//   PositionMasterPositionCount: number;
//   PositionMasterRolesId: number;
//   PositionMasterResponsibilitiesId: number;
//   PositionMasterActivityId: number;
//   PositionMasterAuthoritiesId: number;
//   PositionMasterKpaid: number;
//   PositionMasterEmployeeTypeId: number;
//   PositionMasterRemark: string;
//   PositionMasterAuthRemark: string;
//   PositionMasterAuth: boolean;
//   PositionMasterIsDiscard: boolean;
//   PositionMasterIsActive: boolean;
//   CreatedBy?: string;
//   CreatedDate?: string; 
// }

// export interface IRoleDetails {
//   RoleDetailsId: number;
//   RoleId: number;
//   SrNo: number;
//   PositionMasterRoleDetailsDescription: string;
// }
// Your backend/base model
export interface IPositionMaster {
  PositionMasterId: number;
  PositionMasterCode: string;
  PositionMasterName: string;
  PositionMasterCompanyId: number;
  PositionMasterDivisionId: number;
  PositionMasterDepartmentId: number;
  PositionMasterProfitcenterId: number;
  PositionMasterGradeId: number;
  PositionMasterDesignationId: number;
  PositionMasterWorkStationId: number;
  PositionMasterPositionCount: number;
  PositionMasterRolesId: number;
  PositionMasterResponsibilitiesId: number;
  PositionMasterActivityId: number;
  PositionMasterAuthoritiesId: number;
  PositionMasterKpaid: number;
  PositionMasterEmployeeTypeId: number;

  PositionMasterRemark: string;
  PositionMasterAuthRemark: string;
  PositionMasterAuth: boolean;
  PositionMasterIsDiscard: boolean;
  PositionMasterIsActive: boolean;

  CreatedBy?: string;
  CreatedDate?: string;
}

// Child details (already existing)
export interface IRoleDetails {
  RoleDetailsId: number;
  RoleId: number;
  SrNo: number;
  PositionMasterRoleDetailsDescription: string;
}

// 👇 New extension for dialog/form use
export interface IPositionMasterPayload extends IPositionMaster {
  descriptions?: {
    qual: string;
    srno: number;
    desc: string;
  }[];

  // If you also want to carry role/responsibility/activity/kpa details in one payload:
  RoleDetailsList?: IRoleDetails[];
  ResponsibilitiesDetailsList?: any[]; // define properly if you have a model
  ActivityDetailsList?: any[];
  AuthoritiesDetailsList?: any[];
  KPADetailsList?: any[];
  QualificationDetails?: {
    qual: string;
    srno: number;
    desc: string;
  }[];
}
