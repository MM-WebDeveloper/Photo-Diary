import express from 'express';
import * as UserController from '../controllers/users';

const router = express.Router();

router.post('/register', UserController.Register);
router.post('/login', UserController.Login);

export default router;
