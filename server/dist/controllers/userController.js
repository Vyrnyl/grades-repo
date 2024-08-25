"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const client_1 = require("@prisma/client");
const userDataAccess_1 = require("../data/userDataAccess");
const userUtils_1 = require("../data/userUtils");
const prisma = new client_1.PrismaClient();
const getUser = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ message: 'User is not authenticated' });
    }
    const userDetails = await (0, userDataAccess_1.getUserById)(req.user.userId);
    if (!userDetails) {
        return res.status(404).json({ error: 'User not found' });
    }
    const programId = userDetails.programId;
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
