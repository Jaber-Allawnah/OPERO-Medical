/**
 * Profile Screen
 * Assigned to: Ibrahim
 *
 * What to do here:
 * - Display the logged-in user's information (name, email, phone, profile picture).
 * - Read user data from useContext (AuthContext) or AsyncStorage (JSON.parse).
 * - Add an edit mode that lets the user update their info using useForm.
 * - On save, call the update user API function from auth.service.ts (Axios).
 * - Save the updated info back to AsyncStorage (JSON.stringify).
 * - Add a logout button that clears storage and navigates to /(auth)/login using router.replace().
 * - Use ScrollView for the content and SafeAreaView for safe spacing.
 * - Use RFValue / widthPercentageToDP for all sizes (no px).
 */
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
