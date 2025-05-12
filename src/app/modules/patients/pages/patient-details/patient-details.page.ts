import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmissionsComponent } from '@patients/components/details/admissions/admissions.component';
import { BillsComponent } from '@patients/components/details/bills/bills.component';
import { ConsultsComponent } from '@patients/components/details/consults/consults.component';
import { SurgeriesComponent } from '@patients/components/details/surgeries/surgeries.component';
import { Patient } from '@patients/models/patient.model';
import { PatientService } from '@patients/services/patient.service';

@Component({
  selector: 'patient-patient-details',
  imports: [
    AdmissionsComponent,
    SurgeriesComponent,
    BillsComponent,
    ConsultsComponent,
  ],
  templateUrl: './patient-details.page.html',
  styleUrl: './patient-details.page.css',
})
export class PatientDetailsPage implements OnInit {
  private readonly patientService = inject(PatientService);

  id: number = inject(ActivatedRoute).snapshot.params['id'];
  patient?: Patient;

  ngOnInit(): void {
    this.patientService.getPatientById(this.id).subscribe((patient) => {
      this.patient = patient;
    });
  }
}
