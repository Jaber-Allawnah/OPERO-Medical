/**
 * ScreenHeader — Shared page title component.
 * Accepts a title string and renders it at the top of a screen.
 * Style it properly when you start building your screens.
 */
import { View, Text } from 'react-native';

export default function ScreenHeader({ title }: { title: string }) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
