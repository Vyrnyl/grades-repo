"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const programController_1 = require("../controllers/programController");
const router = (0, express_1.Router)();
router.get('/get-programs', programController_1.getPrograms);
exports.default = router;
