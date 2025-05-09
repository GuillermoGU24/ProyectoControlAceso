import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Cambiar de la versión Cordova a la web estándar
import { getFirestore } from "firebase/firestore/lite";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2HUC87GwhpVbXA7zsTbPPFG8UUnhNeVM",
  authDomain: "asistenciaapp-487ee.firebaseapp.com",
  projectId: "asistenciaapp-487ee",
  storageBucket: "asistenciaapp-487ee.firebasestorage.app",
  messagingSenderId: "912592118324",
  appId: "1:912592118324:web:611d981b298cbd1d526061",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(fireBaseApp);
export const FireBaseDB = getFirestore(fireBaseApp);
