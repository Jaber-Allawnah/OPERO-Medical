/**
 * Sign Up Screen
 * Assigned to: Ibrahim
 *
 * What to do here:
 * - Build the registration form using useForm (react-hook-form).
 * - Fields: full name, email, phone number, password, confirm password.
 * - Use KeyboardAvoidingView + ScrollView so the form isn't hidden by the keyboard.
 * - On submit, call the register function from auth.service.ts (Axios).
 * - Navigate to /(auth)/login using router.replace() after successful registration.
 * - Add a link back to login using router.back() or router.push().
 * - Use RFValue / widthPercentageToDP for all sizes (no px).
 */
import { View, Text } from 'react-native';

export default function SignupScreen() {
  return (
    <View>
      <Text>Sign Up</Text>
    </View>
  );
}
