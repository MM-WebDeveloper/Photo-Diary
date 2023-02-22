import express from 'express';
import * as UserController from '../controllers/users';

const router = express.Router();

router.post('/register', UserController.Register);

export default router;
