"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const programController_1 = require("../controllers/programController");
const router = (0, express_1.Router)();
router.get('/get-programs', programController_1.getPrograms);
router.get('/get-courses', programController_1.getCourses);
exports.default = router;
