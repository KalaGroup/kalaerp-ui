import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Ilocationmaster } from '@shared/interfaces/hr/location';


@Injectable({
    providedIn: 'root',
})

export class locationservices{
    
    

  constructor(private http: HttpClient) { }

    private locationUrl = 'https://localhost:7019/api/LocationMaster';
  getAllLocation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.locationUrl}/GetAllLocation`);
  }
  private profitcenterLocation = 'https://localhost:7019/api/ProfitcenterMaster';
  getAllLocationProfitcenter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.profitcenterLocation}/getallprofitcenter`);
  }


  private insertlocationUrl = 'https://localhost:7019/api/LocationMaster/CreateLocation';
  insertLocation(insertLocation: Ilocationmaster): Observable<any> {
    return this.http.post(`${this.insertlocationUrl}`, insertLocation);
  }

  private updatelocationUrl = 'https://localhost:7019/api/LocationMaster/UpdateLocation';
  updateLocation(updateLocation: Ilocationmaster): Observable<any> {
    return this.http.put(`${this.updatelocationUrl}`, updateLocation);
  }

  private deletelocationUrl = 'https://localhost:7019/api/LocationMaster/DeleteLocation';
  deleteLocation(LocationId: number): Observable<any> {
    return this.http.delete(`${this.deletelocationUrl}/${LocationId}`);
  }
}