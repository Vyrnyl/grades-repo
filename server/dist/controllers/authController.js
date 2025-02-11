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
const programDataAccess_1 = require("../data/programDataAccess");
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
    //Check ID
    const user = await (0, userDataAccess_1.getUserData)(value.id);
    const userIdExist = await (0, userDataAccess_1.checkUserId)(value.studentId);
    if (user?.studentId !== value.studentId) {
        if (userIdExist?.message)
            return res.status(409).json({ error: 'UserID already exist!' });
    }
    if (value.role === 'student') {
        const format = /^\d{4}-\d{5}$/;
        if (!format.test(value.studentId))
            return res.status(409).json({ error: 'Invalid ID format! (eg. 1234-1234)' });
    }
    else {
        const format = /^\d{4}$/;
        if (!format.test(value.studentId))
            return res.status(409).json({ error: 'Invalid ID format! (eg. 1234)' });
    }
    //PASSWORD HASHING
    value.password = await (0, passwordUtils_1.hashPassword)(value.password);
    delete value.confirmPassword;
    //DB STORE
    const newUserResult = await (0, userDataAccess_1.createUser)(value);
    // console.log(newUserResult)
    if ('error' in newUserResult) {
        // return res.status(500).json(newUserResult);
        // console.log(newUserResult)
        return res.status(409).json({ error: 'Email already registered' });
    }
    //Assign Addded Courses
    await (0, programDataAccess_1.assignNewUserCourse)(newUserResult.id, value.programId);
    //Set Recent Activity
    // await addAdminRecentActivity(`New user registered with email: ${newUserResult.email}`);
    // await addLoginSession();
    //TOKEN
    const payload = {
        userId: newUserResult.id,
        firstName: newUserResult.firstName,
        role: newUserResult.role
    };
    const accessToken = (0, tokenService_1.generateAccessToken)(payload);
    const refreshToken = (0, tokenService_1.generateRefreshToken)(payload);
    //Store refresh token
    await (0, userUtils_1.storeRefreshToken)(refreshToken);
    // if(storeResult.error) {
    //     return res.status(500).json({ error: storeResult.error });
    // }
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });
    res.status(201).json(newUserResult);
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
    if (user.email !== 'admin@gmail.com') {
        await (0, activityDataAccess_1.addLoginSession)();
        await (0, activityDataAccess_1.addAdminRecentActivity)(`User logged in with email: ${user.email}`);
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
    // const refreshToken = req.headers['refresh-token'] as string;
    // if(!refreshToken) {
    //     return res.status(400).json({ error: 'Refresh token is required' });
    // }
    // const deleteToken = await deleteRefreshToken(refreshToken);
    const deleteSession = await (0, activityDataAccess_1.deleteLoginSession)();
    if (!deleteSession) {
        return res.status(404).json({ error: 'Already logged out' });
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
