import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { db } from './firebase';
import { getCachedUser } from './user.service';

export const bookAppointment = async (data: any) => {
    const user = await getCachedUser();
    if (!user) throw new Error('User not authenticated');
    await addDoc(collection(db, 'appointments'), {
        patientId: user.uid,
        patientName: user.name ?? '',
        doctorId: data.doctor.id,
        doctorName: data.doctor.name,
        doctorPhoto: data.doctor.photo ?? '',
        date: data.date,
        time: data.time,
        amount: data.amount,
        status: 'confirmed',
        createdAt: Timestamp.now(),
    });
};

export const getMyAppointments = async (uid: string, role: string) => {
    const field = role === 'doctor' ? 'doctorId' : 'patientId';
    const q = query(collection(db, 'appointments'), where(field, '==', uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const cancelAppointment = async (appointmentId: string) => {
    await deleteDoc(doc(db, 'appointments', appointmentId));
};

export const processPayment = async (data: any) => {
    const user = await getCachedUser();
    if (!user) throw new Error('User not authenticated');
    await addDoc(collection(db, 'payments'), {
        patientId: user.uid,
        doctorName: data.doctor?.name ?? data.doctor,
        date: data.date,
        time: data.time,
        amount: data.amount,
        status: 'paid',
        createdAt: Timestamp.now(),
    });
};
