import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root',
})
export class LeaveTypeMasterservice {
    constructor(private http: HttpClient) { }

    private LeaveTypemasterUrl = 'https://localhost:7019/api/LeaveTypeMaster';
    getAllLeaveTypemaster(): Observable<any[]> {
        return this.http.get<any[]>(`${this.LeaveTypemasterUrl}/GetAllLeaveType`);
    }

    private insertLeaveTypemasterUrl = 'https://localhost:7019/api/LeaveTypeMaster/InsertleaveType';
    insertLeaveTypemaster(insertLeaveTypemaster: any): Observable<any> {
        return this.http.post(`${this.insertLeaveTypemasterUrl}`, insertLeaveTypemaster);
    }

    private updateLeaveTypemasterUrl = 'https://localhost:7019/api/LeaveTypeMaster/UpdateLeaveType';
    updateLeaveTypemaster(updateLeaveTypemaster: any): Observable<any> {
        return this.http.put(`${this.updateLeaveTypemasterUrl}`, updateLeaveTypemaster);
    }
    private deleteLeaveTypemasterUrl = 'https://localhost:7019/api/LeaveTypeMaster/DeleteLeaveType';
    deleteLeaveTypemaster(LeaveTypeMasterId: number): Observable<any> {
        return this.http.delete(`${this.deleteLeaveTypemasterUrl}/${LeaveTypeMasterId}`);
    }

}