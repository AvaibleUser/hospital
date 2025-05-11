export interface SaleMedicineDto {
    medicineId: number;
    name: string;
    unitCost: number;
    saleId: number;
    quantity: number;
    unitPrice: number;
    soldAt: Date;
    employeeId: number;
}


export interface ReportSalesTotal {
    totalIncome: number;
    items: SaleMedicineDto[]

}