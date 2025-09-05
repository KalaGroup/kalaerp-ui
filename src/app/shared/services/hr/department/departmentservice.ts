
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartment } from '@shared/interfaces/hr/department'; 

@Injectable({
  providedIn: 'root',
})
export class Departmentservice {
    private getDepartmentUrl = 'https://localhost:7019/api/DepartmentMaster/getalldepartments';
  private insertDepartmentUrl = 'https://localhost:7019/api/DepartmentMaster/CreateDepartment';
  private updateDepartmentUrl = 'https://localhost:7019/api/DepartmentMaster/updatedepartment';
  private deleteDepartmentUrl = 'https://localhost:7019/api/DepartmentMaster/deletedepartment';
  private getDepartmentByIdUrl = 'https://localhost:7019/api/DepartmentMaster/getdepartmentbyid';

    constructor(private http: HttpClient) {}

    getAllDepartment(): Observable<any[]> {
    return this.http.get<any[]>(this.getDepartmentUrl)
  }

  insertDepartment(insertDepartment: IDepartment): Observable<any> {
    return this.http.post(this.insertDepartmentUrl, insertDepartment);
  }
  updateDepartment(updateDepartment: IDepartment): Observable<any> {
    return this.http.put(this.updateDepartmentUrl, updateDepartment);
  }
  deleteDepartment(stateId: number): Observable<any> {
    return this.http.delete(`${this.deleteDepartmentUrl}/${stateId}`);
  }
  getDepartmentById(stateId: number): Observable<IDepartment> {
    return this.http.get<IDepartment>(`${this.getDepartmentByIdUrl}/${stateId}`);
  }
}