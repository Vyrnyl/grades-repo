"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultyRecentActivity = exports.getAdminRecentActivity = exports.addFacultyActivity = exports.addAdminRecentActivity = exports.getLoginUser = exports.updateActivity = exports.addLoginActivity = exports.getLoginActivity = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//LOGIN ACTIVITY
const getLoginActivity = async () => {
    try {
        const activities = await prisma.loginActivity.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return activities;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return null;
    }
};
exports.getLoginActivity = getLoginActivity;
const addLoginActivity = async (email, status) => {
    try {
        const userData = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (userData && userData.role !== 'admin') {
            const addedActivity = await prisma.loginActivity.create({
                data: {
                    studentId: userData.studentId || '',
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    role: userData.role,
                    status
                }
            });
            if (addedActivity.createdAt) {
                const utcDate = new Date(addedActivity.createdAt);
                const philippineDate = new Date(utcDate.setHours(utcDate.getHours() + 8));
                const philippineISOString = philippineDate.toISOString();
                await prisma.loginActivity.update({
                    where: { id: addedActivity.id },
                    data: {
                        createdAt: philippineISOString
                    }
                });
            }
            return addedActivity;
        }
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addLoginActivity = addLoginActivity;
const updateActivity = async (email) => {
    try {
        const user = await prisma.loginActivity.findFirst({
            where: { email }
        });
        if (user) {
            await prisma.loginActivity.update({
                where: { id: user.id },
                data: {}
            });
        }
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return null;
    }
};
exports.updateActivity = updateActivity;
const getLoginUser = async (email) => {
    try {
        const user = await prisma.loginActivity.findFirst({
            where: { email },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return user;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return null;
    }
};
exports.getLoginUser = getLoginUser;
//RECENT ACTIVITY
const addAdminRecentActivity = async (content) => {
    try {
        const admin = await prisma.user.findUnique({ where: { email: 'admin@gmail.com' } });
        if (!admin) {
            return null;
        }
        const addActivity = await prisma.recentActivity.create({
            data: {
                userId: admin.id,
                content
            }
        });
        return addActivity;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addAdminRecentActivity = addAdminRecentActivity;
const getAdminRecentActivity = async () => {
    try {
        const admin = await prisma.user.findUnique({ where: { email: 'admin@gmail.com' } });
        if (!admin)
            return null;
        const activities = await prisma.recentActivity.findMany({
            where: { userId: admin.id },
            orderBy: { id: 'desc' }
        });
        return activities;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return null;
    }
};
exports.getAdminRecentActivity = getAdminRecentActivity;
const addFacultyActivity = async (facultyId, content) => {
    try {
        const addActivity = await prisma.recentActivity.create({
            data: {
                userId: facultyId,
                content
            }
        });
        return addActivity;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addFacultyActivity = addFacultyActivity;
const getFacultyRecentActivity = async (facultyId) => {
    try {
        const activities = await prisma.recentActivity.findMany({
            where: { userId: facultyId },
            orderBy: { id: 'desc' }
        });
        return activities;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return null;
    }
};
exports.getFacultyRecentActivity = getFacultyRecentActivity;
