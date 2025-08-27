export interface IQualification {
    QualificationId: number;
    MasterQualificationTypeID: number;
    QualificationCode: string;
    QualificationName: string;
    QualificationRemark: string;
    QualificationAuth: boolean;
    QualificationIsDiscard: boolean;
    QualificationIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
}