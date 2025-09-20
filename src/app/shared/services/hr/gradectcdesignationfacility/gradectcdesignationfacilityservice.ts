import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Gradectcdesignationfacilityservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CurrencyMaster/getallcurrency`);
  }

  getAllQualificationDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}QualificationMaster/getallqualificationidandname`);
  }

  getAllFacilityDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}FacilityMaster/getallfacilityidandname`);
  }

  creatGradeDesignationFacility(gradeDesignationFacility: any): Observable<any[]> {
    return this.http.post<any[]>(
      `${this.baseUrl}GradeMaster/creategrade`,
      gradeDesignationFacility
    );
  }

  getAllGradeCtcDesignationFacility(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GradeMaster/getgradedesignationandfacility`);
  }

  updateAllGradeCtcDesignationFacility(gradeCtcDesignationFacility: any): Observable<any[]> {
    return this.http.put<any[]>(
      `${this.baseUrl}GradeMaster/updategrade`,
      gradeCtcDesignationFacility
    );
  }

  deleteGrade(GradeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}GradeMaster/deletegrade/${GradeId}`);
  }
}
