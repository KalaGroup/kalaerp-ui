import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iclassoftravelmaster } from '@shared/interfaces/hr/classoftravel';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class classoftravelservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllClassOftravel(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ClassOfTravelMaster/getallClassOfTravels`);
  }

  getAllClassOftravelGrade(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GradeMaster/getallgrades`);
  }

  insertClassOftravel(insertClassOftravel: Iclassoftravelmaster): Observable<any> {
    return this.http.post(
      `${this.baseUrl}ClassOfTravelMaster/createclassOfTravel`,
      insertClassOftravel
    );
  }

  updateClassOftravel(updateClassOftravel: Iclassoftravelmaster): Observable<any> {
    return this.http.put(
      `${this.baseUrl}ClassOfTravelMaster/updateClassOfTravel`,
      updateClassOftravel
    );
  }

  deleteClassOftravel(ClassOfTravelId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}ClassOfTravelMaster/deleteClassOfTravel/${ClassOfTravelId}`
    );
  }
}
