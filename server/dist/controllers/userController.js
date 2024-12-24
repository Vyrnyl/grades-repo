"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const userDataAccess_1 = require("../data/userDataAccess");
const userValidator_1 = require("../validators/userValidator");
const validationErrorHandler_1 = __importDefault(require("../utils/validationErrorHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const activityDataAccess_1 = require("../data/activityDataAccess");
const getUsers = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const id = +req.params.id;
    const users = await (0, userDataAccess_1.getUsersData)();
    if (!users) {
        return res.status(404).json({ error: 'Users not found' });
    }
    res.status(200).json(users);
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { userId } = req.user;
    const userDetails = await (0, userDataAccess_1.getUserData)(userId);
    if (!userDetails) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(userDetails);
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'User is not authenticated' });
    }
    // const { error, value } = validateUserUpdate(req.body);
    // if(error) {
    //     const err = validationErrorHandler(error);
    //     return res.status(422).json(err);
    // }
    // const { userId } = req.user;
    const value = req.body;
    try {
        if (!value.password) {
            delete value.password;
        }
        else {
            value.password = await bcrypt_1.default.hash(value.password, 10);
        }
    }
    catch (error) {
        console.error("Error hashing password:", error);
    }
    const { userId } = req.user;
    const userDetails = await (0, userDataAccess_1.getUserData)(userId);
    const userUpdateDetails = await (0, userDataAccess_1.updateUserData)(value.id, value);
    if (!userUpdateDetails) {
        return res.status(500).json({ error: 'Failed to update user details' });
    }
    //Set Activity
    const setActivity = async () => {
        if (userDetails?.firstName !== userUpdateDetails.firstName)
            await (0, activityDataAccess_1.addFacultyActivity)(userId, `You updated your first name from ${userDetails?.firstName} to ${userUpdateDetails.firstName}.`);
        if (userDetails?.lastName !== userUpdateDetails.lastName)
            await (0, activityDataAccess_1.addFacultyActivity)(userId, `You updated your last name from ${userDetails?.lastName} to ${userUpdateDetails.lastName}.`);
        if (userDetails?.studentId !== userUpdateDetails.studentId)
            await (0, activityDataAccess_1.addFacultyActivity)(userId, `You updated your Faculty from ${userDetails?.studentId} to ${userUpdateDetails.studentId}.`);
        // if(userDetails?.sex !== userUpdateDetails.sex)
        //     await addFacultyActivity(userId, 
        //         `Gender updated`);
        // if(userDetails?.phoneNumber !== userUpdateDetails.phoneNumber)
        //     await addFacultyActivity(userId, 
        //         `Phone Number updated`);
        if (userDetails?.email !== userUpdateDetails.email)
            await (0, activityDataAccess_1.addFacultyActivity)(userId, `You successfully updated your email address to ${userUpdateDetails.email}`);
        if (value.password) {
            await (0, activityDataAccess_1.addFacultyActivity)(userId, `You successfully changed your password`);
        }
    };
    setActivity();
    res.status(200).json(userUpdateDetails);
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'User is not authenticated' });
    }
    if (!req.body.userId) {
        return res.status(400).json({ error: 'Missing necessary data' });
    }
    const { error, value } = (0, userValidator_1.validateUserId)(req.body);
    if (error) {
        const err = (0, validationErrorHandler_1.default)(error);
        return res.status(422).json(err);
    }
    const deletedUser = await (0, userDataAccess_1.deleteUserData)(value.userId);
    if (!deletedUser) {
        return res.status(400).json({ error: 'Deletion error' });
    }
    res.status(200).json({ message: 'Deletion successful' });
};
exports.deleteUser = deleteUser;
