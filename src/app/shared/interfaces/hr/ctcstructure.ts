export interface ICtcstructure {
  CtcstructureId?: number;
  CtcmasterGradeId?: number;
  CtcmasterBasic: number;
  CtcmasterDa: number;
  CtcmasterHra: number;
  CtcmasterConvAllowance?: number;
  CtcmasterCityCompensatoryAlowance: number;
  CtcmasterLeaveTravelAllowance: number;
  CtcmasterCarAllowance: number;
  CtcmasterFuelAllowance: number;
  CtcmasterDriverAllowance: number;
  CtcmasterMiscAllowance?: number;
  CtcmasterGross?: number;
  CtcmasterPfemployee: number;
  CtcmasterPt: number;
  CtcmasterEsic: number;
  CtcmasterPfemployer: number;
  CtcmasterMedicalInsurance?: number;
  CtcmasterPerformanceKpa?: number;
  CtcmasterGraduity: number;
  CtcmasterBonus?: number;
  CtcmasterMlwf?: number;
  [key: number]: any;
}
