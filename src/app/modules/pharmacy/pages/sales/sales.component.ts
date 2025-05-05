import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.component.html',
})
export default class SalesComponent {
  patientName: string = '';
  patientType: string = 'Ambulatorio';
  
  products = [
    { id: 1, name: 'Paracetamol', price: 2.5, stock: 100 },
    { id: 2, name: 'Ibuprofeno', price: 3.0, stock: 20 },
    { id: 3, name: 'Amoxicilina', price: 5.0, stock: 80 },
  ];

  saleItems: { id: number, name: string, price: number, quantity: number }[] = [];

  addToSale(product: { id: number, name: string, price: number, stock: number }) {
    const existingItem = this.saleItems.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
      }
    } else {
      this.saleItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
  }

  increaseQuantity(item: { id: number, quantity: number }) {
    const product = this.products.find(p => p.id === item.id);
    if (product && item.quantity < product.stock) {
      item.quantity++;
    }
  }

  decreaseQuantity(item: { id: number, quantity: number }) {
    item.quantity--;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: { id: number }) {
    this.saleItems = this.saleItems.filter(i => i.id !== item.id);
  }

  getProductStock(productId: number): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.stock : 0;
  }

  calculateTotal(): number {
    return this.saleItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
}