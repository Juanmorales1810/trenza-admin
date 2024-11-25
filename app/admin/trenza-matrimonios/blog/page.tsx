import { TrenzaMatrimoniosBlogsModel } from "@/models/trenza";
import { connectMongoDB } from "@/lib/mongodb";
import CardBlog from "@/components/cardBlog";
import { cache } from "react";

const getItems = cache(async function loadMenu() {
    await connectMongoDB();
    const ListBlogs = await TrenzaMatrimoniosBlogsModel.find();
    return ListBlogs.map(blogs => {
        const obj = blogs.toObject();
        obj._id = obj._id.toString(); // Convierte _id a una cadena
        return obj;
    }); // Usa .toObject() para convertir cada producto a un objeto JavaScript simple
})
export default async function page() {
    const blogs = await getItems();
    return (
        <div className="grid grid-cols-2 w-full max-w-7xl gap-16 mx-auto ">
            {blogs.map((blog) => (
                <CardBlog
                    key={blog._id}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    date={blog.createdAt}
                    slug="#"
                />
            ))}
        </div>
    )
}