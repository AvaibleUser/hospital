import { Injectable } from "@angular/core";
import { environment } from "@environment/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    
    private readonly API_BASE = environment.API_ROOT;

    API_AUTH = `${this.API_BASE}/gatekeeper/v1/auth`;

    //employees
    API_AREA = `${this.API_BASE}/areas`
    API_EMPLOYEE = `${this.API_BASE}/employee`

}