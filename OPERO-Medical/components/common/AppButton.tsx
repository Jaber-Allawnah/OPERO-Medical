/**
 * AppButton — Shared reusable button component.
 * Accepts a title (text to show) and an onPress callback.
 * Style it properly when you start building your screens.
 */
import { TouchableOpacity, Text } from 'react-native';

export default function AppButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
