import { Router } from "express";
import { 
    addFacultySpecialization, 
    addHandled, 
    getFacultySpecialization, 
    getHandled 
} from "../controllers/facultyController";

const router = Router();

router.post('/add-handled', addHandled);
router.post('/get-handled', getHandled);

router.post('/add-specialization', addFacultySpecialization);
router.post('/get-specialization', getFacultySpecialization);

export default router;