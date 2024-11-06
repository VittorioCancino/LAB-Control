import API_ADMIN from "../lib/AxiosAdmin";
import { isAxiosError } from "axios";
import { CreateUser } from "../types";
import { LoginAdmin } from "../types";

export async function CreateUsers(formdata: CreateUser) {
	try {
		const url = "/create-user";
		const { data } = await API_ADMIN.get(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
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