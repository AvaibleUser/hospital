import { AssignedEmployee } from '@patients/models/employee.model';

export interface NewSurgery {
  description?: string;
  performedDate: string;
  patientId: number;
  specialistIds: number[];
}

export type Surgery = Omit<NewSurgery, 'patientId' | 'specialistIds'> & {
  id: number;
  specialists?: AssignedEmployee[];
  tariffHospitalCost?: number;
  tariffSpecialistFee?: number;
  tariffPrice?: number;
  createdAt: string;
  updatedAt?: string;
};
