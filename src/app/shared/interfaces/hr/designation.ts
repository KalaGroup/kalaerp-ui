export interface IDesignation{
  DesignationId?: number;
  DesignationGradeId?:number;
  DesignationCode: number;
  DesignationName: number;
  DesignationQualificationId: string;
  DesignationDescription: string;
  GradeQualificationRemark: boolean;
  RequiredSkills:boolean;
  DesignationRemark: boolean;
  [key: string]: any;
}