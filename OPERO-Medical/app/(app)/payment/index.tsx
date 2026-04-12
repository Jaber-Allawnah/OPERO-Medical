import { useForm } from 'react-hook-form';
import {Text,TouchableOpacity,KeyboardAvoidingView,ScrollView,Platform,StyleSheet,View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import FormInput from '@/components/ui/FormInput';

export default function PaymentScreen() {
    const params = useLocalSearchParams();

    const doctor = typeof params.doctor === 'string' ? params.doctor : '';
    const date = typeof params.date === 'string' ? params.date : '';
    const time = typeof params.time === 'string' ? params.time : '';
    const amount = typeof params.amount === 'string' ? params.amount : '';

    const {control,handleSubmit,formState: { errors },
          defaultValues: {
            cardHolderName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
    });

    const onSubmit = async (data: any) => {
        await processPayment(data);
        router.replace('/(app)/appointments');
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
                        <Text style={styles.summaryText}>Doctor: {doctor}</Text>
                        <Text style={styles.summaryText}>Date: {date}</Text>
                        <Text style={styles.summaryText}>Time: {time}</Text>
                        <Text style={styles.summaryText}>Amount: {amount}</Text>
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
                        rules={{ required: 'Card Number is required' }}
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
                                rules={{ required: 'CVV is required' }}
                                placeholder="CVV"
                                keyboardType="number-pad"
                                error={errors.cvv?.message}/>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.paymentButton}
                        onPress={handleSubmit(onSubmit)}
                        activeOpacity={0.85}>
                        <Text style={styles.paymentButtonText}>Done</Text>
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
        justifyContent: 'center',
        paddingHorizontal: Spacing.sm,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.lg,
    },
    summaryContainer: {
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: RFValue(24),
        fontWeight: 'bold',
        marginBottom: Spacing.sm,
        textAlign: 'center',
        letterSpacing: 2,
        color: Colors.nero,
    },
    summaryText: {
        fontSize: RFValue(15),
        marginBottom: Spacing.xs,
        color: Colors.primary,
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
        borderRadius: RFValue(Spacing.md),
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
