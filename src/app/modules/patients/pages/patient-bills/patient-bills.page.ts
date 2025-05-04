import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '@patients/models/patient.model';
import { PatientService } from '@patients/services/patient.service';

@Component({
  selector: 'patient-patient-bills',
  imports: [],
  templateUrl: './patient-bills.page.html',
  styleUrl: './patient-bills.page.css',
})
export class PatientBillsPage implements OnInit {
  private readonly patientService = inject(PatientService);

  id: number = inject(ActivatedRoute).snapshot.params['id'];
  patient!: Patient;

  ngOnInit(): void {
    this.patientService.getPatientById(this.id).subscribe((patient) => {
      this.patient = patient;
    });
  }
}
