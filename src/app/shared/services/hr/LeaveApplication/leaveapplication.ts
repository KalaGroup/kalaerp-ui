import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import { apiEnvironment } from '@core';

@Injectable({
    providedIn: 'root',
})
export class LeaveApplicationServices {
    baseUrl = apiEnvironment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllLeaveApplication(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}LeaveApplication/GetAllLeaveApplications`);
    }


    insertLeaveApplication(insertLeaveApplication: any): Observable<any> {
        return this.http.post(`${this.baseUrl}LeaveApplication/InsertLeaveApplication`, insertLeaveApplication);
    }

    updateLeaveApplication(updateLeaveApplication: any): Observable<any> {
        return this.http.put(`${this.baseUrl}LeaveApplication/UpdateLeaveApplication`, updateLeaveApplication);
    }


    deleteLeaveApplication(LeaveApplicationId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}LeaveApplication/DeleteLeaveApplication/${LeaveApplicationId}`);
    }

    private employeeurl = `${this.baseUrl}RecruitmentMaster`;
    getAllEmployeeId(): Observable<any[]> {
        return this.http.get<any[]>(`${this.employeeurl}/getemployeeidandname`);
    }

    private leavetype = `${this.baseUrl}LeaveTypeMaster`;
    getAllLeaveType(): Observable<any[]> {
        return this.http.get<any[]>(`${this.leavetype}/GetAllLeaveType`);
    }



}