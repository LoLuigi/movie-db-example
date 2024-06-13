import express from 'express';

import UsersController from '../controllers/users.js';

const router = express.Router();

// router.get('/', UsersController.getAll);

router.post('/create', UsersController.create);
router.post('/login', UsersController.login);
router.post('/edit', UsersController.edit);
router.get('/', UsersController.getUser);

export default router;