import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/inveontry';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.component.html',
})
export default class SalesComponent {
  medicineService = inject(MedicineService);
  patientName: string = '';
  patientType: string = 'Ambulatorio';

  products: Medicine[] = [
  ];

  ngOnInit(): void {
    this.loadInventory();
  }
  
  saleItems: Medicine[] = [];

  addToSale(product: Medicine) {
    const existingItem = this.saleItems.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity! < product.stock) {
        existingItem.quantity!++;
      }
    } else {
      this.saleItems.push(product);
    }
  }

  increaseQuantity(item: Medicine) {
    const product = this.products.find(p => p.id === item.id);
    if (product && item.quantity! < product.stock) {
      item.quantity!++;
    }
  }

  decreaseQuantity(item: Medicine) {
    item.quantity!--;
    if (item.quantity! === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: Medicine) {
    this.saleItems = this.saleItems.filter(i => i.id !== item.id);
  }

  getProductStock(productId: number): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.stock : 0;
  }

  calculateTotal(): number {
    return this.saleItems.reduce((total, item) => total + (item.unitPrice * item.quantity!), 0);
  }

  registerSale() {
    // Implement sale registration logic here
    console.log('Sale registered:', {
      patientName: this.patientName,
      patientType: this.patientType,
      items: this.saleItems,
      total: this.calculateTotal()
    });
    // Reset form
    this.saleItems = [];
    this.patientName = '';
    this.patientType = 'Ambulatorio';
  }

  searchTerm: string = '';

  loadInventory(): void {
    this.medicineService.getAll(this.searchTerm).subscribe(data => {
      this.products = data;
    });
  }

  get filteredInventory(): Medicine[] {
    return this.products.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(): void {
    this.loadInventory();
  }
}