import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmpmstforupdationmst } from '@shared/interfaces/hr/empmstupdationformst';

@Injectable({
  providedIn: 'root'
})
export class Empmstupdationforservice {
  private employeeMasterUpdationFor = 'https://localhost:7019/api/EmployeeMasterUpdationForMaster/GetEmployeeMasterUpdationForDetails';
  private insertemployeeMasterUpdationForUrl = 'https://localhost:7019/api/EmployeeMasterUpdationForMaster/CreateEmployeeMasterUpdationFor';
  private updateemployeeMasterUpdationForUrl = 'https://localhost:7019/api/EmployeeMasterUpdationForMaster/UpdateEmployeeMasterUpdationFor';
  private deleteemployeeMasterUpdationForUrl = 'https://localhost:7019/api/EmployeeMasterUpdationForMaster/DeleteEmployeeMasterUpdationFor';
  private getemployeeMasterUpdationForUrl = 'https://localhost:7019/api/EmployeeMasterUpdationForMaster/GetEmployeeMasterUpdationForById';

    constructor(private http: HttpClient) {}

    getAllemployeeMasterUpdationFor(): Observable<any[]> {
    return this.http.get<any[]>(this.employeeMasterUpdationFor)
  }

  insertemployeeMasterUpdationFor(insertemployeeMasterUpdationFor: IEmpmstforupdationmst): Observable<any> {
    debugger;
    return this.http.post(this.insertemployeeMasterUpdationForUrl, insertemployeeMasterUpdationFor);
  }
  updateemployeeMasterUpdationFor(updateemployeeMasterUpdationFor: IEmpmstforupdationmst): Observable<any> {
    return this.http.put(this.updateemployeeMasterUpdationForUrl, updateemployeeMasterUpdationFor);
  }
  deleteemployeeMasterUpdationFor(EmployeeMasterUpdationForId: number): Observable<any> {
    debugger;
    return this.http.delete(`${this.deleteemployeeMasterUpdationForUrl}/${EmployeeMasterUpdationForId}`);
  }
  getemployeeMasterUpdationForByID(EmployeeMasterUpdationForId: number): Observable<IEmpmstforupdationmst> {
    return this.http.get<IEmpmstforupdationmst>(`${this.getemployeeMasterUpdationForUrl}/${EmployeeMasterUpdationForId}`);
  }
}

