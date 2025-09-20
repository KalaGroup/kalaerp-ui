import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeetype } from '@shared/interfaces/hr/employeetype';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Employeetypeservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllemployeetypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}EmployeeTypeMaster/getallEmployeetype`);
  }

  insertemployeetype(insertemployeetype: IEmployeetype): Observable<any> {
    return this.http.post(
      `${this.baseUrl}EmployeeTypeMaster/InsertEmployeeType`,
      insertemployeetype
    );
  }

  updateemployeetype(updateemployeetype: IEmployeetype): Observable<any> {
    return this.http.put(
      `${this.baseUrl}EmployeeTypeMaster/UpdateEmployeetype`,
      updateemployeetype
    );
  }

  deleteemployeetype(EmployeeTypeId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}EmployeeTypeMaster/DeleteEmployeeTypeById/${EmployeeTypeId}`
    );
  }

  getemployeetypeById(EmployeeTypeId: number): Observable<IEmployeetype> {
    return this.http.get<IEmployeetype>(
      `${this.baseUrl}EmployeeTypeMaster/GetEmployeeTypeByID/${EmployeeTypeId}`
    );
  }
}
