import { Request, Response, NextFunction } from "express";

const Fn = {
    validaRut: function (rutCompleto: string) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false; // formato incorrecto
        const tmp = rutCompleto.split('-');
        let digv = tmp[1];
        const rut = tmp[0];
        if (digv === 'K') digv = 'k'; // normalizar el digito verificador 
        const rutNumber = parseInt(rut, 10); // convertir el rut de string a integer 
        return Fn.dv(rutNumber) === digv; 
    },
    dv: function (T: number) {  // calcular el digito verificador 
        let M = 0, S = 1;
        for (; T; T = Math.floor(T / 10)) {
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        }
        return S ? S - 1 : 'k';
    }
};

const validateRut = (req: Request, res: Response, next: NextFunction) => {
    const { Rut } = req.body;
    if (!Rut || !Fn.validaRut(Rut)) {
        return res.status(400).json({ error: "RUT inválido" });
    }
    next();
};

export default validateRut;