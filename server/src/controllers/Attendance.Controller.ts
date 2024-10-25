import type { Request, Response } from "express";


// TODO controlador de asistencia

export const AttendanceController = {
    MarkAttendance: async (req, res) => {
        const { FingerPrint, Reason, EntryTime } = req.body;

    }
};