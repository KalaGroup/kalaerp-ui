import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class shiftmasterservice {
    constructor(private http: HttpClient) { }
    //company FK
    private getshiftcompanyUrl = 'https://localhost:7019/api/CompanyMaster'
    getAllShiftMasterCompany(): Observable<any[]> {
        return this.http.get<any[]>(`${this.getshiftcompanyUrl}/getcompany`);
    }
    //EmployeeType FK
    private employeetypeUrl = 'https://localhost:7019/api/EmployeeTypeMaster';
    getAllemployeetypes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.employeetypeUrl}/getallEmployeetype`)
    }



    private ShiftMasterUrl = 'https://localhost:7019/api/ShiftMaster';
    getAllShiftMaster(): Observable<any[]> {
        return this.http.get<any[]>(`${this.ShiftMasterUrl}/GetAllShift`);
    }
    private insertShiftMasterUrl = 'https://localhost:7019/api/ShiftMaster/insertshift';
    insertShiftMaster(insertShiftMaster: any): Observable<any> {
        return this.http.post(`${this.insertShiftMasterUrl}`, insertShiftMaster);
    }
    private updateShiftMasterUrl = 'https://localhost:7019/api/ShiftMaster/UpdateShift';
    UpdateShiftMaster(ShiftMaster: any): Observable<any> {
        return this.http.put(`${this.updateShiftMasterUrl}`, ShiftMaster);
    }
    private deleteShiftMasterUrl = 'https://localhost:7019/api/ShiftMaster/DeleteShift';
    deleteShiftMaster(ShiftMasterId: number): Observable<any> {
        return this.http.delete(`${this.deleteShiftMasterUrl}/${ShiftMasterId}`);
    }
}