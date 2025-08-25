export interface ICompany {
  AiinsightsEnabled: boolean;
  Cin: string;
  CompanyCode: string;
  CurrencyName: string;
  CompanyId: number;
  CompanyIsActive: boolean;
  CompanyIsAuth: boolean;
  CompanyIsDiscard: boolean;
  CompanyEntityTypeName: string;
  CompanyName: string;
  CompanyRemark: string;
  CompanyRemark2: string;
  CorporateAddress: string;
  CorporateCityName: string;
  CorporateCountryName: string;
  CorporateDistrictName: string;
  CorporatePinCode: string;
  CorporateStateName: string;
  CostEfficiencyRating: number;
  CreatedBy: number;
  CreatedDate: string;   // can use Date if you parse it
  EmailId: string;
  EstablishedDate: string; // can use Date
  FiscalYearStart: string; // can use Date
  Gst: string;
  InterCompanyTransactions: boolean;
  LocationAdvantageScore: number;
  Logo: string | null;
  OwnershipPercentage: number;
  Pan: string;
  ParentCompanyName: string | null;
  PhoneNumber: string;
  PredictiveAnalyticsLevel: string;
  RegisteredAddress: string;
  RegisteredCityName: string;
  RegisteredCountryName: string;
  RegisteredDistrictName: string;
  RegisteredPinCode: string;
  RegisteredStateName: string;
  SNo: number;
  ShortName: string;
  SocialMedialink: string;
  TalentAccessibilityScore: number;
  Website: string;
}
