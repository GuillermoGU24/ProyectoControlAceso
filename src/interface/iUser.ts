interface User {
  nombre: string;
  apellido: string;
  codigo: number;
  celular: string;
  correo: string;
  contrasenia: string;
}

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}


export type { User };