import { Router } from "express";
import { body } from "express-validator"
import { HandleInputErros } from "../middleware";
import { AdminController } from "../controllers/Admin.Controller";
import Admin from "../models/Admin.model";
import validateRut from "../middleware/RutValidator";

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
        body("Role").isIn(["Ayudante", "Admin", "Externo"]).withMessage("Rol invalido"),
    ],
    HandleInputErros,
    // FIXME Rut validateRut Not Functioning
    //validateRut,
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
        body('Password').isString().isLength({ min: 8 }).withMessage('La contrase;a es obligatoria')
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

// Ruta para obtener usuarios activos
routerAdmin.get(
    "/active-users",
    [
        body("Name").optional().isString(),
        body("EntryTime").isDate(),
        body("Reason").isIn(["Entrada", "Salida"]).withMessage("El motivo debe ser 'entrada' o 'salida'"),
    ],
    HandleInputErros,
    AdminController.GetActiveUsers // Controlador que manejará la lógica
);

// Ruta para el login de los admin

routerAdmin.get(
    "/login",
    [
        body("Email").isEmail().withMessage("Email inválido"),
        body("Password").notEmpty().isString().isLength({ min: 8 }).withMessage("La contraseña es obligatoria y debe tener al menos 8 caracteres")
    ],
    HandleInputErros,
    AdminController.Login     // TODO a;adir funcion del controlador

);



export default routerAdmin;