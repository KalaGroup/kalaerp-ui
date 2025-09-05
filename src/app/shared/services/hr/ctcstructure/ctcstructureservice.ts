import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICtcstructure } from '@shared/interfaces/hr/ctcstructure';

@Injectable({
  providedIn: 'root',
})
export class Ctcstructureservice {
  private CtcstructureUrl = 'https://localhost:7019/api/CTCStructureMaster/getallctc';
  private insertCtcstructureUrl ='https://localhost:7019/api/CTCStructureMaster/addctc';
  private updateCtcstructureUrl ='https://localhost:7019/api/CTCStructureMaster/updatectc';
  private deleteCtcstructureUrl ='https://localhost:7019/api/CTCStructureMaster/deletectc';
  private getCtcstructureByIdUrl ='https://localhost:7019/api/CTCStructureMaster/getctcbyid';

  private gradeUrl = 'https://localhost:7019/api/GradeMaster/getallgrades';

  constructor(private http: HttpClient) {}

  getAllCtcstructure(): Observable<any[]> {
    return this.http.get<any[]>(this.CtcstructureUrl);
  }

  insertCtcstructure(insertCtcstructure: ICtcstructure): Observable<any> {
    return this.http.post(this.insertCtcstructureUrl, insertCtcstructure);
  }
  updateCtcstructure(updateCtcstructure: ICtcstructure): Observable<any> {
    return this.http.put(this.updateCtcstructureUrl, updateCtcstructure);
  }
  deleteCtcstructure(CtcstructureId: number): Observable<any> {
    return this.http.delete(`${this.deleteCtcstructureUrl}/${CtcstructureId}`);
  }
  getCtcstructureById(CtcstructureId: number): Observable<ICtcstructure> {
    return this.http.get<ICtcstructure>(`${this.getCtcstructureByIdUrl}/${CtcstructureId}`);
  }


    getAllGrade(): Observable<any[]> {
    return this.http.get<any[]>(this.gradeUrl);
  }
}
