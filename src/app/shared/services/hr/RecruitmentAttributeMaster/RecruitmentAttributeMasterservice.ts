import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IRecruitmentAttribute } from '@shared/interfaces/hr/RecruitmentAttributeMaster';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentAttributeservices {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllRecruitmentAttribute(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}RecruitmentAttributeMaster/GetAllRecruitmentAttributeMaster`
    );
  }

  insertRecruitmentAttribute(insertRecruitmentAttribute: IRecruitmentAttribute): Observable<any> {
    return this.http.post(
      `${this.baseUrl}RecruitmentAttributeMaster/CreateRecruitmentAttributeMaster`,
      insertRecruitmentAttribute
    );
  }

  updateRecruitmentAttribute(updateRecruitmentAttribute: IRecruitmentAttribute): Observable<any> {
    return this.http.put(
      `${this.baseUrl}RecruitmentAttributeMaster/UpdateRecruitmentAttributeMaster`,
      updateRecruitmentAttribute
    );
  }

  deleteRecruitmentAttribute(RecruitmentAttributeId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}RecruitmentAttributeMaster/DeleteRecruitmentAttributeMaster/${RecruitmentAttributeId}`
    );
  }
}
