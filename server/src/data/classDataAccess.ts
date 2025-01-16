import { PrismaClient } from "@prisma/client";
import { ClassPayload, ClassUpdatePayload } from "../types/types";

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
        const addedClass = await prisma.class.create({
            data: {
                userId,
                ...classData
            }
        });
        return addedClass;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}

const updateClassSched = async (userId: number, classData: ClassUpdatePayload) =>{
    try {
        const updatedClass = await prisma.class.updateMany({
            where: { id: classData.id, userId },
            data: classData
        });
        return updatedClass;
    } catch(error) {
        console.log(`Update error: ${error}`);
        return null;
    }
}

const deleteClassSched = async (userId: number, classId: number) => {
    try {
        const deletedClass = await prisma.class.delete({
            where: { id: classId, userId }
        });
        return deletedClass;
    } catch(error) {
        console.log(`Deletion error: ${error}`);
        return null;
    }
}

export { getClassesSched, addClassSched, updateClassSched, deleteClassSched };
