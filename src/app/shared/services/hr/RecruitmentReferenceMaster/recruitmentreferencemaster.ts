import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecruitmentReferenceMaster } from '@shared/interfaces/hr/RecruitmentReferenceMaster';

@Injectable({
    providedIn: 'root'
})
export class Recruitmentreferencemasterservice {

    constructor(private http: HttpClient) { }

    private recruitmentreferenceUrl = 'https://localhost:7019/api/RecruitmentReferenceMaster';
    getAllRecruitmentrefernce(): Observable<any[]> {
        return this.http.get<any[]>(`${this.recruitmentreferenceUrl}/getallrecruitmentReferenc`);
    }


    private insertrecruitmentreferenceUrl = 'https://localhost:7019/api/RecruitmentReferenceMaster/addrecruitmentReferenc';
    insertRecruitmentReference(insertRecruitmentReference: IRecruitmentReferenceMaster): Observable<any> {
        return this.http.post(`${this.insertrecruitmentreferenceUrl}`, insertRecruitmentReference);
    }
    private updaterecruitmentreferenceUrl = 'https://localhost:7019/api/RecruitmentReferenceMaster/updaterecruitmentReferenc';
    updateRecruitmentreference(updateRecruitmentreference: IRecruitmentReferenceMaster): Observable<any> {
        return this.http.put(`${this.updaterecruitmentreferenceUrl}`, updateRecruitmentreference);
    }
    private deleterecruitmentreferenceUrl = 'https://localhost:7019/api/RecruitmentReferenceMaster/deleterecruitmentReferenc';
    deleteRecruitmentreference(RecruitmentReferenceId: number): Observable<any> {
        return this.http.delete(`${this.deleterecruitmentreferenceUrl}/${RecruitmentReferenceId}`);
    }
}