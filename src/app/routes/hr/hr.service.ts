import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '@shared/interfaces/hr';

@Injectable({
  providedIn: 'root'
})
export class HrService  {
  private countryUrl = 'https://localhost:7019/api/CountryMaster';
  private currencyUrl = 'https://localhost:7019/api/CurrencyMaster';
  private countryDetailsUrl = 'https://localhost:7019/api/CurrencyMaster';
  private insertCountryUrl = 'https://localhost:7019/api/CountryMaster/createcountry';
  private updateCountryUrl = 'https://localhost:7019/api/CountryMaster/updatecountry';
  private deleteCountryUrl = 'https://localhost:7019/api/CountryMaster/deletecountry';
  getAllState: any;


  constructor(private http: HttpClient) {}

  // getAllCountries(): Observable<Country[]> {
  //   return this.http.get<Country[]>(`${this.countryUrl}/getallcountries`);
  // }

  // getAllCurrencies(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.currencyUrl}/getallcurrency`);
  // }

  // getAllCurrencyDetails(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.countryDetailsUrl}/getallcurrencydetails`);
  // }

  // insertCountry(insertCountry: Country): Observable<any> {
  //  return this.http.post(`${this.insertCountryUrl}`, insertCountry);
  // }

  // updateCountry(updateCountry: Country): Observable<any> {
  //   return this.http.put(`${this.updateCountryUrl}`, updateCountry);
  // }

  //  deleteCountry(countryId: number): Observable<any> {
  //   return this.http.delete(`${this.deleteCountryUrl}/${countryId}`);
  // }


}
