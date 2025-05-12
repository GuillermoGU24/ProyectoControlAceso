import { useState } from "react";
import { Link } from "react-router-dom";
import { googleLoginThunk, loginThunk } from "../store/authThunks";
import { useAppDispatch, useAppSelector } from "../store";
import { Eye, EyeOff } from "lucide-react";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = {
      correo: email,
      contrasenia: password,
    };
    dispatch(loginThunk(form));
  };

  const handleGoogle = () => {
    dispatch(googleLoginThunk());
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl card-title text-center justify-center mb-4">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de Email */}
            <div className="form-control">
              <label className="label font-medium">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo de Contraseña */}
            <div className="form-control font-medium relative">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <div className="input input-bordered flex items-center gap-2 w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="grow bg-transparent focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Mostrar u ocultar contraseña"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Alerta de error */}
            {error && (
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Botón de inicio de sesión */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Iniciar Sesión
              </button>
            </div>
          </form>

          {/* Separador */}
          <div className="divider">O</div>

          {/* Botón de Google */}
          <button
            onClick={handleGoogle}
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar con Google
          </button>

          <Link
            to="/auth/registro"
            className="text-center text-blue-400 underline mt-4"
          >
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
};
