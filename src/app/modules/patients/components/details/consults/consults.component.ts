import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BillItem } from '@patients/models/bill.model';

@Component({
  selector: 'patient-details-consults',
  imports: [CommonModule],
  templateUrl: './consults.component.html',
  styleUrl: './consults.component.css',
})
export class ConsultsComponent implements OnInit {
  @Input() consultations?: BillItem[];

  ngOnInit(): void {
    this.consultations = [
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
        concept: 'Consulta',
        amount: 20,
        type: 'CONSULTATION',
        createdAt: '2023-01-02T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      },
    ];
  }
}
