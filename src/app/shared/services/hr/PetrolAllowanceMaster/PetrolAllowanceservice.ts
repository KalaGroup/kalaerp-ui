import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IPetrolAllowance } from '@shared/interfaces/hr/petrolallowancemaster';
import { apiEnvironment } from '@core';

@Injectable({
  providedIn: 'root',
})
export class PetrolAllowanceservice {
  baseUrl = apiEnvironment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllPetrolAllowance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}PetrolAllowance/GetAllPetrolAllowanceData`);
  }

  insertPetrolAllowance(insertPetrolAllowance: IPetrolAllowance): Observable<any> {
    return this.http.post(
      `${this.baseUrl}PetrolAllowance/insertPetrolAllowance`,
      insertPetrolAllowance
    );
  }

  updatePetrolAllowance(updatePetrolAllowance: IPetrolAllowance): Observable<any> {
    return this.http.put(
      `${this.baseUrl}PetrolAllowance/updatePetrolAllowance`,
      updatePetrolAllowance
    );
  }

  deletePetrolAllowance(PetrolAllowanceId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}PetrolAllowance/DeletePetrolAllowance/${PetrolAllowanceId}`
    );
  }
}
