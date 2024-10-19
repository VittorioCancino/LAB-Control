import React from "react";
import { useState } from "react";

function CreateAccount() {
  const [name, SetName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [email, SetEmail] = useState("");
  const [rut, SetRut] = useState("");
  const [career, SetCareer] = useState("");
  const [role, SetRole] = useState("");
  const [error, SetError] = useState(null);
  const [loading, SetLoading] = useState(false);

  const HandleCreateAccount = async (e) => {
    e.PreventDefault();
    SetLoading(true);

    try {
      const response = await fetch("http://localhost:4000/routes/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: name,
          LastName: lastName,
          Email: email,
          Rut: rut,
          Career: career,
          Rol: role,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cuenta");
      }

      const data = await response.json();
      console.log("Cuenta creada:", data);

    } catch (error) {
      SetError(error.message);
    } finally {
      SetLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
      <form onSubmit={HandleCreateAccount}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => SetName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => SetLastName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">RUT</label>
          <input
            type="text"
            value={rut}
            onChange={(e) => SetRut(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            placeholder="sin puntos y con guión"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Carrera</label>
          <input
            type="text"
            value={career}
            onChange={(e) => SetCareer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rol</label>
          <select
            value={role}
            onChange={(e) => SetRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Selecciona un rol</option>
            <option value="Ayudante">Ayudante</option>
            <option value="Admin">Admin</option>
            <option value="Externo">Externo</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default CreateAccount;
