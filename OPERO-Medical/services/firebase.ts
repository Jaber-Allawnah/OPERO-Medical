import { initializeApp } from 'firebase/app';
import { initializeAuth, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDBlTp3RDoSlPHUbt7K8ZVplHOeG24AL9w',
    authDomain: 'opero-medical.firebaseapp.com',
    projectId: 'opero-medical',
    storageBucket: 'opero-medical.firebasestorage.app',
    messagingSenderId: '427909894170',
    appId: '1:427909894170:web:8d0226ad154bff3c0041a3',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: inMemoryPersistence,
});

export const db = getFirestore(app);
export default app;
