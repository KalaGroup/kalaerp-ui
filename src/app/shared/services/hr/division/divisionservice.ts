import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDivision } from '@shared/interfaces/hr/division';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Divisionservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllDivision(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DivisionMaster/GetAllDivision`);
  }

  insertDivision(insertDivision: IDivision): Observable<any> {
    return this.http.post(`${this.baseUrl}DivisionMaster/CreateDivision`, insertDivision);
  }

  updateDivision(updateDivision: IDivision): Observable<any> {
    return this.http.put(`${this.baseUrl}DivisionMaster/UpdateDivision`, updateDivision);
  }

  deleteDivision(DivisionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DivisionMaster/DeleteDivision/${DivisionId}`);
  }

  getDivisionById(DivisionId: number): Observable<IDivision> {
    return this.http.get<IDivision>(`${this.baseUrl}DivisionMaster/getDivisionbyid/${DivisionId}`);
  }
}
