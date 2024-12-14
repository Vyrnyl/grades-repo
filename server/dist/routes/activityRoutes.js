"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activityController_1 = require("../controllers/activityController");
const router = (0, express_1.Router)();
router.get('/get-login-activity', activityController_1.getActivity);
router.get('/get-admin-activity', activityController_1.getAdminActivity);
router.get('/get-faculty-activity', activityController_1.getFacultyActivity);
exports.default = router;
