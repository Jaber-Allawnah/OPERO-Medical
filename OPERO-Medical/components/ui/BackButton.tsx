import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '@/constants/theme';

export default function BackButton({ onPress }: any) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="chevron-back" size={RFValue(20)} color={Colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: hp('4.5%'),
    height: hp('4.5%'),
    borderRadius: hp('2.25%'),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
