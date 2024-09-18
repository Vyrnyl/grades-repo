"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClassSched = exports.updateClassSched = exports.addClassSched = exports.getClassesSched = void 0;
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
        const addedClass = await prisma.class.create({
            data: {
                userId,
                ...classData
            }
        });
        return addedClass;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addClassSched = addClassSched;
const updateClassSched = async (userId, classData) => {
    try {
        const updatedClass = await prisma.class.updateMany({
            where: { id: classData.id, userId },
            data: classData
        });
        return updatedClass;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return null;
    }
};
exports.updateClassSched = updateClassSched;
const deleteClassSched = async (userId, classId) => {
    try {
        const deletedClass = await prisma.class.delete({
            where: { id: classId, userId }
        });
        return deletedClass;
    }
    catch (error) {
        console.log(`Deletion error: ${error}`);
        return null;
    }
};
exports.deleteClassSched = deleteClassSched;
