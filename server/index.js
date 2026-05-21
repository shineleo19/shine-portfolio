import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { ServerApiVersion } from 'mongodb';
import booksRoute from './routes/books.js';
import projectsRoute from './routes/projects.js';
import watchingRoute from './routes/watching.js';
import hobbiesRoute from './routes/hobbies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnvPath = path.resolve(__dirname, '..', '.env');

dotenv.config({ path: rootEnvPath });

const app = express();
// Render assigns a random PORT, so we must use process.env.PORT
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

function fixMongoUriIfNeeded(uri) {
  if (!uri || typeof uri !== 'string') return uri;
  const atCount = (uri.match(/@/g) || []).length;
  if (atCount <= 1) return uri;

  try {
    const schemeIndex = uri.indexOf('://');
    if (schemeIndex === -1) return uri;
    const afterScheme = uri.slice(schemeIndex + 3);
    const lastAt = afterScheme.lastIndexOf('@');
    if (lastAt === -1) return uri;

    const cred = afterScheme.slice(0, lastAt);
    const rest = afterScheme.slice(lastAt + 1);
    const colonIndex = cred.indexOf(':');
    if (colonIndex === -1) return uri;

    const user = cred.slice(0, colonIndex);
    const pass = cred.slice(colonIndex + 1);
    const encodedPass = encodeURIComponent(pass);
    const fixed = uri.slice(0, schemeIndex + 3) + `${user}:${encodedPass}@` + rest;
    console.warn('Rewrote MONGODB_URI to encode password characters for connection.');
    return fixed;
  } catch (e) {
    return uri;
  }
}

app.use(cors({
  origin: ['http://localhost:5173', 'https://shine-portfolio-sooty.vercel.app'],
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.use('/api/books', booksRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/watching', watchingRoute);
app.use('/api/hobby-photos', hobbiesRoute);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

async function start() {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set. Add it to Render Environment Variables.');
  }

  const connectUri = fixMongoUriIfNeeded(mongoUri);
  const mongooseOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  await mongoose.connect(connectUri, mongooseOptions);
  console.log('MongoDB connected');

  // This keeps the Render server alive!
  app.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
