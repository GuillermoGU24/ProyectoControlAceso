 interface FormData {
  nombre: string;
  apellido: string;
  codigo: string;
  celular: string;
  correo: string;
  contrasenia: string;
  contraseniaConmfirm: string;
}

interface FormDataLogin {
  correo: string;
  contrasenia: string;
}


export type { FormData, FormDataLogin };
