
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IState } from '@shared/interfaces/hr/state';

@Injectable({
  providedIn: 'root',
})
export class Stateservice {
    private stateUrl = 'https://localhost:7019/api/StateMaster/GetAllState';
  private insertStateUrl = 'https://localhost:7019/api/StateMaster/CreateState';
  private updateStateUrl = 'https://localhost:7019/api/StateMaster/UpdateState';
  private deleteStateUrl = 'https://localhost:7019/api/StateMaster/deletestate';
  private getStateByIdUrl = 'https://localhost:7019/api/StateMaster/getstatebyid';

    constructor(private http: HttpClient) {}

    getAllState(): Observable<any[]> {
    return this.http.get<any[]>(this.stateUrl)
  }

  insertState(insertState: IState): Observable<any> {
    debugger;
    return this.http.post(this.insertStateUrl, insertState);
  }
  updateState(updateState: IState): Observable<any> {
    return this.http.put(this.updateStateUrl, updateState);
  }
  deleteState(stateId: number): Observable<any> {
    return this.http.delete(`${this.deleteStateUrl}/${stateId}`);
  }
  getStateById(stateId: number): Observable<IState> {
    return this.http.get<IState>(`${this.getStateByIdUrl}/${stateId}`);
  }
}