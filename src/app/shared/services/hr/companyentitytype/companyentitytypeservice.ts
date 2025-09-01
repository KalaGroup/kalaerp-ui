import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompanyentitytype } from '@shared/interfaces/hr/companyentitytype';


@Injectable({
  providedIn: 'root',
})
export class Companyentitytypeservice {
  private CompanyentitytypeUrl = 'https://localhost:7019/api/CompanyEntityTypeMaster/getallcompanyentitytype';
  private insertCompanyentitytypeUrl = 'https://localhost:7019/api/CompanyEntityTypeMaster/addcompanyentitytype';
  private updateCompanyentitytypeUrl = 'https://localhost:7019/api/CompanyEntityTypeMaster/updatecompanyentitytype';
  private deleteCompanyentitytypeUrl = 'https://localhost:7019/api/CompanyEntityTypeMaster/deletecompanyentitytype';
  private getCompanyentitytypeByIdUrl = 'https://localhost:7019/api/CompanyEntityTypeMaster/getcomanyEntitytypebyid';

    constructor(private http: HttpClient) {}

    getAllCompanyentitytype(): Observable<any[]> {
    return this.http.get<any[]>(this.CompanyentitytypeUrl)
  }

  insertCompanyentitytype(insertCompanyentitytype: ICompanyentitytype): Observable<any> {
    return this.http.post(this.insertCompanyentitytypeUrl, insertCompanyentitytype);
  }
  updateCompanyentitytype(updateCompanyentitytype: ICompanyentitytype): Observable<any> {
    return this.http.put(this.updateCompanyentitytypeUrl, updateCompanyentitytype);
  }
  deleteCompanyentitytype(CompEntityTypeId: number): Observable<any> {
    return this.http.delete(`${this.deleteCompanyentitytypeUrl}/${CompEntityTypeId}`);
  }
  getCompanyentitytypeById(CompEntityTypeId: number): Observable<ICompanyentitytype> {
    return this.http.get<ICompanyentitytype>(`${this.getCompanyentitytypeByIdUrl}/${CompEntityTypeId}`);
  }
}