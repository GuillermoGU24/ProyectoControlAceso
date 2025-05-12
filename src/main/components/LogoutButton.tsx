import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/cerrar-sesion.png";
import { auth } from "../../Firebase/firebaseconfig";
import { logout } from "../../Firebase/auth/store/authSlice";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userSession");
      dispatch(logout());
      navigate("/auth/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline btn-error">
      <img
        src={logoutIcon}
        className="w-[25px] h-[25px] p-1"
        alt="Cerrar Sesión"
      />
    </button>
  );
};
