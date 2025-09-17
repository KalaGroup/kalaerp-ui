import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class recruitmentmasterservice {

    constructor(private http: HttpClient) { }

    private RecruitmentMasterUrl = 'https://localhost:7019/api/RecruitmentMaster';
    getAllRecruitmentMaster(): Observable<any[]> {
        return this.http.get<any[]>(`${this.RecruitmentMasterUrl}/getallrecruitmentMaster`);
    }
    private insertRecruitmentMasterUrl = 'https://localhost:7019/api/RecruitmentMaster/createrecruitmentmaster';
    insertRecruitmentMaster(insertRecruitmentMaster: any): Observable<any> {
        return this.http.post(`${this.insertRecruitmentMasterUrl}`, insertRecruitmentMaster);
    }
    private updateRecruitmentMasterUrl = 'https://localhost:7019/api/RecruitmentMaster/updaterecruitmentMaster';
    UpdateRecruitmentMaster(RecruitmentMastercenter: any): Observable<any> {
        return this.http.put(`${this.updateRecruitmentMasterUrl}`, RecruitmentMastercenter);
    }
    private deleteRecruitmentMasterUrl = 'https://localhost:7019/api/RecruitmentMaster/deleterecruitmentMaster';
    deleteRecruitmentMaster(RecruitmentMasterId: number): Observable<any> {
        return this.http.delete(`${this.deleteRecruitmentMasterUrl}/${RecruitmentMasterId}`);
    }
    //---------------------------------------------------------------------
    //CompanyFK
    private getRecruitmentMastercompanyUrl = 'https://localhost:7019/api/CompanyMaster'
    getAllRecruitmentMasterCompany(): Observable<any[]> {
        return this.http.get<any[]>(`${this.getRecruitmentMastercompanyUrl}/getcompany`);
    }
    //referenceFK
    private getRecruitmentMasterreferenceUrl = 'https://localhost:7019/api/RecruitmentReferenceMaster'
    getAllRecruitmentMasterReference(): Observable<any[]> {
        return this.http.get<any[]>(`${this.getRecruitmentMasterreferenceUrl}/getallrecruitmentReferenc`);
    }
    //GradeFK
    private gradeUrl = 'https://localhost:7019/api/GradeMaster'
    getAllGrade(): Observable<any[]> {
        return this.http.get<any[]>(`${this.gradeUrl}/getgradeidandname`);
    }
    //DesignationFK
    private designationUrl = 'https://localhost:7019/api/DesignationMaster';
    getAllDesignations(): Observable<any[]> {
        return this.http.get<any[]>(`${this.designationUrl}/getdesignationidandname`);
    }
    //CityFK
    private cityUrl = 'https://localhost:7019/api/CityMaster';
    getAllCity(): Observable<any[]> {
        return this.http.get<any[]>(`${this.cityUrl}/GetAllCity`);
    }
    //EmployeeDetail Fk
    private employeedetailUrl = 'https://localhost:7019/api/CityMaster';
    getAllEmployeeDetail(): Observable<any[]> {
        return this.http.get<any[]>(`${this.employeedetailUrl}/GetAllCity`);
    }
    //StatusStageFk
    private statusstageUrl = 'https://localhost:7019/api/RecruitmentStageStatusMaster';
    getAllStatusStage(): Observable<any[]> {
        return this.http.get<any[]>(`${this.statusstageUrl}/getrecruitmentstagestatus`);
    }

    //AttributeFK
    private attributeUrl = 'https://localhost:7019/api/RecruitmentAttributeMaster';
    getAllAttribute(): Observable<any[]> {
        return this.http.get<any[]>(`${this.attributeUrl}/GetAllRecruitmentAttributeMaster`);
    }


    private employeeurl = 'https://localhost:7019/api/RecruitmentMaster'
    getAllEmployeeId(): Observable<any[]> {
        return this.http.get<any[]>(`${this.employeeurl}/getemployeeidandname`);
    }

    private positionurl = 'https://localhost:7019/api/RecruitmentMaster'
    getAllpositionId(): Observable<any[]> {
        return this.http.get<any[]>(`${this.positionurl}/getepositionidandname`);
    }
    private getAllRecruitmentDetailsbyMstId =
        'https://localhost:7019/api/RecruitmentMaster/getallrecruitmentdetailsbymasterid';
    getRecruitmentDetailsByMstId(RecruitmentMasterId: number): Observable<any> {
        return this.http.get<any>(
            `${this.getAllRecruitmentDetailsbyMstId}/${RecruitmentMasterId}`
        );
    }

}