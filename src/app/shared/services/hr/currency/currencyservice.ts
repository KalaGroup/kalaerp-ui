import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root',
})
export class Currencyservice {
  private currencyUrl = 'https://localhost:7019/api/CurrencyMaster';

  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.currencyUrl}/getallcurrencydetails`);
  }
}
