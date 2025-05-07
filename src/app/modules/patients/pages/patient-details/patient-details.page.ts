import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmissionsComponent } from '@patients/components/details/admissions/admissions.component';
import { BillsComponent } from '@patients/components/details/bills/bills.component';
import { ConsultsComponent } from '@patients/components/details/consults/consults.component';
import { SurgeriesComponent } from '@patients/components/details/surgeries/surgeries.component';
import { Admission } from '@patients/models/admission.model';
import { Bill, BillItem } from '@patients/models/bill.model';
import { Patient } from '@patients/models/patient.model';
import { Surgery } from '@patients/models/surgery.model';
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
  admissions?: Admission[];
  surgeries?: Surgery[];
  bills?: Bill[];
  consultations?: BillItem[];

  ngOnInit(): void {
    this.patientService.getPatientById(this.id).subscribe((patient) => {
      this.patient = patient;
    });
    this.admissions = [
      {
        id: 1,
        admissionDate: '2023-01-01',
        dischargeDate: '2023-01-02',
        status: 'ADMITTED',
        assignedEmployees: [
          {
            id: 1,
            fullName: 'El Doctor',
            cui: '123456789',
            phone: '123456789',
            email: 'doctor@example.com',
            type: 'DOCTOR',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
          {
            id: 2,
            fullName: 'El Especialista',
            cui: '987654321',
            phone: '987654321',
            email: 'specialist@example.com',
            type: 'SPECIALIST',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        ],
        roomId: 1,
        roomNumber: '123',
        roomCostPerDay: 100,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        admissionDate: '2023-01-03',
        dischargeDate: '2023-01-04',
        status: 'DISCHARGED',
        roomId: 2,
        roomNumber: '456',
        roomCostPerDay: 200,
        createdAt: '2023-01-03T00:00:00.000Z',
        updatedAt: '2023-01-03T00:00:00.000Z',
      },
    ];
    this.surgeries = [
      {
        id: 1,
        description: 'Cirugía de la mano',
        performedDate: '2023-01-01',
        specialists: [
          {
            id: 1,
            fullName: 'El Especialista',
            cui: '987654321',
            phone: '987654321',
            email: 'specialist@example.com',
            type: 'SPECIALIST',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        ],
        tariffHospitalCost: 100,
        tariffSpecialistFee: 50,
        tariffPrice: 150,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        description: 'Cirugía de la piel',
        performedDate: '2023-01-02',
        specialists: [
          {
            id: 2,
            fullName: 'El Especialista',
            cui: '987654321',
            phone: '987654321',
            email: 'specialist@example.com',
            type: 'SPECIALIST',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        ],
        tariffHospitalCost: 200,
        tariffSpecialistFee: 100,
        tariffPrice: 300,
        createdAt: '2023-01-02T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      },
    ];
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
