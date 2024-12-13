import { Router, Request, Response } from "express";
import { getNotifications } from "../controllers/notificationController";

const router = Router();

router.get('/get-notifications', getNotifications);

export default router;