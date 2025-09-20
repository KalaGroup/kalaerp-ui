import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmpmstforupdationmst } from '@shared/interfaces/hr/empmstupdationformst';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Empmstupdationforservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllemployeeMasterUpdationFor(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}EmployeeMasterUpdationForMaster/GetEmployeeMasterUpdationForDetails`
    );
  }

  insertemployeeMasterUpdationFor(
    insertemployeeMasterUpdationFor: IEmpmstforupdationmst
  ): Observable<any> {
    debugger;
    return this.http.post(
      `${this.baseUrl}EmployeeMasterUpdationForMaster/CreateEmployeeMasterUpdationFor`,
      insertemployeeMasterUpdationFor
    );
  }

  updateemployeeMasterUpdationFor(
    updateemployeeMasterUpdationFor: IEmpmstforupdationmst
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}EmployeeMasterUpdationForMaster/UpdateEmployeeMasterUpdationFor`,
      updateemployeeMasterUpdationFor
    );
  }

  deleteemployeeMasterUpdationFor(EmployeeMasterUpdationForId: number): Observable<any> {
    debugger;
    return this.http.delete(
      `${this.baseUrl}EmployeeMasterUpdationForMaster/DeleteEmployeeMasterUpdationFor/${EmployeeMasterUpdationForId}`
    );
  }

  getemployeeMasterUpdationForByID(
    EmployeeMasterUpdationForId: number
  ): Observable<IEmpmstforupdationmst> {
    return this.http.get<IEmpmstforupdationmst>(
      `${this.baseUrl}EmployeeMasterUpdationForMaster/GetEmployeeMasterUpdationForById/${EmployeeMasterUpdationForId}`
    );
  }
}
