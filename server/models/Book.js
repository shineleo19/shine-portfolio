import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true },
    coverUrl: { type: String, default: null },
    href: { type: String, default: '#' },
    sortOrder: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
