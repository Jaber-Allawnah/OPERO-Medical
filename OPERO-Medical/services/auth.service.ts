import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,sendPasswordResetEmail} from "firebase/auth";
import { auth } from "./firebase";
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getMe } from './user.service';

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    await getMe();
    return { token };
};

export const register = async (name: string, email: string, password: string, phone: string, role: string, extras: any = {}) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, { displayName: name });

    const userDoc: any = { name, email, phone, role, profilePicture: '' };
    if (role === 'patient') {
        userDoc.weight = extras.weight || '';
        userDoc.bloodGroup = extras.bloodGroup || '';
        userDoc.height = extras.height || '';
    }

    await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);

    if (role === 'doctor') {
        await setDoc(doc(db, 'doctors', userCredential.user.uid), {
            specialty: extras.specialty || '',
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