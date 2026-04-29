import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
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

export const getDoctorById = async (id: string): Promise<any> => {
    const doctorDoc = await getDoc(doc(db, 'doctors', id));
    const userDoc = await getDoc(doc(db, 'users', id));
    return {
        id,
        ...userDoc.data(),
        ...doctorDoc.data(),
    };
};
