import express from 'express';

import MoviesController from '../controllers/movies.js';

const router = express.Router();

router.get('/', MoviesController.getAll);

export default router;
