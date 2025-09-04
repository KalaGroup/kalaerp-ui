
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IResponsibilities } from '@shared/interfaces/hr/responsibilitiesmaster';

@Injectable({
  providedIn: 'root',
})
export class Responsibilitiesmstservice {
  private getAllResponsibilitiesUrl =
    'https://localhost:7019/api/ResposibilitiesMaster/getallresponsibilities';
  private getDesignationListUrl =
    'https://localhost:7019/api/DesignationMaster/getdesignationidandname';
  private getGradeListUrl = 'https://localhost:7019/api/GradeMaster/getgradeidandname';
  private getDivisionListUrl = 'https://localhost:7019/api/DivisionMaster/getdivisionidandname';
  private insertResponsibilitiesUrl =
    'https://localhost:7019/api/ResposibilitiesMaster/addresponsibilities';
    private updateResponsibilitiesUrl =
    'https://localhost:7019/api/ResposibilitiesMaster/updateresposibilities';
  private deleteResponsibilitiesUrl =
    'https://localhost:7019/api/ResposibilitiesMaster/deleteresposibilities';

  private getAllResponsibilitiesDts =
    'https://localhost:7019/api/ResposibilitiesDetail/getresponsibilitiesdetail';

  private getAllResponsibilityDetailsbyMstId =
    'https://localhost:7019/api/ResposibilitiesMaster/getallresponsibilitiesdetailsbymasterid';

  constructor(private http: HttpClient) {}

  //GET Method
  getAllResponsibilities(): Observable<IResponsibilities[]> {
    return this.http.get<IResponsibilities[]>(`${this.getAllResponsibilitiesUrl}`);
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

  getResponsibilityDetails(): Observable<any> {
    return this.http.get<any>(`${this.getAllResponsibilitiesDts}`);
  }

  getResponsibilitiesDetailsByMstId(responsibilitiesMstId: number): Observable<any> {
    return this.http.get<any>(
      `${this.getAllResponsibilityDetailsbyMstId}/${responsibilitiesMstId}`
    );
  }

  //insert
  insertResponsibilities(responsibilities: any): Observable<any> {
    return this.http.post<any>(`${this.insertResponsibilitiesUrl}`, responsibilities);
  }

  updateResponsibilities(responsibilities: any): Observable<any> {
    return this.http.put<any>(`${this.updateResponsibilitiesUrl}`, responsibilities);
  }

  deleteResponsibilities(responsibilitiesId: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteResponsibilitiesUrl}/${responsibilitiesId}`);
  }
}

