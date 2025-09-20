import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root',
})
export class WorkstationBudgetservice {
    constructor(private http: HttpClient) { }


    private workstationbudgetUrl = 'https://localhost:7019/api/WorkstationBudget';
    getAllWorkStationbudget(): Observable<any[]> {
        return this.http.get<any[]>(`${this.workstationbudgetUrl}/GetAllWorkstaionBudget`);
    }
    //workstationFK
    private workstationUrl = 'https://localhost:7019/api/WorkstationMaster';
    getAllWorkStation(): Observable<any[]> {
        return this.http.get<any[]>(`${this.workstationUrl}/GetAllWorkstation`);
    }
    //EmployeeIdFK
    private employeeurl = 'https://localhost:7019/api/RecruitmentMaster'
    getAllEmployeeId(): Observable<any[]> {
        return this.http.get<any[]>(`${this.employeeurl}/getemployeeidandname`);
    }

    private insertworkstationbudgetUrl = 'https://localhost:7019/api/WorkstationBudget/InsertworkstationBudget';
    insertworkstationbudget(insertworkstation: any): Observable<any> {
        return this.http.post(`${this.insertworkstationbudgetUrl}`, insertworkstation);
    }

    private updateworkstationbudgetUrl = 'https://localhost:7019/api/WorkstationBudget/UpdateWorkstationBudget';
    updateworkstationbudget(updateworkstation: any): Observable<any> {
        return this.http.put(`${this.updateworkstationbudgetUrl}`, updateworkstation);
    }
    private deleteworkstationbudgetUrl = 'https://localhost:7019/api/WorkstationBudget/DeleteWorkstationBudget';
    deleteworkstationbudget(WorkstationBudgetId: number): Observable<any> {
        return this.http.delete(`${this.deleteworkstationbudgetUrl}/${WorkstationBudgetId}`);
    }

    private FinancialYear = 'https://localhost:7019/api/ProfitcenterBudget'
    getAllFinancialYear(): Observable<any[]> {
        return this.http.get<any[]>(`${this.FinancialYear}/GetFinancialYear`);
    }

}