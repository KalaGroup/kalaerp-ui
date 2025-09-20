import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class shiftmasterservice {
  baseUrl = apiEnvironment.baseUrl;
  constructor(private http: HttpClient) {}

  // 🔹 Company FK
  getAllShiftMasterCompany(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CompanyMaster/getcompany`);
  }

  // 🔹 EmployeeType FK
  getAllemployeetypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}EmployeeTypeMaster/getallEmployeetype`);
  }

  // 🔹 Shift Master
  getAllShiftMaster(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ShiftMaster/GetAllShift`);
  }

  insertShiftMaster(insertShiftMaster: any): Observable<any> {
    return this.http.post(`${this.baseUrl}ShiftMaster/insertshift`, insertShiftMaster);
  }

  UpdateShiftMaster(ShiftMaster: any): Observable<any> {
    return this.http.put(`${this.baseUrl}ShiftMaster/UpdateShift`, ShiftMaster);
  }

  deleteShiftMaster(ShiftMasterId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}ShiftMaster/DeleteShift/${ShiftMasterId}`);
  }
}
