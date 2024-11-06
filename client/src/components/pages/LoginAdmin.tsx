import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { LoginAdmin } from "../../types";
import { LoginAdmins } from "../../api/AdminApi";
import { ToastContainer, toast } from "react-toastify";

function LoginAdminPage() {

  const queryClient = useQueryClient();

  const initialValues: LoginAdmin = {
	Email: "",
    Password: "",

	};

  const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<LoginAdmin>({ defaultValues: initialValues });

  const { mutate } = useMutation({
		mutationFn: LoginAdmins,
		onError: (error: Error) => {  
			toast.error(error.message);
		},
		onSuccess: (Users) => {
			toast.success(Users);
			reset();
		},
	});

  const HandleCreateAccount = (formData: LoginAdmin) => {
		mutate(formData);
	};

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
      <form onSubmit={handleSubmit(HandleCreateAccount)}>
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
          <label className="block text-gray-700">Email</label>
          <input
            type="password"
            {...register("Password", {
							required: "La contraseña es obligatoria",
						})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <input type="submit" value="LoginAdmin"  />
      </form>
    </div>
  );
}

export default LoginAdminPage;