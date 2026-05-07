import { useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
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
import { uploadToCloudinary } from '@/services/cloudinary.service';
import { waitForUser, getCachedUser } from '@/services/user.service';

export default function EditProfileScreen() {
  const { user, slots, isSaving, control, handleSubmit, errors, handleSave, addSlot, updateSlot, removeSlot, updateAvatar } = useEditProfile();

  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [uploading, setUploading] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestCameraPermission] = useCameraPermissions();

  const openCamera = async () => {
    if (!permission?.granted) await requestCameraPermission();
    setShowCamera(true);
  };

  const takePicture = async () => {
    try {
      setUploading(true);
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
      if (!photo?.uri) return;
      const url = await uploadToCloudinary(photo.uri);
      const firebaseUser = await waitForUser();
      const cached = await getCachedUser();
      const uid = firebaseUser?.uid ?? cached?.uid;
      if (!uid) throw new Error('User is not authenticated.');
      await updateAvatar(uid, url);
      setShowCamera(false);
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Failed to upload photo.');
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <FormScreenLayout contentStyle={styles.scrollContent}>

        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <Text style={styles.title}>Edit Profile</Text>
          <View style={{ width: hp('4.5%') }} />
        </View>

        <TouchableOpacity style={styles.avatarWrapper} onPress={openCamera} activeOpacity={0.8}>
          <UserAvatar uri={user?.profilePicture} size={hp('12%')} iconSize={RFValue(40)} style={styles.avatar} />
          <Text style={styles.changeAvatar}>Change Avatar</Text>
        </TouchableOpacity>

        <CommonFields control={control} errors={errors} />
        {user?.role === 'patient' && <PatientFields control={control} errors={errors} />}
        {user?.role === 'doctor' && (
          <DoctorFields control={control} errors={errors} slots={slots} onUpdateSlot={updateSlot} onRemoveSlot={removeSlot} onAddSlot={addSlot} />
        )}

        <View style={styles.buttonsRow}>
          <ActionButton title={isSaving ? 'Saving...' : 'Save'} onPress={handleSubmit(handleSave)} style={styles.saveBtn} textStyle={styles.saveBtnText} />
          <ActionButton title="Cancel" onPress={() => router.back()} style={styles.cancelBtn} textStyle={styles.cancelBtnText} />
        </View>

      </FormScreenLayout>

      <Modal visible={showCamera} animationType="slide" onRequestClose={() => setShowCamera(false)}>
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} facing={facing} style={styles.camera} />
          <View style={styles.cameraControls}>
            <ActionButton
              title="Flip"
              onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
              style={styles.flipBtn}
              textStyle={styles.btnText}
            />
            <ActionButton
              title={uploading ? 'Uploading...' : 'Take Photo'}
              onPress={takePicture}
              style={styles.captureBtn}
              textStyle={styles.captureBtnText}
            />
            <ActionButton
              title="Cancel"
              onPress={() => setShowCamera(false)}
              style={styles.cancelCameraBtn}
              textStyle={styles.btnText}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: wp('5%'), paddingBottom: Spacing.xl },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  title: { fontSize: RFValue(18), fontWeight: 'bold', color: Colors.nero },
  avatarWrapper: { alignItems: 'center', marginBottom: Spacing.lg },
  avatar: { backgroundColor: Colors.background },
  changeAvatar: { fontSize: RFValue(13), color: Colors.nero, marginTop: Spacing.xs },
  buttonsRow: { flexDirection: 'row', gap: Spacing.md },
  saveBtn: { flex: 1, height: hp('6.5%'), borderRadius: Spacing.xxl, backgroundColor: Colors.primary },
  saveBtnText: { color: Colors.white, fontSize: RFValue(14), fontWeight: '600' },
  cancelBtn: { flex: 1, height: hp('6.5%'), borderRadius: Spacing.xxl, borderWidth: 1, borderColor: Colors.primary, backgroundColor: Colors.white },
  cancelBtnText: { color: Colors.primary, fontSize: RFValue(14), fontWeight: '600' },
  cameraContainer: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    backgroundColor: '#000',
  },
  captureBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.xxl,
  },
  captureBtnText: { color: Colors.white, fontSize: RFValue(14), fontWeight: '600' },
  flipBtn: {
    borderWidth: 1,
    borderColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.xxl,
  },
  cancelCameraBtn: {
    borderWidth: 1,
    borderColor: Colors.red,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.xxl,
  },
  btnText: { color: Colors.white, fontSize: RFValue(13), fontWeight: '600' },
});
