import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IBlog {
    _id?: ObjectId | string | undefined;
    title: string;
    description: string;
    image: string;
    imageCover: string;
    content: object;
}

//@ts-ignore
export interface IBlogSchema extends Document {
    _id?: ObjectId | string | undefined;
    title: string;
    description: string;
    image: string;
    imageCover: string;
    content: object;
}

const BlogSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        imageCover: { type: String, required: true },
        content: { type: Object, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default mongoose.models.Blogs || mongoose.model("Blogs", BlogSchema);
