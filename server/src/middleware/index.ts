import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// No need to return a Response object, just use `void` for the function return type
export const HandleInputErros = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });  // Send error response
        return;  // Stop execution after sending the response
    }
    next();  // Continue if no errors
};