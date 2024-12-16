"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddedCourse = exports.updateAddedCourse = exports.getAddedCourses = exports.addAddedCourse = exports.getCoursesList = exports.getProgramList = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProgramList = async () => {
    try {
        const program = await prisma.program.findMany();
        return program;
    }
    catch (error) {
        console.log(`Get class error: ${error}`);
        return null;
    }
};
exports.getProgramList = getProgramList;
const getCoursesList = async () => {
    try {
        // const courses = await prisma.bsitCurriculum.findMany();
        const courses = await prisma.$queryRaw `
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
    }
    catch (error) {
        console.log(`Get courses error: ${error}`);
        return null;
    }
};
exports.getCoursesList = getCoursesList;
//ADDED COURSES
const addAddedCourse = async (data) => {
    try {
        const addedCourse = await prisma.addedCourse.create({ data });
        return addedCourse;
    }
    catch (error) {
        console.log(`Add error: ${error}`);
        return null;
    }
};
exports.addAddedCourse = addAddedCourse;
const getAddedCourses = async () => {
    try {
        const courses = await prisma.addedCourse.findMany();
        return courses;
    }
    catch (error) {
        console.log(`Get Course error: ${error}`);
        return null;
    }
};
exports.getAddedCourses = getAddedCourses;
const updateAddedCourse = async (body) => {
    try {
        const updated = await prisma.addedCourse.updateMany({
            where: { id: body.id },
            data: body
        });
        return updated;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return null;
    }
};
exports.updateAddedCourse = updateAddedCourse;
const deleteAddedCourse = async (id) => {
    try {
        const deleted = await prisma.addedCourse.delete({
            where: { id }
        });
        return deleted;
    }
    catch (error) {
        console.log(`Deletion error: ${error}`);
        return null;
    }
};
exports.deleteAddedCourse = deleteAddedCourse;
