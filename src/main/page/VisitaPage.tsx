import React from "react";

type Attendance = {
  nombre: string;
  hora: string;
  correo: string;
  fecha: string;
};

type AttendanceTableProps = {
  data: Attendance[];
};

export const VisitaPage: React.FC<AttendanceTableProps> = ({ data }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-6xl shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold mb-4">
            Lista de Asistencia
          </h2>

          {/* Vista de tabla en pantallas grandes */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.nombre}</td>
                    <td>{entry.correo}</td>
                    <td>{entry.fecha}</td>
                    <td>{entry.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista de tarjetas en pantallas pequeñas */}
          <div className="md:hidden flex flex-col gap-4">
            {data.map((entry, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow bg-base-100"
              >
                <p>
                  <span className="font-semibold">Nombre:</span> {entry.nombre}
                </p>
                <p>
                  <span className="font-semibold">Correo:</span> {entry.correo}
                </p>
                <p>
                  <span className="font-semibold">Fecha:</span> {entry.fecha}
                </p>
                <p>
                  <span className="font-semibold">Hora:</span> {entry.hora}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
