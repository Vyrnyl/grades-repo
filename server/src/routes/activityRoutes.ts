import { Router } from "express";
import { getActivity, getAdminActivity } from "../controllers/activityController";

const router = Router();

router.get('/get-login-activity', getActivity);
router.get('/get-admin-activity', getAdminActivity);


export default router;