import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorkstation } from '@shared/interfaces/hr/workstation';

@Injectable({
  providedIn: 'root',
})
export class Workstationservice {
  private WorkstationUrl = 'https://localhost:7019/api/WorkstationMaster/GetAllWorkstation';
  private insertWorkstationUrl = 'https://localhost:7019/api/WorkstationMaster/CreateWorkstation';
  private updateWorkstationUrl = 'https://localhost:7019/api/WorkstationMaster/UpdateWorkstation';
  private deleteWorkstationUrl = 'https://localhost:7019/api/WorkstationMaster/deleteWorkstation';
  private getWorkstationByIdUrl = 'https://localhost:7019/api/WorkstationMaster/getWorkstationbyid';

    constructor(private http: HttpClient) {}

    getAllWorkstation(): Observable<any[]> {
    return this.http.get<any[]>(this.WorkstationUrl)
  }

  insertWorkstation(insertWorkstation: IWorkstation): Observable<any> {
    return this.http.post(this.insertWorkstationUrl, insertWorkstation);
  }
  updateWorkstation(updateWorkstation: IWorkstation): Observable<any> {
    return this.http.put(this.updateWorkstationUrl, updateWorkstation);
  }
  deleteWorkstation(WorkstationId: number): Observable<any> {
    return this.http.delete(`${this.deleteWorkstationUrl}/${WorkstationId}`);
  }
  getWorkstationById(WorkstationId: number): Observable<IWorkstation> {
    return this.http.get<IWorkstation>(`${this.getWorkstationByIdUrl}/${WorkstationId}`);
  }
}