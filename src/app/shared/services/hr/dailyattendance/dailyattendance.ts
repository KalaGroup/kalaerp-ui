import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';

@Injectable({
    providedIn: 'root',
})
export class dailyattendanceservice {
    baseUrl = apiEnvironment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllDailyAttendance(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}DailyAttendance/GetAllDailyAttendance`);
    }

    getCompanyName(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}DailyAttendance/GetEmployeNameAndCompanyName`);
    }

    getEmployeeName(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}RecruitmentMaster/getemployeeidandname`);
    }
}
