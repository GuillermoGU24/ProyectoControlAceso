// AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import { useCheckAuth } from "../main/auth/hook/useCheckAuth";
import { CheckingAuth } from "../main/components/CheckingAuth";
import { VisitaPage } from "../main/page/VisitaPage";
import { LoginPage } from './../main/auth/pages/LoginPage';




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
        <Route path="/*" element={<VisitaPage data={dummyData} />} />
      ) : (
        <>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};
