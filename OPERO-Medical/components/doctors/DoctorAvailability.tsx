import { Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';
import ActionButton from '@/components/ui/ActionButton';
import SlotRow from './SlotRow';

export default function DoctorAvailability({ slots, selectedSlot, onSelectSlot, onBook }: any) {
  return (
    <>
      {slots.length === 0 ? (
        <Text style={styles.noSlots}>No available slots.</Text>) : (
        slots.map((slot: any) => (
          <SlotRow
            key={slot}
            slot={slot}
            selected={selectedSlot === slot}
            onPress={() => onSelectSlot(slot)}/>
        ))
      )}

      <ActionButton
        title="Booking"
        onPress={onBook}
        style={[styles.bookBtn, !selectedSlot && styles.bookBtnDisabled]}
        textStyle={styles.bookBtnText}/>
    </>
  );
}

const styles = StyleSheet.create({
  noSlots: {
    textAlign: 'center',
    fontSize: RFValue(13),
    color: Colors.black50,
    marginTop: Spacing.lg,
  },
  bookBtn: {
    height: hp('7%'),
    borderRadius: Spacing.xxl,
    backgroundColor: Colors.primary,
    marginTop: Spacing.md,
  },
  bookBtnDisabled: {
    backgroundColor: Colors.black50,
  },
  bookBtnText: {
    color: Colors.white,
    fontSize: RFValue(16),
    fontWeight: '600',
  },
});
