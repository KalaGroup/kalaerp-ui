export interface IDepartmentBudget {
  DepartmentBudgetId: number;
  DepartmentBudgetDepartmentId: number;
  DepartmentFy: string;
  DepartmentBudgetAmt: number;
  DepartmentBudgetHeadId: number;
  DepartmentBudgetRemark: string;
  DepartmentBudgetAuthRemark: string;
  DepartmentBudgetAuth: boolean;
  DepartmentBudgetIsDiscard: boolean;
  DepartmentBudgetIsActive: boolean;
  CreatedBy: any;
  CreatedDate: Date;
  UpdatedBy: number;
  UpdatedDate: Date;
}
