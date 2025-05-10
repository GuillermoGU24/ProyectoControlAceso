import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { AuthState } from "../../../interface/iAuthState";
import { auth } from "../../../Firebase/firebaseconfig";

export const useCheckAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    status: "checking",
    user: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          status: "authenticated",
          user: {
            username: user.displayName || user.email || "Usuario",
            email: user.email || undefined,
            uid: user.uid,
            photoURL: user.photoURL || undefined,
            displayName: user.displayName || undefined,
          },
        });
      } else {
        setAuthState({ status: "not-authenticated", user: null });
      }
    });

    return () => unsubscribe();
  }, []);

  return authState;
};
