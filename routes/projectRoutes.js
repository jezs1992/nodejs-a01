import express from 'express';
import { getAllProjects, getProjectById, searchProjects } from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/search', searchProjects);
router.get('/:id', getProjectById);

export default router;
