"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classController_1 = require("../controllers/classController");
const router = (0, express_1.Router)();
router.get('/get-classes', classController_1.getClasses);
router.post('/add-class', classController_1.addClass);
exports.default = router;
