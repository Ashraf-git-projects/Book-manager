import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (!uri) return;
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri);
}
