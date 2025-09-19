export interface IShiftMaster {
    ShiftMasterId: number;
    ShiftMasterCompanyId: number;
    ShiftMasterEmployeeTypeId: number;
    ShiftMasterName: string;
    ShiftMasterAliseName: string;
    // TimeOnly fields -> usually come as "HH:mm:ss" strings in JSON
    ShiftMasterStartTime: string;
    ShiftMasterEndTime: string;
    ShiftMasterLunchStartTime: string;
    ShiftMasterLunchEndTime: string;
    ShiftMasterRemark: string;
    ShiftMasterAuthRemark: string;
    ShiftMasterAuth: boolean;
    ShiftMasterIsDiscard: boolean;
    ShiftMasterIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date; // ISO string (e.g. "2025-09-18T10:15:00")
}
