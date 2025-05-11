export interface ItemSaleDto {
    quantity: number;
    medicineId: number;
}

export interface CreateSaleDto {
    patientId: number;
    //cui:string;
    items: ItemSaleDto[];
}

export interface ItemsSaleMedicineDto {
    saleId: number;
    quantity: number;
    unitPrice: number;
    soldAt: Date;
    unitCost: number;
    Subtotal: number;
    SubCost: number;
    Profit: number;
}

export interface ReportSaleMedicineDto {
    medicineId: number;
    name: string;
    totalSold: number;
    totalIncome: number;
    totalProfit: number;
    items: ItemsSaleMedicineDto[];
    showDetails: boolean;

}