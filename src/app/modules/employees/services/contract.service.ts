import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { ContractDto, FinishContractDto, NewContractDto, UpdateSalaryDto } from '../models/contract.dto';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_CONTRACT = this.apiConfigService.API_CONTRACT;

  constructor() { }

  getFirstContractByEmployeeId(idEmployee: number): Observable<ContractDto> {
    return this._http.get<ContractDto>(`${this.API_CONTRACT}/latest/employee/${idEmployee}`)
  }

  createNewContract(create: NewContractDto): Observable<void> {
    return this._http.post<void>(`${this.API_CONTRACT}`, create)
  }

  finishContract(contractId: number, finish: FinishContractDto): Observable<void> {
    return this._http.patch<void>(`${this.API_CONTRACT}/finish/${contractId}`, finish);
  }

  updateSalary(contractId: number, update:UpdateSalaryDto): Observable<void> {
    return this._http.put<void>(`${this.API_CONTRACT}/update-salary/${contractId}`, update);
  }

  dismissalWork(contractId: number, finish: FinishContractDto): Observable<void> {
    return this._http.patch<void>(`${this.API_CONTRACT}/dismissal-work/${contractId}`, finish);
  }
}
