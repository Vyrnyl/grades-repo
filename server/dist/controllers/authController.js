"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.refreshToken = exports.logout = exports.login = exports.signup = void 0;
const authValidator_1 = require("../validators/authValidator");
const userUtils_1 = require("../data/userUtils");
const userDataAccess_1 = require("../data/userDataAccess");
const tokenService_1 = require("../services/tokenService");
const validationErrorHandler_1 = __importDefault(require("../utils/validationErrorHandler"));
const passwordUtils_1 = require("../utils/passwordUtils");
const activityDataAccess_1 = require("../data/activityDataAccess");
//SIGNUP
const signup = async (req, res) => {
    const { error, value } = (0, authValidator_1.validateSignup)(req.body);
    if (error) {
        const err = (0, validationErrorHandler_1.default)(error);
        return res.status(422).json(err);
    }
    //CHECK EMAIL
    const emailExist = await (0, userUtils_1.checkEmail)(value.email);
    if (emailExist) {
        return res.status(409).json({ error: 'Email already registered' });
    }
    //PASSWORD HASHING
    value.password = await (0, passwordUtils_1.hashPassword)(value.password);
    delete value.confirmPassword;
    //DB STORE
    const newUserResult = await (0, userDataAccess_1.createUser)(value);
    if ('error' in newUserResult) {
        // return res.status(500).json(newUserResult);
        console.log(newUserResult);
        return res.status(409).json({ error: 'Email already registered' });
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
    // if(storeResult.error) {
    //     return res.status(500).json({ error: storeResult.error });
    // }
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
        const err = (0, validationErrorHandler_1.default)(error);
        return res.status(422).json(err);
    }
    //CHECK USER
    const user = await (0, userUtils_1.checkEmail)(value.email);
    if (!user) {
        return res.status(404).json({ error: 'Invalid email or password' });
    }
    //COMPARE PASSWORD
    const isPasswordMatch = await (0, passwordUtils_1.comparePassword)(value.password, user.password);
    if (!isPasswordMatch) {
        await (0, activityDataAccess_1.addLoginActivity)(user.email, 'Failed');
        return res.status(404).json({ error: 'Invalid email or password' });
    }
    await (0, activityDataAccess_1.addLoginActivity)(user.email, 'Successful');
    const payload = {
        userId: user.id,
        firstName: user.firstName,
        role: user.role
    };
    const accessToken = (0, tokenService_1.generateAccessToken)(payload);
    const refreshToken = (0, tokenService_1.generateRefreshToken)(payload);
    //Store refresh token
    const storeResult = await (0, userUtils_1.storeRefreshToken)(refreshToken);
    // if(storeResult.error) {
    //     return res.status(500).json({ error: storeResult.error });
    // }
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });
    const userData = await (0, userDataAccess_1.getUserData)(user.id);
    res.status(200).json({ message: 'Login successful', userData });
};
exports.login = login;
const logout = async (req, res) => {
    const refreshToken = req.headers['refresh-token'];
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }
    const deleteToken = await (0, userUtils_1.deleteRefreshToken)(refreshToken);
    if (!deleteToken) {
        return res.status(404).json({ error: 'Already logged out or token not found' });
    }
    res.status(200).json({ message: 'Logout successful' });
};
exports.logout = logout;
const refreshToken = async (req, res) => {
    const receivedRefreshToken = req.header('refresh-token');
    if (!receivedRefreshToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const validateTokenResult = await (0, tokenService_1.verifyRefreshToken)(receivedRefreshToken);
    if (!validateTokenResult) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    console.log(validateTokenResult);
    const { userId, firstName, role } = validateTokenResult;
    const accessToken = (0, tokenService_1.generateAccessToken)({ userId, firstName, role });
    res.set({ 'Authorization': `Bearer ${accessToken}` });
    res.status(200).json({ message: 'Refresh Token successful' });
};
exports.refreshToken = refreshToken;
//TEST ROUTE
const test = (req, res) => {
    console.log(req.user);
    res.json({ message: 'Protected' });
};
exports.test = test;
