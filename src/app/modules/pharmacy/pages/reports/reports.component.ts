import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Medicament {
  code: string;
  name: string;
  quantity: number;
  minimum: number;
  unitPrice: number;
}

interface ProfitDetail {
  date: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  costs: number;
  profit: number;
}

interface Profit {
  code: string;
  medicaments: string;
  totalSold: number;
  revenue: number;
  profit: number;
  showDetails: boolean;
  details: ProfitDetail[];
}

interface EmployeeSaleDetail {
  date: string;
  medicament: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  profit: number;
}

interface EmployeeSale {
  name: string;
  cui: string;
  totalSales: number;
  revenue: number;
  profit: number;
  showDetails: boolean;
  details: EmployeeSaleDetail[];
}


@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
})
export default class ReportsComponent {
  activeTab: string = 'medicamentos';
  
  medSearchTerm: string = '';
  profitSearchTerm: string = '';
  employeeSearchTerm: string = '';
  profitStartDate: string = '';
  profitEndDate: string = '';
  employeeStartDate: string = '';
  employeeEndDate: string = '';

  medicaments: Medicament[] = [
    { code: 'MED001', name: 'Paracetamol', quantity: 100, minimum: 50, unitPrice: 2.5 },
    { code: 'MED002', name: 'Ibuprofeno', quantity: 20, minimum: 5, unitPrice: 3.0 },
    { code: 'MED003', name: 'Amoxicilina', quantity: 80, minimum: 40, unitPrice: 5.0 },
  ];

  profits: Profit[] = [
    { 
      code: 'SALE001', 
      medicaments: 'Paracetamol, Ibuprofeno', 
      totalSold: 30, 
      revenue: 90, 
      profit: 60, 
      showDetails: false,
      details: [
        { date: '2025-05-01', quantity: 20, unitPrice: 2.5, subtotal: 50, costs: 20, profit: 30 },
        { date: '2025-05-02', quantity: 10, unitPrice: 3.0, subtotal: 30, costs: 10, profit: 20 },
      ]
    },
    { 
      code: 'SALE002', 
      medicaments: 'Amoxicilina', 
      totalSold: 15, 
      revenue: 75, 
      profit: 45, 
      showDetails: false,
      details: [
        { date: '2025-05-03', quantity: 15, unitPrice: 5.0, subtotal: 75, costs: 30, profit: 45 },
      ]
    },
  ];

  employeeSales: EmployeeSale[] = [
    { 
      name: 'Juan Pérez', 
      cui: '1234567890123', 
      totalSales: 25, 
      revenue: 125, 
      profit: 75, 
      showDetails: false,
      details: [
        { date: '2025-05-01', medicament: 'Paracetamol', quantity: 15, unitPrice: 2.5, subtotal: 37.5, profit: 22.5 },
        { date: '2025-05-02', medicament: 'Ibuprofeno', quantity: 10, unitPrice: 3.0, subtotal: 30, profit: 18 },
      ]
    },
    { 
      name: 'María López', 
      cui: '9876543210987', 
      totalSales: 20, 
      revenue: 100, 
      profit: 60, 
      showDetails: false,
      details: [
        { date: '2025-05-03', medicament: 'Amoxicilina', quantity: 20, unitPrice: 5.0, subtotal: 100, profit: 60 },
      ]
    },
  ];

  get filteredMedicaments(): Medicament[] {
    return this.medicaments.filter(item =>
      item.name.toLowerCase().includes(this.medSearchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(this.medSearchTerm.toLowerCase())
    );
  }

  get filteredProfits(): Profit[] {
    let filtered = this.profits.filter(sale =>
      sale.medicaments.toLowerCase().includes(this.profitSearchTerm.toLowerCase()) ||
      sale.code.toLowerCase().includes(this.profitSearchTerm.toLowerCase())
    );

    if (this.profitStartDate && this.profitEndDate) {
      filtered = filtered.filter(sale =>
        sale.details.some(detail =>
          detail.date >= this.profitStartDate && detail.date <= this.profitEndDate
        )
      );
    }

    return filtered;
  }

  get filteredEmployeeSales(): EmployeeSale[] {
    let filtered = this.employeeSales.filter(employee =>
      employee.name.toLowerCase().includes(this.employeeSearchTerm.toLowerCase()) ||
      employee.cui.toLowerCase().includes(this.employeeSearchTerm.toLowerCase())
    );

    if (this.employeeStartDate && this.employeeEndDate) {
      filtered = filtered.filter(employee =>
        employee.details.some(detail =>
          detail.date >= this.employeeStartDate && detail.date <= this.employeeEndDate
        )
      );
    }

    return filtered;
  }

  calculateInventoryTotal(): number {
    return this.filteredMedicaments.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  }

  calculateProfitTotal(): number {
    return this.filteredProfits.reduce((total, sale) => total + sale.revenue, 0);
  }

  calculateEmployeeSalesTotal(): number {
    return this.filteredEmployeeSales.reduce((total, employee) => total + employee.revenue, 0);
  }
}