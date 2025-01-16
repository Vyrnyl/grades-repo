import { PrismaClient } from "@prisma/client";
import { AddedCourseType } from "../types/types";

const prisma = new PrismaClient();

const getProgramList = async () => {
  try {
    const program = await prisma.program.findMany();
    return program;
  } catch (error) {
    console.log(`Get class error: ${error}`);
    return null;
  }
};

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

    const courses = await prisma.$queryRaw`
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
  } catch (error) {
    console.log(`Get courses error: ${error}`);
    return null;
  }
};

//ADDED COURSES

const addAddedCourse = async (data: AddedCourseType) => {
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
  } catch (error) {
    console.log(`Add error: ${error}`);
    return null;
  }
};

const getAddedCourses = async () => {
  try {
    const courses = await prisma.addedCourse.findMany();
    return courses;
  } catch (error) {
    console.log(`Get Course error: ${error}`);
    return null;
  }
};

const updateAddedCourse = async (body: any) => {
  try {

    const prev = await prisma.addedCourse.findUnique({ where: { id: body.id }});

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
  } catch (error) {
    console.log(`Update error: ${error}`);
    return null;
  }
};

const deleteAddedCourse = async (id: number) => {
  try {
    const deleted = await prisma.addedCourse.delete({
      where: { id },
    });
    return deleted;
  } catch (error) {
    console.log(`Deletion error: ${error}`);
    return null;
  }
};


//ASSIGN NEW USER
const assignNewUserCourse = async (userId: number, programId: number) => {
  try {
    const courses = await prisma.addedCourse.findMany({
      where: { programId }
    });

    const courseIds = courses.map(course => course.id);

    const record = await prisma.addedCourseRecord.findMany({ where: { userId, courseId: { in: courseIds } } });
    
    if(record.length === 0) {
      await prisma.addedCourseRecord.createMany({
        data: courseIds.map(courseId => ({
          userId,
          courseId
        }))
      });
    };

    return record;
  } catch (error) {
    console.log(`Assign Course error: ${error}`);
    return null;
  }
}


export {
  getProgramList,
  getCoursesList,
  addAddedCourse,
  getAddedCourses,
  updateAddedCourse,
  deleteAddedCourse,

  assignNewUserCourse
};
