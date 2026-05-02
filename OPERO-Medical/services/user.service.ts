import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { saveToStorage, getFromStorage } from './storage.service';

// Fetches the current user's data from Firestore and caches it in AsyncStorage.
// Call this after login. Read from AsyncStorage anywhere else in the app.
export const getMe = async () => {
    const uid = auth.currentUser?.uid as any;
    const userDoc = await getDoc(doc(db, 'users', uid));
    const userData = userDoc.data();
    await saveToStorage('user', JSON.stringify(userData));
    return userData;
};

// Reads the cached user data from AsyncStorage (no Firestore call).
export const getCachedUser = async () => {
    const user = await getFromStorage('user');
    if (!user) return null;
    return JSON.parse(user);
};
