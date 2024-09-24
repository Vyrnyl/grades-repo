"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gradeController_1 = require("../controllers/gradeController");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.put('/update-grade', gradeController_1.updateStudentGrade);
exports.default = router;