import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import BackButton from '@/components/ui/BackButton';
import ActionButton from '@/components/ui/ActionButton';
import FormScreenLayout from '@/components/ui/FormScreenLayout';
import UserAvatar from '@/components/ui/UserAvatar';
import CommonFields from '@/components/profile/CommonFields';
import PatientFields from '@/components/profile/PatientFields';
import DoctorFields from '@/components/profile/DoctorFields';
import useEditProfile from '@/hooks/useEditProfile';

export default function EditProfileScreen() {
  const { user, slots, isSaving, control, handleSubmit, errors, handleSave, addSlot, updateSlot, removeSlot } = useEditProfile();

  if (!user) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <FormScreenLayout contentStyle={styles.scrollContent}>

      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.title}>Edit Profile</Text>
        <View style={{ width: hp('4.5%') }} />
      </View>

      <View style={styles.avatarWrapper}>
        <UserAvatar uri={user?.profilePicture} size={hp('12%')} iconSize={RFValue(40)} style={styles.avatar} />
        <Text style={styles.changeAvatar}>Change Avatar</Text>
      </View>

      <CommonFields control={control} errors={errors} />

      {user?.role === 'patient' && <PatientFields control={control} errors={errors} />}

      {user?.role === 'doctor' && (
        <DoctorFields
          control={control}
          errors={errors}
          slots={slots}
          onUpdateSlot={updateSlot}
          onRemoveSlot={removeSlot}
          onAddSlot={addSlot}
        />
      )}

      <View style={styles.buttonsRow}>
        <ActionButton
          title={isSaving ? 'Saving...' : 'Save'}
          onPress={handleSubmit(handleSave)}
          style={styles.saveBtn}
          textStyle={styles.saveBtnText}
        />
        <ActionButton
          title="Cancel"
          onPress={() => router.back()}
          style={styles.cancelBtn}
          textStyle={styles.cancelBtnText}
        />
      </View>

    </FormScreenLayout>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
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
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    backgroundColor: Colors.background,
  },
  changeAvatar: {
    fontSize: RFValue(13),
    color: Colors.nero,
    marginTop: Spacing.xs,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  saveBtn: {
    flex: 1,
    height: hp('6.5%'),
    borderRadius: Spacing.xxl,
    backgroundColor: Colors.primary,
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: RFValue(14),
    fontWeight: '600',
  },
  cancelBtn: {
    flex: 1,
    height: hp('6.5%'),
    borderRadius: Spacing.xxl,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  cancelBtnText: {
    color: Colors.primary,
    fontSize: RFValue(14),
    fontWeight: '600',
  },
});
