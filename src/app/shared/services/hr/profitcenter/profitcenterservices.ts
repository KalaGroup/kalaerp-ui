import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class profitcenterservices {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllProfitcenter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ProfitcenterMaster/getallprofitcenter`);
  }

  getAllProfitcenterCompany(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CompanyMaster/getcompany`);
  }

  insertProfitcenter(insertProfitcenter: any): Observable<any> {
    return this.http.post(`${this.baseUrl}ProfitcenterMaster/addprofitcenter`, insertProfitcenter);
  }

  updateProfitcenter(updateProfitcenter: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}ProfitcenterMaster/updateprofitcenter`,
      updateProfitcenter
    );
  }

  deleteProfitcenter(ProfitCenterId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}ProfitcenterMaster/deleteprofitcenter/${ProfitCenterId}`
    );
  }
}
