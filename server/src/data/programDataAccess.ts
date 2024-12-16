import { PrismaClient } from "@prisma/client";
import { AddedCourseType } from "../types/types";

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
        // const courses = await prisma.bsitCurriculum.findMany();

        const courses = await prisma.$queryRaw`
           SELECT *
            FROM (
                SELECT * FROM bsitCurriculum
                UNION
                SELECT * FROM bscsCurriculum
                UNION
                SELECT * FROM bsisCurriculum
                UNION
                SELECT * FROM blisCurriculum
                UNION
                SELECT * FROM bsemcCurriculum
            ) AS combined
            GROUP BY courseCode
            ORDER BY courseCode ASC
        `;
        
        // if(Array.isArray(courses)) console.log(courses.length);

        return courses;
    } catch(error) {
        console.log(`Get courses error: ${error}`);
        return null;
    }
}



//ADDED COURSES

const addAddedCourse = async (data: AddedCourseType) => {
    try {
        const addedCourse = await prisma.addedCourse.create({ data });
        return addedCourse;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}

const getAddedCourses = async () => {
    try {
        const courses = await prisma.addedCourse.findMany();
        return courses;
    } catch(error) {
        console.log(`Get Course error: ${error}`);
        return null;
    }
}

const updateAddedCourse = async (body: any) => {
    try {
        const updated = await prisma.addedCourse.updateMany({
            where: { id: body.id },
            data: body
        });
        return updated
    } catch(error) {
        console.log(`Update error: ${error}`);
        return null;
    }
}

const deleteAddedCourse = async (id: number) => {
    try {
        const deleted = await prisma.addedCourse.delete({
            where: { id }
        });
        return deleted;
    } catch(error) {
        console.log(`Deletion error: ${error}`);
        return null;
    }
}

export { 
    getProgramList, 
    getCoursesList, 
    addAddedCourse, 
    getAddedCourses, 
    updateAddedCourse,
    deleteAddedCourse
}