import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html'
})
export default class InventoryComponent {
  searchTerm: string = '';
  
  inventory = [
    { id: 1, name: 'Paracetamol', unitPrice: 2.5, quantity: 100, minStock: 50 },
    { id: 2, name: 'Ibuprofeno', unitPrice: 3.0, quantity: 20, minStock: 30 },
    { id: 3, name: 'Amoxicilina', unitPrice: 5.0, quantity: 80, minStock: 40 },
  ];

  get filteredInventory() {
    return this.inventory.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
