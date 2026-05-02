import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, Spacing } from '@/constants/theme';
import UserAvatar from '@/components/ui/UserAvatar';

export default function AppointmentCard({ appointment, role, onDelete }: any) {
    const isDoctor = role === 'doctor';
    const name = isDoctor ? appointment.patientName : `Dr. ${appointment.doctorName}`;
    const photo = isDoctor ? null : appointment.doctorPhoto;

    return (
        <View style={styles.card}>
            <UserAvatar uri={photo} size={hp('7%')} iconSize={RFValue(28)} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.detail}>{appointment.date} • {appointment.time}</Text>
                <Text style={styles.amount}>₪{appointment.amount}</Text>
            </View>
            {isDoctor && (
                <TouchableOpacity onPress={() => onDelete(appointment.id)} style={styles.deleteBtn}>
                    <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Spacing.md,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        gap: Spacing.sm,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: RFValue(14),
        fontWeight: '600',
        color: Colors.nero,
        marginBottom: Spacing.xxs,
    },
    detail: {
        fontSize: RFValue(12),
        color: Colors.black50,
        marginBottom: Spacing.xxs,
    },
    amount: {
        fontSize: RFValue(13),
        color: Colors.primary,
        fontWeight: '500',
    },
    deleteBtn: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: Spacing.sm,
        backgroundColor: Colors.red,
    },
    deleteText: {
        fontSize: RFValue(12),
        color: Colors.white,
        fontWeight: '600',
    },
});
