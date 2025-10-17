
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeLeaveBalance } from '@shared/interfaces/hr/employeeleavebalance';
import { de } from 'date-fns/locale';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeLeaveBalanceservice {
 

  private baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllEmployeeLeaveBalance(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}EmployeeLeaveBalance/GetAllEmployeeLeaveBalance`
    );
  }

  insertEmployeeLeaveBalance(insertEmployeeLeaveBalance: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}EmployeeLeaveBalance/CreateEmployeeLeaveBalance`,
      insertEmployeeLeaveBalance
    );
  }

  updateEmployeeLeaveBalance(updateEmployeeLeaveBalance: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}EmployeeLeaveBalance/UpdateEmployeeLeaveBalance`,
      updateEmployeeLeaveBalance
    );
  }

  deleteEmployeeLeaveBalance(EmployeeLeaveBalanceId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}EmployeeLeaveBalance/DeleteEmployeeLeaveBalance/${EmployeeLeaveBalanceId}`
    );
  }

  getEmployeeLeaveBalanceById(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}EmployeeLeaveBalance/getEmployeeLeaveBalancebyid`);
  }

  getEmployeeMasterPersonalDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}EmployeeMaster/GetAllEmployeeMasterPersonalDetails`);
  }


}