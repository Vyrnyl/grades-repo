import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//COURSES
const addHandledCourse = async (data: { courseCode: string, userId: number }[]) => {
    try {
        const result = await prisma.handledCourse.createMany({ data });
        return result;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}

const getHandledCourse = async (userId: number) => {
    try {
        const result = await prisma.handledCourse.findMany({
            where: { userId }
        });
        return result;
    } catch(error) {
        console.log(`Get error: ${error}`);
        return null;
    }
}

const updateHandledCourse = async (data: { courseCode: string, userId: number }[]) => {
    try {

        const deleted = await prisma.handledCourse.deleteMany({ where: { userId: data[0].userId }});

        if(!deleted) return null;
        console.log(deleted);
        const result = await prisma.handledCourse.createMany({ data });
        
        return result;
    } catch(error) {
        console.log(`Update error: ${error}`);
        return null;
    }
}




//PROGRAMS
const addSpecialization = async (data: { programCode: string, userId: number }[]) => {
    try {
        const result = await prisma.specialization.createMany({ data });
        
        return result;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}

const getSpecialization = async (userId: number) => {
    try {
        const result = await prisma.specialization.findMany({
            where: { userId }
        });
        return result;
    } catch(error) {
        console.log(`Get error: ${error}`);
        return null;
    }
}

const updateSpecialization = async (data: { programCode: string, userId: number }[]) => {
    try {

        const deleted = await prisma.specialization.deleteMany({ where: { userId: data[0].userId }});

        if(!deleted) return null;
        console.log(deleted)
        const result = await prisma.specialization.createMany({ data });
        
        return result;
    } catch(error) {
        console.log(`Update error: ${error}`);
        return null;
    }
}


export { 
    addHandledCourse, 
    getHandledCourse,
    updateHandledCourse,
    
    addSpecialization, 
    getSpecialization,
    updateSpecialization
}