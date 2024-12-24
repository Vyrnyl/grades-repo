"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecialization = exports.addSpecialization = exports.getHandledCourse = exports.addHandledCourse = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//COURSES
const addHandledCourse = async (data) => {
    try {
        const result = await prisma.handledCourse.createMany({ data });
        return result;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addHandledCourse = addHandledCourse;
const getHandledCourse = async (userId) => {
    try {
        const result = await prisma.handledCourse.findMany({
            where: { userId }
        });
        return result;
    }
    catch (error) {
        console.log(`Get error: ${error}`);
        return null;
    }
};
exports.getHandledCourse = getHandledCourse;
//PROGRAMS
const addSpecialization = async (data) => {
    try {
        const result = await prisma.specialization.createMany({ data });
        return result;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addSpecialization = addSpecialization;
const getSpecialization = async (userId) => {
    try {
        const result = await prisma.specialization.findMany({
            where: { userId }
        });
        return result;
    }
    catch (error) {
        console.log(`Get error: ${error}`);
        return null;
    }
};
exports.getSpecialization = getSpecialization;
