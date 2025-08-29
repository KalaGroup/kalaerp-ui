
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IRecruitmentAttribute } from '@shared/interfaces/hr/RecruitmentAttributeMaster';

@Injectable({
    providedIn: 'root',
})
export class RecruitmentAttributeservices {

    constructor(private http: HttpClient) { }

    private recruitmentattributeUrl = 'https://localhost:7019/api/RecruitmentAttributeMaster';
    getAllRecruitmentAttribute(): Observable<any[]> {
        return this.http.get<any[]>(`${this.recruitmentattributeUrl}/GetAllRecruitmentAttributeMaster`);
    }


    private insertrecruitmentattributeUrl = 'https://localhost:7019/api/RecruitmentAttributeMaster/CreateRecruitmentAttributeMaster';
    insertRecruitmentAttribute(insertRecruitmentAttribute: IRecruitmentAttribute): Observable<any> {
        return this.http.post(`${this.insertrecruitmentattributeUrl}`, insertRecruitmentAttribute);
    }
    private updaterecruitmentattributeUrl = 'https://localhost:7019/api/RecruitmentAttributeMaster/UpdateRecruitmentAttributeMaster';
    updateRecruitmentAttribute(updateRecruitmentAttribute: IRecruitmentAttribute): Observable<any> {
        return this.http.put(`${this.updaterecruitmentattributeUrl}`, updateRecruitmentAttribute);
    }
    private deleterecruitmentattributeUrl = 'https://localhost:7019/api/RecruitmentAttributeMaster/DeleteRecruitmentAttributeMaster';
    deleteRecruitmentAttribute(RecruitmentAttributeId: number): Observable<any> {
        return this.http.delete(`${this.deleterecruitmentattributeUrl}/${RecruitmentAttributeId}`);
    }
} 