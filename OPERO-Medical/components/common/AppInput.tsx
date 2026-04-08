/**
 * AppInput — Shared reusable text input component.
 * Accepts an optional label and all standard TextInput props.
 * Style it properly when you start building your screens.
 */
import { TextInput, View, Text, type TextInputProps } from 'react-native';

interface AppInputProps extends TextInputProps {
  label?: string;
}

export default function AppInput({ label, ...rest }: AppInputProps) {
  return (
    <View>
      {label && <Text>{label}</Text>}
      <TextInput {...rest} />
    </View>
  );
}
