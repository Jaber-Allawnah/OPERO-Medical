/**
 * Doctor Details Screen
 * Assigned to: Jaber
 *
 * What to do here:
 * - Get the doctor ID from the URL using useLocalSearchParams() — the [id] in the file name.
 * - Fetch that specific doctor's data from the API using Axios (doctors.service.ts).
 * - Use useEffect to fetch data when the screen loads.
 * - Store data in useState and show a loading state while fetching.
 * - Display doctor info: name, specialty, rating, clinic, bio, available slots.
 * - Let the user select a time slot (useState for the selected slot).
 * - Add a "Book Appointment" button that navigates to /(app)/payment using router.push()
 *   and passes booking details.
 * - Use ScrollView for the full content and SafeAreaView for top spacing.
 * - Add a back button using router.back().
 * - Use RFValue / widthPercentageToDP for all sizes (no px).
 */
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Doctor Details — ID: {id}</Text>
    </View>
  );
}
