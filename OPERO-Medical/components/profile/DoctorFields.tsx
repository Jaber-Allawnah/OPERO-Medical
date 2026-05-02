import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';
import ActionButton from '@/components/ui/ActionButton';

export default function DoctorFields({ control, errors, slots, onUpdateSlot, onRemoveSlot, onAddSlot }: any) {
  return (
    <>
      <FormInput control={control} name="price" placeholder="Price (₪)" keyboardType="numeric" error={errors.price?.message} />
      <FormInput control={control} name="experience" placeholder="Years of Experience" error={errors.experience?.message} />
      <FormInput control={control} name="bio" placeholder="Bio" multiline error={errors.bio?.message} />
      <FormInput control={control} name="specialty" placeholder="Specialty" error={errors.specialty?.message} />

      {slots.map((slot: string, index: number) => (
        <View key={index} style={styles.slotRow}>
          <TextInput
            style={styles.slotInput}
            value={slot}
            placeholder="e.g. 09:00 AM"
            placeholderTextColor={Colors.black50}
            onChangeText={(val) => onUpdateSlot(index, val)}
          />
          <TouchableOpacity onPress={() => onRemoveSlot(index)} activeOpacity={0.7}>
            <Ionicons name="trash-outline" size={RFValue(18)} color={Colors.red} />
          </TouchableOpacity>
        </View>
      ))}

      <ActionButton title="Add New Time" onPress={onAddSlot} style={styles.addSlotBtn} textStyle={styles.addSlotText} />
    </>
  );
}

const styles = StyleSheet.create({
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    height: hp('6.5%'),
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  slotInput: {
    flex: 1,
    fontSize: RFValue(13),
    color: Colors.nero,
  },
  addSlotBtn: {
    height: hp('6.5%'),
    borderRadius: Spacing.xxl,
    backgroundColor: Colors.primary,
    marginBottom: Spacing.lg,
  },
  addSlotText: {
    color: Colors.white,
    fontSize: RFValue(14),
    fontWeight: '600',
  },
});
