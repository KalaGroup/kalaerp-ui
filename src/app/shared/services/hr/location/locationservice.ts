import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Ilocationmaster } from '@shared/interfaces/hr/location';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class locationservices {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllLocation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}LocationMaster/GetAllLocation`);
  }

  getAllLocationProfitcenter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ProfitcenterMaster/getallprofitcenter`);
  }

  insertLocation(insertLocation: Ilocationmaster): Observable<any> {
    return this.http.post(`${this.baseUrl}LocationMaster/CreateLocation`, insertLocation);
  }

  updateLocation(updateLocation: Ilocationmaster): Observable<any> {
    return this.http.put(`${this.baseUrl}LocationMaster/UpdateLocation`, updateLocation);
  }

  deleteLocation(LocationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}LocationMaster/DeleteLocation/${LocationId}`);
  }
}
