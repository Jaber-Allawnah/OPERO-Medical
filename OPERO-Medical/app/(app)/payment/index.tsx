/**
 * Payment Screen
 * Assigned to: Abdallah
 *
 * What to do here:
 * - Receive the booking details (doctor, date, time, amount) passed via navigation params.
 * - Display a summary of the appointment being booked.
 * - Build a payment form using useForm (react-hook-form).
 * - Fields: cardholder name, card number, expiry date, CVV.
 * - Use KeyboardAvoidingView + ScrollView so the form isn't hidden by the keyboard.
 * - On submit, call the processPayment .
 * - Navigate to /(app)/appointments using router.replace() after successful payment.
 * - Use SafeAreaView for safe spacing.
 * - Use RFValue / widthPercentageToDP for all sizes (no px).
 */
import { View, Text } from 'react-native';

export default function PaymentScreen() {
  return (
    <View>
      <Text>Payment</Text>
    </View>
  );
}
