import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQualificationtype } from '@shared/interfaces/hr/qualificationtype';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Qualificationtypeservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllQualificationtype(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}QualificationTypeMaster/getallqualificationtype`);
  }

  insertQualificationtype(insertQualificationtype: IQualificationtype): Observable<any> {
    debugger;
    return this.http.post(
      `${this.baseUrl}QualificationTypeMaster/insertqualificationtype`,
      insertQualificationtype
    );
  }

  updateQualificationtype(updateQualificationtype: IQualificationtype): Observable<any> {
    return this.http.put(
      `${this.baseUrl}QualificationTypeMaster/UpdateQualificationtype`,
      updateQualificationtype
    );
  }

  deleteQualificationtype(QualificationTypeId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}QualificationTypeMaster/DeleteQualificationType/${QualificationTypeId}`
    );
  }

  getQualificationtypeById(QualificationTypeId: number): Observable<IQualificationtype> {
    return this.http.get<IQualificationtype>(
      `${this.baseUrl}QualificationTypeMaster/GetQualificationTypeByID/${QualificationTypeId}`
    );
  }
}
