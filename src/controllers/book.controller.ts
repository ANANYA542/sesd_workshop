import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    createBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    };

    getBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.getBookById(req.params.id);
            if (!book) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }
            res.json(book);
        } catch (error) {
            next(error);
        }
    };

    getBooks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const filter = { ...req.query };
            delete filter.page;
            delete filter.limit;

            const books = await this.bookService.getAllBooks(filter, page, limit);
            res.json(books);
        } catch (error) {
            next(error);
        }
    };

    updateBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.updateBook(req.params.id, req.body);
            if (!book) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }
            res.json(book);
        } catch (error) {
            next(error);
        }
    };

    deleteBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.deleteBook(req.params.id);
            if (!book) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
