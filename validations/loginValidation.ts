import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});
