export interface IKalaErpPageDetails{
  KalaErppageDetailsId?: number;
  KalaErppageDetailsDivisionId?:number;
  toUpperCase: string;
  PageUrl: string;
  PageType: string;
  PageIsonumber?:string; 
  KalaErppageDetailsRemark: string;
  KalaErppageDetailsAuthRemark: string;
  KalaErppageDetailsAuth: boolean;
  KalaErppageDetailsIsDiscard:boolean;
  KalaErppageDetailsIsActive: boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  UpdatedBy?: string;
  UpdatedDate?: string;
  [key: string]: any;
}