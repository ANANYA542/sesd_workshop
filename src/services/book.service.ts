import { Book, IBook } from '../models/book.model';

export class BookService {

    async createBook(data: Partial<IBook>): Promise<IBook> {
        const book = new Book(data);
        return await book.save();
    }

    async getBookById(id: string): Promise<IBook | null> {
        return await Book.findById(id);
    }

    async getAllBooks(filter: any, page: number, limit: number): Promise<IBook[]> {
        const skip = (page - 1) * limit;
        // Basic search/filter implementation
        const query: any = {};
        if (filter.genre) {
            query.genre = filter.genre;
        }
        // Search by title (partial match)
        if (filter.search) {
            query.title = { $regex: filter.search, $options: 'i' };
        }

        return await Book.find(query).skip(skip).limit(limit);
    }

    async updateBook(id: string, data: Partial<IBook>): Promise<IBook | null> {
        return await Book.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteBook(id: string): Promise<IBook | null> {
        return await Book.findByIdAndDelete(id);
    }
}
