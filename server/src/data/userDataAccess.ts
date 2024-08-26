import { PrismaClient } from "@prisma/client";
import { NewUserData, StoreRefreshTokenResponse, UserUpdatePayload } from "../types/types";

const prisma = new PrismaClient();

//Create and assign user to it's program curriculum
const createUser = async (value: NewUserData): Promise<NewUserData | { error: string }> => {
    try {
        const newUserTransaction = await prisma.$transaction(async () => {

            const newUser = await prisma.user.create({
                data: value
            });
    
            if(newUser.programId === 1 && newUser.role === 'student') {
                const bsa = await prisma.bsaCurriculum.findMany();
                const studentCourses = bsa.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
    
                await prisma.bsaStudentRecord.createMany({
                    data: studentCourses
                });
            } else if(newUser.programId === 2 && newUser.role === 'student') {
                const bsba = await prisma.bsbaCurriculum.findMany();
                const studentCourses = bsba.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
    
                await prisma.bsbaStudentRecord.createMany({
                    data: studentCourses
                });
            } else if(newUser.programId === 3 && newUser.role === 'student') {
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
    } catch(error) {
        console.log(`Database error: ${error}`);
        return { error: 'An error occurred while processing your request' };
    }
}


const getUserData = async (userId: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return user;
    } catch(error) {
        console.log(`Retrieve error ${error}`);
        return undefined;
    }
}

const updateUserData = async (userId: number, value: UserUpdatePayload) => {
    try {
        const userUpdateDetails = await prisma.user.update({
            where:{
                id: userId
            },
            data: value
        });
        return userUpdateDetails;
    } catch(error) {
        console.log(`Update error ${error}`);
        return undefined;
    }
}


export { createUser, getUserData, updateUserData };