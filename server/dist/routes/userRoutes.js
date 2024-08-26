"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/account', userController_1.getUser);
router.post('/account', userController_1.updateUser);
exports.default = router;
