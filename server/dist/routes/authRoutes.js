"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const authValidator_1 = require("../validators/authValidator");
const userUtils_1 = require("../data/userUtils");
const validationError_1 = __importDefault(require("../utils/validationError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDataAccess_1 = require("../data/userDataAccess");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
router.post('/signup', async (req, res) => {
    const { error, value } = (0, authValidator_1.validateSignup)(req.body);
    if (error) {
        const err = (0, validationError_1.default)(error);
        return res.status(422).json(err);
    }
    //CHECK EMAIL
    const emailExist = await (0, userUtils_1.checkEmail)(value.email);
    if (emailExist) {
        return res.status(409).json({ error: 'Email already registered' });
    }
    //PASSWORD HASHING
    const hashedPassword = await bcrypt_1.default.hash(value.password, 10);
    value.password = hashedPassword;
    delete value.confirmPassword;
    //DB STORE
    const newUser = await (0, userDataAccess_1.createUser)(value);
    if ('error' in newUser) {
        return res.status(500).json(newUser);
    }
    //TOKEN
    res.status(200).json({ message: 'Registration successful' });
});
exports.default = router;
