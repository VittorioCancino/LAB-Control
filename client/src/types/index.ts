import { z } from "zod";

// Esquema general usuario
const InitialSchema = 
z.object({
    Name: z.string().min(1,"El nombre es obligatorio"),
    LastName: z.string().min(1, "Los appelidos son obligatorios"),
    Email: z.string().email("Email incorrecto"),
    Rut: z.string().regex(/^\d{7,8}-[-9kK]$/, "rut invalido"),
    Career: z.string().min(1),
    Rol: z.enum(["Ayudante","Admin","Externo"]),
});

// Esquema para crear usuario 
export const createUserSchema = InitialSchema;

// Esquema para actualizar usuario 
export const updateUserSchema = InitialSchema.partial();

// Esquema para eliminar usuario
export const deleteUserSchema = z.object({
    UserID: z.number().min(1, "El ID es obligatorio"),
    Password: z.string().min(8, "La contraseña debe tener 8 caracteres"),
});

// Esquema para inicio de sesión
export const loginSchema = z.object({
    Email: z.string().email("Email incorrecto"),
    Password: z.string().min(8, "La contraseña debe tener 8 caracteres"),
});

// Esquema para ingreso de huella
export const CheckInSchema = z.object({
    Data: z.string().min(1, "La huella es obligatoria"),
    UserID: z.number().min(1, 'El ID es obligatorio'),
    Reason: z.string().min(1, "El motivo es obligatorio"),
});

// Esquema para salida (log)
export const CheckoutSchema = z.object({
    UserID: z.number(),
    ExitTime: z.string().min(1, "La fecha de salida es obligatoria"),
});
