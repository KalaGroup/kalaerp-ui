import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iclassoftravelmaster } from '@shared/interfaces/hr/classoftravel';


@Injectable({
    providedIn: 'root',
})
export class classoftravelservice {

    constructor(private http: HttpClient) { }

    private classoftravelUrl = 'https://localhost:7019/api/ClassOfTravelMaster';
    getAllClassOftravel(): Observable<any[]> {
        return this.http.get<any[]>(`${this.classoftravelUrl}/getallClassOfTravels`);
    }

    private getclassoftravelgradeUrl = 'https://localhost:7019/api/GradeMaster'
    getAllClassOftravelGrade(): Observable<any[]> {
        return this.http.get<any[]>(`${this.getclassoftravelgradeUrl}/getallgrades`);
    }

    private insertclassoftravelUrl = 'https://localhost:7019/api/ClassOfTravelMaster/createclassOfTravel';
    insertClassOftravel(insertClassOftravel: Iclassoftravelmaster): Observable<any> {
        return this.http.post(`${this.insertclassoftravelUrl}`, insertClassOftravel);
    }

    private updateclassoftravelUrl = 'https://localhost:7019/api/ClassOfTravelMaster/updateClassOfTravel';
    updateClassOftravel(updateClassOftravel: Iclassoftravelmaster): Observable<any> {
        return this.http.put(`${this.updateclassoftravelUrl}`, updateClassOftravel);
    }

    private deleteclassoftravelUrl = 'https://localhost:7019/api/ClassOfTravelMaster/deleteClassOfTravel';
    deleteClassOftravel(ClassOfTravelId: number): Observable<any> {
        return this.http.delete(`${this.deleteclassoftravelUrl}/${ClassOfTravelId}`);
    }
}