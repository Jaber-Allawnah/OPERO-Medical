import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';
import {router} from "expo-router";
import {login} from "@/services/auth.service";
import {saveSecure} from "@/services/storage.service";

export default function LoginScreen() {

  const { control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: any) => {
    try {
      const { token } = await login(data.email, data.password);
      await saveSecure("token", token);
      router.replace('/(app)/doctors');
    } catch (error: any) {
      const code = error?.code;
      if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        Alert.alert('Login Failed', 'Incorrect email or password.');
      } else if (code === 'auth/too-many-requests') {
        Alert.alert('Login Failed', 'Too many attempts. Please try again later.');
      } else {
        Alert.alert('Login Failed', 'Something went wrong. Please try again.');
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
            showsVerticalScrollIndicator={false}>

          <Text style={styles.title}>LOG IN</Text>

          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"/>

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
            name="password"
            rules={{
              required: 'Password is required',
              validate: {
                minLength: (v: any) => v.length >= 8 || 'Password must be at least 8 characters',
                hasUpper: (v: any) => /[A-Z]/.test(v) || 'Password must contain an uppercase letter',
                hasLower: (v: any) => /[a-z]/.test(v) || 'Password must contain a lowercase letter',
                hasSpecial: (v: any) => /[!@#$%^&*]/.test(v) || 'Password must contain a special character (!@#$%^&*)',
              },
            }}
            placeholder="Enter your Password"
            secureTextEntry
            error={errors.password?.message}/>

          <TouchableOpacity
            style={styles.forgotWrapper}
            onPress={() => router.push('/(auth)/forgot-password' as any)}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.85}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>

          <Text style={styles.newUser}>Are you a New User?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signUp}>SIGN UP</Text>
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
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
    paddingBottom: hp('4%'),
  },
  title: {
    marginTop: hp('6%'),
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: Colors.nero,
    letterSpacing: 2,
  },
  logo: {
    width: wp('55%'),
    height: hp('25%'),
    marginVertical: hp('3%'),
  },
  forgotWrapper: {
    alignSelf: 'flex-end',
    marginBottom: hp('3%'),
  },
  forgotText: {
    fontSize: RFValue(12),
    color: Colors.nero,
  },
  loginButton: {
    width: wp('60%'),
    height: hp('6.5%'),
    borderRadius: RFValue(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
    backgroundColor: Colors.primary,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: RFValue(16),
    fontWeight: '600',
  },
  or: {
    fontSize: RFValue(13),
    color: Colors.black50,
    marginBottom: hp('1.5%'),
  },
  newUser: {
    fontSize: RFValue(13),
    color: Colors.nero,
    marginBottom: hp('1%'),
  },
  signUp: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: Colors.nero,
  },
});
