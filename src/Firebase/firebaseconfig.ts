import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Cambiar de la versión Cordova a la web estándar
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChiNgE1krPpDCjlCRbtJZFrkTct06wdE4",
  authDomain: "accesoapp-ed27c.firebaseapp.com",
  projectId: "accesoapp-ed27c",
  storageBucket: "accesoapp-ed27c.firebasestorage.app",
  messagingSenderId: "1095430573883",
  appId: "1:1095430573883:web:ea11596a132e86e988711e",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(fireBaseApp);
export const db = getFirestore(fireBaseApp);
