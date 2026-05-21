import { Router } from 'express';
import Watching from '../models/Watching.js';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Watching.find().sort({ sortOrder: 1, _id: 1 }).lean();
  res.json(items);
});

export default router;
