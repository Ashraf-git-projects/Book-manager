import express from 'express';
import auth from '../middleware/auth.js';
import Book from '../models/Book.js';

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const userId = req.userId;

    const total = await Book.countDocuments({ userId });
    const wantToRead = await Book.countDocuments({ userId, status: 'want-to-read' });
    const reading = await Book.countDocuments({ userId, status: 'reading' });
    const completed = await Book.countDocuments({ userId, status: 'completed' });

    res.json({
      total,
      wantToRead,
      reading,
      completed
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard stats' });
  }
});

export default router;
