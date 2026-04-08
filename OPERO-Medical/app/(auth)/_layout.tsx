/**
 * Auth Layout
 * Stack navigator for signup and forgot password screens.
 */
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
