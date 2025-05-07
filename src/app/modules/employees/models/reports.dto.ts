import { ContractDto } from "./contract.dto";

export interface ReportEmployeeContracts {
    report: HistoryEmployeeContractsDto[];
}

export interface HistoryEmployeeContractsDto {
    id: number;
    fullName: string;
    cui: string;
    email: string;
    areaName: string;
    contracts: ContractDto[];
}