import * as z from "zod";

const isFileListDefined = typeof FileList !== "undefined";

const imageSchema = isFileListDefined
    ? z
          .instanceof(FileList)
          .refine((files) => files.length > 0, {
              message: "Debe seleccionar un archivo de imagen.",
          })
          .refine(
              (files) => {
                  const validTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                      "image/webp",
                  ];
                  return validTypes.includes(files[0]?.type);
              },
              {
                  message:
                      "Formato de imagen no válido. Solo se permiten JPEG, PNG, JPG y WEBP.",
              }
          )
          .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
              message: "El tamaño de la imagen no debe exceder los 5MB.",
          })
    : z.any();

export const porfolioValidationschema = z.object({
    Titulo: z
        .string()
        .min(5, { message: "El titulo debe tener al menos 5 caracteres" })
        .max(50, { message: "El titulo debe tener menos de 50 caracteres" }),
    Ubicacion: z
        .string()
        .min(5, { message: "La ubicación debe tener al menos 5 caracteres" })
        .max(50, { message: "La ubicación debe tener menos de 50 caracteres" }),
    Folder: z
        .string()
        .min(5, { message: "La carpeta debe tener al menos 5 caracteres" })
        .max(100, { message: "La carpeta debe tener menos de 100 caracteres" }),
    Date: z.date({ message: "La fecha debe ser obligatoria" }),
    Slug: z
        .string()
        .min(5, { message: "El slug debe tener al menos 5 caracteres" })
        .max(50, { message: "El slug debe tener menos de 50 caracteres" })
        .regex(/^[a-z0-9-]+$/, {
            message:
                "El slug solo puede contener letras, números y guiones, sin espacios.",
        }),
    Image: imageSchema,
    Cover: imageSchema,
});
