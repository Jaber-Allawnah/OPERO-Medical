// Doctors List Screen — Jaber
import { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Colors, Spacing } from '@/constants/theme';
import DoctorCard from '@/components/doctors/DoctorCard';
import { getAllDoctors } from '@/services/doctors.service';
import { getCachedUser } from '@/services/user.service';

const SPECIALIZATIONS = [
  'All', 'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Gynecology', 'Ophthalmology', 'ENT', 'Psychiatry',
  'General Practice', 'Dentistry', 'Oncology', 'Gastroenterology',
  'Urology', 'Endocrinology', 'Pulmonology',
];

export default function DoctorsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [user, setUser] = useState(null as any);

  const { data, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: getAllDoctors,
    refetchInterval: 10000,
  });

  const doctors = data ?? [];

  useEffect(() => {
    getCachedUser().then(setUser);
  }, []);

  const filteredDoctors = doctors.filter((doctor: any) => {
    const matchesSearch = doctor.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || doctor.specialty === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header card */}
        <View style={styles.headerCard}>
          <View style={styles.avatarRow}>
            {user?.profilePicture
              ? <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
              : <View style={styles.avatar}><Ionicons name="person" size={RFValue(22)} color={Colors.primary} /></View>}
            <Text style={styles.helloText}>Hello {user?.name?.split(' ')[0] ?? 'User'}</Text>
          </View>
          <Text style={styles.feelingText}>How Are You{'\n'}Feeling Today?</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={RFValue(18)} color={Colors.black50} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctor name..."
              placeholderTextColor={Colors.black50}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          {SPECIALIZATIONS.map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[styles.chip, selectedSpec === spec && styles.chipActive]}
              onPress={() => setSelectedSpec(spec)}
              activeOpacity={0.8}>
              <Text style={[styles.chipText, selectedSpec === spec && styles.chipTextActive]}>{spec}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {isLoading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}
        {!isLoading && filteredDoctors.length === 0 && <Text style={styles.emptyText}>No doctors found.</Text>}

        <View style={styles.grid}>
          {filteredDoctors.map((doctor: any) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onPress={() => router.push(`/(app)/doctors/${doctor.id}` as any)}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  headerCard: {
    backgroundColor: Colors.primary,
    marginHorizontal: wp('5%'),
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: Spacing.lg,
    padding: Spacing.lg,
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  avatar: {
    width: hp('5%'),
    height: hp('5%'),
    borderRadius: hp('2.5%'),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  helloText: { fontSize: RFValue(13), color: Colors.white, fontWeight: '500' },
  feelingText: { fontSize: RFValue(18), fontWeight: 'bold', color: Colors.white, marginBottom: Spacing.md },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    height: hp('5.5%'),
  },
  searchInput: { flex: 1, marginLeft: Spacing.xs, fontSize: RFValue(13), color: Colors.nero },

  chipsContainer: { paddingHorizontal: wp('5%'), paddingBottom: Spacing.md },
  chip: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs,
    marginRight: Spacing.xs,
  },
  chipActive: { backgroundColor: Colors.primary },
  chipText: { fontSize: RFValue(12), color: Colors.primary },
  chipTextActive: { color: Colors.white },

  loader: { marginTop: Spacing.xxl },
  emptyText: { textAlign: 'center', fontSize: RFValue(14), color: Colors.black50, marginTop: Spacing.xxl },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingBottom: Spacing.xl,
  },
});
