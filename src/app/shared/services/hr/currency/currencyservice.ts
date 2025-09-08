import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Currency } from '@shared/interfaces/hr';


@Injectable({
  providedIn: 'root',
})
export class Currencyservice {
  // 

  constructor(private http: HttpClient) { }
  private currencyUrl = 'https://localhost:7019/api/CurrencyMaster';
  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.currencyUrl}/getallcurrencydetails`);
  }
  insertcurrency = 'https://localhost:7019/api/CurrencyMaster/createcurrency';
  insertCurrency(currecnyURL: Currency): Observable<any> {
    return this.http.post(this.insertcurrency, currecnyURL);
  }
  updatecurrency = 'https://localhost:7019/api/CurrencyMaster/updatecurrency';
  updateCurrency(updatecurrency: Currency): Observable<any> {
    return this.http.put(this.updatecurrency, updatecurrency);
  }
  deleteurl = 'https://localhost:7019/api/CurrencyMaster/deletecurrency'
  deleteCurrency(CurrencyId: number): Observable<any> {
    return this.http.delete(`${this.deleteurl}/${CurrencyId}`);

  }

}
