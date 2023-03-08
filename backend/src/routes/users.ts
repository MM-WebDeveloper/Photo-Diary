import express from 'express';
import * as UserController from '../controllers/users';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, UserController.AuthenticateUser);
router.post('/register', UserController.Register);
router.post('/login', UserController.Login);

export default router;
