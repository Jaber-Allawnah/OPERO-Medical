import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {Text, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, View, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';
import ActionButton from '@/components/ui/ActionButton';
import { processPayment } from '@/services/appointments.service';
import { getFromStorage, removeFromStorage } from '@/services/storage.service';

export default function PaymentScreen() {
    const [appointmentInfo, setAppointmentInfo] = useState<any>({
        doctor: '',
        date: '',
        time: '',
        amount: '',
    });

    const {control, handleSubmit, formState: { errors },} = useForm({
        defaultValues: {
            cardHolderName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
    });

    useEffect(() => {
        const loadAppointmentInfo = async () => {
            const storedAppointment = await getFromStorage('pendingAppointment');

            if (storedAppointment) {
                setAppointmentInfo(storedAppointment);
            }
        };
        loadAppointmentInfo();
    }, []);

    const onSubmit = async () => {
        try {
            await processPayment({
                doctor: appointmentInfo.doctor,
                date: appointmentInfo.date,
                time: appointmentInfo.time,
                amount: appointmentInfo.amount,
            });

            await removeFromStorage('pendingAppointment');

            Alert.alert('Success', 'Payment has been completed successfully.');
            router.replace('/(app)/appointments');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong while processing payment.');
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
                    <View style={styles.summaryContainer}>
                        <Text style={styles.title}>PAYMENT</Text>
                        <Text style={styles.summaryText}>Doctor: {appointmentInfo.doctor}</Text>
                        <Text style={styles.summaryText}>Date: {appointmentInfo.date}</Text>
                        <Text style={styles.summaryText}>Time: {appointmentInfo.time}</Text>
                        <Text style={styles.summaryText}>Amount: {appointmentInfo.amount}</Text>
                    </View>

                    <FormInput
                        control={control}
                        name="cardHolderName"
                        rules={{ required: 'Card Holder Name is required' }}
                        placeholder="Card Holder Name"
                        error={errors.cardHolderName?.message}/>

                    <FormInput
                        control={control}
                        name="cardNumber"
                        rules={{
                            required: 'Card Number is required',
                            minLength: {
                                value: 16,
                                message: 'Card number must be 16 digits',
                            },
                        }}
                        placeholder="Card Number"
                        keyboardType="number-pad"
                        error={errors.cardNumber?.message}/>

                    <View style={styles.row}>
                        <View style={styles.halfWidth}>
                            <FormInput
                                control={control}
                                name="expiryDate"
                                rules={{ required: 'Expiry Date is required' }}
                                placeholder="Expiry Date"
                                error={errors.expiryDate?.message}/>
                        </View>

                        <View style={styles.halfWidth}>
                            <FormInput
                                control={control}
                                name="cvv"
                                rules={{
                                    required: 'CVV is required',
                                    minLength: {
                                        value: 3,
                                        message: 'CVV must be at least 3 digits',
                                    },
                                }}
                                placeholder="CVV"
                                keyboardType="number-pad"
                                error={errors.cvv?.message}
                            />
                        </View>
                    </View>

                    <ActionButton
                        title="Done"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.paymentButton}
                        textStyle={styles.paymentButtonText}/>
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
        justifyContent: 'center',
        paddingHorizontal: Spacing.sm,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.lg,
    },
    summaryContainer: {
        marginBottom: Spacing.md,
    },
    title: {
        marginTop: Spacing.md,
        fontSize: RFValue(22),
        fontWeight: 'bold',
        color: Colors.nero,
        letterSpacing: 2,
        textAlign:"center"
    },
    summaryText: {
        fontSize: RFValue(15),
        marginBottom: Spacing.xs,
        color: Colors.nero,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.xs,
    },
    halfWidth: {
        width: wp('42%'),
    },
    paymentButton: {
        width: wp('65%'),
        height: hp('7%'),
        borderRadius: Spacing.xxl,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Spacing.sm,
        backgroundColor: Colors.primary,
    },
    paymentButtonText: {
        color: Colors.white,
        fontSize: RFValue(16),
        fontWeight: '600',
    },
});
