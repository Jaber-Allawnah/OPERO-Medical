/**
 * AppointmentCard — Used in the Appointments List screen (Abdallah).
 * Receives an appointment object as a prop.
 * Style it properly when building the Appointments screen.
 */
import { View, Text } from 'react-native';
import type { Appointment } from '@/types/appointment.types';

export default function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <View>
      <Text>{appointment.date}</Text>
      <Text>{appointment.status}</Text>
    </View>
  );
}
