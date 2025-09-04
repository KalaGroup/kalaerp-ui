export interface IPetrolAllowance {
    PetrolAllowanceId: number;
    TwoWheelerPerKm: string;
    FourWheelerPerKm: string;
    PetrolAllowanceRemark: string;
    PetrolAllowanceAuthRemark: string;
    PetrolAllowanceIsAuth: boolean;
    PetrolAllowanceIsDiscard: boolean;
    PetrolAllowanceIsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
}