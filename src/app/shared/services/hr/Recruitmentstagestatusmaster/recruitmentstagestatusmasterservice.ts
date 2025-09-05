import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Recruitmentstagestatusmasterservice {
    private baseUrl = 'https://localhost:7019/api/RecruitmentStageStatusMaster';

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) { }

  // 🔹 Get all recruitment stage statuses
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getrecruitmentstagestatus`);
  }

  // 🔹 Add new recruitment stage status
  add(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addrecruitmentstagestatus`, data);
  }

  // 🔹 Update recruitment stage status
  update(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updategetrecruitmentstagestatus`, data);
  }

  // 🔹 Delete recruitment stage status by id
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deletegetrecruitmentstagestatus/${id}`);
  }

}
