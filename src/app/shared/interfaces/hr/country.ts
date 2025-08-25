export interface ICountry {
  CountryId?: number;
  CountryCode: string;
  CountryName: string;
  CountryShortName: string;
  CurrencyName?: number;
  IsActive: boolean;
  CreatedBy?: number;
  CreatedDate?: string;
  [key: string]: any;
}
