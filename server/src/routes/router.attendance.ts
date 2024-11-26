import { Router } from "express";
import { HandleInputErros } from "../middleware";
import { AttendanceController } from "../controllers/Attendance.Controller";

const routerAttendance = Router();

// Ruta para marcar entrada/salida
routerAttendance.post(
    "/mark-attendance",
    HandleInputErros,
    AttendanceController.MarkAttendance // TODO 
);

export default routerAttendance;