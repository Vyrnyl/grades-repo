import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProgramList = async () => {
    try {
        const program = await prisma.program.findMany();
        return program;
    } catch(error) {
        console.log(`Get class error: ${error}`);
        return null;
    }
}

const getCoursesList = async () => {
    try {
        const courses = await prisma.bsaCurriculum.findMany();
        return courses;
    } catch(error) {
        console.log(`Get courses error: ${error}`);
        return null;
    }
}

export { getProgramList, getCoursesList }