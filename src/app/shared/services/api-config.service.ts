import { Injectable } from "@angular/core";
import { environment } from "@environment/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    
    private readonly API_BASE = environment.API_ROOT;
    private readonly API_BASE_AUTH = `${this.API_BASE}/gatekeeper/v1`
    private readonly API_BASE_EMPLOYEE = `${this.API_BASE}/hr/v1`
    private readonly API_BASE_PHARMACY = `${this.API_BASE}/rx/v1`

    API_AUTH = `${this.API_BASE_AUTH}/auth`;

    //employees
    API_AREA = `${this.API_BASE_EMPLOYEE}/areas`
    API_EMPLOYEE = `${this.API_BASE_EMPLOYEE}/employees`
    API_CONTRACT = `${this.API_BASE_EMPLOYEE}/contracts`
    API_VACATION = `${this.API_BASE_EMPLOYEE}/vacations`
    API_PAYMENT = `${this.API_BASE_EMPLOYEE}/payments`

    //pharmacy
    API_MEDICINE = `${this.API_BASE_PHARMACY}/medicines`

}