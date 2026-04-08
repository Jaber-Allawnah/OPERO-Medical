/**
 * DoctorCard — Used in the Doctors List screen (Jaber).
 * Receives a doctor object as a prop and an onPress callback.
 * Style it properly when building the Doctors screen.
 */
import { TouchableOpacity, Text } from 'react-native';
import type { Doctor } from '@/types/doctor.types';

export default function DoctorCard({ doctor, onPress }: { doctor: Doctor; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{doctor.name}</Text>
      <Text>{doctor.specialty}</Text>
    </TouchableOpacity>
  );
}
