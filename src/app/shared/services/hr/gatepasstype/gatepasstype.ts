import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';
import { IGatePassType } from '@shared/interfaces/hr/gatepasstype';

@Injectable({
  providedIn: 'root',
})
export class Gatepasstypeservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  // 🔹 GET all GatePassTypes
  getAllGatePassType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GatePassType/getallgatepasstype`);
  }

  // 🔹 INSERT GatePassType
  insertGatePassType(insertGatePassType: IGatePassType): Observable<any> {
    return this.http.post(`${this.baseUrl}GatePassType/creategatepasstype`, insertGatePassType);
  }

  // 🔹 UPDATE GatePassType
  updateGatePassType(updateGatePassType: IGatePassType): Observable<any> {
    return this.http.put(`${this.baseUrl}GatePassType/updategatepasstype`, updateGatePassType);
  }

  // 🔹 DELETE GatePassType
  deleteGatePassType(GatePassTypeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}GatePassType/deletegatepasstype/${GatePassTypeId}`);
  }

  // 🔹 GET GatePassType by ID
  getGatePassTypeById(GatePassTypeId: number): Observable<IGatePassType> {
    return this.http.get<IGatePassType>(
      `${this.baseUrl}GatePassType/getgatepasstypebyid/${GatePassTypeId}`
    );
  }
}
