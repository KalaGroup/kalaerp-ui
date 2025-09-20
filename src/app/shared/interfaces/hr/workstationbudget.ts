export interface IWorkstationBudget {
  WorkstationBudgetId: number;
  WorkstationBudgetWorkstationId: number;
  WorkstationFy: string;
  WorkstationBudgetAmt: number;
  WorkstationBudgetHeadId: number;
  WorkstationBudgetRemark: string;
  WorkstationBudgetAuthRemark: string;
  WorkstationBudgetAuth: boolean;
  WorkstationBudgetIsDiscard: boolean;
  WorkstationBudgetIsActive: boolean;
  CreatedBy: number;
  CreatedDate: Date;
  UpdatedBy: number;
  UpdatedDate: Date;
}
