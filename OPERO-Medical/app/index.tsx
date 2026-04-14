import { useForm } from 'react-hook-form';
import {Text, Image, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';
import { login } from '@/services/auth.service';
import { saveSecure } from '@/services/storage.service';
import { getMe } from '@/services/user.service';
import ActionButton from '@/components/ui/ActionButton';
import useAuthMutation from "@/hooks/useAuthMutation";

export default function LoginScreen() {
  const {control, handleSubmit, formState: { errors },} = useForm({
    defaultValues: { email: '', password: '' },
  });
  const handleLogin=async (data: any)=>{
    const { token } = await login(data.email, data.password);
    await saveSecure('token', token);
    await getMe();
    return token;
  }

  const loginMutation = useAuthMutation({
    mutationKey: ['login'],
    mutationFn: handleLogin,
    onSuccess: () => {router.replace('/(app)/doctors');},
    onError: (error: any) => {Alert.alert(`Error ${error?.code}`);
    },
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
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
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                }}
                placeholder="Enter your Password"
                secureTextEntry
                error={errors.password?.message}/>

            <ActionButton
                title="Forgot Password?"
                onPress={() => router.push('/(auth)/forgot-password')}
                style={styles.forgotWrapper}
                textStyle={styles.forgotText}/>

            <ActionButton
                title={loginMutation.isPending ? 'Loading...' : 'Login'}
                onPress={handleSubmit(onSubmit)}
                style={styles.loginButton}
                textStyle={styles.loginButtonText}/>

            <Text style={styles.or}>OR</Text>

            <Text style={styles.newUser}>Are you a New User?</Text>

            <ActionButton
                title="SIGN UP"
                onPress={() => router.push('/(auth)/signup')}
                textStyle={styles.signUp}/>
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
});
