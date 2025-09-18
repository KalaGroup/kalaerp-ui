export interface IProfitcenterBudget {
    ProfitcenterBudgetId: number;
    ProfitcenterBudgetProfitcenterId: number;
    ProfitcenterFy: string;
    ProfitcenterBudgetBudgetAmt: number;
    ProfitCenterBudgetHeadId: number;
    ProfitCenterBudgetRemark: string;
    ProfitCenterBudgetAuthRemark: string;
    ProfitCenterBudgetAuth: boolean;
    ProfitCenterBudgetIsDiscard: boolean;
    ProfitCenterBudgetIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date;
}