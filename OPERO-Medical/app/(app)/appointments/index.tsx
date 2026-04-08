/**
 * Appointments List Screen
 * Assigned to: Abdallah
 *
 * What to do here:
 * - Get the current user's ID from useContext (AuthContext) or AsyncStorage.
 * - Fetch the user's appointments from the API using Axios (appointments.service.ts).
 * - Use useEffect to fetch data when the screen loads.
 * - Store appointments in useState and show a loading state while fetching.
 * - Render each appointment using the AppointmentCard component (pass data as props).
 * - Filter appointments by status (upcoming / past) using useState for the active filter.
 * - Add a cancel button on pending appointments that calls cancelAppointment (Axios).
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
