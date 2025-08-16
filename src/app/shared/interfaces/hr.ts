import { TemplateRef } from "@angular/core";
import { MtxGridColumnButton, MtxGridColumnPinValue, MtxGridColumnTag, MtxGridColumnType, MtxGridColumnTypeParameter, MtxGridSortProp } from "@ng-matero/extensions/grid";
import { Observable } from "rxjs";


export interface Country {
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

export interface Currency {
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


interface MtxGridColumn<T = any> {
    field: string;
    header?: string | Observable<string>;
    hide?: boolean;
    show?: boolean;
    disabled?: boolean;
    pinned?: MtxGridColumnPinValue;
    left?: string;
    right?: string;
    width?: string;
    resizable?: boolean;
    minWidth?: number;
    maxWidth?: number;
    sortable?: boolean | string;
    sortProp?: MtxGridSortProp;
    type?: MtxGridColumnType;
    typeParameter?: MtxGridColumnTypeParameter;
    tag?: MtxGridColumnTag;
    buttons?: MtxGridColumnButton<T>[] | ((rowData: T) => MtxGridColumnButton<T>[]);
    formatter?: (rowData: T, colDef?: MtxGridColumn) => any;
    cellTemplate?: TemplateRef<any> | null;
    showExpand?: boolean;
    description?: string;
    summary?: ((data: T[], colDef?: MtxGridColumn) => any) | string;
    class?: string | ((rowData?: T, colDef?: MtxGridColumn) => string);
}

export interface Company {
  companyID: number;
  companyCode: string;
  companyName: string;
  shortName: string;
  registeredAddress: string;
  registeredCountryID: number;
  registeredStateID: number;
  registeredDistrictID: number;
  registeredCityID: number;
  registeredPinCode: string;
  corporateAddress: string;
  corporateCountryID: number;
  corporateStateID: number;
  corporateDistrictID: number;
  corporateCityID: number;
  corporatePinCode: string;
  phoneNumber: string;
  emailID: string;
  website: string;
  socialMedialink: string;
  pan: string;
  gst: string;
  cin: string;
  establishedDate: Date;
  companyMasterEntityTypeID: number;
  parentCompanyID: number;
  ownershipPercentage: number;
  companyCurrencyID: number;
  fiscalYearStart: Date;
  logo: any;
  aiInsightsEnabled: boolean;
  predictiveAnalyticsLevel: string;
  interCompanyTransactions: boolean;
  locationAdvantageScore: number;
  talentAccessibilityScore: number;
  costEfficiencyRating: number;
  companyRemark: string;
  companyIsAuth: boolean;
  companyIsDiscard: boolean;
  companyIsActive: boolean;
  createdBy: number;
  createdDate: Date;
}