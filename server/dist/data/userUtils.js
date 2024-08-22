"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//Check email in the Database
const checkEmail = async (email) => {
    try {
        const isExist = await prisma.user.findUnique({ where: { email } });
        return isExist !== null;
    }
    catch (error) {
        console.log('Email checking error');
        return false;
    }
};
exports.checkEmail = checkEmail;
