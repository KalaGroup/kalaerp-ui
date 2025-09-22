import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartment } from '@shared/interfaces/hr/department';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Departmentservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllDepartment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DepartmentMaster/getalldepartments`);
  }

  insertDepartment(insertDepartment: IDepartment): Observable<any> {
    return this.http.post(`${this.baseUrl}DepartmentMaster/CreateDepartment`, insertDepartment);
  }

  updateDepartment(updateDepartment: IDepartment): Observable<any> {
    return this.http.put(`${this.baseUrl}DepartmentMaster/updatedepartment`, updateDepartment);
  }

  deleteDepartment(stateId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DepartmentMaster/deletedepartment/${stateId}`);
  }

  getDepartmentById(stateId: number): Observable<IDepartment> {
    return this.http.get<IDepartment>(
      `${this.baseUrl}DepartmentMaster/getdepartmentbyid/${stateId}`
    );
  }
}
