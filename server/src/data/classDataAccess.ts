import { PrismaClient } from "@prisma/client";
import { ClassPayload } from "../types/types";

const prisma = new PrismaClient();


const getClassesSched = async (userId: number) => {
    try {
        const classes = await prisma.class.findMany({
            where: {
                userId
            }
        });
        return classes;
    } catch(error) {
        console.log(`Get class error: ${error}`);
        return null;
    }
}

const addClassSched = async (userId: number, classData: ClassPayload) => {

    try {
        const classRes = await prisma.class.create({
            data: {
                userId,
                ...classData
            }
        });
        return classRes;
    } catch(error) {
        console.log(`Add class error: ${error}`);
        return null;
    }
}

export { getClassesSched, addClassSched };