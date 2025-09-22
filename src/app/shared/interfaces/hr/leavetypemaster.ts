export interface ILeaveTypeMaster {
    LeaveTypeMasterId: number;
    LeaveTypeMasterCode: string;
    LeaveTypeMasterName: string;
    LeaveTypeMasterMaxDaysPer: number;
    LeaveTypeMasterContinuosDaysPerYear: number;
    LeaveTypeMasterCanCarryForward: boolean;
    LeaveTypeMasterCanEnCash: boolean;
    LeaveTypeMasterRequiredServiceMonths: number;
    LeaveTypeMasterLeaveTypeRemark: string;
    LeaveTypeMasterAuthRemark: string;
    LeaveTypeMasterAuth: boolean;
    LeaveTypeMasterIsDiscard: boolean;
    LeaveTypeMasterIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date;
}
