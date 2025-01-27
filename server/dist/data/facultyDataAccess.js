"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgramYear = exports.getProgramYears = exports.getProgramYear = exports.addProgramYear = exports.updateSpecialization = exports.getSpecialization = exports.addSpecialization = exports.updateHandledCourse = exports.getHandledCourses = exports.getHandledCourse = exports.addHandledCourse = void 0;
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
const getHandledCourses = async () => {
    try {
        const result = await prisma.handledCourse.findMany();
        return result;
    }
    catch (error) {
        console.log(`Get error: ${error}`);
        return null;
    }
};
exports.getHandledCourses = getHandledCourses;
const updateHandledCourse = async (data, userId) => {
    try {
        const deleted = await prisma.handledCourse.deleteMany({ where: { userId } });
        // if(!deleted) return null;
        if (data.length === 0) {
            return true;
        }
        const result = await prisma.handledCourse.createMany({ data });
        return result;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return null;
    }
};
exports.updateHandledCourse = updateHandledCourse;
//PROGRAMS
const addSpecialization = async (data) => {
    try {
        const result = await prisma.specialization.createMany({ data });
        if (data.length === 0) {
            return true;
        }
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
const updateSpecialization = async (data, userId) => {
    try {
        await prisma.specialization.deleteMany({ where: { userId } });
        // if(!deleted) return null;
        // console.log(deleted)
        const result = await prisma.specialization.createMany({ data });
        return result;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return null;
    }
};
exports.updateSpecialization = updateSpecialization;
//PROGRAM YEAR
const addProgramYear = async (data) => {
    try {
        const result = await prisma.assignedProgramYearBlock.createMany({ data });
        if (data.length === 0) {
            return true;
        }
        return result;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addProgramYear = addProgramYear;
const getProgramYears = async () => {
    try {
        const result = await prisma.assignedProgramYearBlock.findMany();
        return result;
    }
    catch (error) {
        console.log(`Get error: ${error}`);
        return null;
    }
};
exports.getProgramYears = getProgramYears;
const getProgramYear = async (userId) => {
    try {
        const result = await prisma.assignedProgramYearBlock.findMany({
            where: { userId }
        });
        return result;
    }
    catch (error) {
        console.log(`Get error: ${error}`);
        return null;
    }
};
exports.getProgramYear = getProgramYear;
const updateProgramYear = async (data, userId) => {
    try {
        await prisma.assignedProgramYearBlock.deleteMany({ where: { userId } });
        const result = await prisma.assignedProgramYearBlock.createMany({ data });
        return result;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return null;
    }
};
exports.updateProgramYear = updateProgramYear;
