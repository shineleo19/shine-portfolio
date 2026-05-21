import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import booksRoute from './routes/books.js';
import projectsRoute from './routes/projects.js';
import watchingRoute from './routes/watching.js';
import hobbiesRoute from './routes/hobbies.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

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

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');

  app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
