import { IPortfolioSchema } from "@/models/portfolio";
import { TrenzaMatrimoniosPortfolioModel } from "@/models/trenza";
import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { messages } from "@/utils/messages";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        // Obtener los parámetros de consulta
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10); // Página por defecto: 1
        const limit = parseInt(searchParams.get("limit") || "10", 10); // Límite por defecto: 10 elementos por página
        const search = searchParams.get("search") || ""; // Filtro de búsqueda

        // Calcular el índice de inicio
        const skip = (page - 1) * limit;

        // Construir el filtro de búsqueda
        const filter = search ? { titulo: new RegExp(search, "i") } : {}; // Filtra por nombre, ignorando mayúsculas/minúsculas

        // Obtener elementos con filtrado y paginación (el método sort ordena los elementos por fecha de creación descendente)
        const items = await TrenzaMatrimoniosPortfolioModel.find(filter)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);

        // Obtener el total de documentos que coinciden con el filtro
        const totalItems = await TrenzaMatrimoniosPortfolioModel.countDocuments(
            filter
        );

        return NextResponse.json(
            {
                items,
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                message: messages.success.getItme,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al obtener datos de Mascotas:", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}

export async function POST(NextRequest: NextRequest) {
    const data = await NextRequest.formData();
    const title = data.get("titulo");
    const location = data.get("ubicacion");
    const date = data.get("date");
    const slug = data.get("slug");
    const folder = data.get("folder");
    const image = data.get("image");
    const imageCover = data.get("cover");

    connectMongoDB();
    try {
        if (
            !title ||
            !location ||
            !date ||
            !slug ||
            !folder ||
            !image ||
            !imageCover
        ) {
            return NextResponse.json(
                {
                    message: messages.error.needProps,
                },
                {
                    status: 400,
                }
            );
        }

        // Verificar si se proporcionó una imagen válida

        if (!image || typeof image === "string") {
            throw new Error("No se proporcionó ninguna imagen válida");
        }

        const imageBytes = await (image as Blob).arrayBuffer();
        const imageBuffer = Buffer.from(imageBytes);
        console.log("Subiendo imagen...");

        const resultImag: { secure_url: string } = await new Promise(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({}, (error, result) => {
                        if (error) {
                            console.log("Error al subir la imagen:", error);

                            reject(error);
                        } else {
                            console.log("Imagen subida");
                            resolve(result as { secure_url: string });
                        }
                    })
                    .end(imageBuffer);
            }
        );
        console.log("Imagen subida:", resultImag);

        const imageUrl = resultImag?.secure_url;

        // Verificar si se proporcionó una imagen de cover válida

        if (!imageCover || typeof image === "string") {
            throw new Error("No se proporcionó ninguna imagen de cover válida");
        }

        const coverBytes = await (imageCover as Blob).arrayBuffer();
        const coverBuffer = Buffer.from(coverBytes);
        console.log("Subiendo imagen de cover...");

        const coverResultImag: { secure_url: string } = await new Promise(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({}, (error, result) => {
                        if (error) {
                            console.log("Error al subir la imagen:", error);

                            reject(error);
                        } else {
                            console.log("Imagen subida");
                            resolve(result as { secure_url: string });
                        }
                    })
                    .end(coverBuffer);
            }
        );
        const CoverUrl = coverResultImag.secure_url;
        console.log("Cover subida:", coverResultImag);

        const resultados = await cloudinary.search
            .expression(`folder:${folder}`) // Filtra por carpeta
            .max_results(500) // Máximo de resultados (puedes paginar si hay más)
            .execute();

        // Extrae los URLs de las imágenes
        interface ICloudinaryResource {
            secure_url: string;
        }

        interface ICloudinarySearchResult {
            resources: ICloudinaryResource[];
        }

        const links: string[] = (
            resultados as ICloudinarySearchResult
        ).resources.map((recurso: ICloudinaryResource) => recurso.secure_url);
        console.log("Links de la carpeta:", links);

        const body = JSON.stringify({
            title,
            location,
            date,
            slug,
            folder: links,
            image: imageUrl,
            imageCover: CoverUrl,
        });
        const obj = JSON.parse(body);
        console.log(obj);

        const newBlog: IPortfolioSchema = new TrenzaMatrimoniosPortfolioModel({
            title: obj.title,
            location: obj.location,
            date: obj.date,
            slug: obj.slug,
            folder: obj.folder,
            image: obj.image,
            imageCover: obj.imageCover,
        });
        const savedBlog = await newBlog.save();
        console.log("Blog guardado:", savedBlog);
        return NextResponse.json(
            {
                newMenu: savedBlog,
                message: messages.success.blogCreated,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error al guardar el blog:", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}
