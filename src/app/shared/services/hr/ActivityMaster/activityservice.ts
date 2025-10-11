
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IActivity } from '@shared/interfaces/hr/activity';
import { apiEnvironment  } from '@core';

@Injectable({
    providedIn: 'root',
})

export class Activityservcie {
  getAllERPPageAssignmentRelationships() {
    throw new Error('Method not implemented.');
  }

   baseUrl = apiEnvironment.baseUrl;

    constructor(private http: HttpClient) { }

  private activityUrl = `${this.baseUrl}ActivityMaster`;
  getAllActivity(): Observable<any[]> {
    return this.http.get<any[]>(`${this.activityUrl}/getactivity`);
  }

  private insertactivityUrl = `${this.baseUrl}ActivityMaster/addactivity`;
  insertActivity(insertActivity: any): Observable<any> {
    return this.http.post(`${this.insertactivityUrl}`, insertActivity);
  }

  private updateactivityUrl = `${this.baseUrl}ActivityMaster/updateactivity`;
  updateActivity(updateActivity: any): Observable<any> {
    return this.http.put(`${this.updateactivityUrl}`, updateActivity);
  }

  private deleteactivityUrl = `${this.baseUrl}ActivityMaster/deleteactivity`;
  deleteActivity(ActivityId: number): Observable<any> {
    return this.http.delete(`${this.deleteactivityUrl}/${ActivityId}`);
  }

  private gradeUrl = `${this.baseUrl}GradeMaster`;
  getAllGrade(): Observable<any[]> {
    return this.http.get<any[]>(`${this.gradeUrl}/getgradeidandname`);
  }

  private designationUrl = `${this.baseUrl}DesignationMaster`;
  getAllDesignations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.designationUrl}/getdesignationidandname`);
  }

  private divisionUrl = `${this.baseUrl}DivisionMaster`;
  getAllDivisions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.divisionUrl}/getdivisionidandname`);
  }

  private activityMsturl = `${this.baseUrl}ActivityMaster/getallactivitysdetailsbymasterid`;
  getActivityByMstId(activityMstId: number): Observable<any> {
    return this.http.get<any>(`${this.activityMsturl}/${activityMstId}`);
  }
}
