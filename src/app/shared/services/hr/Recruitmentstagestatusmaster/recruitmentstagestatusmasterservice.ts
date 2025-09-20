import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Recruitmentstagestatusmasterservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}RecruitmentStageStatusMaster/getrecruitmentstagestatus`
    );
  }

  // 🔹 Add new recruitment stage status
  add(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}RecruitmentStageStatusMaster/addrecruitmentstagestatus`,
      data
    );
  }

  // 🔹 Update recruitment stage status
  update(data: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}RecruitmentStageStatusMaster/updategetrecruitmentstagestatus`,
      data
    );
  }

  // 🔹 Delete recruitment stage status by id
  delete(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}RecruitmentStageStatusMaster/deletegetrecruitmentstagestatus/${id}`
    );
  }
}
