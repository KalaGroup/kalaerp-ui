export interface IQualificationtype {
  QualificationTypeId: number;
  QualificationTypeCode: string;
  QualificationTypeName: string;
  QualificationTypeRemark: string;
  QualificationTypeAuth: boolean;
  QualificationTypeIsDiscard: boolean;
  QualificationTypeIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string;
}
