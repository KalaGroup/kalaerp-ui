import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { apiEnvironment } from '@core';


@Injectable({
    providedIn: 'root',
})
export class LeaveTypeMasterservice {

    baseUrl = apiEnvironment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllLeaveTypemaster(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}LeaveTypeMaster/GetAllLeaveType`);
    }

    insertLeaveTypemaster(insertLeaveTypemaster: any): Observable<any> {
        return this.http.post(`${this.baseUrl}LeaveTypeMaster/InsertleaveType`, insertLeaveTypemaster);
    }

    updateLeaveTypemaster(updateLeaveTypemaster: any): Observable<any> {
        return this.http.put(`${this.baseUrl}LeaveTypeMaster/UpdateLeaveType`, updateLeaveTypemaster);
    }
    deleteLeaveTypemaster(LeaveTypeMasterId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}LeaveTypeMaster/DeleteLeaveType/${LeaveTypeMasterId}`);
    }


}