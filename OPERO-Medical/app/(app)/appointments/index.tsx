import { useCallback, useState } from 'react';
import { Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import { getMyAppointments, cancelAppointment } from '@/services/appointments.service';
import { getCachedUser } from '@/services/user.service';

export default function AppointmentsScreen() {
    const [user, setUser] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadAppointments = useCallback(async () => {
        setLoading(true);
        try {
            const currentUser = await getCachedUser();
            if (!currentUser) return;
            setUser(currentUser);
            const data = await getMyAppointments(currentUser.uid, currentUser.role);
            setAppointments(data);
        } catch (e: any) {
            Alert.alert('Error', e?.message ?? 'Failed to load appointments.');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(useCallback(() => { loadAppointments(); }, [loadAppointments]));

    const handleDelete = useCallback(async (appointmentId: string) => {
        Alert.alert('Remove Appointment', 'Are you sure you want to remove this appointment?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Remove',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await cancelAppointment(appointmentId);
                        setAppointments((prev) => prev.filter((a) => a.id !== appointmentId));
                    } catch (e: any) {
                        Alert.alert('Error', e?.message ?? 'Failed to remove appointment.');
                    }
                },
            },
        ]);
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Appointments</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AppointmentCard appointment={item} role={user?.role} onDelete={handleDelete} />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.empty}>No appointments yet.</Text>}
                showsVerticalScrollIndicator={false}
            />
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
