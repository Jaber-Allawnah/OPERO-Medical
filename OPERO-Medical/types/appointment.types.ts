export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  totalAmount: number;
}
