export interface IDailyAttendance {
    AttendanceId: number;
    AttendanceEmployeeId: number;
    AttendanceCompanyId: number;
    AttendanceDate: Date;
    InTime: string;
    OutTime: string;
    AttendanceShiftId: number;
    InTimeAuth: boolean;
    OutTimeAuth: boolean;
    AttendanceStatus: string;
    AttendanceRemark: string;
    AttendanceInTimeAuthRemark: string;
    AttendanceOutTimeAuthRemark: string;
    AttendanceIsDiscard: boolean;
    AttendanceIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date;
}
