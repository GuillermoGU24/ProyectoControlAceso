import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();

/**
 * Inicia sesión con Google usando Firebase Auth.
 * @returns {Promise<{ok: boolean, uid?: string, displayName?: string, email?: string, photoURL?: string, errorCode?: string, errorMessage?: string}>}
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FireBaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      uid,
      displayName,
      email,
      photoURL,
    };
  } catch (error) {
    return {
      ok: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
};
