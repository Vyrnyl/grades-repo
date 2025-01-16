import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getNotificationData = async (userId: number) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId }
        });
        
        return notifications;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}

const addNotificationData = async (studentId: number, facultyId: number) => {
    try {

        const faculty = await prisma.user.findUnique({
            where: { id: facultyId }
        });

        if(faculty) {
            const addedNotif = await prisma.notification.create({
                data: {
                    userId: studentId,
                    content: `New grade from ${faculty.firstName} ${faculty.lastName}`
                }
            });
            return addedNotif;
        }

        return faculty;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}

export { getNotificationData, addNotificationData };