import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '@patients/models/bill.model';

@Component({
  selector: 'patient-details-bills',
  imports: [CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css',
})
export class BillsComponent implements OnInit {
  @Input() bills?: Bill[];

  currentBill?: Bill;

  ngOnInit(): void {
    this.bills = [
      {
        id: 1,
        total: 100,
        isClosed: true,
        isPaid: true,
        items: [
          {
            id: 1,
            concept: 'Consulta',
            amount: 10,
            type: 'CONSULTATION',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
          {
            id: 2,
            concept: 'Medicación',
            amount: 20,
            type: 'MEDICATION',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        ],
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        total: 200,
        isClosed: false,
        isPaid: false,
        items: [
          {
            id: 3,
            concept: 'Consulta',
            amount: 20,
            type: 'CONSULTATION',
            createdAt: '2023-01-02T00:00:00.000Z',
            updatedAt: '2023-01-02T00:00:00.000Z',
          },
          {
            id: 4,
            concept: 'Medicación',
            amount: 40,
            type: 'MEDICATION',
            createdAt: '2023-01-02T00:00:00.000Z',
            updatedAt: '2023-01-02T00:00:00.000Z',
          },
        ],
        createdAt: '2023-01-02T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      },
    ];
  }

  ngOnChanges(): void {
    this.currentBill = this.bills?.filter((bill) => bill.isClosed)[0];
  }
}
