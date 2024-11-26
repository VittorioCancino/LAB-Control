import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token del encabezado Authorization

  const AuthHeader = req.headers.authorization;

  if (!AuthHeader) {
    return res.status(400).send({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  const token = AuthHeader.split(' ')[1]; // formato 'Bearer <token>'

  try {
    // verifica y decodifica el token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email:string};
    req.body.user = decoded; // agregar los datos del token a la solicitud
    next(); // pasa al siguiente middleware o controlador
  } catch (error) {
    return res.status(400).send({ error: 'Token inválido o expirado.' });
  }
};

