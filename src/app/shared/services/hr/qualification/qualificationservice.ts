import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IQualification } from '@shared/interfaces/hr/qualification';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class qualificationservices {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllQualification(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}QualificationMaster/GetAllQualification`);
  }

  getAllQualificationType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}QualificationTypeMaster/getallqualificationtype`);
  }

  insertQualification(insertQualification: IQualification): Observable<any> {
    return this.http.post(
      `${this.baseUrl}QualificationMaster/CreateQualification`,
      insertQualification
    );
  }

  updateQualification(updateQualification: IQualification): Observable<any> {
    return this.http.put(
      `${this.baseUrl}QualificationMaster/updatequalification`,
      updateQualification
    );
  }

  deleteQualification(QualificationID: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}QualificationMaster/DeleteQualification/${QualificationID}`
    );
  }
}
