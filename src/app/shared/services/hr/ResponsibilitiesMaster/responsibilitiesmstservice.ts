import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IResponsibilities } from '@shared/interfaces/hr/responsibilitiesmaster';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Responsibilitiesmstservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  // 🔹 GET Methods
  getAllResponsibilities(): Observable<IResponsibilities[]> {
    return this.http.get<IResponsibilities[]>(
      `${this.baseUrl}ResposibilitiesMaster/getallresponsibilities`
    );
  }

  getDesignationList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DesignationMaster/getdesignationidandname`);
  }

  getGradeList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GradeMaster/getgradeidandname`);
  }

  getDivisionList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DivisionMaster/getdivisionidandname`);
  }

  getResponsibilityDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}ResposibilitiesDetail/getresponsibilitiesdetail`);
  }

  getResponsibilitiesDetailsByMstId(responsibilitiesMstId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}ResposibilitiesMaster/getallresponsibilitiesdetailsbymasterid/${responsibilitiesMstId}`
    );
  }

  // 🔹 INSERT Method
  insertResponsibilities(responsibilities: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}ResposibilitiesMaster/addresponsibilities`,
      responsibilities
    );
  }

  // 🔹 UPDATE Method
  updateResponsibilities(responsibilities: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}ResposibilitiesMaster/updateresposibilities`,
      responsibilities
    );
  }

  // 🔹 DELETE Method
  deleteResponsibilities(responsibilitiesId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}ResposibilitiesMaster/deleteresposibilities/${responsibilitiesId}`
    );
  }
}
