import express from 'express';
import Book from '../models/Book.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

// GET /api/books?status=reading&tag=fiction
router.get('/', async (req, res) => {
  try {
    const { status, tag } = req.query;
    const filter = { userId: req.userId };
    if (status) filter.status = status;
    if (tag) filter.tags = tag;
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, author, tags, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const book = await Book.create({
      userId: req.userId,
      title: title.trim(),
      author: author ? author.trim() : '',
      tags: Array.isArray(tags) ? tags.map(t => t.trim()) : [],
      status: status || 'want-to-read'
    });

    res.status(201).json({ book });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create book' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, userId: req.userId });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ book });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch book' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updates = {};
    const { title, author, tags, status } = req.body;
    if (title !== undefined) updates.title = title.trim();
    if (author !== undefined) updates.author = author.trim();
    if (tags !== undefined) updates.tags = Array.isArray(tags) ? tags.map(t => t.trim()) : [];
    if (status !== undefined) updates.status = status;

    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: updates },
      { new: true }
    );

    if (!book) return res.status(404).json({ message: 'Book not found or not owned by user' });
    res.json({ book });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update book' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Book not found or not owned by user' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete book' });
  }
});

export default router;
