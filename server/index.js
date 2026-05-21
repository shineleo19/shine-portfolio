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
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

function fixMongoUriIfNeeded(uri) {
  if (!uri || typeof uri !== 'string') return uri;
  // quick check: valid scheme and more than one '@' suggests unencoded '@' in password
  const atCount = (uri.match(/@/g) || []).length;
  if (atCount <= 1) return uri;

  try {
    // find credentials segment between scheme:// and last @ before host
    const schemeIndex = uri.indexOf('://');
    if (schemeIndex === -1) return uri;
    const afterScheme = uri.slice(schemeIndex + 3);
    const lastAt = afterScheme.lastIndexOf('@');
    if (lastAt === -1) return uri;

    const cred = afterScheme.slice(0, lastAt); // user:password(possibly with @)
    const rest = afterScheme.slice(lastAt + 1); // host/...
    const colonIndex = cred.indexOf(':');
    if (colonIndex === -1) return uri; // no password part

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

app.use(cors());
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
    throw new Error('MONGODB_URI is not set. Add it to .env.');
  }

  const connectUri = fixMongoUriIfNeeded(mongoUri);
  // Use Stable API options similar to the MongoDB Atlas sample to avoid driver surprises
  const mongooseOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  await mongoose.connect(connectUri, mongooseOptions);
  console.log('MongoDB connected');

  app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
