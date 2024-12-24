import { Router } from "express";
import { 
    addFacultySpecialization, 
    addHandled, 
    getFacultySpecialization, 
    getHandled 
} from "../controllers/facultyController";

const router = Router();

router.post('/add-handled', addHandled);
router.get('/get-handled', getHandled);

router.post('/add-specialization', addFacultySpecialization);
router.get('/get-specialization', getFacultySpecialization);

export default router;