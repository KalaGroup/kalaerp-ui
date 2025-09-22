import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class recruitmentmasterservice {
  baseUrl = apiEnvironment.baseUrl;

  constructor(private http: HttpClient) {}

  private RecruitmentMasterUrl = `${this.baseUrl}RecruitmentMaster`;
  getAllRecruitmentMaster(): Observable<any[]> {
    return this.http.get<any[]>(`${this.RecruitmentMasterUrl}/getallrecruitmentMaster`);
  }

  private insertRecruitmentMasterUrl = `${this.baseUrl}RecruitmentMaster/createrecruitmentmaster`;
  insertRecruitmentMaster(insertRecruitmentMaster: any): Observable<any> {
    return this.http.post(`${this.insertRecruitmentMasterUrl}`, insertRecruitmentMaster);
  }

  private updateRecruitmentMasterUrl = `${this.baseUrl}RecruitmentMaster/updaterecruitmentMaster`;
  UpdateRecruitmentMaster(RecruitmentMastercenter: any): Observable<any> {
    return this.http.put(`${this.updateRecruitmentMasterUrl}`, RecruitmentMastercenter);
  }

  private deleteRecruitmentMasterUrl = `${this.baseUrl}RecruitmentMaster/deleterecruitmentMaster`;
  deleteRecruitmentMaster(RecruitmentMasterId: number): Observable<any> {
    return this.http.delete(`${this.deleteRecruitmentMasterUrl}/${RecruitmentMasterId}`);
  }

  //---------------------------------------------------------------------
  //CompanyFK
  private getRecruitmentMastercompanyUrl = `${this.baseUrl}CompanyMaster`;
  getAllRecruitmentMasterCompany(): Observable<any[]> {
    return this.http.get<any[]>(`${this.getRecruitmentMastercompanyUrl}/getcompany`);
  }

  //referenceFK
  private getRecruitmentMasterreferenceUrl = `${this.baseUrl}RecruitmentReferenceMaster`;
  getAllRecruitmentMasterReference(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.getRecruitmentMasterreferenceUrl}/getallrecruitmentReferenc`
    );
  }

  //GradeFK
  private gradeUrl = `${this.baseUrl}GradeMaster`;
  getAllGrade(): Observable<any[]> {
    return this.http.get<any[]>(`${this.gradeUrl}/getgradeidandname`);
  }

  //DesignationFK
  private designationUrl = `${this.baseUrl}DesignationMaster`;
  getAllDesignations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.designationUrl}/getdesignationidandname`);
  }

  //CityFK
  private cityUrl = `${this.baseUrl}CityMaster`;
  getAllCity(): Observable<any[]> {
    return this.http.get<any[]>(`${this.cityUrl}/GetAllCity`);
  }

  //EmployeeDetail Fk
  private employeedetailUrl = `${this.baseUrl}CityMaster`;
  getAllEmployeeDetail(): Observable<any[]> {
    return this.http.get<any[]>(`${this.employeedetailUrl}/GetAllCity`);
  }

  //StatusStageFk
  private statusstageUrl = `${this.baseUrl}RecruitmentStageStatusMaster`;
  getAllStatusStage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.statusstageUrl}/getrecruitmentstagestatus`);
  }

  //AttributeFK
  private attributeUrl = `${this.baseUrl}RecruitmentAttributeMaster`;
  getAllAttribute(): Observable<any[]> {
    return this.http.get<any[]>(`${this.attributeUrl}/GetAllRecruitmentAttributeMaster`);
  }

  private employeeurl = `${this.baseUrl}RecruitmentMaster`;
  getAllEmployeeId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.employeeurl}/getemployeeidandname`);
  }

  private positionurl = `${this.baseUrl}RecruitmentMaster`;
  getAllpositionId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.positionurl}/getepositionidandname`);
  }

  private getAllRecruitmentDetailsbyMstId = `${this.baseUrl}RecruitmentMaster/getallrecruitmentdetailsbymasterid`;
  getRecruitmentDetailsByMstId(RecruitmentMasterId: number): Observable<any> {
    return this.http.get<any>(`${this.getAllRecruitmentDetailsbyMstId}/${RecruitmentMasterId}`);
  }
}
