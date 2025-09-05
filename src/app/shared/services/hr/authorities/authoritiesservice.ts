import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthorities } from '@shared/interfaces/hr/authorities';

@Injectable({
  providedIn: 'root',
})
export class Authoritiesservice {
  private AuthoritiesUrl = 'https://localhost:7019/api/AuthoritieMaster/getallauthorities';
  private insertAuthoritiesUrl = 'https://localhost:7019/api/AuthoritieMaster/addauthoritie';
  private updateAuthoritiesUrl = 'https://localhost:7019/api/AuthoritieMaster/updateauthoritie';
  private deleteAuthoritiesUrl = 'https://localhost:7019/api/AuthoritieMaster/deleteauthoritie';
  private getallauthoritiesdetailsbymasterid ='https://localhost:7019/api/AuthoritieMaster/getallauthoritiesdetailsbymasterid';
  private getDesignationListUrl ='https://localhost:7019/api/DesignationMaster/getdesignationidandname';
  private getGradeListUrl = 'https://localhost:7019/api/GradeMaster/getgradeidandname';
  private getDivisionListUrl = 'https://localhost:7019/api/DivisionMaster/getdivisionidandname';

  constructor(private http: HttpClient) {}

  getAllAuthorities(): Observable<any[]> {
    return this.http.get<any[]>(this.AuthoritiesUrl);
  }

  insertAuthorities(insertAuthorities: IAuthorities): Observable<any> {
    return this.http.post(this.insertAuthoritiesUrl, insertAuthorities);
  }
  updateAuthorities(updateAuthorities: IAuthorities): Observable<any> {
    return this.http.put(this.updateAuthoritiesUrl, updateAuthorities);
  }
  deleteAuthorities(AuthoritiessId: number): Observable<any> {
    return this.http.delete(`${this.deleteAuthoritiesUrl}/${AuthoritiessId}`);
  }

  getAuthoritiesDetailsByMstId(authoritiesMstId: number): Observable<any> {
    return this.http.get<any>(`${this.getallauthoritiesdetailsbymasterid}/${authoritiesMstId}`);
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
