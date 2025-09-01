export interface IHoliday{
  HolidayId?: number;
  HolidayFy?:string;
  HolidayDate: string;
  HolidayFor: string;
  HolidayCompanyId: number;
  HolidayRemark?:string; 
  HolidayAuthRemark: string;
  HolidayAuth: boolean;
  HolidayIsDiscard: boolean;
  HolidayIsActive:boolean;
  CreatedBy?: string;
  CreatedDate?: string; 
  [key: string]: any;
}