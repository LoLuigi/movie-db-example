import express from 'express';

import ReviewsController from '../controllers/reviews.js';

const router = express.Router();

router.get('/', ReviewsController.getAll);

export default router;
