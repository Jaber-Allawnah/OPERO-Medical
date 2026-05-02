import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';

export default function StatCard({ icon, value, label }:any) {
  return (
    <View style={styles.card}>
      {icon}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp('27%'),
    backgroundColor: Colors.white,
    borderRadius: Spacing.md,
    padding: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: RFValue(11),
    fontWeight: 'bold',
    color: Colors.nero,
    marginTop: Spacing.xxs,
  },
  label: {
    fontSize: RFValue(8),
    color: Colors.black50,
    marginTop: 2,
  },
});
