import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,sendPasswordResetEmail} from "firebase/auth";
import { auth } from "./firebase";
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getMe } from './user.service';

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return { token };
};

export const register = async (name: string, email: string, password: string, phone: string, role: string, specialty: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, { displayName: name });

    await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        phone,
        role,
        profilePicture: '',
    });

    // If the user is a doctor, also create a doctors document
    if (role === 'doctor') {
        await setDoc(doc(db, 'doctors', userCredential.user.uid), {
            specialty: specialty || '',
            bio: '',
            experience: 0,
            availableSlots: [],
        });
    }

    const token = await userCredential.user.getIdToken();
    await getMe();
    return { token };
};
export const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
};

export const logout = async () => {
    await signOut(auth);
};