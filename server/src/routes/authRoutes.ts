import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import userAuth from '../middleware/userAuth';
import { login, signup, test } from '../controllers/authController';

const router = Router();
const prisma = new PrismaClient()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

router.post('/signup', signup);
router.post('/login', login);

router.get('/test', userAuth, test);

export default router;