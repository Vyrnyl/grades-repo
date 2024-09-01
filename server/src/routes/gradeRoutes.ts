import { Router, Request, Response } from 'express';
import { updateStudentGrade } from '../controllers/gradeController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.put('/update-grade', updateStudentGrade);

export default router;