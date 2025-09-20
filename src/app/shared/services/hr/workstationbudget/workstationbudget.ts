import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class WorkstationBudgetservice {
  baseUrl = apiEnvironment.baseUrl;
  constructor(private http: HttpClient) {}

  // 🔹 GET all workstation budgets
  getAllWorkStationbudget(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}WorkstationBudget/GetAllWorkstaionBudget`);
  }

  // 🔹 GET all workstations (FK)
  getAllWorkStation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}WorkstationMaster/GetAllWorkstation`);
  }

  // 🔹 GET all employees (FK)
  getAllEmployeeId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}RecruitmentMaster/getemployeeidandname`);
  }

  // 🔹 INSERT workstation budget
  insertworkstationbudget(insertworkstation: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}WorkstationBudget/InsertworkstationBudget`,
      insertworkstation
    );
  }

  // 🔹 UPDATE workstation budget
  updateworkstationbudget(updateworkstation: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}WorkstationBudget/UpdateWorkstationBudget`,
      updateworkstation
    );
  }

  // 🔹 DELETE workstation budget
  deleteworkstationbudget(WorkstationBudgetId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}WorkstationBudget/DeleteWorkstationBudget/${WorkstationBudgetId}`
    );
  }

  // 🔹 GET all financial years
  getAllFinancialYear(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ProfitcenterBudget/GetFinancialYear`);
  }
}
