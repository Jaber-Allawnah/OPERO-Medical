import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, Image, StyleSheet, View, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';
import FormScreenLayout from '@/components/ui/FormScreenLayout';
import ActionButton from '@/components/ui/ActionButton';
import { register } from '@/services/auth.service';
import useAuthMutation from '@/hooks/useAuthMutation';

const SPECIALTIES = [
    'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics',
    'Pediatrics', 'Gynecology', 'Ophthalmology', 'ENT', 'Psychiatry',
    'General Practice', 'Dentistry', 'Oncology', 'Gastroenterology',
    'Urology', 'Endocrinology', 'Pulmonology',
];

export default function SignUpScreen() {
    const [selectedRole, setSelectedRole] = useState('patient');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    const { control, handleSubmit, getValues, formState: { errors } } = useForm<any>({
        defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
    });

    const handleRegister = async (data: any) => {
        await register(data.name, data.email, data.password, data.phone, selectedRole, {
            specialty: selectedSpecialty,
        });
    };

    const signUpMutation = useAuthMutation({
        mutationKey: ['register'],
        mutationFn: handleRegister,
        onSuccess: () => {
            Alert.alert('Success', 'Your account has been created successfully.');
            router.replace('/');
        },
        onError: (error: any) => { Alert.alert(`Error ${error?.code}`); },
    });

    return (
        <FormScreenLayout contentStyle={styles.scrollContent}>

            <Text style={styles.title}>SIGN UP</Text>

            <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

            <FormInput
                control={control}
                name="name"
                rules={{ required: 'Full name is required' }}
                placeholder="Full Name"
                error={errors.name?.message}/>

            <FormInput
                control={control}
                name="email"
                rules={{
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
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
                    minLength: { value: 10, message: 'Phone number must be at least 10 digits' },
                }}
                placeholder="Enter Your Phone Number"
                keyboardType="phone-pad"
                error={errors.phone?.message}/>

            <View style={styles.roleWrapper}>
                <Text style={styles.roleLabel}>Select Role</Text>
                <View style={styles.roleButtonsRow}>
                    <ActionButton
                        title="Patient"
                        onPress={() => setSelectedRole('patient')}
                        style={[styles.roleButton, selectedRole === 'patient' && styles.roleButtonActive]}
                        textStyle={[styles.roleButtonText, selectedRole === 'patient' && styles.roleButtonTextActive]}/>
                    <ActionButton
                        title="Doctor"
                        onPress={() => setSelectedRole('doctor')}
                        style={[styles.roleButton, selectedRole === 'doctor' && styles.roleButtonActive]}
                        textStyle={[styles.roleButtonText, selectedRole === 'doctor' && styles.roleButtonTextActive]}/>
                </View>
            </View>

            {selectedRole === 'doctor' && (
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedSpecialty}
                        onValueChange={(val) => setSelectedSpecialty(val)}
                        style={styles.picker}>
                        <Picker.Item label="Select Specialty..." value="" />
                        {SPECIALTIES.map((s) => <Picker.Item key={s} label={s} value={s} />)}
                    </Picker>
                </View>
            )}

            <FormInput
                control={control}
                name="password"
                rules={{
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                }}
                placeholder="Enter Your Password"
                secureTextEntry
                error={errors.password?.message}/>

            <FormInput
                control={control}
                name="confirmPassword"
                rules={{
                    required: 'Confirm password is required',
                    validate: (value: any) => value === getValues('password') || 'Passwords do not match',
                }}
                placeholder="Confirm Password"
                secureTextEntry
                error={errors.confirmPassword?.message}/>

            <ActionButton
                title={signUpMutation.isPending ? 'Loading...' : 'Sign Up'}
                onPress={handleSubmit((data: any) => signUpMutation.mutate(data))}
                style={styles.signUpButton}
                textStyle={styles.signUpButtonText}/>

            <Text style={styles.or}>OR</Text>

            <ActionButton title="LOG IN" onPress={() => router.replace('/')} textStyle={styles.loginText} />

        </FormScreenLayout>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
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
    pickerWrapper: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: RFValue(12),
        marginBottom: Spacing.sm,
        backgroundColor: Colors.white,
    },
    picker: {
        width: '100%',
        color: Colors.nero,
    },
});
