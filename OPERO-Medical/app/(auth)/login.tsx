/**
 * Login Screen
 * Assigned to: Jaber
 *
 * What to do here:
 * - Build the login form using useForm (react-hook-form) with email and password fields.
 * - Use KeyboardAvoidingView + ScrollView so the form isn't hidden by the keyboard.
 * - On submit, call the login function from auth.service.ts (Axios).
 * - Save the returned token/user using SecureStore or AsyncStorage.
 * - Navigate to /(app)/doctors using router.replace() after successful login.
 * - Show an error message if login fails.
 * - Add a link that navigates to the signup screen using router.push().
 * - Use RFValue / widthPercentageToDP for all sizes (no px).
 */
import { View, Text } from 'react-native';

export default function LoginScreen() {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}
