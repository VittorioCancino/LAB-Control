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
export const CreateUserSchema = InitialSchema;
export type CreateUser = z.infer<typeof CreateUserSchema>;

// Esquema para actualizar usuario 
export const UpdateUserSchema = InitialSchema.partial();

// Esquema para obtener usuario 
export const GetActiveUserSchema = z.object({
    Name: z.string().min(1,"El nombre es obligatorio"),
    LastName: z.string().min(1, "Los appelidos son obligatorios"),
    EntryTime: z.string().min(1, "La fecha de entrada es obligatoria"),
    Reason: z.string().min(1, "El motivo es obligatorio"),
});

export type GetActiveUser = z.infer<typeof GetActiveUserSchema>;

// Esquema para eliminar usuario
export const DeleteUserSchema = z.object({
    UserID: z.number().min(1, "El ID es obligatorio"),
    Password: z.string().min(8, "La contraseña debe tener 8 caracteres"),
});

// Esquema para inicio de sesión
export const AdminloginSchema = z.object({
    Email: z.string().email("Email incorrecto"),
    Password: z.string().min(8, "La contraseña debe tener 8 caracteres"),
});

// Esquema para ingreso de huella
export const CheckInSchema = z.object({
    Data: z.string().min(1, "La huella es obligatoria"),
    UserID: z.number().min(1, 'El ID es obligatorio'),
    Reason: z.string().min(1, "El motivo es obligatorio"),
    EntryTime: z.string().min(1, "La fecha de salida es obligatoria"),
});

// Esquema para salida (log)
export const CheckOutSchema = z.object({
    UserID: z.number(),
    ExitTime: z.string().min(1, "La fecha de salida es obligatoria"),
});
