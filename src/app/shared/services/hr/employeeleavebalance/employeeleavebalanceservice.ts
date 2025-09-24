
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeLeaveBalance } from '@shared/interfaces/hr/employeeleavebalance';
import { de } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class EmployeeLeaveBalanceservice {
  private EmployeeLeaveBalanceUrl = 'https://localhost:7019/api/EmployeeLeaveBalance/GetAllEmployeeLeaveBalance';
  private insertEmployeeLeaveBalanceUrl = 'https://localhost:7019/api/EmployeeLeaveBalance/CreateEmployeeLeaveBalance';
  private updateEmployeeLeaveBalanceUrl = 'https://localhost:7019/api/EmployeeLeaveBalance/UpdateEmployeeLeaveBalance';
  private deleteEmployeeLeaveBalanceUrl = 'https://localhost:7019/api/EmployeeLeaveBalance/DeleteEmployeeLeaveBalance';
  private getEmployeeLeaveBalanceByIdUrl = 'https://localhost:7019/api/EmployeeLeaveBalance/getEmployeeLeaveBalancebyid';
  private EmployeeMasterPersonalDetailsUrl = 'https://localhost:7019/api/EmployeeMaster/GetAllEmployeeMasterPersonalDetails';

  constructor(private http: HttpClient) { }

  getAllEmployeeLeaveBalance(): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(this.EmployeeLeaveBalanceUrl)
  }
  insertEmployeeLeaveBalance(insertEmployeeLeaveBalance: IEmployeeLeaveBalance): Observable<any> {
    return this.http.post(this.insertEmployeeLeaveBalanceUrl, insertEmployeeLeaveBalance);
  }
  updateEmployeeLeaveBalance(updateEmployeeLeaveBalance: IEmployeeLeaveBalance): Observable<any> {
    return this.http.put(this.updateEmployeeLeaveBalanceUrl, updateEmployeeLeaveBalance);
  }
  deleteEmployeeLeaveBalance(EmployeeLeaveBalanceId: number): Observable<any> {
    return this.http.delete(`${this.deleteEmployeeLeaveBalanceUrl}/${EmployeeLeaveBalanceId}`);
  }
  getEmployeeLeaveBalanceById(EmployeeLeaveBalanceId: number): Observable<IEmployeeLeaveBalance> {
    return this.http.get<IEmployeeLeaveBalance>(`${this.getEmployeeLeaveBalanceByIdUrl}/${EmployeeLeaveBalanceId}`);
  }
getEmployeeMasterPersonalDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.EmployeeMasterPersonalDetailsUrl)
  }

      private employeeurl = 'https://localhost:7019/api/RecruitmentMaster'
    getAllEmployeeId(): Observable<any[]> {
        return this.http.get<any[]>(`${this.employeeurl}/getemployeeidandname`);
    }
}