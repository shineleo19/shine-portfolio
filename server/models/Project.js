import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    href: { type: String, default: '#' },
    description: { type: String, default: '' },
    projectType: { type: String, enum: ['website', 'app'], default: 'website' },
    tags: { type: [String], default: [] },
    bgGradient: { type: String, default: null },
    imageUrl: { type: String, default: null },
    sortOrder: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
