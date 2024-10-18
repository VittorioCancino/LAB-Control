import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware for returning the errores given by the router validation
export const HandleInputErros = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }
    // if there is no error we jump to the next function in the router
    next();
};