
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IActivity } from '@shared/interfaces/hr/activity';

@Injectable({
    providedIn: 'root',
})

export class Activityservcie {



    constructor(private http: HttpClient) { }

    private activityUrl = 'https://localhost:7019/api/ActivityMaster';
    getAllActivity(): Observable<any[]> {
        return this.http.get<any[]>(`${this.activityUrl}/getactivity`);
    }

    private insertactivityUrl = 'https://localhost:7019/api/ActivityMaster/addactivity';
    insertActivity(insertActivity: any): Observable<any> {
        return this.http.post(`${this.insertactivityUrl}`, insertActivity);
    }
    private updateactivityUrl = 'https://localhost:7019/api/ActivityMaster/updateactivity';
    updateActivity(updateActivity: any): Observable<any> {
        return this.http.put(`${this.updateactivityUrl}`, updateActivity);
    }
    private deleteactivityUrl = 'https://localhost:7019/api/ActivityMaster/deleteactivity';
    deleteActivity(ActivityId: number): Observable<any> {
        return this.http.delete(`${this.deleteactivityUrl}/${ActivityId}`);
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

    // private activityMstId = 'https://localhost:7019/api/DivisionMaster';
    // getActivityByMstId(activityMstId: number): Observable<any> {
    //     return this.http.get<any>(
    //         `${this.activityMstId}/${activityMstId}`
    //     );
    // }


    private activityMsturl = 'https://localhost:7019/api/ActivityMaster/getallactivitysdetailsbymasterid';
    getActivityByMstId(activityMstId: number): Observable<any> {
        debugger
        return this.http.get<any>(
            `${this.activityMsturl}/${activityMstId}`
        );
    }





}