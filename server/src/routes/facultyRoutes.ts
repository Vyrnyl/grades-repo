import { Router } from "express";
import { 
    addFacultyProgramYear,
    addFacultySpecialization, 
    addHandled, 
    getFacultyProgramYear, 
    getFacultySpecialization, 
    getHandled, 
    updateFacultyProgramYear, 
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

router.post('/add-program-year', addFacultyProgramYear);
router.post('/get-program-year', getFacultyProgramYear);
router.put('/update-program-year', updateFacultyProgramYear);

export default router;