import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FormScreenLayout from '@/components/ui/FormScreenLayout';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';
import { login } from '@/services/auth.service';
import {saveSecure, getSecure} from '@/services/storage.service';
import { getMe, getCachedUser } from '@/services/user.service';
import ActionButton from '@/components/ui/ActionButton';
import useAuthMutation from "@/hooks/useAuthMutation";

export default function LoginScreen() {
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const token = await getSecure('token');
      setBiometricAvailable(hasHardware && isEnrolled && !!token);
    })();
  }, []);

  const handleBiometricLogin = useCallback(async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('This device does not support Face ID / biometric login.');
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('No Face ID / fingerprint is set up on this device.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Face ID',
      fallbackLabel: 'Use Passcode',
      cancelLabel: 'Cancel',
    });

    if (result.success) {
      await saveSecure('biometricEnabled', 'true');
      const user = await getCachedUser() as any;
      router.replace(user?.role === 'doctor' ? '/(app)/appointments' : '/(app)/doctors');
    } else {
      Alert.alert('Authentication failed or cancelled.');
    }
  }, []);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = useCallback(async (data: any) => {
    const { token } = await login(data.email, data.password);
    await saveSecure('token', token);
    await saveSecure('biometricEnabled', 'true');
    const user = await getMe() as any;
    return { token, role: user?.role };
  }, []);

  const loginMutation = useAuthMutation({
    mutationKey: ['login'],
    mutationFn: handleLogin,
    onSuccess: (result: any) => {
      router.replace(result?.role === 'doctor' ? '/(app)/appointments' : '/(app)/doctors');
    },
    onError: (error: any) => { Alert.alert(`Error ${error?.code}`); },
  });

  return (
    <FormScreenLayout contentStyle={styles.scrollContent}>
          <Text style={styles.title}>LOG IN</Text>

          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain" />

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
            error={errors.email?.message} />

          <FormInput
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            }}
            placeholder="Enter your Password"
            secureTextEntry
            error={errors.password?.message} />

          <ActionButton
            title="Forgot Password?"
            onPress={() => router.push('/(auth)/forgot-password')}
            style={styles.forgotWrapper}
            textStyle={styles.forgotText} />

          <ActionButton
            title={loginMutation.isPending ? 'Loading...' : 'Login'}
            onPress={handleSubmit((data) => loginMutation.mutate(data as any))}
            style={styles.loginButton}
            textStyle={styles.loginButtonText} />


          {biometricAvailable && (
            <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricLogin} activeOpacity={0.8}>
              <Ionicons name="scan-outline" size={RFValue(28)} color={Colors.primary} />
              <Text style={styles.biometricText}>Login with Face ID / Fingerprint</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.or}>OR</Text>

          <Text style={styles.newUser}>Are you a New User?</Text>

          <ActionButton
            title="SIGN UP"
            onPress={() => router.push('/(auth)/signup')}
            textStyle={styles.signUp} />
    </FormScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
    paddingBottom: Spacing.xl,
  },
  title: {
    marginTop: Spacing.xxl,
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: Colors.nero,
    letterSpacing: 2,
  },
  logo: {
    width: wp('55%'),
    height: hp('25%'),
    marginVertical: Spacing.lg,
  },
  forgotWrapper: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotText: {
    fontSize: RFValue(12),
    color: Colors.nero,
  },
  loginButton: {
    width: wp('60%'),
    height: hp('6.5%'),
    borderRadius: Spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
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
    marginBottom: Spacing.sm,
  },
  newUser: {
    fontSize: RFValue(13),
    color: Colors.nero,
    marginBottom: Spacing.xs,
  },
  signUp: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: Colors.nero,
  },
  biometricButton: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  biometricText: {
    fontSize: RFValue(12),
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
});
