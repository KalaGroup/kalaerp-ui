
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IKPA } from '@shared/interfaces/hr/kpa';

@Injectable({
    providedIn: 'root',
})
export class kpaservice {

    constructor(private http: HttpClient) { }

    private KpaUrl = 'https://localhost:7019/api/KPAMaster';
    getAllKpa(): Observable<any[]> {
        return this.http.get<any[]>(`${this.KpaUrl}/getallkpamaster`);
    }

    private insertKPAUrl = 'https://localhost:7019/api/KPAMaster/addkpamaster';
    insertKPA(insertKPA: any): Observable<any> {
        return this.http.post(`${this.insertKPAUrl}`, insertKPA);
    }
    private updateKPAUrl = 'https://localhost:7019/api/KPAMaster/updatekpamaster';
    updateKPA(updateKPA: any): Observable<any> {
        return this.http.put(`${this.updateKPAUrl}`, updateKPA);
    }
    private deleteKPAUrl = 'https://localhost:7019/api/KPAMaster/deletekpamaster';
    deleteKPA(Kpaid: number): Observable<any> {
        return this.http.delete(`${this.deleteKPAUrl}/${Kpaid}`);
    }


    private gradeUrl = 'https://localhost:7019/api/GradeMaster'
    getAllGrade(): Observable<any[]> {
        return this.http.get<any[]>(`${this.gradeUrl}/getgradeidandname`);
    }

    private designationUrl = 'https://localhost:7019/api/DesignationMaster';
    getAllDesignations(): Observable<any[]> {
        return this.http.get<any[]>(`${this.designationUrl}/getdesignationidandname`);
    }

    private divisionUrl = 'https://localhost:7019/api/DivisionMaster';
    getAllDivisions(): Observable<any[]> {
        return this.http.get<any[]>(`${this.divisionUrl}/getdivisionidandname`);
    }

    // private KpaMstId = 'https://localhost:7019/api/DivisionMaster';
    // getKpaByMstId(kpaMstId: number): Observable<any> {
    //     return this.http.get<any>(
    //         `${this.KpaMstId}/${kpaMstId}`
    //     );
    // }


    private KpaMstId = 'https://localhost:7019/api/KPAMaster/getkpadetailbymasterid';
    getKpaByMstId(kpaMstId: number): Observable<any> {
        debugger
        return this.http.get<any>(
            `${this.KpaMstId}/${kpaMstId}`
        );
    }

    //     private activityMsturl = 'https://localhost:7019/api/ActivityMaster/getallactivitysdetailsbymasterid';
    // getActivityByMstId(activityMstId: number): Observable<any> {
    //     debugger
    //     return this.http.get<any>(
    //         `${this.activityMsturl}/${activityMstId}`
    //     );
    // }
}





