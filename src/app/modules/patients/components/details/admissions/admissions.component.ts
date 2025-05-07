import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { Admission } from '@patients/models/admission.model';

@Component({
  selector: 'patient-details-admissions',
  imports: [CommonModule],
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.css',
})
export class AdmissionsComponent implements OnChanges {
  @Input() admissions?: Admission[];

  currentAdmission?: Admission;

  ngOnChanges(): void {
    this.currentAdmission = this.admissions?.filter(
      (admission) => admission.status === 'ADMITTED'
    )[0];
  }

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
