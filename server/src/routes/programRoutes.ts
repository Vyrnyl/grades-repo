import { Router } from "express";
import { 
    addCourse, 
    assignCourses, 
    deleteCourse, 
    getAddedCourse, 
    getAllStudentCourses, 
    getCoursePrograms, 
    getCourses, 
    getPrograms, 
    getStudentCourses, 
    updateCourse, 
    updateStudentCourses
} from "../controllers/programController";

const router = Router();

router.get('/get-programs', getPrograms);
router.get('/get-courses', getCourses);

router.post('/add-added-course', addCourse);
router.get('/get-added-courses', getAddedCourse);
router.put('/update-added-course', updateCourse);
router.delete('/delete-added-course', deleteCourse);

router.post('/add-assigned-courses', assignCourses);
router.post('/get-assigned-courses', getStudentCourses);
router.get('/get-all-assigned-courses', getAllStudentCourses);
router.put('/update-assigned-courses', updateStudentCourses);

router.post('/get-program-ids', getCoursePrograms);

export default router;