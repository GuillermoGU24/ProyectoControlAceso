import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebaseconfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { UserData } from "./authSlice";

export const registerThunk = createAsyncThunk<UserData, any>(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.correo,
        formData.contrasenia
      );
      const user = res.user;

      const userData: UserData = {
        uid: user.uid,
        email: user.email || "",
        nombre: formData.nombre,
        apellido: formData.apellido,
        codigo: formData.codigo,
        celular: formData.celular,
      };

      await setDoc(doc(db, "usuario", user.uid), userData);

      return userData;
    } catch (err: any) {
      let errorMessage = "Error al registrar el usuario";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Este correo ya está registrado.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "El correo ingresado no es válido.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "La contraseña es demasiado débil.";
      }

      console.error("Error en registerThunk:", err);
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginThunk = createAsyncThunk<
  UserData,
  { correo: string; contrasenia: string }
>("auth/login", async ({ correo, contrasenia }, { rejectWithValue }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, correo, contrasenia);
    const user = res.user;
    const userDoc = await getDoc(doc(db, "usuario", user.uid));

    if (!userDoc.exists()) {
      throw new Error("No se encontraron datos del usuario");
    }

    return userDoc.data() as UserData;
  } catch (err: any) {
    let errorMessage = "Error al iniciar sesión";
    if (
      err.code === "auth/user-not-found" ||
      err.code === "auth/wrong-password"
    ) {
      errorMessage = "Correo o contraseña incorrectos.";
    } else if (err.code === "auth/invalid-email") {
      errorMessage = "El correo ingresado no es válido.";
    }

    console.error("Error en loginThunk:", err);
    return rejectWithValue(errorMessage);
  }
});

export const googleLoginThunk = createAsyncThunk<UserData>(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "usuario", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const [nombre = "", apellido = ""] = (user.displayName || "").split(
          " "
        );
        const newUser: UserData = {
          uid: user.uid,
          email: user.email || "",
          nombre,
          apellido,
          celular: "",
          codigo: 0,
        };

        await setDoc(userRef, newUser);
        return newUser;
      }

      return userSnap.data() as UserData;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const checkAuthThunk = createAsyncThunk<UserData | null>(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    return new Promise<UserData | null>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe(); // Solo lo ejecutamos una vez
        if (user) {
          const docSnap = await getDoc(doc(db, "usuario", user.uid));
          if (docSnap.exists()) {
            resolve(docSnap.data() as UserData);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }
);