import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeetype } from '@shared/interfaces/hr/employeetype';

@Injectable({
  providedIn: 'root'
})
export class Employeetypeservice {
  private employeetypeUrl = 'https://localhost:7019/api/EmployeeTypeMaster/getallEmployeetype';
  private insertemployeetypeUrl = 'https://localhost:7019/api/EmployeeTypeMaster/InsertEmployeeType';
  private updateemployeetypeUrl = 'https://localhost:7019/api/EmployeeTypeMaster/UpdateEmployeetype';
  private deleteemployeetypeUrl = 'https://localhost:7019/api/EmployeeTypeMaster/DeleteEmployeeTypeById';
  private getemployeetypeUrl = 'https://localhost:7019/api/EmployeeTypeMaster/GetEmployeeTypeByID';

    constructor(private http: HttpClient) {}

    getAllemployeetypes(): Observable<any[]> {
    return this.http.get<any[]>(this.employeetypeUrl)
  }

  insertemployeetype(insertemployeetype: IEmployeetype): Observable<any> {
    debugger;
    return this.http.post(this.insertemployeetypeUrl, insertemployeetype);
  }
  updateemployeetype(updateemployeetype: IEmployeetype): Observable<any> {
    return this.http.put(this.updateemployeetypeUrl, updateemployeetype);
  }
  deleteemployeetype(EmployeeTypeId: number): Observable<any> {
    debugger;
    return this.http.delete(`${this.deleteemployeetypeUrl}/${EmployeeTypeId}`);
  }
  getemployeetypeById(EmployeeTypeId: number): Observable<IEmployeetype> {
    return this.http.get<IEmployeetype>(`${this.getemployeetypeUrl}/${EmployeeTypeId}`);
  }
}
