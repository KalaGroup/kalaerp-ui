import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';
import { IDailyAttendance } from '@shared/interfaces/hr/dailyattendance';

@Injectable({
    providedIn: 'root',
})
export class dailyattendanceservice {
    baseUrl = apiEnvironment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllDailyAttendance(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}DailyAttendance/GetAllDailyAttendance`);
    }

    getDailyAttendanceByFilter(fromDate: string, toDate: string,) {
        let params: any = {
            fromDate,
            toDate
        };
        return this.http.get<any[]>('/DailyAttendance/GetAllDailyAttendance/filter', { params });
    }


    getCompanyName(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}DailyAttendance/GetEmployeNameAndCompanyName`);
    }

    getEmployeeName(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}RecruitmentMaster/getemployeeidandname`);
    }
}
