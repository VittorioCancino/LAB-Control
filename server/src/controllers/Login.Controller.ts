import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model';
import User from '../models/User.model';

const JWT_SECRET = process.env.JWT_SECRET ;

export class LoginController {

//Funcion manejo de login
    public static async login(req: Request, res: Response): Promise<Response> {
        const { email, password} = req.body;

        try {
            // buscar usuario por su Email
            const admin = await Admin.findOne({
                include: [
                    {
                        model: User,
                        where:{ Email: email }
                    }   
                ],  
            });

            if (!admin) {
                return res.status(400).send({ error: 'Correo no encotrado'});
            }

            // comparar contraseña con la almacenada en la base de datos
            const IsPasswordCorrect = await bcrypt.compare(password, admin.Password);
            if (!IsPasswordCorrect) {
                return res.status(400).send({ error: 'Contraseña incorrecta'});
            }

            // si las credenciales son correctas generar el token jwt
            const Token = jwt.sign(
                { userId: admin.Id, email},
                JWT_SECRET,
                { expiresIn: '1h'} //expiracion del token              
            );

            // devolver el token
            return res.send({ message: 'Login exitoso', Token});

        } catch (error){
            console.error('error en el servidor', error);
            return res.status(400).send({ error: 'error en el servidor'});
        }
    }
}