import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IFacilityMaster } from '@shared/interfaces/hr/facility';

@Injectable({
    providedIn: 'root',
})

export class facilityservices {
    constructor(private http: HttpClient) { }

    private facilityurl = 'https://localhost:7019/api/FacilityMaster';
    getAllFacility(): Observable<any[]> {
        return this.http.get<any[]>(`${this.facilityurl}/getallfacility`);
    }
    private insertfacilityurl = 'https://localhost:7019/api/FacilityMaster/addfacility';
    insertFacility(insertFacility: IFacilityMaster): Observable<any> {
        return this.http.post(`${this.insertfacilityurl}`, insertFacility);
    }
    private updatefacilityurl = 'https://localhost:7019/api/FacilityMaster/updatefacility';
    updateFacility(updateFacility: IFacilityMaster): Observable<any> {
        return this.http.put(`${this.updatefacilityurl}`, updateFacility);
    }
    private deletefacilityurl = 'https://localhost:7019/api/FacilityMaster/deletefacility';
    deleteFacility(FacilityId: number): Observable<any> {
        return this.http.delete(`${this.deletefacilityurl}/${FacilityId}`);
    }
}