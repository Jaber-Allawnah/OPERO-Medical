/**
 * App Default Route — Fallback only.
 *
 * Login always navigates directly to /(app)/doctors, so this screen is never shown.
 * It exists only because Expo Router requires an index in each group.
 */
import { View } from 'react-native';

export default function AppIndex() {
  return <View />;
}
