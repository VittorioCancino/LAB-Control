import React from 'react';
import { useEffect, useState } from 'react';

function UserTable() {
  const [Users, SetUsers] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(null);

  const FetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/get-users-active'); 
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const User = await response.json();
      SetUsers(User); 
    } catch (error) {
      SetError(error.message);
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    FetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Usuarios Registrados</h1>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Usuario</th>
              <th className="border border-gray-300 px-4 py-2">Hora de Entrada</th>
              <th className="border border-gray-300 px-4 py-2">Motivo de Entrada</th>
            </tr>
          </thead>
          <tbody>
            {Users.length > 0 ? (
              Users.map((User, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{User.username || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{User.entryTime || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{User.entryReason || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTable;
