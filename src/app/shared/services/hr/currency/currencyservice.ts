import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '@shared/interfaces/hr';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Currencyservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CurrencyMaster/getallcurrencydetails`);
  }

  insertCurrency(currecnyURL: Currency): Observable<any> {
    return this.http.post(`${this.baseUrl}CurrencyMaster/createcurrency`, currecnyURL);
  }

  updateCurrency(updatecurrency: Currency): Observable<any> {
    return this.http.put(`${this.baseUrl}CurrencyMaster/updatecurrency`, updatecurrency);
  }

  deleteCurrency(CurrencyId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}CurrencyMaster/deletecurrency/${CurrencyId}`);
  }
}
