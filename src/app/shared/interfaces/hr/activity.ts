export interface IActivity {
    ActivityId?: number;
    ActivityGradeId: number;
    ActivityDesignationId: number;
    ActivityDivisionId: number;
    ActivityRemark?: string;
    ActivityAuthRemark?: string;
    ActivityAuth: boolean;
    ActivityIsDiscard: boolean;
    ActivityIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
    

}



