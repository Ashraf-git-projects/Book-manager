import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.js';
import booksRoutes from './routes/books.js';
import dashboardRoutes from './routes/dashboard.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

async function start() {
  try {
    await connectDB(MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err);
    process.exit(1);
  }
}

start();

export default app;
