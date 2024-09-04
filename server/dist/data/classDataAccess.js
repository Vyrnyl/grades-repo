"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClassSched = exports.getClassesSched = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getClassesSched = async (userId) => {
    try {
        const classes = await prisma.class.findMany({
            where: {
                userId
            }
        });
        return classes;
    }
    catch (error) {
        console.log(`Get class error: ${error}`);
        return null;
    }
};
exports.getClassesSched = getClassesSched;
const addClassSched = async (userId, classData) => {
    try {
        const classRes = await prisma.class.create({
            data: {
                userId,
                ...classData
            }
        });
        return classRes;
    }
    catch (error) {
        console.log(`Add class error: ${error}`);
        return null;
    }
};
exports.addClassSched = addClassSched;
