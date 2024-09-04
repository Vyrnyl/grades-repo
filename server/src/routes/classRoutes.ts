import { Router } from "express";
import { addClass, getClasses } from "../controllers/classController";

const router = Router();

router.get('/get-classes', getClasses);
router.post('/add-class', addClass);


export default router;