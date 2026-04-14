import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import {getCachedUser} from "@/services/user.service";

export const getMyAppointments = async (_patientId: string) => {};

export const bookAppointment = async () => {};

export const cancelAppointment = async (_appointmentId: string) => {};

export const processPayment = async (data: any) => {
    const user =await getCachedUser();
    if (!user) {
        throw new Error('User not authenticated');
    }

    const paymentData = {
        patientId: user.uid,
        doctorName: data.doctor.name,
        date: data.date,
        time: data.time,
        amount: data.amount,
        status: 'paid',
        createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, 'payments'), paymentData);
};