import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthorities } from '@shared/interfaces/hr/authorities';
import { apiEnvironment  } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Authoritiesservice {

 baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllAuthorities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}AuthoritieMaster/getallauthorities`);
  }

  insertAuthorities(insertAuthorities: IAuthorities): Observable<any> {
    return this.http.post(`${this.baseUrl}AuthoritieMaster/addauthoritie`, insertAuthorities);
  }

  updateAuthorities(updateAuthorities: IAuthorities): Observable<any> {
    return this.http.put(`${this.baseUrl}AuthoritieMaster/updateauthoritie`, updateAuthorities);
  }

  deleteAuthorities(AuthoritiessId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}AuthoritieMaster/deleteauthoritie/${AuthoritiessId}`);
  }

  getAuthoritiesDetailsByMstId(authoritiesMstId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}AuthoritieMaster/getallauthoritiesdetailsbymasterid/${authoritiesMstId}`);
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

}
