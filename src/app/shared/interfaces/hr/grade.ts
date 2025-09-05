export interface IGrade {
  GradeId?: number;
  GradeCode?: string;
  GradeName: string;
  GradeLevel: string;
  MinSalCtc: number;
  MaxSalCtc: number;
  GradeCurrencyId: number;
  GradeDescription: string;
  LeaveEntitlementAnnual: number;
  ProbationPeriod: number;
  NoticePeriod?: number;
  GradeRemark?: string;
  GradeAuth?: boolean;
  GradeIsDiscard?: boolean;
  GradeIsActive?: boolean;
  CreatedBy?: string;
  CreatedDate?: string;
  [key: string]: any;
}
