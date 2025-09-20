import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IKPA } from '@shared/interfaces/hr/kpa';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class kpaservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllKpa(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}KPAMaster/getallkpamaster`);
  }

  insertKPA(insertKPA: any): Observable<any> {
    return this.http.post(`${this.baseUrl}KPAMaster/addkpamaster`, insertKPA);
  }

  updateKPA(updateKPA: any): Observable<any> {
    return this.http.put(`${this.baseUrl}KPAMaster/updatekpamaster`, updateKPA);
  }

  deleteKPA(Kpaid: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}KPAMaster/deletekpamaster/${Kpaid}`);
  }

  getAllGrade(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GradeMaster/getgradeidandname`);
  }

  getAllDesignations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DesignationMaster/getdesignationidandname`);
  }

  getAllDivisions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}DivisionMaster/getdivisionidandname`);
  }

  getKpaByMstId(kpaMstId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}KPAMaster/getkpadetailbymasterid/${kpaMstId}`);
  }
}
