import { Router } from "express";
import { getActivity } from "../controllers/activityController";

const router = Router();

router.get('/get-login-activity', getActivity);


export default router;