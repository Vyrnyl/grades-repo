import { PrismaClient } from "@prisma/client";
import { NewUserData, StoreRefreshTokenResponse, UserUpdatePayload } from "../types/types";
import { assignNewUserCourse } from "./programDataAccess";

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
                
            } else if(newUser.programId === 2 && newUser.role === 'student') {
                const bscs = await prisma.bscsCurriculum.findMany();
                const studentCourses = bscs.map(course => {
                    return { userId: newUser.id, courseId: course.id };
                });
    
                const x = await prisma.bscsStudentRecord.createMany({
                    data: studentCourses
                });
                
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

const getUserDataByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
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
        
        
        await prisma.$transaction(async () => {
    
            if(value.programId === 1) {

                const existingRecords = await prisma.bsitStudentRecord.findMany({
                    where: {
                        userId: userId
                    }
                });

                if(existingRecords.length === 0) {
                    const bsitCourses = await prisma.bsitCurriculum.findMany();
                    const studentCourses = bsitCourses.map(course => {
                        return { userId: value.id, courseId: course.id };
                    });
                    
                    await prisma.bsitStudentRecord.createMany({
                        data: studentCourses
                    });
                }

                //ADDED COURSE
                await assignNewUserCourse(userId, value.programId);

            } else if(value.programId === 2) {
                const existingRecords = await prisma.bscsStudentRecord.findMany({
                    where: {
                        userId: userId
                    }
                });

                if(existingRecords.length === 0) {
                    const bscsCourses = await prisma.bscsCurriculum.findMany();
                    const studentCourses = bscsCourses.map(course => {
                        return { userId: value.id, courseId: course.id };
                    });
                    
                    await prisma.bscsStudentRecord.createMany({
                        data: studentCourses
                    });
                }

                //ADDED COURSE
                await assignNewUserCourse(userId, value.programId);
            } else if(value.programId === 3) {
                const existingRecords = await prisma.bsisStudentRecord.findMany({
                    where: {
                        userId: userId
                    }
                });

                if(existingRecords.length === 0) {
                    const bsisCourses = await prisma.bsisCurriculum.findMany();
                    const studentCourses = bsisCourses.map(course => {
                        return { userId: value.id, courseId: course.id };
                    });
                    
                    await prisma.bsisStudentRecord.createMany({
                        data: studentCourses
                    });
                }

                //ADDED COURSE
                await assignNewUserCourse(userId, value.programId);
            } else if(value.programId === 4) {
                const existingRecords = await prisma.blisStudentRecord.findMany({
                    where: {
                        userId: userId
                    }
                });

                if(existingRecords.length === 0) {
                    const blisCourses = await prisma.blisCurriculum.findMany();
                    const studentCourses = blisCourses.map(course => {
                        return { userId: value.id, courseId: course.id };
                    });
                    
                    await prisma.blisStudentRecord.createMany({
                        data: studentCourses
                    });
                }

                //ADDED COURSE
                await assignNewUserCourse(userId, value.programId);
            } else if(value.programId === 5) {
                const existingRecords = await prisma.bsemcStudentRecord.findMany({
                    where: {
                        userId: userId
                    }
                });

                if(existingRecords.length === 0) {
                    const bsemcCourses = await prisma.bsemcCurriculum.findMany();
                    const studentCourses = bsemcCourses.map(course => {
                        return { userId: value.id, courseId: course.id };
                    });
                    
                    await prisma.bsemcStudentRecord.createMany({
                        data: studentCourses
                    });
                }

                //ADDED COURSE
                await assignNewUserCourse(userId, value.programId);
            }
        });

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

//Check UserID Exist
const checkUserId = async (studentId: string) => {


    try {
        const userIdExist = await prisma.user.findFirst({ where: { studentId }});

        if(!userIdExist) {
            return userIdExist;
        }
        return { message: 'User ID alredy exist!' };
    } catch(error) {
        console.log(`Error: ${error}`);
        return undefined;
    }
}

export { 
    createUser, 
    getUsersData, 
    getUserData, 
    updateUserData, 
    deleteUserData, 
    checkUserId,
    getUserDataByEmail
};