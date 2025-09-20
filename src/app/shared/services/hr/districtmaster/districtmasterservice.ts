/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '@shared/interfaces/hr/country';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Districtmasterservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  // District methods
  getAllDistricts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DistrictMaster/GetAllDistrict`);
  }

  AddDistrict(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}DistrictMaster/CreatedDistrict`, data);
  }

  updateDistrict(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}DistrictMaster/UpdateDistrict`, data);
  }

  deleteDistrict(DistrictId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}DistrictMaster/DeleteDistrict/${DistrictId}`);
  }

  // District Dropdown methods for State
  getStateByCountry(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}StateMaster/GetAllState/${countryId}`);
  }

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.baseUrl}CountryMaster/getallcountries`);
  }

  getAllState(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}StateMaster/getstatebycountryid/${countryId}`);
  }

  getAllDistrict(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}DistrictMaster/getdistrictdetailsbycountryid/${stateId}`
    );
  }
}
