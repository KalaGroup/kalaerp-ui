import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IState } from '@shared/interfaces/hr/state';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Stateservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  // 🔹 GET all states
  getAllState(): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(`${this.baseUrl}StateMaster/GetAllState`);
  }

  // 🔹 INSERT state
  insertState(insertState: IState): Observable<any> {
    debugger;
    return this.http.post(`${this.baseUrl}StateMaster/CreateState`, insertState);
  }

  // 🔹 UPDATE state
  updateState(updateState: IState): Observable<any> {
    return this.http.put(`${this.baseUrl}StateMaster/UpdateState`, updateState);
  }

  // 🔹 DELETE state
  deleteState(stateId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}StateMaster/deletestate/${stateId}`);
  }

  // 🔹 GET state by ID
  getStateById(stateId: number): Observable<IState> {
    return this.http.get<IState>(`${this.baseUrl}StateMaster/getstatebyid/${stateId}`);
  }
}
