import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getLoginActivity = async () => {
    try {
        const activities = await prisma.loginActivity.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return activities;
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return null;
    }
}

const addLoginActivity = async (email: string, status: string) => {
    try {
        const userData = await prisma.user.findUnique({
            where: {
                email
            }
        });
        
        if(userData) {

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
            
            if(addedActivity.createdAt) {

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
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}

const updateActivity = async (email: string) => {
    try {

        const user = await prisma.loginActivity.findFirst({
            where: { email }
        });

        if(user) {
            await prisma.loginActivity.update({
                where: { id: user.id },
                data: {
                    
                }
            });
        }
       
    } catch(error) {
        console.log(`Update error: ${error}`);
        return null;
    }
}


const getLoginUser = async (email: string) => {
    try {

        const user = await prisma.loginActivity.findFirst({
            where: { email },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return user;
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return null;
    }
}

export { getLoginActivity, addLoginActivity, updateActivity, getLoginUser }