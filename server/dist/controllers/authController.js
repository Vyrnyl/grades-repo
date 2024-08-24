"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.login = exports.signup = void 0;
const authValidator_1 = require("../validators/authValidator");
const validationError_1 = __importDefault(require("../utils/validationError"));
const userUtils_1 = require("../data/userUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDataAccess_1 = require("../data/userDataAccess");
const tokenService_1 = require("../services/tokenService");
//SIGNUP
const signup = async (req, res) => {
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
    value.password = await bcrypt_1.default.hash(value.password, 10);
    ;
    delete value.confirmPassword;
    //DB STORE
    const newUserResult = await (0, userDataAccess_1.createUser)(value);
    if ('error' in newUserResult) {
        return res.status(500).json(newUserResult);
    }
    //TOKEN
    const payload = {
        userId: newUserResult.id,
        firstName: newUserResult.firstName,
        role: newUserResult.role
    };
    const accessToken = (0, tokenService_1.generateAccessToken)(payload);
    const refreshToken = (0, tokenService_1.generateRefreshToken)(payload);
    //Store refresh token
    const storeResult = await (0, userUtils_1.storeRefreshToken)(refreshToken);
    if (storeResult.error) {
        return res.status(500).json({ error: storeResult.error });
    }
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });
    res.status(201).json({ message: 'Registration successful' });
};
exports.signup = signup;
//LOGIN
const login = async (req, res) => {
    const { error, value } = (0, authValidator_1.validateLogin)(req.body);
    if (error) {
        const err = (0, validationError_1.default)(error);
        return res.status(422).json(err);
    }
    //CHECK USER
    const user = await (0, userUtils_1.checkEmail)(value.email);
    if (!user) {
        return res.status(404).json({ error: 'Invalid email or password' });
    }
    //COMPARE PASSWORD
    const isPasswordMatch = await bcrypt_1.default.compare(value.password, user.password);
    if (!isPasswordMatch) {
        return res.status(404).json({ error: 'Invalid email or password' });
    }
    const payload = {
        userId: user.id,
        firstName: user.firstName,
        role: user.role
    };
    const accessToken = (0, tokenService_1.generateAccessToken)(payload);
    const refreshToken = (0, tokenService_1.generateRefreshToken)(payload);
    //Store refresh token
    const storeResult = await (0, userUtils_1.storeRefreshToken)(refreshToken);
    if (storeResult.error) {
        return res.status(500).json({ error: storeResult.error });
    }
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });
    res.status(200).json({ message: 'Login successful' });
};
exports.login = login;
//TEST ROUTE
const test = (req, res) => {
    console.log(req.user);
    res.json({ message: 'Protected' });
};
exports.test = test;
