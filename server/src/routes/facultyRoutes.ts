import { Router } from "express";
import { 
    addFacultySpecialization, 
    addHandled, 
    getFacultySpecialization, 
    getHandled, 
    updateFacultySpecialization,
    updateHandled
} from "../controllers/facultyController";

const router = Router();

router.post('/add-handled', addHandled);
router.post('/get-handled', getHandled);
router.put('/update-handled', updateHandled);

router.post('/add-specialization', addFacultySpecialization);
router.post('/get-specialization', getFacultySpecialization);
router.put('/update-specialization', updateFacultySpecialization);

export default router;