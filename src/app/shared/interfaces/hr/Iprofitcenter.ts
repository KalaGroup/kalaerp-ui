export interface Iprofitcentermaster {
    ProfitCenterId: number;
    ProfitCenterCode: string;
    ProfitCenterName: string;
    ProfitCenterCompanyId: number;
    ParentProfitCenterId: number; // Use `null` if it's optional
    ProfitCenterRemark: string;
    ProfitCenterAuthRemark: string;
    ProfitCenterAuth: boolean;
    ProfitCenterIsDiscard: boolean;
    ProfitCenterIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date; // or `Date` if you parse it
}
