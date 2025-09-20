import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGrade } from '../../../interfaces/hr/grade';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Gradeservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllGrade(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GradeMaster/getallgrades`);
  }

  insertGrade(insertGrade: IGrade): Observable<any> {
    return this.http.post(`${this.baseUrl}GradeMaster/creategrade`, insertGrade);
  }

  updateGrade(updateGrade: IGrade): Observable<any> {
    return this.http.put(`${this.baseUrl}GradeMaster/updategrade`, updateGrade);
  }

  deleteGrade(GradeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}GradeMaster/deletegrade/${GradeId}`);
  }

  getGradeById(GradeId: number): Observable<IGrade> {
    return this.http.get<IGrade>(`${this.baseUrl}GradeMaster/getgradebyid/${GradeId}`);
  }
}
