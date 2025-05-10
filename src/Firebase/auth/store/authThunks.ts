import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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

      console.log("Intentando guardar usuario en Firestore", userData);
      await setDoc(doc(db, "usuario", user.uid), userData);
      console.log("Usuario guardado en Firestore");      return userData;
    } catch (err: any) {
      console.error("Error en registerThunk:", err);
      return rejectWithValue(err.message || "Error al registrar el usuario");
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

    if (!userDoc.exists())
      throw new Error("No se encontraron datos del usuario");

    return userDoc.data() as UserData;
  } catch (err: any) {
    return rejectWithValue(err.message);
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
