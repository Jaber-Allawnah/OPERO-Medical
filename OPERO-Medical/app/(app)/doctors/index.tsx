/**
 * Doctors List Screen
 * Assigned to: Jaber
 *
 * What to do here:
 * - Fetch all doctors from the API using Axios (doctors.service.ts).
 * - Use useEffect to trigger the fetch when the screen loads.
 * - Store the list in useState and show a loading state while fetching.
 * - Render each doctor using the DoctorCard component (pass data as props).
 * - On card press, navigate to the doctor details screen using router.push()
 *   and pass the doctor's ID: router.push(`/(app)/doctors/${doctor.id}`)
 * - Use FlatList or ScrollView to display the list.
 * - Use SafeAreaView at the top.
 * - Use RFValue / widthPercentageToDP for all sizes (no px).
 */
import { View, Text } from 'react-native';

export default function DoctorsScreen() {
  return (
    <View>
      <Text>Doctors</Text>
    </View>
  );
}
