import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Surgery } from '@patients/models/surgery.model';

@Component({
  selector: 'patient-details-surgeries',
  imports: [CommonModule],
  templateUrl: './surgeries.component.html',
  styleUrl: './surgeries.component.css',
})
export class SurgeriesComponent {
  @Input() surgeries?: Surgery[];

  typeToString(type: string): string {
    switch (type) {
      case 'DOCTOR':
        return 'Doctor';
      case 'SPECIALIST':
        return 'Especialista';
      case 'NURSE':
        return 'Enfermera';
      default:
        return 'Desconocido';
    }
  }
}
