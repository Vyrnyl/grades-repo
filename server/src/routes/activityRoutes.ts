import { Router } from "express";
import { getActivity, getAdminActivity, getFacultyActivity, getSessions } from "../controllers/activityController";

const router = Router();

router.get('/get-login-activity', getActivity);
router.get('/get-admin-activity', getAdminActivity);
router.get('/get-faculty-activity', getFacultyActivity);
router.get('/get-login-sessions', getSessions);


export default router;