import { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import { useAppSelector } from "../../Firebase/auth/store";

interface PinResponse {
  pin: string;
  fechaExpiracion: string;
}

const AsistenciaPage = () => {
  const [pinData, setPinData] = useState<PinResponse | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAppSelector((state) => state.auth);

  const getPinStorageKey = (userId: string) => `pin_data_${userId}`;

  const isPinValid = (storedPin: PinResponse): boolean => {
    const expiration = new Date(storedPin.fechaExpiracion).getTime();
    const now = Date.now();
    return expiration > now + 2000;
  };

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setIsLoading(false);
      return;
    }

    const storageKey = getPinStorageKey(user.uid);
    const storedPinData = localStorage.getItem(storageKey);

    if (storedPinData) {
      try {
        const parsedPin = JSON.parse(storedPinData) as PinResponse;
        if (isPinValid(parsedPin)) {
          setPinData(parsedPin);
          setIsExpired(false);
          const expiration = new Date(parsedPin.fechaExpiracion).getTime();
          const now = Date.now();
          setTimeLeft(Math.floor((expiration - now) / 1000));
          setIsLoading(false);
        } else {
          localStorage.removeItem(storageKey);
          fetchPin();
        }
      } catch (error) {
        console.error("Error al parsear el PIN almacenado:", error);
        localStorage.removeItem(storageKey);
        fetchPin();
      }
    } else {
      fetchPin();
    }
  }, [user, loading]);

  const fetchPin = async () => {
    if (!user || loading) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://registroasistenciaconpin-production.up.railway.app/api/generar-pin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: `${user.nombre} ${user.apellido}`,
            correo: user.email,
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data: Omit<PinResponse, "fechaExpiracion"> & {
        fechaExpiracion?: string;
      } = await response.json();

      // Asignamos una nueva fecha de expiración localmente: 9 minutos desde ahora
      const expirationDate = new Date(Date.now() + 9 * 60 * 1000).toISOString();
      const dataWithExpiration: PinResponse = {
        ...data,
        fechaExpiracion: expirationDate,
      };

      const storageKey = getPinStorageKey(user.uid);
      localStorage.setItem(storageKey, JSON.stringify(dataWithExpiration));
      setPinData(dataWithExpiration);
      setIsExpired(false);

      const expiration = new Date(dataWithExpiration.fechaExpiracion).getTime();
      const now = Date.now();
      setTimeLeft(Math.floor((expiration - now) / 1000));
    } catch (error) {
      console.error("Error al obtener el PIN:", error);
      setIsExpired(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!pinData || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 1;
        if (newTimeLeft <= 0) {
          clearInterval(timer);
          setIsExpired(true);
          if (user) {
            const storageKey = getPinStorageKey(user.uid);
            localStorage.removeItem(storageKey);
          }
          return 0;
        }
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pinData, timeLeft, user]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  if (loading || (isLoading && !isExpired)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4 relative">
        <div className="absolute top-4 right-4">
          <LogoutButton />
        </div>
        <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-semibold text-white">
              Generando Código...
            </h2>
            <div className="mt-4">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4 relative">
        <div className="card bg-warning text-white shadow-xl p-8 w-full max-w-md text-center">
          <p className="text-xl font-semibold mb-4">
            Debes iniciar sesión para acceder
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4 relative">
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>

      {!isExpired && pinData && (
        <div className="card bg-white shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Tu código de acceso
          </h2>
          <p className="text-5xl font-bold text-primary mb-2">{pinData.pin}</p>
          <p className="text-sm text-gray-400">
            Expira en: {formatTime(timeLeft)}
          </p>
        </div>
      )}

      {isExpired && (
        <div className="card bg-error text-white shadow-xl p-8 w-full max-w-md text-center">
          <p className="text-xl font-semibold mb-4">El código ha expirado</p>
          <button
            className="btn btn-primary"
            onClick={fetchPin}
            disabled={isLoading}
          >
            {isLoading ? "Solicitando..." : "Volver a pedir código"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AsistenciaPage;
