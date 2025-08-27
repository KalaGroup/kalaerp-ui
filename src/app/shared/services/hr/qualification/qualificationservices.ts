
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IQualification } from '@shared/interfaces/hr/Iqualification';

@Injectable({
    providedIn: 'root',
})
export class qualificationservices {

    constructor(private http: HttpClient) { }
    private qualificationUrl = 'https://localhost:7019/api/QualificationMaster';
    getAllQualification(): Observable<any[]> {
        return this.http.get<any[]>(`${this.qualificationUrl}/GetAllQualification`);
    }
    private qualificationtypeUrl = 'https://localhost:7019/api/QualificationTypeMaster';
    getAllQualificationType(): Observable<any[]> {
        return this.http.get<any[]>(`${this.qualificationtypeUrl}/getallqualificationtype`);
    }
    private insertqualificationUrl = 'https://localhost:7019/api/QualificationMaster/CreateQualification';
    insertQualification(insertQualification: IQualification): Observable<any> {
        return this.http.post(`${this.insertqualificationUrl}`, insertQualification);
    }
    private updatequalificationUrl = 'https://localhost:7019/api/QualificationMaster/UpdateState';
    updateQualification(updateQualification: IQualification): Observable<any> {
        return this.http.put(`${this.updatequalificationUrl}`, updateQualification);
    }
    private deletequalificationUrl = 'https://localhost:7019/api/QualificationMaster/DeleteQualification';
    deleteQualification(QualificationID: number): Observable<any> {
        return this.http.delete(`${this.deletequalificationUrl}/${QualificationID}`);
    }
}

