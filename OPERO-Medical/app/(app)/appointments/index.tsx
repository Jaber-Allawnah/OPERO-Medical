import { useCallback, useState } from 'react';
import { Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Colors, Spacing } from '@/constants/theme';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import { getMyAppointments, cancelAppointment } from '@/services/appointments.service';
import { getCachedUser } from '@/services/user.service';

export default function AppointmentsScreen() {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<any>(null);

    useFocusEffect(
        useCallback(() => {
            getCachedUser().then(setUser);
        }, [])
    );

    const { data: appointments = [], isLoading } = useQuery({
        queryKey: ['appointments', user?.uid],
        queryFn: () => getMyAppointments(user.uid, user.role),
        enabled: !!user,
    });

    const handleDelete = useCallback(async (appointmentId: string) => {
        Alert.alert('Remove Appointment', 'Are you sure you want to remove this appointment?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Remove',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await cancelAppointment(appointmentId);
                        queryClient.invalidateQueries({ queryKey: ['appointments', user?.uid] });
                    } catch (e: any) {
                        Alert.alert('Error', e?.message ?? 'Failed to remove appointment.');
                    }
                },
            },
        ]);
    }, [user?.uid]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Appointments</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                {appointments.length === 0
                    ? <Text style={styles.empty}>No appointments yet.</Text>
                    : appointments.map((item: any) => (
                        <AppointmentCard key={item.id} appointment={item} role={user?.role} onDelete={handleDelete} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: Colors.nero,
        marginHorizontal: wp('5%'),
        marginVertical: Spacing.md,
    },
    list: {
        paddingHorizontal: wp('5%'),
        paddingBottom: Spacing.xl,
    },
    empty: {
        textAlign: 'center',
        marginTop: Spacing.xl,
        fontSize: RFValue(14),
        color: Colors.black50,
    },
});
