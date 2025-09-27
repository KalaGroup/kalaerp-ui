import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { apiEnvironment } from '@core';
import { IKalaErpPageDetails } from '@shared/interfaces/hr/kalaerppagedetails';

@Injectable({
  providedIn: 'root',
})
export class KalaErpPageDetailsservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  // 🔹 GET all ERP Page Details
  getAllERPPageDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ERPPageDetails/getAllerppagedetails`);
  }

  // 🔹 INSERT ERP Page Details
  insertERPPageDetails(insertERPPageDetails: IKalaErpPageDetails): Observable<any> {
    return this.http.post(`${this.baseUrl}ERPPageDetails/createerppagedetails`, insertERPPageDetails);
  }

  // 🔹 UPDATE ERP Page Details
  updateERPPageDetails(updateERPPageDetails: IKalaErpPageDetails): Observable<any> {
    return this.http.put(`${this.baseUrl}ERPPageDetails/updateerppagedetails`, updateERPPageDetails);
  }

  // 🔹 DELETE ERP Page Details
  deleteERPPageDetails(KalaErppageDetailsId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}ERPPageDetails/deleteerppagedetails/${KalaErppageDetailsId}`);
  }

  // 🔹 GET ERP Page Details by ID
  getERPPageDetailsById(KalaErppageDetailsId: number): Observable<IKalaErpPageDetails> {
    return this.http.get<IKalaErpPageDetails>(
      `${this.baseUrl}ERPPageDetails/geterppagedetailsbyid/${KalaErppageDetailsId}`
    );
  }
}
