export interface IERPPageAssignmentRelationship {
    ErppageAssignmentRelationshipId?: number;
    ErppageAssignmentRelationshipDivisionId: number;
    ErppageAssignmentRelationshipDepartmentId: number;
    ErppageAssignmentRelationshipProfitcenterId: number;
    ErppageAssignmentRelationshipRemark?: string;
    ErppageAssignmentRelationshipAuth1Remark?: string;
    ErppageAssignmentRelationshipAuth2Remark?: string;
    ErppageAssignmentRelationshipAuth1: boolean;
    ErppageAssignmentRelationshipAuth2: boolean;
    ErppageAssignmentRelationshipIsDiscard: boolean;
    ErppageAssignmentRelationshipIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
    UpdatedBy?: number;
    UpdatedDate?: Date;

}