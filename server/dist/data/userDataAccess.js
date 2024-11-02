"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserData = exports.updateUserData = exports.getUserData = exports.getUsersData = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//Create and assign user to it's program curriculum
const createUser = async (value) => {
    try {
        const newUserTransaction = await prisma.$transaction(async () => {
            const newUser = await prisma.user.create({
                data: value
            });
            if (newUser.programId === 1 && newUser.role === 'student') {
                const bsa = await prisma.bsaCurriculum.findMany();
                const studentCourses = bsa.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
                await prisma.bsaStudentRecord.createMany({
                    data: studentCourses
                });
            }
            else if (newUser.programId === 2 && newUser.role === 'student') {
                const bsba = await prisma.bsbaCurriculum.findMany();
                const studentCourses = bsba.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
                await prisma.bsbaStudentRecord.createMany({
                    data: studentCourses
                });
            }
            else if (newUser.programId === 3 && newUser.role === 'student') {
                const bsma = await prisma.bsbaCurriculum.findMany();
                const studentCourses = bsma.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
                await prisma.bsmaStudentRecord.createMany({
                    data: studentCourses
                });
            }
            return newUser;
        });
        return newUserTransaction;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return { error: 'An error occurred while processing your request' };
    }
};
exports.createUser = createUser;
const getUsersData = async () => {
    try {
        const users = await prisma.user.findMany({
            include: {
                program: true
            }
        });
        return users;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
};
exports.getUsersData = getUsersData;
const getUserData = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                program: true
            }
        });
        return user;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
};
exports.getUserData = getUserData;
const updateUserData = async (userId, value) => {
    try {
        const userUpdateDetails = await prisma.user.update({
            where: {
                id: userId
            },
            data: value
        });
        await prisma.$transaction(async () => {
            if (value.programId === 1) {
                const bsa = await prisma.bsaCurriculum.findMany();
                const studentCourses = bsa.map(course => {
                    return { userId: value.id, courseId: course.id };
                });
                await prisma.bsaStudentRecord.createMany({
                    data: studentCourses
                });
            }
            else if (value.programId === 2) {
                const bsba = await prisma.bsbaCurriculum.findMany();
                const studentCourses = bsba.map(course => {
                    return { userId: value.id, courseId: course.id };
                });
                await prisma.bsbaStudentRecord.createMany({
                    data: studentCourses
                });
            }
            else if (value.programId === 3) {
                const bsma = await prisma.bsbaCurriculum.findMany();
                const studentCourses = bsma.map(course => {
                    return { userId: value.id, courseId: course.id };
                });
                await prisma.bsmaStudentRecord.createMany({
                    data: studentCourses
                });
            }
        });
        return userUpdateDetails;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return undefined;
    }
};
exports.updateUserData = updateUserData;
const deleteUserData = async (userId) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        });
        return deletedUser;
    }
    catch (error) {
        console.log(`Delete error: ${error}`);
        return undefined;
    }
};
exports.deleteUserData = deleteUserData;
