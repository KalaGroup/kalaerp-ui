import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class ProfitcenterBudgetservice {
  baseUrl = apiEnvironment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllProfitcenterbudget(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ProfitcenterBudget/getprofitcenterbudget`);
  }

  // profitcenterFK
  getAllProfitcenter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ProfitcenterMaster/getallprofitcenter`);
  }

  // EmployeeIdFK
  getAllEmployeeId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}RecruitmentMaster/getemployeeidandname`);
  }

  insertProfitcenterbudget(insertProfitcenter: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}ProfitcenterBudget/addprofitcenterbudget`,
      insertProfitcenter
    );
  }

  updateProfitcenterbudget(updateProfitcenter: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}ProfitcenterBudget/updateprofitcenterbudget`,
      updateProfitcenter
    );
  }

  deleteProfitcenterbudget(ProfitcenterBudgetId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}ProfitcenterBudget/deleteprofitcenterbudge/${ProfitcenterBudgetId}`
    );
  }

  getAllFinancialYear(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ProfitcenterBudget/GetFinancialYear`);
  }
}
