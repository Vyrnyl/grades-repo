"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRefreshToken = exports.checkEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//Check email in the Database
const checkEmail = async (email) => {
    try {
        const isExist = await prisma.user.findUnique({ where: { email } });
        return isExist;
    }
    catch (error) {
        console.log('Email checking error');
        return false;
    }
};
exports.checkEmail = checkEmail;
const storeRefreshToken = async (token) => {
    try {
        const refreshToken = await prisma.refreshToken.create({
            data: { token }
        });
        return { refreshToken };
    }
    catch (error) {
        console.log(`Storing refresh token error: ${error}`);
        return { error: 'An error occurred while processing your request' };
    }
};
exports.storeRefreshToken = storeRefreshToken;
