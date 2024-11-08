import { Router } from "express";
import { addActivity, getActivity } from "../controllers/activityController";

const router = Router();

router.get('/get-login-activity', getActivity);
router.post('/add-login-activity', addActivity);


export default router;