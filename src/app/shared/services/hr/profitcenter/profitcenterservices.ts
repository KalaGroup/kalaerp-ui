import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root',
})
export class profitcenterservices {

    constructor(private http: HttpClient) { }
    private profitcenterUrl = 'https://localhost:7019/api/ProfitcenterMaster';
    getAllProfitcenter(): Observable<any[]> {
        return this.http.get<any[]>(`${this.profitcenterUrl}/getallprofitcenter`);
    }

    private getprofitcentercompanyUrl = 'https://localhost:7019/api/CompanyMaster'
    getAllProfitcenterCompany(): Observable<any[]> {
        return this.http.get<any[]>(`${this.getprofitcentercompanyUrl}/getcompany`);
    }

    private insertprofitcenterUrl = 'https://localhost:7019/api/ProfitcenterMaster/addprofitcenter';
    insertProfitcenter(insertProfitcenter: any): Observable<any> {
        return this.http.post(`${this.insertprofitcenterUrl}`, insertProfitcenter);
    }

    private updateprofitcenterUrl = 'https://localhost:7019/api/ProfitcenterMaster/updateprofitcenter';
    updateProfitcenter(updateProfitcenter: any): Observable<any> {
        return this.http.put(`${this.updateprofitcenterUrl}`, updateProfitcenter);
    }
    private deleteprofitcenterUrl = 'https://localhost:7019/api/ProfitcenterMaster/deleteprofitcenter';
    deleteProfitcenter(ProfitCenterId: number): Observable<any> {
        return this.http.delete(`${this.deleteprofitcenterUrl}/${ProfitCenterId}`);
    }
}