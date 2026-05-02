import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';

export default function CommonFields({ control, errors }: any) {
  return (
    <>
      <FormInput control={control} name="name" placeholder="Full Name" rules={{ required: 'Name is required' }} error={errors.name?.message} />
      <FormInput control={control} name="email" placeholder="Email" keyboardType="email-address" rules={{ required: 'Email is required' }} error={errors.email?.message} />
      <FormInput control={control} name="phone" placeholder="Phone Number" keyboardType="phone-pad" error={errors.phone?.message} />

      <TouchableOpacity style={styles.changePasswordRow} onPress={() => router.push('/change-password')} activeOpacity={0.8}>
        <Text style={styles.changePasswordText}>Change Password</Text>
        <Ionicons name="chevron-forward" size={RFValue(16)} color={Colors.primary} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  changePasswordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    height: hp('6.5%'),
    marginBottom: Spacing.md,
  },
  changePasswordText: {
    fontSize: RFValue(13),
    color: Colors.primary,
    fontWeight: '600',
  },
});
