import { useState } from 'react';
import {
  View, Text, Image,
  ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';
import ActionButton from '@/components/ui/ActionButton';
import BackButton from '@/components/ui/BackButton';
import DoctorAbout from '@/components/doctors/DoctorAbout';
import DoctorAvailability from '@/components/doctors/DoctorAvailability';
import { getDoctorById } from '@/services/doctors.service';
import { saveToStorage } from '@/services/storage.service';

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('about');
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const { data: doctor, isLoading } = useQuery({
    queryKey: ['doctor', id],
    queryFn: () => getDoctorById(id as string),
  });

  const handleBook = async () => {
    if (!selectedSlot || !doctor) return;
    await saveToStorage('pendingAppointment', {
      doctor: { id: doctor.id, name: doctor.name },
      date: new Date().toLocaleDateString(),
      time: selectedSlot,
      amount: doctor.price ?? 100,
    });
    router.push('/(app)/payment');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  if (!doctor) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Doctor not found.</Text>
      </SafeAreaView>
    );
  }

  const doctorName = doctor.name?.startsWith('Dr.') ? doctor.name : `Dr. ${doctor.name}`;
  const slots= doctor.availableSlots ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerCard}>
        <BackButton onPress={() => router.back()} />
        <View style={styles.imageWrapper}>
          {doctor.profilePicture ? (
            <Image source={{ uri: doctor.profilePicture }} style={styles.doctorImage} />) : (
            <Ionicons name="person" size={RFValue(80)} color={Colors.white} />)}
        </View>
        <Text style={styles.doctorName}>{doctorName}</Text>
      </View>

      <View style={styles.tabsRow}>
        <ActionButton
          title="About"
          onPress={() => setActiveTab('about')}
          style={[styles.tab, activeTab === 'about' && styles.tabActive]}
          textStyle={[styles.tabText, activeTab === 'about' && styles.tabTextActive]}/>
        <ActionButton
          title="Availability"
          onPress={() => setActiveTab('availability')}
          style={[styles.tab, activeTab === 'availability' && styles.tabActive]}
          textStyle={[styles.tabText, activeTab === 'availability' && styles.tabTextActive]}/>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'about' ? ( <DoctorAbout doctor={doctor} />) : (
            <DoctorAvailability slots={slots}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            onBook={handleBook}/>)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: RFValue(14),
    color: Colors.black50,
  },

  headerCard: {
    backgroundColor: Colors.primary,
    marginHorizontal: wp('5%'),
    marginTop: Spacing.md,
    borderRadius: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
imageWrapper: {
    alignSelf: 'center',
    width: wp('45%'),
    height: hp('22%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  doctorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: Spacing.md,
  },
  doctorName: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: Spacing.sm,
  },

  tabsRow: {
    flexDirection: 'row',
    marginHorizontal: wp('5%'),
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Spacing.xxl,
    padding: Spacing.xxs,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.xxl,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: RFValue(13),
    color: Colors.black50,
    fontWeight: '500',
  },
  tabTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },

  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingBottom: Spacing.xl,
  },
});
