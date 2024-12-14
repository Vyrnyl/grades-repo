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
                const bsit = await prisma.bsitCurriculum.findMany();
                const studentCourses = bsit.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
                
                const x = await prisma.bsitStudentRecord.createMany({
                    data: studentCourses
                });
                console.log(x)
            } else if(newUser.programId === 2 && newUser.role === 'student') {
                const bscs = await prisma.bscsCurriculum.findMany();
                const studentCourses = bscs.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
    
                const x = await prisma.bscsStudentRecord.createMany({
                    data: studentCourses
                });
                console.log(x)
            } else if(newUser.programId === 3 && newUser.role === 'student') {
                const bsis = await prisma.bsisCurriculum.findMany();
                const studentCourses = bsis.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
    
                await prisma.bsisStudentRecord.createMany({
                    data: studentCourses
                });
            } else if(newUser.programId === 4 && newUser.role === 'student') {
                const blis = await prisma.blisCurriculum.findMany();
                const studentCourses = blis.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
    
                await prisma.blisStudentRecord.createMany({
                    data: studentCourses
                });
            } else if(newUser.programId === 5 && newUser.role === 'student') {
                const bsemc = await prisma.bsemcCurriculum.findMany();
                const studentCourses = bsemc.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
    
                await prisma.bsemcStudentRecord.createMany({
                    data: studentCourses
                });
            }
    
            return newUser;
        });
        return newUserTransaction;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return { error: 'An error occurred while processing your request' };
    }
}

const getUsersData = async () => {
    try {
        const users = await prisma.user.findMany({
            include: {
                program: true
            }
        });
        return users;
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
}

const getUserData = async (userId: number) => {
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
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
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
        
        
        // await prisma.$transaction(async () => {
    
        //     if(value.programId === 1) {
        //         const bsa = await prisma.bsaCurriculum.findMany();
        //         const studentCourses = bsa.map(course => {
        //             return { userId: value.id, courseId: course.id };
        //         });
                
        //         await prisma.bsaStudentRecord.createMany({
        //             data: studentCourses
        //         });
        //     } else if(value.programId === 2) {
        //         const bsba = await prisma.bsbaCurriculum.findMany();
        //         const studentCourses = bsba.map(course => {
        //             return { userId: value.id, courseId: course.id };
        //         });
    
        //         await prisma.bsbaStudentRecord.createMany({
        //             data: studentCourses
        //         });
        //     } else if(value.programId === 3) {
        //         const bsma = await prisma.bsbaCurriculum.findMany();
        //         const studentCourses = bsma.map(course => {
        //             return { userId: value.id, courseId: course.id };
        //         });
    
        //         await prisma.bsmaStudentRecord.createMany({
        //             data: studentCourses
        //         });
        //     }
        // });

        return userUpdateDetails;
    } catch(error) {
        console.log(`Update error: ${error}`);
        return undefined;
    }

}

const deleteUserData = async (userId: number) => {

    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        });
        return deletedUser;
    } catch(error) {
        console.log(`Delete error: ${error}`);
        return undefined;
    }

}

export { createUser, getUsersData, getUserData, updateUserData, deleteUserData };