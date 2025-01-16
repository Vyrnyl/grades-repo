import { Router } from 'express';
import userAuth from '../middleware/userAuth';
import { login, logout, refreshToken, signup, test } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout)
router.post('/refresh-token', refreshToken);
router.get('/test', test);

export default router;