import { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import { useAppSelector } from "../../Firebase/auth/store";

interface PinData {
  pin: string;
  fechaExpiracion: Date;
}

const AsistenciaPage = () => {
  const [pinData, setPinData] = useState<PinData | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const { user } = useAppSelector((state) => state.auth);


  const obtenerPinEstatico = () => {
    const ahora = new Date();
    const fechaExpiracion = new Date(ahora.getTime() + 10000); // 10 segundos

    setPinData({
      pin: "23432",
      fechaExpiracion,
    });
    setIsExpired(false);

    setTimeout(() => {
      setIsExpired(true);
    }, fechaExpiracion.getTime() - ahora.getTime());
  };

  useEffect(() => {
    obtenerPinEstatico();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>

      {!isExpired && pinData && (
        <div className="card bg-white shadow-xl text-center p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Tu código de acceso
          </h2>
          <p className="text-5xl font-bold text-primary">{pinData.pin}</p>
          <p className="text-sm text-gray-400 mt-2">
            Expira en: {pinData.fechaExpiracion.toLocaleTimeString()}
          </p>
        </div>
      )}

      {isExpired && (
        <div className="card bg-error text-white shadow-xl p-8 w-full max-w-md text-center">
          <p className="text-xl font-semibold mb-4">El código ha expirado</p>
          <button className="btn btn-primary" onClick={obtenerPinEstatico}>
            Volver a pedir código
          </button>
        </div>
      )}
    </div>
  );
};

export default AsistenciaPage;
