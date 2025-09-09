
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDivision } from '@shared/interfaces/hr/division';

@Injectable({
  providedIn: 'root',
})
export class Divisionservice {
  private divisionUrl = 'https://localhost:7019/api/DivisionMaster/GetAllDivision';
  private insertDivisionUrl = 'https://localhost:7019/api/DivisionMaster/CreateDivision';
  private updateDivisionUrl = 'https://localhost:7019/api/DivisionMaster/UpdateDivision';
  private deleteDivisionUrl = 'https://localhost:7019/api/DivisionMaster/DeleteDivision';
  private getDivisionByIdUrl = 'https://localhost:7019/api/DivisionMaster/getDivisionbyid';

  constructor(private http: HttpClient) { }

  getAllDivision(): Observable<any[]> {
    return this.http.get<any[]>(this.divisionUrl)
  }
  insertDivision(insertDivision: IDivision): Observable<any> {
    return this.http.post(this.insertDivisionUrl, insertDivision);
  }
  updateDivision(updateDivision: IDivision): Observable<any> {
    return this.http.put(this.updateDivisionUrl, updateDivision);
  }
  deleteDivision(DivisionId: number): Observable<any> {
    return this.http.delete(`${this.deleteDivisionUrl}/${DivisionId}`);
  }
  getDivisionById(DivisionId: number): Observable<IDivision> {
    return this.http.get<IDivision>(`${this.getDivisionByIdUrl}/${DivisionId}`);
  }
}