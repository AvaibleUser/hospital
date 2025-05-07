import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Bill } from '@patients/models/bill.model';

@Component({
  selector: 'patient-details-bills',
  imports: [CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css',
})
export class BillsComponent {
  @Input() bills?: Bill[];

  currentBill?: Bill;

  ngOnChanges(): void {
    this.currentBill = this.bills?.filter((bill) => bill.isClosed)[0];
  }
}
