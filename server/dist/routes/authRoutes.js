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
const tokenService_1 = require("../services/tokenService");
const dotenv_1 = __importDefault(require("dotenv"));
const userAuth_1 = __importDefault(require("../middleware/userAuth"));
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
    const payload = {
        userId: newUser.id,
        firstName: newUser.firstName,
        role: newUser.role
    };
    const accessToken = (0, tokenService_1.generateAccessToken)(payload);
    const refreshToken = (0, tokenService_1.generateRefreshToken)(payload);
    //Store refresh token
    const store = await (0, userDataAccess_1.storeRefreshToken)(refreshToken, newUser.id);
    if (store.error) {
        return res.status(500).json({ error: 'Storing refresh token error' });
    }
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });
    res.status(200).json({ message: 'Registration successful' });
});
router.get('/test', userAuth_1.default, (req, res) => {
    console.log(req.user);
    res.json({ message: 'Protected' });
});
exports.default = router;
