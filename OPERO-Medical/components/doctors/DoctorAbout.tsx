import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors, Spacing } from '@/constants/theme';
import StatCard from './StatCard';

export default function DoctorAbout({ doctor }: { doctor: any }) {
  return (
    <>
      <View style={styles.statsRow}>
        <StatCard
          icon={<Ionicons name="time-outline" size={RFValue(22)} color={Colors.primary} />}
          value={`${doctor.experience ?? 0}`}
          label="years"/>
        <StatCard
          icon={<MaterialCommunityIcons name="stethoscope" size={RFValue(22)} color={Colors.primary} />}
          value={doctor.specialty ?? 'N/A'}
          label="Specialty"/>
        <StatCard
          icon={<Ionicons name="people-outline" size={RFValue(22)} color={Colors.primary} />}
          value={`${doctor.cases ?? 0} +`}
          label="Cases"/>
      </View>

      <View style={styles.card}>
        <Text style={styles.bioText}>{doctor.bio || 'No bio available.'}</Text>
      </View>

      <View style={[styles.card, styles.priceCard]}>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.priceValue}>₪{doctor.price ?? 100}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    elevation: 2,
  },
  bioText: {
    fontSize: RFValue(13),
    color: Colors.nero,
    lineHeight: RFValue(20),
  },
  priceCard: {
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: RFValue(14),
    color: Colors.nero,
    fontWeight: '500',
  },
  priceValue: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: Colors.nero,
    marginTop: Spacing.xxs,
  },
});
