import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IFacilityMaster } from '@shared/interfaces/hr/facility';
import { apiEnvironment } from '@core';

@Injectable({
    providedIn: 'root',
})

export class facilityservices {
   baseUrl = apiEnvironment.baseUrl;
    constructor(private http: HttpClient) { }


    getAllFacility(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}FacilityMaster/getallfacility`);
}

insertFacility(insertFacility: IFacilityMaster): Observable<any> {
  return this.http.post(`${this.baseUrl}FacilityMaster/addfacility`, insertFacility);
}

updateFacility(updateFacility: IFacilityMaster): Observable<any> {
  return this.http.put(`${this.baseUrl}FacilityMaster/updatefacility`, updateFacility);
}

deleteFacility(FacilityId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}FacilityMaster/deletefacility/${FacilityId}`);
}
}
