import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Cambiar de la versión Cordova a la web estándar
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChiNgE1krPpDCjlCRbtJZFrkTct06wdE4",
  authDomain: "accesoapp-ed27c.firebaseapp.com",
  databaseURL: "https://accesoapp-ed27c-default-rtdb.firebaseio.com",
  projectId: "accesoapp-ed27c",
  storageBucket: "accesoapp-ed27c.firebasestorage.app",
  messagingSenderId: "1095430573883",
  appId: "1:1095430573883:web:ea11596a132e86e988711e",
};


// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(fireBaseApp);
export const db = getFirestore(fireBaseApp);
export const realTimeDB = getDatabase(fireBaseApp);
