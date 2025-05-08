import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { CreateEmployeeDto, EmployeeDto, EmployeeResponseDto } from '../models/employee.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_EMPLOYEE = this.apiConfigService.API_EMPLOYEE;

  employee!: EmployeeDto;

  constructor() { }

  createArea(createEmployee: CreateEmployeeDto): Observable<EmployeeResponseDto> {
    return this._http.post<EmployeeResponseDto>(`${this.API_EMPLOYEE}`, createEmployee)
  }

  getAllEmployees(): Observable<EmployeeDto[]> {
    return this._http.get<EmployeeDto[]>(`${this.API_EMPLOYEE}`)
  }

  getAllEmployeesByAreaId(roleId: number): Observable<EmployeeDto[]> {
    return this._http.get<EmployeeDto[]>(`${this.API_EMPLOYEE}/area/${roleId}`)
  }

}
