import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorkstation } from '@shared/interfaces/hr/workstation';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Workstationservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  // 🔹 GET all workstations
  getAllWorkstation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}WorkstationMaster/GetAllWorkstation`);
  }

  // 🔹 INSERT workstation
  insertWorkstation(insertWorkstation: IWorkstation): Observable<any> {
    return this.http.post(`${this.baseUrl}WorkstationMaster/CreateWorkstation`, insertWorkstation);
  }

  // 🔹 UPDATE workstation
  updateWorkstation(updateWorkstation: IWorkstation): Observable<any> {
    return this.http.put(`${this.baseUrl}WorkstationMaster/UpdateWorkstation`, updateWorkstation);
  }

  // 🔹 DELETE workstation
  deleteWorkstation(WorkstationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}WorkstationMaster/deleteWorkstation/${WorkstationId}`);
  }

  // 🔹 GET workstation by ID
  getWorkstationById(WorkstationId: number): Observable<IWorkstation> {
    return this.http.get<IWorkstation>(
      `${this.baseUrl}WorkstationMaster/getWorkstationbyid/${WorkstationId}`
    );
  }
}
