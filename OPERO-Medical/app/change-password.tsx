import { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';
import FormScreenLayout from '@/components/ui/FormScreenLayout';
import FormInput from '@/components/ui/FormInput';
import ActionButton from '@/components/ui/ActionButton';
import BackButton from '@/components/ui/BackButton';
import { changePassword } from '@/services/user.service';

export default function ChangePasswordScreen() {
  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit, getValues, formState: { errors } } = useForm<any>({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      await changePassword(data.currentPassword, data.newPassword);
      Alert.alert('Success', 'Password changed successfully.');
      router.back();
    } catch (e: any) {
      const isWrongPassword = e?.code === 'auth/wrong-password' || e?.code === 'auth/invalid-credential';
      Alert.alert('Error', isWrongPassword ? 'Current password is incorrect.' : e?.message ?? 'Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <FormScreenLayout contentStyle={styles.content}>

      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.title}>Change Password</Text>
        <View style={{ width: hp('4.5%') }} />
      </View>

      <Text style={styles.subtitle}>
        Enter your current password to verify your identity, then set a new password.
      </Text>

      <FormInput
        control={control}
        name="currentPassword"
        label="Current Password"
        secureTextEntry
        rules={{ required: 'Current password is required' }}
        error={errors.currentPassword?.message}
      />

      <FormInput
        control={control}
        name="newPassword"
        label="New Password"
        secureTextEntry
        rules={{
          required: 'New password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        }}
        error={errors.newPassword?.message}
      />

      <FormInput
        control={control}
        name="confirmPassword"
        label="Confirm New Password"
        secureTextEntry
        rules={{
          required: 'Please confirm your new password',
          validate: (value: any) => value === getValues('newPassword') || 'Passwords do not match',
        }}
        error={errors.confirmPassword?.message}
      />

      <ActionButton
        title={isSaving ? 'Saving...' : 'Change Password'}
        onPress={handleSubmit(onSubmit)}
        style={styles.saveBtn}
        textStyle={styles.saveBtnText}
      />

    </FormScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp('5%'),
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: Colors.nero,
  },
  subtitle: {
    fontSize: RFValue(13),
    color: Colors.black50,
    lineHeight: RFValue(20),
    marginBottom: Spacing.lg,
  },
  saveBtn: {
    height: hp('6.5%'),
    borderRadius: Spacing.xxl,
    backgroundColor: Colors.primary,
    marginTop: Spacing.sm,
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: RFValue(14),
    fontWeight: '600',
  },
});
