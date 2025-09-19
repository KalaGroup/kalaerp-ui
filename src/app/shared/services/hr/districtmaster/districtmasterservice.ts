/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '@shared/interfaces/hr/country';

@Injectable({
  providedIn: 'root'
})
export class Districtmasterservice {
  // District URLs
private  AddDistrictURL = 'https://localhost:7019/api/DistrictMaster/CreatedDistrict';
private UpdateDistrictURL = 'https://localhost:7019/api/DistrictMaster/UpdateDistrict';
private deleteDistrictURL = 'https://localhost:7019/api/DistrictMaster/DeleteDistrict';
private countryUrl = 'https://localhost:7019/api/CountryMaster';


constructor(private http : HttpClient) {}

  // District methods
  getAllDistricts(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7019/api/DistrictMaster/GetAllDistrict`);
  }
  AddDistrict(data: any): Observable<any> {
    return this.http.post<any>(this.AddDistrictURL, data);
  }
  updateDistrict(data: any): Observable<any> {

    return this.http.put<any>(`${this.UpdateDistrictURL}`, data);
  }
  deleteDistrict(DistrictId: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteDistrictURL}/${DistrictId}`);
  }
  // District Dropdown methods for State
getStateByCountry(countryId: number): Observable<any[]> {
  return this.http.get<any[]>(`https://localhost:7019/api/StateMaster/GetAllState/${countryId}`);
}
getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.countryUrl}/getallcountries`);
  }
getAllState(countryId: number): Observable<any[]> {
  return this.http.get<any[]>(`https://localhost:7019/api/StateMaster/getstatebycountryid/${countryId}`);
}
getAllDistrict(stateId: number): Observable<any[]> {
  return this.http.get<any[]>(`https://localhost:7019/api/DistrictMaster/getdistrictdetailsbycountryid/${stateId}`);
}

}
