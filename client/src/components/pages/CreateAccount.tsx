import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateUserSchema, CreateUser } from "../../types";
import { CreateUsers } from "../../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";

function CreateAccount() {

  const queryClient = useQueryClient();

  const initialValues: CreateUser = {
    Name: "",
    LastName: "",
    Email: "",
    Rut: "",
    Career: "",
    Role: "Externo",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateUser>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: CreateUsers,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (Users) => {
      toast.success(Users);
      reset();
    },
  });

  const HandleCreateAccount = (formData: CreateUser) => {
    mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
      <form onSubmit={handleSubmit(HandleCreateAccount)}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            {...register("Name", {
              required: "El Nombre de registro es obligatorio"
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido</label>
          <input
            type="text"
            {...register("LastName", {
              required: "El Apellido de registro es obligatorio"
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("Email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">RUT</label>
          <input
            type="text"
            {...register("Rut", {
              required: "El Rut de registro es obligatorio",

            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            placeholder="sin puntos y con guión"
          />
          {errors.Rut && <p className="text-red-500 text-sm">{errors.Rut.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Carrera</label>
          <select
            {...register("Career", {
              required: "La Carrera de registro es obligatorio",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Selecciona una carrera</option>
            <option value="Civil">Civil</option>
            <option value="Comercial">Comercial</option>
            <option value="Informatica">Informática</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rol</label>
          <select
            {...register("Role", {})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Selecciona un rol</option>
            <option value="Ayudante">Ayudante</option>
            <option value="Admin">Admin</option>
            <option value="Externo">Externo</option>
          </select>
        </div>
        <input type="submit" value="Registrar Usuario" />
      </form>
    </div>
  );
}

export default CreateAccount;
