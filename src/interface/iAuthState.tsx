export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: {
    username: string;
    email?: string;
    uid?: string;
    photoURL?: string; // Para la imagen de perfil de Google
    displayName?: string; // Para el nombre completo de Google
  } | null;
}
