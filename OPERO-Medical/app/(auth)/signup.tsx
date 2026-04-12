import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Text,TouchableOpacity,Image,KeyboardAvoidingView,ScrollView,Platform,StyleSheet,Alert,View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';
import { register } from '@/services/auth.service';
import { saveSecure } from '@/services/storage.service';

export default function SignUpScreen() {
  const [selectedRole, setSelectedRole] = useState('patient');
  const {
    control, handleSubmit,watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',email: '', phone: '',password: '',confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: any) => {
    try {
      const { token } = await register(
        data.name,data.email, data.password,data.phone,selectedRole
      );

      await saveSecure('token', token);

      Alert.alert('Success', 'Your account has been created successfully.');
      router.back();
    } catch (error: any) {
      const code = error?.code;

      if (code === 'auth/email-already-in-use') {
        Alert.alert('Sign Up Failed', 'This email is already in use.');
      } else if (code === 'auth/invalid-email') {
        Alert.alert('Sign Up Failed', 'Please enter a valid email address.');
      } else if (code === 'auth/weak-password') {
        Alert.alert('Sign Up Failed', 'Password should be at least 6 characters.');
      } else {
        Alert.alert('Sign Up Failed', 'Something went wrong. Please try again.');
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
          keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>SIGN UP</Text>

          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"/>

          <FormInput
            control={control}
            name="name"
            rules={{
              required: 'Full name is required',
            }}
            placeholder="Full Name"
            error={errors.name?.message}/>

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
            placeholder="Enter your Email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}/>

          <FormInput
            control={control}
            name="phone"
            rules={{
              required: 'Phone number is required',
              minLength: {
                value: 10,
                message: 'Phone number must be at least 10 digits',
              },
            }}
            placeholder="Enter Your Phone Number"
            keyboardType="phone-pad"
            error={errors.phone?.message}/>

          <View style={styles.roleWrapper}>
            <Text style={styles.roleLabel}>Select Role</Text>

            <View style={styles.roleButtonsRow}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'patient' ? styles.roleButtonActive : null,
                ]}
                activeOpacity={0.85}
                onPress={() => setSelectedRole('patient')}>
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === 'patient' ? styles.roleButtonTextActive : null,
                  ]}>
                  Patient
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'doctor' ? styles.roleButtonActive : null,
                ]}
                activeOpacity={0.85}
                onPress={() => setSelectedRole('doctor')}>
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === 'doctor' ? styles.roleButtonTextActive : null,
                  ]}>
                  Doctor
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <FormInput
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              validate: {
                minLength: (v: any) =>
                  v.length >= 8 || 'Password must be at least 8 characters',
                hasUpper: (v: any) =>
                  /[A-Z]/.test(v) || 'Password must contain an uppercase letter',
                hasLower: (v: any) =>
                  /[a-z]/.test(v) || 'Password must contain a lowercase letter',
                hasSpecial: (v: any) =>
                  /[!@#$%^&*]/.test(v) ||
                  'Password must contain a special character (!@#$%^&*)',
              },
            }}
            placeholder="Enter Your Password"
            secureTextEntry
            error={errors.password?.message}
          />

          <FormInput
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm password is required',
              validate: (value: any) =>
                value === password || 'Passwords do not match',
            }}
            placeholder="Confirm Password"
            secureTextEntry
            error={errors.confirmPassword?.message}
          />

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.85}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    marginTop: Spacing.md,
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: Colors.nero,
    letterSpacing: 2,
  },
  logo: {
    width: wp('45%'),
    height: hp('18%'),
    marginVertical: Spacing.sm,
  },
  roleWrapper: {
    width: '100%',
    marginBottom: hp('2%'),
  },
  roleLabel: {
    fontSize: RFValue(13),
    color: Colors.nero,
    marginBottom: Spacing.xs,
    marginLeft: wp('2%'),
  },
  roleButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  roleButton: {
    flex: 1,
    height: hp('6.2%'),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: RFValue(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  roleButtonActive: {
    backgroundColor: Colors.primary,
  },
  roleButtonText: {
    fontSize: RFValue(13),
    color: Colors.primary,
    fontWeight: '600',
  },
  roleButtonTextActive: {
    color: Colors.white,
  },
  signUpButton: {
    width: wp('60%'),
    height: hp('6.5%'),
    borderRadius: RFValue(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
    backgroundColor: Colors.primary,
  },
  signUpButtonText: {
    color: Colors.white,
    fontSize: RFValue(16),
    fontWeight: '600',
  },
  or: {
    fontSize: RFValue(13),
    color: Colors.black50,
    marginBottom: Spacing.sm,
  },
  loginText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: Colors.nero,
  },
});