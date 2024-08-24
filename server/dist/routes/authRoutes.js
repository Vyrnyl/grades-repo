"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const userAuth_1 = __importDefault(require("../middleware/userAuth"));
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.get('/test', userAuth_1.default, authController_1.test);
exports.default = router;
