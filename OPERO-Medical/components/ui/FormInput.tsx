import { Controller } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '@/constants/theme';

export default function FormInput({ control, name, rules, error, ...rest }: any) {
  return (
    <View style={styles.wrapper}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.black50}
              value={value}
              onChangeText={onChange}
              {...rest}
            />
          </View>
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: hp('2%'),
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: RFValue(25),
    paddingHorizontal: wp('5%'),
    height: hp('6.5%'),
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.red,
  },
  input: {
    fontSize: RFValue(13),
    color: Colors.nero,
  },
  error: {
    color: Colors.red,
    fontSize: RFValue(11),
    marginTop: hp('0.5%'),
    marginLeft: wp('2%'),
  },
});
