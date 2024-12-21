import { IBlogSchema } from "@/models/blogs";
import { TrenzaMatrimoniosBlogsModel } from "@/models/trenza";
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

export async function POST(NextRequest: NextRequest) {
    const data = await NextRequest.formData();
    const title = data.get("titulo");
    const description = data.get("description");
    const image = data.get("image");
    const imageCover = data.get("cover");
    const content = data.get("content");
    const slug = data.get("slug");

    connectMongoDB();
    try {
        if (!title || !image) {
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

        const body = JSON.stringify({
            title,
            description,
            image: imageUrl,
            imageCover: CoverUrl,
            content,
            slug,
        });
        const obj = JSON.parse(body);
        console.log(obj);

        const newBlog: IBlogSchema = new TrenzaMatrimoniosBlogsModel({
            title: obj.title,
            description: obj.description,
            image: obj.image,
            imageCover: obj.imageCover,
            content: obj.content,
            slug: obj.slug,
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
