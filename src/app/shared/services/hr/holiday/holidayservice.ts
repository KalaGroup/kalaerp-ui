import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHoliday } from '@shared/interfaces/hr/holiday';

@Injectable({
  providedIn: 'root',
})
export class Holidayservice {
  private HolidayUrl = 'https://localhost:7019/api/HolidayMaster/getallholidaymasters';
  private insertHolidayUrl = 'https://localhost:7019/api/HolidayMaster/insertholidaymaster';
  private updateHolidayUrl = 'https://localhost:7019/api/HolidayMaster/updateholidaymaster';
  private deleteHolidayUrl = 'https://localhost:7019/api/HolidayMaster/DeleteHoliday';
  private getHolidayByIdUrl = 'https://localhost:7019/api/HolidayMaster/getholidaymasterbyID';

    constructor(private http: HttpClient) {}

    getAllHoliday(): Observable<any[]> {
    return this.http.get<any[]>(this.HolidayUrl)
  }

  insertHoliday(insertHoliday: IHoliday): Observable<any> {
    return this.http.post(this.insertHolidayUrl, insertHoliday);
  }
  updateHoliday(updateHoliday: IHoliday): Observable<any> {
    return this.http.put(this.updateHolidayUrl, updateHoliday);
  }
  deleteHoliday(HolidayId: number): Observable<any> {
    return this.http.delete(`${this.deleteHolidayUrl}/${HolidayId}`);
  }
  getHolidayById(HolidayId: number): Observable<IHoliday> {
    return this.http.get<IHoliday>(`${this.getHolidayByIdUrl}/${HolidayId}`);
  }
}