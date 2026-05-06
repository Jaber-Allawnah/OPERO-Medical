import { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import * as SQLite from 'expo-sqlite';
import * as Network from 'expo-network';
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
  const [user, setUser] = useState<any>(null);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [offlineDoctors, setOfflineDoctors] = useState<any[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: getAllDoctors,
    refetchInterval: 10000,
    enabled: isOnline,
  });

  useFocusEffect(
    useCallback(() => {
      getCachedUser().then(setUser);
    }, [])
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const netState = await Network.getNetworkStateAsync();
      const online = (netState.isConnected && netState.isInternetReachable) ?? true;
      if (!cancelled) setIsOnline(!!online);

      const database = await SQLite.openDatabaseAsync('doctors_offline.db');
      await database.execAsync(
        'CREATE TABLE IF NOT EXISTS doctors (id INTEGER PRIMARY KEY, name TEXT, specialty TEXT, experience INTEGER);'
      );
      const existing = await database.getAllAsync('SELECT * FROM doctors');
      if (existing.length === 0) {
        await database.runAsync('INSERT INTO doctors VALUES (1, ?, ?, ?)', ['Jaber', 'Cardiology', 5]);
        await database.runAsync('INSERT INTO doctors VALUES (2, ?, ?, ?)', ['Ibrahim', 'Neurology', 8]);
        await database.runAsync('INSERT INTO doctors VALUES (3, ?, ?, ?)', ['Abdallah', 'Orthopedics', 3]);
      }
      if (!cancelled) setDb(database);
    })();
    return () => { cancelled = true; };
  }, []);

  const reload = useCallback(async () => {
    if (!db) return;
    const rows = await db.getAllAsync<{ id: number; name: string; specialty: string; experience: number }>(
      'SELECT * FROM doctors;'
    );
    setOfflineDoctors(rows);
  }, [db]);

  useEffect(() => { void reload(); }, [reload]);

  const onlineDoctors = (data ?? []).filter((doctor: any) => {
    const matchesSearch = doctor.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || doctor.specialty === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  const displayDoctors = isOnline ? onlineDoctors : offlineDoctors;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.headerCard}>
          <View style={styles.avatarRow}>
            {user?.profilePicture
              ? <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
              : <View style={styles.avatar}><Ionicons name="person" size={RFValue(22)} color={Colors.primary} /></View>}
            <Text style={styles.helloText}>Hello {user?.name?.split(' ')[0] ?? 'User'}</Text>
          </View>
          <Text style={styles.feelingText}>How Are You{'\n'}Feeling Today?</Text>
          {!isOnline && <Text style={styles.offlineBanner}>You are offline — showing cached doctors</Text>}
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

        {isOnline && (
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
        )}

        {isOnline && isLoading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}
        {displayDoctors.length === 0 && !isLoading && <Text style={styles.emptyText}>No doctors found.</Text>}

        <View style={styles.grid}>
          {displayDoctors.map((doctor: any) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onPress={() => isOnline ? router.push(`/(app)/doctors/${doctor.id}` as any) : undefined}
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
  offlineBanner: { fontSize: RFValue(11), color: Colors.white, opacity: 0.8, marginBottom: Spacing.xs },
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
