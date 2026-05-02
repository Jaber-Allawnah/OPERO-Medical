import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors, Spacing } from '@/constants/theme';

export default function MenuItem({ icon, title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        <Ionicons name={icon} size={RFValue(20)} color={Colors.nero} />
        <Text style={styles.text}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={RFValue(18)} color={Colors.nero} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  text: {
    fontSize: RFValue(14),
    color: Colors.nero,
  },
});
