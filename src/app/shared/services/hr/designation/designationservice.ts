import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDesignation } from '@shared/interfaces/hr/designation';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Designationservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllDesignation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DesignationMaster/getdesignation`);
  }

  insertDesignation(insertDesignation: IDesignation): Observable<any> {
    return this.http.post(`${this.baseUrl}DesignationMaster/createDesignation`, insertDesignation);
  }

  updateDesignation(updateDesignation: IDesignation): Observable<any> {
    return this.http.put(`${this.baseUrl}DesignationMaster/updateDesignation`, updateDesignation);
  }

  deleteDesignation(DesignationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DesignationMaster/deleteDesignation/${DesignationId}`);
  }

  getDesignationById(DesignationId: number): Observable<IDesignation> {
    return this.http.get<IDesignation>(
      `${this.baseUrl}DesignationMaster/getDesignationbyid/${DesignationId}`
    );
  }
}
