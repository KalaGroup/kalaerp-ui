import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICtcstructure } from '@shared/interfaces/hr/ctcstructure';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Ctcstructureservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCtcstructure(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CTCStructureMaster/getallctc`);
  }

  insertCtcstructure(insertCtcstructure: ICtcstructure): Observable<any> {
    return this.http.post(`${this.baseUrl}CTCStructureMaster/addctc`, insertCtcstructure);
  }

  updateCtcstructure(updateCtcstructure: ICtcstructure): Observable<any> {
    return this.http.put(`${this.baseUrl}CTCStructureMaster/updatectc`, updateCtcstructure);
  }

  deleteCtcstructure(CtcstructureId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}CTCStructureMaster/deletectc/${CtcstructureId}`);
  }

  getCtcstructureById(CtcstructureId: number): Observable<ICtcstructure> {
    return this.http.get<ICtcstructure>(
      `${this.baseUrl}CTCStructureMaster/getctcbyid/${CtcstructureId}`
    );
  }

  getAllGrade(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GradeMaster/getallgrades`);
  }
}
