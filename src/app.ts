import express, { Application } from 'express';
import bookRoutes from './routes/book.routes';
import { errorHandler } from './middleware';

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/books', bookRoutes);

app.use(errorHandler);

export default app;