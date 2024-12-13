"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesList = exports.getProgramList = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProgramList = async () => {
    try {
        const program = await prisma.program.findMany();
        return program;
    }
    catch (error) {
        console.log(`Get class error: ${error}`);
        return null;
    }
};
exports.getProgramList = getProgramList;
const getCoursesList = async () => {
    try {
        const courses = await prisma.bsaCurriculum.findMany();
        return courses;
    }
    catch (error) {
        console.log(`Get courses error: ${error}`);
        return null;
    }
};
exports.getCoursesList = getCoursesList;
