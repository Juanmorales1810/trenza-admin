import { Schema, Document, ObjectId } from "mongoose";

export interface IPortfolio {
    _id?: ObjectId | string | undefined;
    title: string;
    location: string;
    date: string;
    slug: string;
    imageCover: string;
    image: string;
    folder: string[];
}

//@ts-ignore
export interface IPortfolioSchema extends Document {
    _id?: ObjectId | string | undefined;
    title: string;
    location: string;
    date: string;
    slug: string;
    imageCover: string;
    image: string;
    folder: string[];
}

const PortfolioSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true },
        slug: { type: String, required: true },
        imageCover: { type: String, required: true },
        image: { type: String, required: true },
        folder: { type: Array, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default PortfolioSchema;
