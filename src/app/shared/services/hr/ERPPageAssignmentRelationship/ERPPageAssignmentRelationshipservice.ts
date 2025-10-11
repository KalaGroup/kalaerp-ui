import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Erppageassignmentrelationshipservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) { }



  getAllERPPageAssignmentRelationships(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ERPPageAssignmentRelationship/getAllerpPageAssignmentRelationship`);
  }
  createERPPageAssignmentRelationship(data: any): Observable<any> {
    debugger
    return this.http.post(`${this.baseUrl}ERPPageAssignmentRelationship/adderpPageAssignmentRelationship`, data);
  }

  updateERPPageAssignmentRelationship(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}ERPPageAssignmentRelationship/updateerpPageAssignmentRelationship`, data);
  }

  deleteERPPageAssignmentRelationship(ErppageAssignmentRelationshipId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}ERPPageAssignmentRelationship/deleteerpPageAssignmentRelationship/${ErppageAssignmentRelationshipId}`
    );
  }
  //Load All Division
  private division1Url = `${this.baseUrl}DivisionMaster`;
  getAllDivision(): Observable<any[]> {
    return this.http.get<any[]>(`${this.division1Url}/getdivisionidandname`);
  }
  //Load All Department
  getAllDepartment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DepartmentMaster/getalldepartments`);
  }
  // profitcenterFK
  getAllProfitcenter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ProfitcenterMaster/getallprofitcenter`);
  }

  //-------------------------------Load Deatils table -------------------------------------

  //Load Deatils
  private getAllRelationshipDetailsbyMstId = `${this.baseUrl}ERPPageAssignmentRelationship/geterpPageDetailsByMasterId`;
  getRelationshipDetailsByMstId(ErppageAssignmentRelationshipId: number): Observable<any> {
    return this.http.get<any>(`${this.getAllRelationshipDetailsbyMstId}/${ErppageAssignmentRelationshipId}`);
  }
  //load position
  private positionurl = `${this.baseUrl}RecruitmentMaster`;
  getAllpositionId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.positionurl}/getepositionidandname`);
  }
  //Load PageTittel
  private pagetittelurl = `${this.baseUrl}ERPPageAssignmentRelationship`;
  getAllpagetittel(): Observable<any[]> {
    return this.http.get<any[]>(`${this.pagetittelurl}/getdivisionidandpahetittel`);
  }




}