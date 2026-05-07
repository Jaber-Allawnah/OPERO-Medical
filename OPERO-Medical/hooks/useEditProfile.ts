import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { getCachedUser, getMe, updateUserProfile, updateProfilePicture, waitForUser } from '@/services/user.service';
import { updateDoctorProfile, getDoctorById } from '@/services/doctors.service';

export default function useEditProfile() {
  const [user, setUser] = useState<any>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<any>();

  useEffect(() => {
    const load = async () => {
      const firebaseUser = await waitForUser();
      const cached = await getCachedUser();
      const uid = firebaseUser?.uid ?? cached?.uid;
      if (!uid) return;

      let userData: any = null;
      try { userData = await getMe(); } catch {}

      const currentUser = userData ?? cached;
      if (!currentUser) return;

      currentUser.uid = uid;
      setUser(currentUser);

      const formData: any = {
        name: currentUser.name ?? '',
        email: currentUser.email ?? '',
        phone: currentUser.phone ?? '',
      };

      if (currentUser.role === 'patient') {
        formData.weight = currentUser.weight ?? '';
        formData.bloodGroup = currentUser.bloodGroup ?? '';
        formData.height = currentUser.height ?? '';
      }

      if (currentUser.role === 'doctor') {
        const d = await getDoctorById(uid);
        setSlots(d.availableSlots ?? []);
        formData.price = String(d.price ?? '');
        formData.experience = d.experience ?? '';
        formData.bio = d.bio ?? '';
        formData.specialty = d.specialty ?? '';
      }

      reset(formData);
    };
    load();
  }, []);

  const handleSave = useCallback(async (data: any) => {
    setIsSaving(true);
    try {
      const firebaseUser = await waitForUser();
      const cached = await getCachedUser();
      const uid = firebaseUser?.uid ?? cached?.uid;
      if (!uid) throw new Error('User is not authenticated.');

      await updateUserProfile(uid, data);
      if (user?.role === 'doctor') {
        await updateDoctorProfile(uid, { ...data, availableSlots: slots.filter((s) => s.trim() !== '') });
        queryClient.invalidateQueries({ queryKey: ['doctor', uid] });
      }
      await getMe();
      Alert.alert('Success', 'Profile updated successfully.');
      router.back();
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  }, [user, slots, queryClient]);

  const addSlot = useCallback(() => setSlots((prev) => [...prev, '']), []);

  const updateSlot = useCallback((index: number, value: string) => {
    setSlots((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }, []);

  const removeSlot = useCallback((index: number) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateAvatar = useCallback(async (uid: string, url: string) => {
    await updateProfilePicture(uid, url);
    setUser((prev: any) => ({ ...prev, profilePicture: url }));
  }, []);

  return { user, slots, isSaving, control, handleSubmit, errors, handleSave, addSlot, updateSlot, removeSlot, updateAvatar };
}
