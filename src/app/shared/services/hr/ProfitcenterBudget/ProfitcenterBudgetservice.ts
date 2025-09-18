import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root',
})
export class ProfitcenterBudgetservice {
    constructor(private http: HttpClient) { }


    private profitcenterbudgetUrl = 'https://localhost:7019/api/ProfitcenterBudget';
    getAllProfitcenterbudget(): Observable<any[]> {
        return this.http.get<any[]>(`${this.profitcenterbudgetUrl}/getprofitcenterbudget`);
    }
    //profitcenterFK
    private profitcenterIdUrl = 'https://localhost:7019/api/ProfitcenterMaster';
    getAllProfitcenter(): Observable<any[]> {
        return this.http.get<any[]>(`${this.profitcenterIdUrl}/getallprofitcenter`);
    }
    //EmployeeIdFK
    private employeeurl = 'https://localhost:7019/api/RecruitmentMaster'
    getAllEmployeeId(): Observable<any[]> {
        return this.http.get<any[]>(`${this.employeeurl}/getemployeeidandname`);
    }

    private insertprofitcenterbudgetUrl = 'https://localhost:7019/api/ProfitcenterBudget/addprofitcenterbudget';
    insertProfitcenterbudget(insertProfitcenter: any): Observable<any> {
        return this.http.post(`${this.insertprofitcenterbudgetUrl}`, insertProfitcenter);
    }

    private updateprofitcenterbudgetUrl = 'https://localhost:7019/api/ProfitcenterBudget/updateprofitcenterbudget';
    updateProfitcenterbudget(updateProfitcenter: any): Observable<any> {
        return this.http.put(`${this.updateprofitcenterbudgetUrl}`, updateProfitcenter);
    }
    private deleteprofitcenterbudgetUrl = 'https://localhost:7019/api/ProfitcenterBudget/deleteprofitcenterbudge';
    deleteProfitcenterbudget(ProfitcenterBudgetId: number): Observable<any> {
        return this.http.delete(`${this.deleteprofitcenterbudgetUrl}/${ProfitcenterBudgetId}`);
    }

    private FinancialYear = 'https://localhost:7019/api/ProfitcenterBudget'
    getAllFinancialYear(): Observable<any[]> {
        return this.http.get<any[]>(`${this.FinancialYear}/GetFinancialYear`);
    }

}