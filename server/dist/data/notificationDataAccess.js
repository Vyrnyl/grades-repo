"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNotificationData = exports.getNotificationData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNotificationData = async (userId) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId }
        });
        return notifications;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.getNotificationData = getNotificationData;
const addNotificationData = async (studentId, facultyId) => {
    try {
        const faculty = await prisma.user.findUnique({
            where: { id: facultyId }
        });
        if (faculty) {
            const addedNotif = await prisma.notification.create({
                data: {
                    userId: studentId,
                    content: `New grade from ${faculty.firstName} ${faculty.lastName}`
                }
            });
            return addedNotif;
        }
        return faculty;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addNotificationData = addNotificationData;
