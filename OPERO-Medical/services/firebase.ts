// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBlTp3RDoSlPHUbt7K8ZVplHOeG24AL9w",
    authDomain: "opero-medical.firebaseapp.com",
    projectId: "opero-medical",
    storageBucket: "opero-medical.firebasestorage.app",
    messagingSenderId: "427909894170",
    appId: "1:427909894170:web:8d0226ad154bff3c0041a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;