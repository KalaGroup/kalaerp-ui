import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '@shared/interfaces/hr/role';


@Injectable({
  providedIn: 'root',
})
export class Roleservice {
  private RoleUrl = 'https://localhost:7019/api/RolesMaster/GetAllRoles';
  private insertRoleUrl = 'https://localhost:7019/api/RolesMaster/AddRoles';
  private updateRoleUrl = 'https://localhost:7019/api/RolesMaster/UpdateRoles';
  private deleteRoleUrl = 'https://localhost:7019/api/RolesMaster/DeleteRole';
  private getallroledetailsbymasterid ='https://localhost:7019/api/RolesMaster/getallroledetailsbymasterid';
  private getDesignationListUrl ='https://localhost:7019/api/DesignationMaster/getdesignationidandname';
  private getGradeListUrl = 'https://localhost:7019/api/GradeMaster/getgradeidandname';
  private getDivisionListUrl = 'https://localhost:7019/api/DivisionMaster/getdivisionidandname';

    constructor(private http: HttpClient) {}

    getAllRole(): Observable<any[]> {
    return this.http.get<any[]>(this.RoleUrl)
  }

  insertRole(insertRole: IRole): Observable<any> {
    return this.http.post(this.insertRoleUrl, insertRole);
  }
  updateRole(updateRole: IRole): Observable<any> {
    return this.http.put(this.updateRoleUrl, updateRole);
  }
  deleteRole(RolesId: number): Observable<any> {
    return this.http.delete(`${this.deleteRoleUrl}/${RolesId}`);
  }
    getRolesDetailsByMstId(roleMstId: number): Observable<any> {
    return this.http.get<any>(`${this.getallroledetailsbymasterid}/${roleMstId}`);
  }

  getDesignationList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.getDesignationListUrl}`);
  }

  getGradeList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.getGradeListUrl}`);
  }

  getDivisionList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.getDivisionListUrl}`);
  }
}