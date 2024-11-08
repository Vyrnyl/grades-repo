"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLoginActivity = exports.getLoginActivity = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getLoginActivity = async () => {
    try {
        const classes = await prisma.loginActivity.findMany();
        return classes;
    }
    catch (error) {
        console.log(`Get activity error: ${error}`);
        return null;
    }
};
exports.getLoginActivity = getLoginActivity;
const addLoginActivity = async (data) => {
    try {
        const addedActivity = await prisma.loginActivity.create({
            data
        });
        return addedActivity;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addLoginActivity = addLoginActivity;
