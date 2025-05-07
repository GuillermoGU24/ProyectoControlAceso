import { signOut } from "firebase/auth";
// Asegúrate de importar tu configuración de Firebase
import { useNavigate } from "react-router-dom";

import power from "../../../public/assets/power-off.png";
import { auth } from "../../../backend/Firebase/firebaseconfig";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión en Firebase
      localStorage.removeItem("userSession"); // Borra la sesión almacenada
      navigate("/auth/login"); // Redirige al usuario a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn">
      <img src={power} className="w-[25px] h-[25px] p-1" alt="T" />
    </button>
  );
};
