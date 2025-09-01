import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IPetrolAllowance } from '@shared/interfaces/hr/petrolallowancemaster';


@Injectable({
    providedIn: 'root',
})
export class PetrolAllowanceservice {
    constructor(private http: HttpClient) { }

    private petrolallowanceUrl = 'https://localhost:7019/api/PetrolAllowance';
    getAllPetrolAllowance(): Observable<any[]> {
        return this.http.get<any[]>(`${this.petrolallowanceUrl}/GetAllPetrolAllowanceData`);
    }

    private insertpetrolallowanceUrl = 'https://localhost:7019/api/PetrolAllowance/insertPetrolAllowance';
    insertPetrolAllowance(insertPetrolAllowance: IPetrolAllowance): Observable<any> {
        return this.http.post(`${this.insertpetrolallowanceUrl}`, insertPetrolAllowance);
    }
    private updatepetrolallowanceUrl = 'https://localhost:7019/api/PetrolAllowance/updatePetrolAllowance';
    updatePetrolAllowance(updatePetrolAllowance: IPetrolAllowance): Observable<any> {
        return this.http.put(`${this.updatepetrolallowanceUrl}`, updatePetrolAllowance);
    }
    private deletepetrolallowanceUrl = 'https://localhost:7019/api/PetrolAllowance/DeletePetrolAllowance';
    deletePetrolAllowance(PetrolAllowanceId: number): Observable<any> {
        return this.http.delete(`${this.deletepetrolallowanceUrl}/${PetrolAllowanceId}`);
    }
}