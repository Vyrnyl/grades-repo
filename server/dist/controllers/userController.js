"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const userDataAccess_1 = require("../data/userDataAccess");
const userUtils_1 = require("../data/userUtils");
const authValidator_1 = require("../validators/authValidator");
const validationErrorHandler_1 = __importDefault(require("../utils/validationErrorHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const getUser = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ message: 'User is not authenticated' });
    }
    const { userId } = req.body;
    const userDetails = await (0, userDataAccess_1.getUserData)(userId);
    if (!userDetails) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { programId } = userDetails;
    if (!programId) {
        return res.json({ error: 'Program ID not found in user details' });
    }
    const programDetails = await (0, userUtils_1.getProgramName)(programId);
    if (!programDetails) {
        return res.status(404).json({ error: 'Program not found' });
    }
    res.status(200).json({ userDetails, programDetails });
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ message: 'User is not authenticated' });
    }
    const { error, value } = (0, authValidator_1.validateUserUpdate)(req.body);
    if (error) {
        const err = (0, validationErrorHandler_1.default)(error);
        return res.status(422).json(err);
    }
    const { userId } = req.user;
    value.password = await bcrypt_1.default.hash(value.password, 10);
    delete value.confirmPassword;
    const userUpdateDetails = await (0, userDataAccess_1.updateUserData)(userId, value);
    if (!userUpdateDetails) {
        return res.status(400).json({ error: 'Updating user error' });
    }
    res.status(200).json(userUpdateDetails);
};
exports.updateUser = updateUser;
