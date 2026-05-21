import { Router } from 'express';
import Project from '../models/Project.js';

const router = Router();

router.get('/', async (_req, res) => {
  const projects = await Project.find().sort({ sortOrder: 1, _id: 1 }).lean();
  res.json(projects);
});

export default router;
