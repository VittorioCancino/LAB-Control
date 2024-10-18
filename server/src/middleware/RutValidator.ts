import { Request, Response, NextFunction } from "express";

const Fn = {

    validaRut: function (rutCompleto: string): boolean {
        rutCompleto = rutCompleto.trim();

        // Verificar que el formato del RUT sea válido (números, un guión y el dígito verificador)
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;

        // Separar el número del RUT y el dígito verificador usando el guión como separador
        const tmp = rutCompleto.split('-');
        let digv = tmp[1]; 
        const rut = tmp[0]; 

        // Convertir el dígito verificador a minúscula para normalizar (ej. "K" a "k")
        if (digv.toLowerCase() === 'k') digv = 'k';
        const rutNumber = parseInt(rut, 10); // Convertir el número del RUT de string a entero
        return Fn.dv(rutNumber) === digv;
    },
    // Función para calcular el dígito verificador de un número RUT
    dv: function (T: number): string | number {
        let M = 0, S = 1;
        for (; T; T = Math.floor(T / 10)) {
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        }
        return S ? S - 1 : 'k';
    }
};

const validateRut = (req: Request, res: Response, next: NextFunction): void => {
    const { Rut } = req.body; 

    // Si no es válido, responder con un estado 400 (Bad Request) y un mensaje de error
    if (!Rut || typeof Rut !== 'string' || !Fn.validaRut(Rut)) {
        res.status(400).json({ error: "RUT inválido" });
    } else {
        // Si es válido, continuar con el siguiente middleware o controlador
        next();
    }
};

export default validateRut;
