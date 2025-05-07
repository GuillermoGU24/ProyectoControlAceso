import { useRef, useState } from "react";

import type { FormDataLogin } from "../../interface/iFormData";

const LoginPage2 = () => {
  const [errors, setErrors] = useState<Partial<FormDataLogin>>({});
  const [form, setForm] = useState<FormDataLogin>({
    correo: "",
    contrasenia: "",
  });

  const fields = [
    { name: "correo", label: "Correo", type: "email" },
    { name: "contrasenia", label: "Contraseña", type: "password" },
  ];
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const validate = () => {
    const newErrors: Partial<FormDataLogin> = {};

    if (!form.correo.trim()) {
      newErrors.correo = "El correo es requerido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "El correo no es válido.";
    }
    if (!form.contrasenia.trim())
      newErrors.contrasenia = "La contraseña es requerida.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulario válido:", form);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-2">
          Iniciar Sesión
        </h1>
        <hr className="border-t border-gray-600 my-4" />

        <form onSubmit={handleSubmit} className="p-3">
          {fields.map(({ name, label, type = "text" }, index) => (
            <div key={name} className={"form-control w-full mb-3"}>
              <label className="label font-medium w-full mb-1">{label}</label>
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${
                  errors[name as keyof FormDataLogin] ? "input-error" : ""
                }`}
              >
                <input
                  type={type}
                  name={name}
                  value={form[name as keyof FormDataLogin]}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="grow bg-transparent focus:outline-none"
                  placeholder={label}
                />
              </label>
              {errors[name as keyof FormDataLogin] && (
                <span className="text-error text-sm mt-1">
                  {errors[name as keyof FormDataLogin]}
                </span>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn btn-primary w-full text-lg mt-2"
            >
              Iniciar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
