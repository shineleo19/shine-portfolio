import { Router } from 'express';
import HobbyPhoto from '../models/HobbyPhoto.js';

const router = Router();

router.get('/', async (_req, res) => {
  const hobbyPhotos = await HobbyPhoto.find().sort({ sortOrder: 1, _id: 1 }).lean();
  res.json(hobbyPhotos);
});

export default router;
