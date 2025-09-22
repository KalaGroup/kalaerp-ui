import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '@shared/interfaces/hr/country';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class CitymasterService {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.baseUrl}CountryMaster/getallcountries`);
  }

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CurrencyMaster/getallcurrency`);
  }

  getAllCurrencyDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CurrencyMaster/getallcurrencydetails`);
  }

  // country methods
  insertCountry(insertCountry: ICountry): Observable<any> {
    return this.http.post(`${this.baseUrl}CountryMaster/createcountry`, insertCountry);
  }

  updateCountry(updateCountry: ICountry): Observable<any> {
    return this.http.put(`${this.baseUrl}CountryMaster/updatecountry`, updateCountry);
  }

  deleteCountry(countryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}CityMaster/DeleteCity/${countryId}`);
  }

  // City Dropdown methods for City and District
  getAllState(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}StateMaster/getstatebycountryid/${countryId}`);
  }

  getAllDistrict(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}DistrictMaster/getdistrictdetailsbycountryid/${stateId}`
    );
  }

  // Example: Get all records
  getAllCity(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CityMaster/GetAllCity`);
  }

  AddCity(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}CityMaster/AddCity`, data);
  }

  updateCity(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}CityMaster/UpdateCity`, data);
  }

  deleteCity(CityID: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}CityMaster/DeleteCity/${CityID}`);
  }

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
}
