import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '@shared/interfaces/hr/country';

@Injectable({
  providedIn: 'root'
})
export class CitymasterService {
    private countryUrl = 'https://localhost:7019/api/CountryMaster';
  private currencyUrl = 'https://localhost:7019/api/CurrencyMaster';
  private countryDetailsUrl = 'https://localhost:7019/api/CurrencyMaster';
  private insertCountryUrl = 'https://localhost:7019/api/CountryMaster/createcountry';
  private updateCountryUrl = 'https://localhost:7019/api/CountryMaster/updatecountry';
  private deleteCountryUrl = 'https://localhost:7019/api/CityMaster/DeleteCity';

private AddCityURL = 'https://localhost:7019/api/CityMaster/AddCity';
private UpdateCityURL = 'https://localhost:7019/api/CityMaster/UpdateCity';
private deleteCityURL = 'https://localhost:7019/api/CityMaster/DeleteCity';

// District URLs
private  AddDistrictURL = 'https://localhost:7019/api/DistrictMaster/CreatedDistrict';
private UpdateDistrictURL = 'https://localhost:7019/api/DistrictMaster/UpdateDistrict';
private deleteDistrictURL = 'https://localhost:7019/api/DistrictMaster/DeleteDistrict';





  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.countryUrl}/getallcountries`);
  }

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.currencyUrl}/getallcurrency`);
  }

  getAllCurrencyDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.countryDetailsUrl}/getallcurrencydetails`);
  }
// country methods
  insertCountry(insertCountry: ICountry): Observable<any> {
   return this.http.post(`${this.insertCountryUrl}`, insertCountry);
  }

  updateCountry(updateCountry: ICountry): Observable<any> {
    return this.http.put(`${this.updateCountryUrl}`, updateCountry);
  }

   deleteCountry(countryId: number): Observable<any> {
    return this.http.delete(`${this.deleteCountryUrl}/${countryId}`);
  }

// City Dropdown methods for City and District
getAllState(countryId: number): Observable<any[]> {
  return this.http.get<any[]>(`https://localhost:7019/api/StateMaster/getstatebycountryid/${countryId}`);
}

getAllDistrict(stateId: number): Observable<any[]> {
  return this.http.get<any[]>(`https://localhost:7019/api/DistrictMaster/getdistrictdetailsbycountryid/${stateId}`);
}


  // Example: Get all records
  getAllCity(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7019/api/CityMaster/GetAllCity`);
  }

  AddCity(data: any): Observable<any> {
    return this.http.post<any>(this.AddCityURL, data);
  }

 updateCity(data: any): Observable<any> {
    return this.http.put<any>(`${this.UpdateCityURL}`, data);
  }

  deleteCity(CityID: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteCityURL}/${CityID}`);
  }

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


}
