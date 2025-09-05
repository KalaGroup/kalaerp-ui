import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGrade } from '../../../interfaces/hr/grade';


@Injectable({
  providedIn: 'root',
})
export class Gradeservice {
  private GradeUrl = 'https://localhost:7019/api/GradeMaster/getallgrades';
  private insertGradeUrl = 'https://localhost:7019/api/GradeMaster/creategrade';
  private updateGradeUrl = 'https://localhost:7019/api/GradeMaster/updategrade';
  private deleteGradeUrl = 'https://localhost:7019/api/GradeMaster/deletegrade'; 
  private getGradeByIdUrl = 'https://localhost:7019/api/GradeMaster/getgradebyid';

    constructor(private http: HttpClient) {}

  getAllGrade(): Observable<any[]> {
    return this.http.get<any[]>(this.GradeUrl)
  }
  insertGrade(insertGrade: IGrade): Observable<any> {
    return this.http.post(this.insertGradeUrl, insertGrade);
  }
  updateGrade(updateGrade: IGrade): Observable<any> {
    return this.http.put(this.updateGradeUrl, updateGrade);
  }
  deleteGrade(GradeId: number): Observable<any> {
    return this.http.delete(`${this.deleteGradeUrl}/${GradeId}`);
  }
  getGradeById(GradeId: number): Observable<IGrade> {
    return this.http.get<IGrade>(`${this.getGradeByIdUrl}/${GradeId}`);
  }
}