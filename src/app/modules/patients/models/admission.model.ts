import { AssignedEmployee } from '@patients/models/employee.model';

export enum AdmissionStatus {
  ADMITTED = 'ADMITTED',
  DISCHARGED = 'DISCHARGED',
}

export interface NewAdmission {
  admissionDate: string;
  dischargeDate?: string;
  patientId: number;
  roomId: number;
}

export type Admission = Omit<NewAdmission, 'patientId' | 'roomId'> & {
  id: number;
  status: keyof typeof AdmissionStatus;
  assignedEmployees?: AssignedEmployee[];
  roomId: number;
  roomNumber: string;
  roomCostPerDay?: number;
  createdAt: string;
  updatedAt?: string;
};
