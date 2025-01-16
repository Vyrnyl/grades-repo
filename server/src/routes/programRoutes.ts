import { Router } from "express";
import { addCourse, deleteCourse, getAddedCourse, getCourses, getPrograms, updateCourse } from "../controllers/programController";

const router = Router();

router.get('/get-programs', getPrograms);
router.get('/get-courses', getCourses);

router.post('/add-added-course', addCourse);
router.get('/get-added-courses', getAddedCourse);
router.put('/update-added-course', updateCourse);
router.delete('/delete-added-course', deleteCourse);

export default router;