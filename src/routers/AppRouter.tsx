// AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";


import AsistenciaPage from "../main/page/AsistenciaPage";
import { useCheckAuth } from "../Firebase/auth/store/useCheckAuth";
import { CheckingAuth } from "../main/components/CheckingAuth";
import { LoginPage } from "../Firebase/auth/pages/LoginPage";
import RegisterForm from "../Firebase/auth/pages/RegisterForm";


export const AppRouter = () => {
  const { status } = useCheckAuth();
  const dummyData = [
    {
      nombre: "Juan Pérez",
      hora: "09:00",
      correo: "juan@example.com",
      fecha: "2025-05-08",
    },
    {
      nombre: "Ana López",
      hora: "09:05",
      correo: "ana@example.com",
      fecha: "2025-05-08",
    },
  ];

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<AsistenciaPage />} />
      ) : (
        <>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/registro" element={<RegisterForm />} />
        </>
      )}
    </Routes>
  );
};
