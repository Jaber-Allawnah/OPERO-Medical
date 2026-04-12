import { useForm } from 'react-hook-form';
import {Text,TouchableOpacity,KeyboardAvoidingView,ScrollView,Platform,StyleSheet,Alert,View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';
import { resetPassword } from '@/services/auth.service';

export default function ForgotPasswordScreen() {
  const {control,handleSubmit,formState: { errors },} = useForm({
    defaultValues: {
      email: '',
  },
  });

  const onSubmit = async (data: any) => {
    try {
      await resetPassword(data.email);
      Alert.alert(
        'Success',
        'A reset password link has been sent to your email.'
      );

      router.back();
    } catch (error: any) {
      const code = error?.code;
      if (code === 'auth/user-not-found') {
        Alert.alert('Error', 'No account found with this email.');
      } else if (code === 'auth/invalid-email') {
        Alert.alert('Error', 'Please enter a valid email address.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}

          <View style={styles.headerWrapper}>
            <Text style={styles.headerTitle}>RESET PASSWORD</Text>
          </View>

          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              Enter the email associated with your account, and we’ll send an
              email link with instructions to reset your password.
            </Text>
          </View>

          <Text style={styles.label}>Email</Text>

          <FormInput
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}/>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>
              Send Reset Password Link
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },

  headerWrapper: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: Colors.nero,
    letterSpacing: 2,
  },

  descriptionWrapper: {
    marginBottom: Spacing.md,
    width: '95%',
  },
  description: {
    fontSize: RFValue(13),
    color: Colors.black50,
    lineHeight: RFValue(22),
  },

  label: {
    fontSize: RFValue(13),
    color: Colors.black50,
    marginBottom: Spacing.xs,
  },

  button: {
    width: wp('60%'),
    height: hp('6.2%'),
    borderRadius: RFValue(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Spacing.md,
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: RFValue(13),
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: Spacing.sm,
  },
});
