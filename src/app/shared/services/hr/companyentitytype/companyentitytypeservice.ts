import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompanyentitytype } from '@shared/interfaces/hr/companyentitytype';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class Companyentitytypeservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCompanyentitytype(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}CompanyEntityTypeMaster/getallcompanyentitytype`);
  }

  insertCompanyentitytype(insertCompanyentitytype: ICompanyentitytype): Observable<any> {
    return this.http.post(
      `${this.baseUrl}CompanyEntityTypeMaster/addcompanyentitytype`,
      insertCompanyentitytype
    );
  }

  updateCompanyentitytype(updateCompanyentitytype: ICompanyentitytype): Observable<any> {
    return this.http.put(
      `${this.baseUrl}CompanyEntityTypeMaster/updatecompanyentitytype`,
      updateCompanyentitytype
    );
  }

  deleteCompanyentitytype(CompEntityTypeId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}CompanyEntityTypeMaster/deletecompanyentitytype/${CompEntityTypeId}`
    );
  }

  getCompanyentitytypeById(CompEntityTypeId: number): Observable<ICompanyentitytype> {
    return this.http.get<ICompanyentitytype>(
      `${this.baseUrl}CompanyEntityTypeMaster/getcomanyEntitytypebyid/${CompEntityTypeId}`
    );
  }
}
