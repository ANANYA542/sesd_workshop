import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    isbn: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        publishedYear: { type: Number, required: true },
        genre: { type: String, required: true },
        isbn: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export const Book = mongoose.model<IBook>('Book', BookSchema);
