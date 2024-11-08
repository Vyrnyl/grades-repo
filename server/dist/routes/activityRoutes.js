"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activityController_1 = require("../controllers/activityController");
const router = (0, express_1.Router)();
router.get('/get-login-activity', activityController_1.getActivity);
router.post('/add-login-activity', activityController_1.addActivity);
exports.default = router;
