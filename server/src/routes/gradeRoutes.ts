import { Router, Request, Response } from 'express';
import { getStudentGrades, updateStudentGrade } from '../controllers/gradeController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/get-grades', getStudentGrades);
router.put('/update-grade', updateStudentGrade);

export default router;