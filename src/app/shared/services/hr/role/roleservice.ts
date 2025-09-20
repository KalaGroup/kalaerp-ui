import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '@shared/interfaces/hr/role';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Roleservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  // 🔹 GET Methods
  getAllRole(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}RolesMaster/GetAllRoles`);
  }

  getRolesDetailsByMstId(roleMstId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}RolesMaster/getallroledetailsbymasterid/${roleMstId}`
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

  // 🔹 INSERT Method
  insertRole(insertRole: IRole): Observable<any> {
    return this.http.post(`${this.baseUrl}RolesMaster/AddRoles`, insertRole);
  }

  // 🔹 UPDATE Method
  updateRole(updateRole: IRole): Observable<any> {
    return this.http.put(`${this.baseUrl}RolesMaster/UpdateRoles`, updateRole);
  }

  // 🔹 DELETE Method
  deleteRole(RolesId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}RolesMaster/DeleteRole/${RolesId}`);
  }
}
