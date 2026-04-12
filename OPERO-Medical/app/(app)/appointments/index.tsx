/**
 * Appointments List Screen
 * Assigned to: Abdallah
 *
 * What to do here:
 * - Get the current user's ID from AsyncStorage.
 * - Fetch the user's appointments from the firebases (appointments.service.ts).
 * - Use useEffect to fetch data when the screen loads.
 * - Store appointments in useState and show a loading state while fetching.
 * - Render each appointment using the AppointmentCard component (pass data as props).
 * - Add a cancel button on pending appointments that calls removes appointment using firebase
 * - Use ScrollView or FlatList to display the list.
 * - Use SafeAreaView at the top.
 * - Use RFValue / widthPercentageToDP for all sizes (no px).
 */
import { View, Text } from 'react-native';

export default function AppointmentsScreen() {
  return (
    <View>
      <Text>Appointments</Text>
    </View>
  );
}
