import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';

export default function SlotRow({ slot, selected, onPress }: any) {
  return (
    <TouchableOpacity style={styles.slotRow} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.slotText}>{slot}</Text>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacing.md,
    paddingHorizontal: Spacing.md,
    height: hp('7%'),
    marginBottom: Spacing.sm,
    elevation: 2,
  },
  slotText: {
    fontSize: RFValue(14),
    color: Colors.nero,
  },
  radio: {
    width: RFValue(22),
    height: RFValue(22),
    borderRadius: RFValue(11),
    borderWidth: 2,
    borderColor: Colors.black50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioDot: {
    width: RFValue(11),
    height: RFValue(11),
    borderRadius: RFValue(5.5),
    backgroundColor: Colors.primary,
  },
});
