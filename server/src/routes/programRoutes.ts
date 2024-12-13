import { Router } from "express";
import { getCourses, getPrograms } from "../controllers/programController";

const router = Router();

router.get('/get-programs', getPrograms);
router.get('/get-courses', getCourses);


export default router;