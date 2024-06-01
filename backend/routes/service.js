import express from 'express';

import ServiceController from '../controllers/service.js';

const router = express.Router();

router.get('/', ServiceController.index);

export default router;
