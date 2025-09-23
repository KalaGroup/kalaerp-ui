import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPositionMaster } from '@shared/interfaces/hr/position';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Positionservice {
  private baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  // ✅ CRUD APIs
  getAllPosition(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}PositionMaster/GetAllPosition`);
  }

  insertPosition(insertPosition: any): Observable<any> {
    return this.http.post(`${this.baseUrl}PositionMaster/insertPositionmaster`, insertPosition);
  }

  updatePosition(updatePosition: IPositionMaster): Observable<any> {
    return this.http.put(`${this.baseUrl}PositionMaster/UpdatePosition`, updatePosition);
  }

  deletePosition(PositionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}PositionMaster/deletePosition/${PositionId}`);
  }

  getPositionById(PositionId: number): Observable<IPositionMaster> {
    return this.http.get<IPositionMaster>(`${this.baseUrl}PositionMaster/getPositionbyid/${PositionId}`);
  }

  // ✅ Position details
  getPositionDetailsByMstId(PositionMasterId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}PositionMaster/getallpositiondetailsbymasterid/${PositionMasterId}`);
  }

  // ✅ Department
  getDepartmentByProfitcenterAndDivisionId(profitCenterId: number, divisionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DepartmentMaster/getdepartments/${profitCenterId}/${divisionId}`);
  }

  // ✅ Designations
  getDesignationsByGrade(gradeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DesignationMaster/getdesignations/${gradeId}`);
  }

  // ✅ Roles
  getRolesDetailsByCombination(gradeId: number, designationId: number, divisionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}RolesDetails/getrolesdetails/${gradeId}/${designationId}/${divisionId}`);
  }

  // ✅ Responsibilities
  getResponsibilitiesDetailsByCombination(gradeId: number, designationId: number, divisionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ResposibilitiesDetail/getResponsibiltiesdetails/${gradeId}/${designationId}/${divisionId}`);
  }

  // ✅ Activity
  getActivityDetailsByCombination(gradeId: number, designationId: number, divisionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ActivityDetails/getActivitydetails/${gradeId}/${designationId}/${divisionId}`);
  }

  // ✅ Authorities
  getAuthoritiesDetailsByCombination(gradeId: number, designationId: number, divisionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}AuthoritieDetail/getAuthoritiesdetails/${gradeId}/${designationId}/${divisionId}`);
  }

  // ✅ KPA
  getKPADetailsByCombination(gradeId: number, designationId: number, divisionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}KPADetails/getKPAdetails/${gradeId}/${designationId}/${divisionId}`);
  }
}
