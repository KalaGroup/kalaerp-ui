import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentbudgetServices {
  private baseUrl = apiEnvironment.baseUrl;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) { }

  // 🔹 GET all department budgets
  getAllDepartmentBudget(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}DepartmentBudget/GetAllDepartmentBudget`
    );
  }

  // 🔹 INSERT department budget
  insertDepartmentBudget(departmentBudget: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}DepartmentBudget/InsertDepartmentBudget`,
      departmentBudget
    );
  }

  // 🔹 UPDATE department budget
  updateDepartmentBudget(departmentBudget: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}DepartmentBudget/UpdateDepartmentBudget`,
      departmentBudget
    );
  }

  // 🔹 DELETE department budget by ID
  deleteDepartmentBudget(departmentBudgetId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}DepartmentBudget/DeleteDepartmentBudget/${departmentBudgetId}`
    );
  }

  // 🔹 GET all financial years
  getAllFinancialYear(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}DepartmentBudget/GetFinancialYear`
    );
  }


  // EmployeeIdFK
  getAllEmployeeId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}RecruitmentMaster/getemployeeidandname`);
  }


  // EmployeeIdFK
  getAllDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DepartmentMaster/getalldepartments`);
  }

}
