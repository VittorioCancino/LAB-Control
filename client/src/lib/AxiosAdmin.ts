import axios from "axios";

const API_ADMIN = axios.create({
	baseURL: "http://localhost:4000/routes/Admin.Controller.ts",
});

export default API_ADMIN;