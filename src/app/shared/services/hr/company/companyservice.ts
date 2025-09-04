import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '@shared/interfaces/hr/country';
import { ICompany } from '@shared/interfaces/hr/company';

@Injectable({
  providedIn: 'root',
})
export class Companyservice {
  private getAllCompnaiesUrl = 'https://localhost:7019/api/CompanyMaster';
  private getAllCompanyEntityTypeUrl = 'https://localhost:7019/api/CompanyEntityTypeMaster';
  private getAllRStateUrl = 'https://localhost:7019/api/StateMaster/getstatebycountryid';
  private getAllRSistrictUrl ='https://localhost:7019/api/DistrictMaster/getdistrictdetailsbycountryid';
  private getAllRCityUrl = 'https://localhost:7019/api/CityMaster/getcitydetailsbydistrictid';
  private currencyUrl = 'https://localhost:7019/api/CurrencyMaster';
  private countryUrl = 'https://localhost:7019/api/CountryMaster';


  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.getAllCompnaiesUrl}/getcompany`);
  }

  getAllCompanyEntityTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.getAllCompanyEntityTypeUrl}/getallcompanyentitytype`);
  }

  getRStatesByCounrtyId(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getAllRStateUrl}/${countryId}`);
  }

  getRDistrictsByStateId(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getAllRSistrictUrl}/${stateId}`);
  }

  getRCitiesByDistrictId(districtId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getAllRCityUrl}/${districtId}`);
  }

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.currencyUrl}/getallcurrency`);
  }

  getAllCountries(): Observable<ICountry[]> {
      return this.http.get<ICountry[]>(`${this.countryUrl}/getallcountries`);
  }
}
