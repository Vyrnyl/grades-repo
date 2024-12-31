import { Router, Request, Response } from "express";
import {
  getAddedCourseGrade,
  getStudentGrades,
  getStudentRecords,
  updateStudentGrade,
} from "../controllers/gradeController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/get-grades", getStudentGrades);
router.get("/get-records", getStudentRecords);
router.put("/update-grade", updateStudentGrade);
router.post("/get-added-record", getAddedCourseGrade);

export default router;
