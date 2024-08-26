import { Router, Request, Response } from "express";
import { getUser, updateUser } from "../controllers/userController";


const router = Router();

router.get('/account', getUser);
router.post('/account', updateUser);

export default router;