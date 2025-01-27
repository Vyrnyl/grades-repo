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

const getHandledCourses = async () => {
    try {
        const result = await prisma.handledCourse.findMany();
        return result;
    } catch(error) {
        console.log(`Get error: ${error}`);
        return null;
    }
}

const updateHandledCourse = async (data: { courseCode: string, userId: number }[], userId: number) => {
    try {

        const deleted = await prisma.handledCourse.deleteMany({ where: { userId }});

        // if(!deleted) return null;
        
        if(data.length === 0) {
            return true;
        }
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
        
        if(data.length === 0) {
            return true;
        }

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

const updateSpecialization = async (data: { programCode: string, userId: number }[], userId: number) => {
    try {

        await prisma.specialization.deleteMany({ where: { userId }});

        // if(!deleted) return null;
        // console.log(deleted)
        const result = await prisma.specialization.createMany({ data });
        
        return result;
    } catch(error) {
        console.log(`Update error: ${error}`);
        return null;
    }
}


//PROGRAM YEAR
const addProgramYear = async (data: { programYearBlock: string, userId: number }[]) => {
    try {

        const result = await prisma.assignedProgramYearBlock.createMany({ data });
        
        if(data.length === 0) {
            return true;
        }

        return result;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}

const getProgramYears = async () => {
    try {
        const result = await prisma.assignedProgramYearBlock.findMany();
        return result;
    } catch(error) {
        console.log(`Get error: ${error}`);
        return null;
    }
};

const getProgramYear = async (userId: number) => {
    try {
        const result = await prisma.assignedProgramYearBlock.findMany({
            where: { userId }
        });
        return result;
    } catch(error) {
        console.log(`Get error: ${error}`);
        return null;
    }
}

const updateProgramYear = async (data: { programYearBlock: string, userId: number }[], userId: number) => {
    try {

        await prisma.assignedProgramYearBlock.deleteMany({ where: { userId }});

        const result = await prisma.assignedProgramYearBlock.createMany({ data });
        
        return result;
    } catch(error) {
        console.log(`Update error: ${error}`);
        return null;
    }
}


export { 
    addHandledCourse, 
    getHandledCourse,
    getHandledCourses,
    updateHandledCourse,
    
    addSpecialization, 
    getSpecialization,
    updateSpecialization,

    addProgramYear,
    getProgramYear,
    getProgramYears,
    updateProgramYear
}