/**
 * Forgot Password Screen
 * Assigned to: Shared
 *
 * What to do here:
 * - Build a form using useForm (react-hook-form).
 * - Fields: email, new password, confirm password.
 * - Validate that new password and confirm password match.
 * - On submit, call the reset password API function (Axios).
 * - Navigate back to login using router.replace('/') after success.
 * - Use KeyboardAvoidingView + ScrollView.
 * - Use RFValue / widthPercentageToDP for all sizes (no px).
 */
import { View, Text } from 'react-native';

export default function ForgotPasswordScreen() {
  return (
    <View>
      <Text>Forgot Password</Text>
    </View>
  );
}
