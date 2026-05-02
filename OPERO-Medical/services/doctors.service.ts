import { collection, getDocs, doc, getDoc, setDoc, updateDoc, increment, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';

export const getAllDoctors = async () => {
    const snapshot = await getDocs(collection(db, 'doctors'));
    const doctors = await Promise.all(
        snapshot.docs.map(async (doctorDoc: any) => {
            const userDoc = await getDoc(doc(db, 'users', doctorDoc.id));
            return {
                id: doctorDoc.id,
                ...userDoc.data(),
                ...doctorDoc.data(),
            };
        })
    );
    return doctors;
};

export const updateDoctorProfile = async (uid: string, data: any) => {
    await setDoc(doc(db, 'doctors', uid), {
        price: Number(data.price) || 0,
        experience: data.experience,
        bio: data.bio,
        specialty: data.specialty,
        availableSlots: data.availableSlots,
    }, { merge: true });
};

export const removeSlotFromDoctor = async (doctorId: string, slot: string) => {
    await updateDoc(doc(db, 'doctors', doctorId), { availableSlots: arrayRemove(slot) });
};

export const incrementDoctorCases = async (uid: string) => {
    await updateDoc(doc(db, 'doctors', uid), { cases: increment(1) });
};

export const getDoctorById = async (id: string): Promise<any> => {
    const doctorDoc = await getDoc(doc(db, 'doctors', id));
    const userDoc = await getDoc(doc(db, 'users', id));
    return {
        id,
        ...userDoc.data(),
        ...doctorDoc.data(),
    };
};
