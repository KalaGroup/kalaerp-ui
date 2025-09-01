export interface IFacilityMaster {
    FacilityId: number;
    FaciltyCode: string;
    FacilityName: string;
    FacilityRemark: string;
    FacilityAuth: boolean;
    FacilityIsDiscard: boolean;
    FacilityIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
}