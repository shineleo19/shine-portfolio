import { Router } from 'express';
import Book from '../models/Book.js';

const router = Router();

router.get('/', async (_req, res) => {
  const books = await Book.find().sort({ sortOrder: 1, _id: 1 }).lean();
  res.json(books);
});

export default router;
