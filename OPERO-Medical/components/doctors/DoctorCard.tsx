import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';

export default function DoctorCard({ doctor, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageWrapper}>
        {doctor.profilePicture ? (
          <Image source={{ uri: doctor.profilePicture }} style={styles.image} />
        ) : (
          <Ionicons name="person" size={RFValue(60)} color={Colors.white} />
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {doctor.name?.startsWith('Dr.') ? doctor.name : `Dr. ${doctor.name}`}
      </Text>
      <Text style={styles.specialty} numberOfLines={1}>{doctor.specialty}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp('43%'),
    backgroundColor: Colors.white,
    borderRadius: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden'
  },
  imageWrapper: {
    width: '100%',
    height: hp('18%'),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
    color: Colors.nero,
    marginTop: Spacing.xs,
    marginHorizontal: Spacing.xs,
  },
  specialty: {
    fontSize: RFValue(11),
    color: Colors.primary,
    marginBottom: Spacing.xs,
    marginHorizontal: Spacing.xs,
  },
});
