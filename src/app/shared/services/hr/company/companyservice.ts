import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '@shared/interfaces/hr/country';
import { ICompany } from '@shared/interfaces/hr/company';
import { apiEnvironment  } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Companyservice {

  baseUrl = apiEnvironment.baseUrl;
  //baseUrl = "https://localhost:7019/api/";
  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<ICompany[]> {
     return this.http.get<ICompany[]>(`${this.baseUrl}CompanyMaster/getcompany`);
  }

  getAllCompanyEntityTypes(): Observable<any[]> {
   return this.http.get<any[]>(`${this.baseUrl}CompanyEntityTypeMaster/getallcompanyentitytype`);
  }

  getRStatesByCounrtyId(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}StateMaster/getstatebycountryid/${countryId}`);
  }

  getRDistrictsByStateId(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DistrictMaster/getdistrictdetailsbycountryid/${stateId}`);
  }

  getRCitiesByDistrictId(districtId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CityMaster/getcitydetailsbydistrictid/${districtId}`);
  }

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CurrencyMaster/getallcurrency`);
  }

  getAllCountries(): Observable<ICountry[]> {
      return this.http.get<ICountry[]>(`${this.baseUrl}CountryMaster/getallcountries`);
  }

  getParentCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CompanyMaster/getparentcompanyidandname`);
  }

  createCompany(companyData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}CompanyMaster/addcompany`, companyData);
  }

  updateCompany(companyData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}CompanyMaster/updatecompany`, companyData);
  }

  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}CompanyMaster/deletecompany/${companyId}`);
  }
}
