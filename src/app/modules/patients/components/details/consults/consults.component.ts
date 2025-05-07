import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BillItem } from '@patients/models/bill.model';

@Component({
  selector: 'patient-details-consults',
  imports: [CommonModule],
  templateUrl: './consults.component.html',
  styleUrl: './consults.component.css',
})
export class ConsultsComponent {
  @Input() consultations?: BillItem[];
}
