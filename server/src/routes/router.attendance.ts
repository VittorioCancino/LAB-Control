import { Router } from "express";
import { body } from "express-validator";
import { HandleInputErros } from "../middleware";
import { AttendanceController } from "../controllers/Attendance.Controller";

const routerAttendance = Router();

// Ruta para marcar entrada/salida
routerAttendance.post(
    "/mark-attendance",
    [
        body("Fingerprint").isString().withMessage("La huella digital es obligatoria"),
        body("Reason").isIn(["Entrada", "Salida"]).withMessage("El motivo debe ser 'entrada' o 'salida'"),
        body("EntryTime").isDate()
    ],
    HandleInputErros,
    AttendanceController.MarkAttendance // TODO 
);

export default routerAttendance;