export interface ItemSaleDto {
    quantity: number;
    medicineId: number;
}

export interface CreateSaleDto {
    patientId: number;
    //cui:string;
    items: ItemSaleDto[];
}