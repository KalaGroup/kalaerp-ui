import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ICountry } from '@shared/interfaces/hr/country';

@Injectable({
  providedIn: 'root',
})
export class Countryservice {
  private getAllCountriesUrl = 'https://localhost:7019/api/CountryMaster/getallcountries';
  private insertCountryUrl = 'https://localhost:7019/api/CountryMaster/createcountry';
  private updateCountryUrl = 'https://localhost:7019/api/CountryMaster/updatecountry';
  private deleteCountryUrl = 'https://localhost:7019/api/CountryMaster/deletecountry';
  private currencyUrl = 'https://localhost:7019/api/CurrencyMaster';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.getAllCountriesUrl);
  }

  insertCountry(country: ICountry): Observable<any> {
    return this.http.post<any>(this.insertCountryUrl, country);
  }

  updateCountry(country: ICountry): Observable<any> {
    return this.http.put<any>(this.updateCountryUrl, country);
  }

  deleteCountry(countryId: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteCountryUrl}/${countryId}`);
  }

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.currencyUrl}/getallcurrency`);
  }

}
