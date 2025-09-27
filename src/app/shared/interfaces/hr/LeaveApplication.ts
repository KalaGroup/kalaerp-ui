export interface ILeaveApplication {
    LeaveApplicationId: number;
    LeaveApplicationsEmployeeId: number;
    LeaveApplicationsLeaveTypeId: number;
    LeaveApplicationsFromDate: string;  // DateOnly → string (ISO format e.g., "2025-09-23")
    LeaveApplicationsToDate: string;    // DateOnly → string
    LeaveApplicationsLeaveCount: number;
    LeaveApplicationsRemark: string;
    LeaveApplicationsAuthRemark: string;
    LeaveApplicationsAuth: boolean;
    LeaveApplicationsIsDiscard: boolean;
    LeaveApplicationsIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;  // DateTime → string ("2025-09-23T13:30:00")
    UpdatedBy: number;
    UpdatedDate: Date;  // DateTime → string
    LeaveBalancesClosing: number;
}
