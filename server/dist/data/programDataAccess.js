"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentAssignedCourse = exports.getStudentAssignedCourse = exports.assignStudentCourse = exports.assignNewUserCourse = exports.deleteAddedCourse = exports.updateAddedCourse = exports.getAddedCourses = exports.addAddedCourse = exports.getCoursesList = exports.getProgramList = void 0;
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
        // const courses = await prisma.$queryRaw`
        //     SELECT id, courseCode, courseTitle, units
        //     FROM (
        //         SELECT id, courseCode, courseTitle, units FROM bsitCurriculum
        //         UNION
        //         SELECT id, courseCode, courseTitle, units FROM bscsCurriculum
        //         UNION
        //         SELECT id, courseCode, courseTitle, units FROM bsisCurriculum
        //         UNION
        //         SELECT id, courseCode, courseTitle, units FROM blisCurriculum
        //         UNION
        //         SELECT id, courseCode, courseTitle, units FROM bsemcCurriculum
        //         UNION
        //         SELECT id, courseCode, courseTitle, units FROM addedCourse
        //     ) AS combined
        //     GROUP BY courseCode
        //     ORDER BY courseCode ASC;
        //   `;
        const courses = await prisma.$queryRaw `
      SELECT 
          MIN(id) AS id,
          courseCode,
          MAX(courseTitle) AS courseTitle,
          MAX(units) AS units
      FROM (
          SELECT id, courseCode, courseTitle, units FROM bsitCurriculum
          UNION
          SELECT id, courseCode, courseTitle, units FROM bscsCurriculum
          UNION
          SELECT id, courseCode, courseTitle, units FROM bsisCurriculum
          UNION
          SELECT id, courseCode, courseTitle, units FROM blisCurriculum
          UNION
          SELECT id, courseCode, courseTitle, units FROM bsemcCurriculum
          UNION
          SELECT id, courseCode, courseTitle, units FROM addedCourse
      ) AS combined
      GROUP BY courseCode
      ORDER BY courseCode ASC;
    `;
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
        const users = await prisma.user.findMany({
            where: {
                programId: addedCourse.programId,
                role: "student",
            },
        });
        if (addedCourse) {
            let record = users.map((u) => ({
                userId: u.id,
                courseId: addedCourse.id,
            }));
            await prisma.addedCourseRecord.createMany({
                data: record,
            });
        }
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
        const prev = await prisma.addedCourse.findUnique({ where: { id: body.id } });
        const updated = await prisma.addedCourse.update({
            where: { id: body.id },
            data: body,
        });
        const users = await prisma.user.findMany({
            where: {
                programId: updated.programId,
                role: "student",
            },
        });
        if (prev?.programId !== updated.programId) {
            await prisma.addedCourseRecord.deleteMany({ where: { courseId: updated.id } });
            let record = users.map((u) => ({
                userId: u.id,
                courseId: updated.id,
            }));
            await prisma.addedCourseRecord.createMany({
                data: record,
            });
        }
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
            where: { id },
        });
        return deleted;
    }
    catch (error) {
        console.log(`Deletion error: ${error}`);
        return null;
    }
};
exports.deleteAddedCourse = deleteAddedCourse;
//ASSIGN NEW USER
const assignNewUserCourse = async (userId, programId) => {
    try {
        const courses = await prisma.addedCourse.findMany({
            where: { programId }
        });
        const courseIds = courses.map(course => course.id);
        const record = await prisma.addedCourseRecord.findMany({ where: { userId, courseId: { in: courseIds } } });
        if (record.length === 0) {
            await prisma.addedCourseRecord.createMany({
                data: courseIds.map(courseId => ({
                    userId,
                    courseId
                }))
            });
        }
        ;
        return record;
    }
    catch (error) {
        console.log(`Assign Course error: ${error}`);
        return null;
    }
};
exports.assignNewUserCourse = assignNewUserCourse;
//ASSIGN STUDENT COURSE
const assignStudentCourse = async (assignedCourses) => {
    try {
        const assign = await prisma.assignedCourse.createMany({
            data: assignedCourses
        });
        if (!assign)
            return null;
        return assign;
    }
    catch (error) {
        console.log(`Assign Course error: ${error}`);
        return null;
    }
};
exports.assignStudentCourse = assignStudentCourse;
const getStudentAssignedCourse = async (userId) => {
    try {
        const assignedCourses = await prisma.assignedCourse.findMany({ where: { userId } });
        return assignedCourses;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return null;
    }
};
exports.getStudentAssignedCourse = getStudentAssignedCourse;
const updateStudentAssignedCourse = async (userId, assignedCourses) => {
    try {
        // if(assignedCourses.length === 0) return null;
        await prisma.assignedCourse.deleteMany({ where: { userId } });
        const assign = await prisma.assignedCourse.createMany({
            data: assignedCourses
        });
        return assign;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return null;
    }
};
exports.updateStudentAssignedCourse = updateStudentAssignedCourse;
