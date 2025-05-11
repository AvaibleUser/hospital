// src/app/services/medicine.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../models/inveontry';
import { ApiConfigService } from '@shared/services/api-config.service';
import { CreatePurchacheDto } from '../models/purches.dto';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private readonly apiConfig = inject(ApiConfigService);
  private baseUrl = this.apiConfig.API_MEDICINE; 
  private readonly API_PURCHES = this.apiConfig.API_PURCHES;

  constructor(private http: HttpClient) {}

  getAll(name?: string): Observable<Medicine[]> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    return this.http.get<Medicine[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.baseUrl}/${id}`);
  }

  create(medicine: Partial<Medicine>): Observable<Medicine> {
    return this.http.post<Medicine>(this.baseUrl, medicine);
  }

  update(id: number, medicine: Partial<Medicine>): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.baseUrl}/${id}`, medicine);
  }

  createPurches(purhc:CreatePurchacheDto, medicineId:number): Observable<void> {
    return this.http.post<void>(`${this.API_PURCHES}/${medicineId}`, purhc);
  }
}
