import mongoose from 'mongoose';

const WatchingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    director: { type: String, default: '' },
    kind: { type: String, default: 'movie' },
    status: { type: String, default: 'WATCHING' },
    year: { type: Number, default: null },
    href: { type: String, default: '#' },
    posterUrl: { type: String, default: null },
    sortOrder: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export default mongoose.models.Watching || mongoose.model('Watching', WatchingSchema);
