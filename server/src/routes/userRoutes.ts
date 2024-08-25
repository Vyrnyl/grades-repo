import { Router, Request, Response } from "express";
import { getUser } from "../controllers/userController";


const router = Router();

router.get('/account', getUser);

export default router;