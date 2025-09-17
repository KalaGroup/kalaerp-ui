export interface IRecruitmentMaster {
    RecruitmentMasterId: number;
    RecruitmentMasterPositionId: number;
    RecruitmentMasterCode: string;
    RecruitmentMasterReferenceId: number;
    RecruitmentMasterReferenceName: string;
    RecruitmentMasterReferenceCode: string;
    RecruitmentMasterNameOfCandidates: string;
    RecruitmentMasterCityId: number;
    RecruitmentMasterCompanyId: number;
    RecruitmentMasterCandidateEmailId: string;
    RecruitmentMasterCandidateContactNumber: string;
    RecruitmentMasterAppropriateForJobRole: string;
    RecruitmentMasterInterviewerEmployeeId: number;
    RecruitmentMasterInterviewerComment: string;
    RecruitmentMasterGradeId: number;
    RecruitmentMasterDesignationId: number;
    RecruitmentMasterCurrentCTCPA: number;
    RecruitmentMasterExpectedCTCPA: number;
    RecruitmentMasterRecommendedCTCPA: number;
    RecruitmentMasterExpectedJoiningDate: Date;   // Use Date type for Angular date handling
    RecruitmentMasterHRComment: string;
    RecruitmentMasterRecruitmentStageStatusID: number;
    RecruitmentMasterOfferLetterStatus: string;
    RecruitmentMasterRemark: string;
    RecruitmentMasterAuthRemark: string;
    RecruitmentMasterAuth: boolean;
    RecruitmentMasterIsDiscard: boolean;
    RecruitmentMasterIsActive: boolean;
    CreatedBy: number;   // depends on your backend, can be userId or username
    CreatedDate: Date;
}

