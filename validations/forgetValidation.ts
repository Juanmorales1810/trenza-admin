import * as z from "zod";

export const forgetSchema = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }),
});
