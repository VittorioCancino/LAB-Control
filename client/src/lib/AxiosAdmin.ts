import axios from "axios";

const API_ADMIN = axios.create({
	baseURL: "http://localhost:4000/API/Admin",
});

export default API_ADMIN;