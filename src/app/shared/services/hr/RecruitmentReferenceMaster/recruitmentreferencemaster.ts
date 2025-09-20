import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecruitmentReferenceMaster } from '@shared/interfaces/hr/RecruitmentReferenceMaster';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Recruitmentreferencemasterservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  private recruitmentreferenceUrl = `${this.baseUrl}RecruitmentReferenceMaster`;
  getAllRecruitmentrefernce(): Observable<any[]> {
    return this.http.get<any[]>(`${this.recruitmentreferenceUrl}/getallrecruitmentReferenc`);
  }

  private insertrecruitmentreferenceUrl = `${this.baseUrl}RecruitmentReferenceMaster/addrecruitmentReferenc`;
  insertRecruitmentReference(
    insertRecruitmentReference: IRecruitmentReferenceMaster
  ): Observable<any> {
    return this.http.post(`${this.insertrecruitmentreferenceUrl}`, insertRecruitmentReference);
  }

  private updaterecruitmentreferenceUrl = `${this.baseUrl}RecruitmentReferenceMaster/updaterecruitmentReferenc`;
  updateRecruitmentreference(
    updateRecruitmentreference: IRecruitmentReferenceMaster
  ): Observable<any> {
    return this.http.put(`${this.updaterecruitmentreferenceUrl}`, updateRecruitmentreference);
  }

  private deleterecruitmentreferenceUrl = `${this.baseUrl}RecruitmentReferenceMaster/deleterecruitmentReferenc`;
  deleteRecruitmentreference(RecruitmentReferenceId: number): Observable<any> {
    return this.http.delete(`${this.deleterecruitmentreferenceUrl}/${RecruitmentReferenceId}`);
  }
}
