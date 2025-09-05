import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDesignation } from '@shared/interfaces/hr/designation';


@Injectable({
  providedIn: 'root',
})
export class Designationservice {
  private DesignationUrl = 'https://localhost:7019/api/DesignationMaster/getdesignation';
  private insertDesignationUrl = 'https://localhost:7019/api/DesignationMaster/createDesignation';
  private updateDesignationUrl = 'https://localhost:7019/api/DesignationMaster/updateDesignation';
  private deleteDesignationUrl = 'https://localhost:7019/api/DesignationMaster/deleteDesignation'; 
  private getDesignationByIdUrl = 'https://localhost:7019/api/DesignationMaster/getDesignationbyid';

    constructor(private http: HttpClient) {}

  getAllDesignation(): Observable<any[]> {
    return this.http.get<any[]>(this.DesignationUrl)
  }
  insertDesignation(insertDesignation: IDesignation): Observable<any> {
    return this.http.post(this.insertDesignationUrl, insertDesignation);
  }
  updateDesignation(updateDesignation: IDesignation): Observable<any> {
    return this.http.put(this.updateDesignationUrl, updateDesignation);
  }
  deleteDesignation(DesignationId: number): Observable<any> {
    return this.http.delete(`${this.deleteDesignationUrl}/${DesignationId}`);
  }
  getDesignationById(DesignationId: number): Observable<IDesignation> {
    return this.http.get<IDesignation>(`${this.getDesignationByIdUrl}/${DesignationId}`);
  }
}