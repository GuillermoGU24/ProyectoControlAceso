import { useState, useRef } from "react";
import type { FormData } from "../../interface/iFormData";

export default function RegisterForm() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    codigo: "",
    celular: "",
    correo: "",
    contrasenia: "",
    contraseniaConmfirm: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const fields = [
    { name: "nombre", label: "Nombre" },
    { name: "apellido", label: "Apellido" },
    { name: "codigo", label: "Código", type: "number" },
    { name: "celular", label: "Celular", type: "tel" },
    { name: "correo", label: "Correo", type: "email", span: 2 },
    { name: "contrasenia", label: "Contraseña", type: "password", span: 2 },
    {
      name: "contraseniaConmfirm",
      label: "Confirmar Contraseña",
      type: "password",
      span: 2,
    },
  ];

  // Refs para inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido.";
    if (!form.apellido.trim()) newErrors.apellido = "El apellido es requerido.";
    if (!form.codigo.trim()) newErrors.codigo = "El código es requerido.";
    if (!form.celular.trim()) {
      newErrors.celular = "El celular es requerido.";
    } else if (!/^\d{10}$/.test(form.celular)) {
      newErrors.celular = "El celular debe tener 10 dígitos.";
    }
    if (!form.correo.trim()) {
      newErrors.correo = "El correo es requerido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "El correo no es válido.";
    }
    if (!form.contrasenia.trim())
      newErrors.contrasenia = "La contraseña es requerida.";

    if (!form.contraseniaConmfirm.trim())
      newErrors.contraseniaConmfirm = "La contraseña es requerida.";

    if (form.contrasenia !== form.contraseniaConmfirm)
      newErrors.contraseniaConmfirm = "Contraseña no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextRef = inputRefs.current[index + 1];
      if (nextRef) {
        nextRef.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulario válido:", form);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-2">
          Registro de Datos
        </h1>
        <hr className="border-t border-gray-600 my-4" />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
        >
          {fields.map(({ name, label, type = "text", span }, index) => (
            <div
              key={name}
              className={`form-control w-full${
                span === 2 ? " md:col-span-2" : ""
              }`}
            >
              <label className="label font-medium w-full">{label}</label>
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${
                  errors[name as keyof FormData] ? "input-error" : ""
                }`}
              >
                <input
                  type={type}
                  name={name}
                  value={form[name as keyof FormData]}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="grow bg-transparent focus:outline-none"
                  placeholder={label}
                />
              </label>
              {errors[name as keyof FormData] && (
                <span className="text-error text-sm mt-1">
                  {errors[name as keyof FormData]}
                </span>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn btn-primary w-full text-lg mt-2"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
