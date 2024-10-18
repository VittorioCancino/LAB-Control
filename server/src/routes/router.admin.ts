import { Router } from "express";
import { body } from "express-validator"
import { HandleInputErros } from "../middleware";
import { AdminController } from "../controllers/Admin.Controller";
import Admin from "../models/Admin.model";

// Definig the Admin Router
// TODO Finish the Router
const routerAdmin = Router();

// Adding methods to the Router

routerAdmin.post(
    "/create-user",
    [
        body("Name").isString().withMessage("El nombre es obligatorio").notEmpty(),
        body("LastName").isString().withMessage("Los apellidos son obligatorios").notEmpty(),
        body("Email").isEmail().withMessage("Email incorrecto"),
        body("Rut").matches(/^\d{7,8}-[0-9kK]$/).withMessage("Rut invalido"),
        body("Career").isString().withMessage("La carrera es obligatoria").notEmpty(),
        body("Rol").isIn(["Ayudante", "Admin", "Externo"]).withMessage("Rol invalido")
    ],
    HandleInputErros,
    AdminController.CreateUser // TODO <= funcion del controller boss vittorio
)

routerAdmin.post(
    "/update-user",
    [
        body("Name").optional().isString(),
        body("LastName").optional().isString(),
        body("Email").optional().isEmail(),
        body("Rut").optional().matches(/^\d{7,8}-[0-9kK]$/),
        body("Career").optional().isString(),
        body("Rol").optional().isIn(["Ayudante", "Admin", "Externo"])
    ],
    HandleInputErros,
    AdminController.UpdateUser // TODO <= funcion del controller boss vittorio
)

routerAdmin.post(
    "/delete-user",
    [
        body('UserID').isNumeric().withMessage('El ID es obligatorio'),
        body('Password').isString().isLength({min:8}).withMessage('La contrase;a es obligatoria')
    ],
    HandleInputErros,
    AdminController.DeleteUser // TODO <= funcion del controller boss vittorio
)

routerAdmin.get(
    "/get-user-data",
    [
        body('UserID').isNumeric().withMessage('El ID es obligatorio'),
    ],
    HandleInputErros,
    AdminController.GetUserData // TODO <= funcion del controller boss vittorio
)

export default routerAdmin;