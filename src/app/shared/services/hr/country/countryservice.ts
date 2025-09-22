import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ICountry } from '@shared/interfaces/hr/country';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Countryservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.baseUrl}CountryMaster/getallcountries`);
  }

  insertCountry(country: ICountry): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}CountryMaster/createcountry`, country);
  }

  updateCountry(country: ICountry): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}CountryMaster/updatecountry`, country);
  }

  deleteCountry(countryId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}CountryMaster/deletecountry/${countryId}`);
  }

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CurrencyMaster/getallcurrency`);
  }
}
