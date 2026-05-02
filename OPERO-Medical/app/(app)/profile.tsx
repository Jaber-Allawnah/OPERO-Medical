/**
 * Profile Screen
 * Assigned to: Ibrahim
 *
 * What to do here:
 * - Display the logged-in user's info (name, email, phone, profilePicture).
 * - Read user data from AsyncStorage using getCachedUser() from user.service.ts.
 * - Add an edit mode that lets the user update their info using useForm.
 * - On save, update the Firestore users document and save updated data back to AsyncStorage.
 * - Logout button is already wired up below — clears token and navigates to login.
 * - Use SafeAreaView from react-native-safe-area-context.
 * - Use ScrollView for content.
 * - Fonts → RFValue(), widths/heights → wp()/hp(), margins/padding → Spacing constants from theme.ts.
 */
import {View, Text, Button} from 'react-native';
import {logout} from "@/services/auth.service";
import {removeSecure} from "@/services/storage.service";
import {router} from "expo-router";

export default function ProfileScreen() {
    const handleLogout=async()=>{
        await logout();
        await removeSecure('token');
        router.replace('/')
    }
  return (
    <View>
      <Text>Profile</Text>
        <Text>Profile</Text>
        <Text>Profile</Text>

        <Button title="Logout" onPress={handleLogout} />

    </View>
  );
}
