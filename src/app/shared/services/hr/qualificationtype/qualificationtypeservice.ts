import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQualificationtype } from '@shared/interfaces/hr/qualificationtype';

@Injectable({
  providedIn: 'root',
})
export class Qualificationtypeservice {
    private getQualificationtypeUrl = 'https://localhost:7019/api/QualificationTypeMaster/getallqualificationtype';
  private insertQualificationtypeUrl = 'https://localhost:7019/api/QualificationTypeMaster/insertqualificationtype';
  private updateQualificationtypeUrl = 'https://localhost:7019/api/QualificationTypeMaster/UpdateQualificationtype';
  private deleteQualificationtypeUrl = 'https://localhost:7019/api/QualificationTypeMaster/DeleteQualificationType';
  private getQualificationtypeByIdUrl = 'https://localhost:7019/api/QualificationTypeMaster/GetQualificationTypeByID';

    constructor(private http: HttpClient) {}

    getAllQualificationtype(): Observable<any[]> {
    return this.http.get<any[]>(this.getQualificationtypeUrl)
  }

  insertQualificationtype(insertQualificationtype: IQualificationtype): Observable<any> {
    debugger;
    return this.http.post(this.insertQualificationtypeUrl, insertQualificationtype);
  }
  updateQualificationtype(updateQualificationtype: IQualificationtype): Observable<any> {
    return this.http.put(this.updateQualificationtypeUrl, updateQualificationtype);
  }
  deleteQualificationtype(QualificationTypeId: number): Observable<any> {
    return this.http.delete(`${this.deleteQualificationtypeUrl}/${QualificationTypeId}`);
  }
  getQualificationtypeById(QualificationTypeId: number): Observable<IQualificationtype> {
    return this.http.get<IQualificationtype>(`${this.getQualificationtypeByIdUrl}/${QualificationTypeId}`);
  }
}