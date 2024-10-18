import { Router } from "express";
import { body } from "express-validator"
import { HandleInputErros } from "../middleware";

// Definig the Admin Router
// TODO Finish the Router
const routerAdmin = Router();

// Adding methods to the Router

routerAdmin.post(
    "/create-user",
)

routerAdmin.post(
    "/update-user",
)

routerAdmin.post(
    "/delete-user",
)

routerAdmin.get(
    "/get-user-data",
)

export default routerAdmin;