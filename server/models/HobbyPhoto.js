import mongoose from 'mongoose';

const HobbyPhotoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, default: null },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    size: { type: String, enum: ['landscape', 'portrait'], default: null },
    sortOrder: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export default mongoose.models.HobbyPhoto || mongoose.model('HobbyPhoto', HobbyPhotoSchema);
