import { Router } from "express";
import { addClass, deleteClass, getClasses, updateClass } from "../controllers/classController";

const router = Router();

router.get('/get-classes', getClasses);
router.post('/add-class', addClass);
router.put('/update-class', updateClass);
router.delete('/delete-class', deleteClass);

export default router;