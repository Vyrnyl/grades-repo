import { Router } from "express";
import { getActivity, getAdminActivity, getFacultyActivity } from "../controllers/activityController";

const router = Router();

router.get('/get-login-activity', getActivity);
router.get('/get-admin-activity', getAdminActivity);
router.get('/get-faculty-activity', getFacultyActivity);


export default router;