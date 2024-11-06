import API_ADMIN from "../lib/AxiosAdmin";
import { isAxiosError } from "axios";
import { CreateUser } from "../types";
import { LoginAdmin } from "../types";

export async function CreateUsers(formdata: CreateUser) {
	try {
		const url = "/create-user";
		console.log(formdata);
		const { data } = await API_ADMIN.post("/create-user", JSON.stringify(formdata), {
			headers: { "Content-Type": "application/json" },
		});
		return data;
	} catch (error) {
		// Manejo de error usando isAxiosError
		if (isAxiosError(error) && error.response) {
			// Maneja el mensaje de error del backend si existe
			throw new Error(error.response.data?.error || "Error en la solicitud");
		} else {
			// Otro tipo de error
			throw new Error("Error inesperado al crear el usuario");
		}
	}
}

export async function LoginAdmins(formdata: LoginAdmin) {
	try {
		const url = "/login";
		const { data } = await API_ADMIN.get(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}