import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail } from 'firebase/auth';
import { auth, db } from './firebase';
import { saveToStorage, getFromStorage } from './storage.service';

export const getMe = async () => {
    const uid = auth.currentUser?.uid as any;
    const userDoc = await getDoc(doc(db, 'users', uid));
    const userData = {
        ...userDoc.data(),
        uid,
        email: auth.currentUser?.email,
    };
    await saveToStorage('user', userData);
    return userData;
};

export const updateUserProfile = async (uid: string, data: any) => {
    const update: any = { name: data.name, phone: data.phone };
    if (data.weight !== undefined) update.weight = data.weight;
    if (data.bloodGroup !== undefined) update.bloodGroup = data.bloodGroup;
    if (data.height !== undefined) update.height = data.height;
    await updateDoc(doc(db, 'users', uid), update);
    const firebaseUser = auth.currentUser;
    if (firebaseUser && data.email && data.email !== firebaseUser.email) {
        await updateEmail(firebaseUser, data.email);
    }
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User is not authenticated.');
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
};

export const getCachedUser = async () => {
    return await getFromStorage('user');
};

export const updateProfilePicture = async (uid: string, url: string) => {
    await updateDoc(doc(db, 'users', uid), { profilePicture: url });
    const cached = await getCachedUser();
    await saveToStorage('user', { ...cached, profilePicture: url });
};
