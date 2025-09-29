import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root'
})
export class Offerletter {
   baseUrl = apiEnvironment.baseUrl;
  constructor(private http: HttpClient) { }

  getRecruitmentsByPositionId(positionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}RecruitmentMaster/getallrecruitementidandnamebypositionid/${positionId}`);
  }

  getRecruitmentsByMasterId(recruitmentMasterId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}RecruitmentMaster/getrecruitmentMasterbyid/${recruitmentMasterId}`);
  }

  getAllOfferLetters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}OfferLetter/getofferletters`);
  }

   insertOfferLetter(offerLetterData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}OfferLetter/addofferletter`, offerLetterData);
  }

  updateOfferLetter(offerLetterData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}OfferLetter/updateofferletter`, offerLetterData);
  }

  deleteOfferLetter(offerLetterId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}OfferLetter/deleteofferletter/${offerLetterId}`);
  }
}
