export interface ICurrency {
  CurrencyId: number;
  CurrencyName: string;
  CurrencySymbol: string;
  CurrencyRemark: string;
  CurrencyAuth: boolean;
  CurrencyIsDiscard: boolean;
  CurrencyIsActive: boolean;
  CreatedBy: number;
  CreatedDate: string;
  [key: string]: any;
}
