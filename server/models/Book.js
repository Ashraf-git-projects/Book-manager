import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    status: { type: String, enum: ['want-to-read', 'reading', 'completed'], default: 'want-to-read' }
  },
  { timestamps: true }
);

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
export default Book;
