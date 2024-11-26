import { Router } from "express";
import { HandleInputErros } from "../middleware";
import { UserController } from "../controllers/User.Controller";

// Definig the Admin Router
// TODO Finish the Router
const routerUser = Router();

// Adding methods to the Router

routerUser.post(
    "/create-user",
    HandleInputErros,
    UserController.CreateUser
)

routerUser.post(
    "/remove-user",
    HandleInputErros,
    UserController.RemoveUser
)


routerUser.post(
    "/update-user",
    HandleInputErros,
    UserController.UpdateUser
)


routerUser.get(
    "/get-all-users",
    HandleInputErros,
    UserController.GetAllUsers
)

export default routerUser;