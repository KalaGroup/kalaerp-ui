import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHoliday } from '@shared/interfaces/hr/holiday';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Holidayservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllHoliday(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}HolidayMaster/getallholidaymasters`);
  }

  insertHoliday(insertHoliday: IHoliday): Observable<any> {
    return this.http.post(`${this.baseUrl}HolidayMaster/insertholidaymaster`, insertHoliday);
  }

  updateHoliday(updateHoliday: IHoliday): Observable<any> {
    return this.http.put(`${this.baseUrl}HolidayMaster/updateholidaymaster`, updateHoliday);
  }

  deleteHoliday(HolidayId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}HolidayMaster/DeleteHoliday/${HolidayId}`);
  }

  getHolidayById(HolidayId: number): Observable<IHoliday> {
    return this.http.get<IHoliday>(
      `${this.baseUrl}HolidayMaster/getholidaymasterbyID/${HolidayId}`
    );
  }

  getAllFinancialYear(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ProfitcenterBudget/GetFinancialYear`);
  }
}
