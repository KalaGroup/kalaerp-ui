import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class Gradectcdesignationfacilityservice {
   private getCurrencyDetails = 'https://localhost:7019/api/CurrencyMaster';
 private getQualificationDetails = 'https://localhost:7019/api/QualificationMaster';
 private getFacilityDetails = 'https://localhost:7019/api/FacilityMaster';
 private creategradeDesignationFacilityUrl = 'https://localhost:7019/api/GradeMaster/creategrade';

 constructor(private http: HttpClient) {}

 getAllCurrencies(): Observable<any[]> {
   return this.http.get<any[]>(`${this.getCurrencyDetails}/getallcurrency`);
 }

 getAllQualificationDetails(): Observable<any[]>{
   return this.http.get<any[]>(`${this.getQualificationDetails}/getallqualificationidandname`);
 }

 getAllFacilityDetails(): Observable<any[]>{
   return this.http.get<any[]>(`${this.getFacilityDetails}/getallfacilityidandname`);
 }

 creatGradeDesignationFacility(gradeDesignationFacility: any):Observable<any[]>{
   return this.http.post<any[]>(`${this.creategradeDesignationFacilityUrl}`, gradeDesignationFacility);
 }
}
