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

    const addedCourse = await prisma.addedCourse.create({
      data: {
        courseCode: data.courseCode,
        courseTitle: data.courseTitle,
        units: data.units,
        yearLevel: data.yearLevel,
        semester: data.semester
      }
    });

    if(!addedCourse) {
      return null;
    }

    let progIdArr = data.programIds.map(item => {
      return { courseId: addedCourse.id, programId: item }
    });
    await prisma.programIds.createMany({ data: progIdArr });

    let students: any[] = [];

    for(const item of data.programIds) {
      let users = await prisma.user.findMany({
        where: {
          programId: item,
          role: 'student'
        }
      });

      students = [...students, ...users];
    }
    
    if (addedCourse) {
      let record = students.map((student) => ({
        userId: student.id,
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
    const courses = await prisma.addedCourse.findMany({
      include: {
        programIds: true
      }
    });
    return courses;
  } catch (error) {
    console.log(`Get Course error: ${error}`);
    return null;
  }
};

const updateAddedCourse = async (data: AddedCourseType) => {
  try {

    // const prev = await prisma.addedCourse.findUnique({ where: { id: data.id }});
    
    const updated = await prisma.addedCourse.update({
      where: { id: data.id },
      data: {
        courseCode: data.courseCode,
        courseTitle: data.courseTitle,
        units: data.units,
        yearLevel: data.yearLevel,
        semester: data.semester
      },
    });
    
    await prisma.programIds.deleteMany({ where: {
      courseId: updated.id
    } });

    let progIdArr = data.programIds.map(item => {
      return { courseId: updated.id, programId: item }
    });
    await prisma.programIds.createMany({ data: progIdArr });
    
    let students: any[] = [];

    for(const item of data.programIds) {
      let users = await prisma.user.findMany({
        where: {
          programId: item,
          role: 'student'
        }
      });

      students = [...students, ...users];
    }
    
    for(const student of students) {
      const record = await prisma.addedCourseRecord.findFirst({ where: { userId: student.id, courseId: updated.id }})
    
      if(!record) await prisma.addedCourseRecord.create({ data: { userId: student.id, courseId: updated.id } });
    };
    
    // let record = students.map((u) => ({
    //   userId: u.id,
    //   courseId: updated.id,
    // }));

    // await prisma.addedCourseRecord.createMany({
    //   data: record,
    // });

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
    const courses = await prisma.addedCourse.findMany();

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


//ASSIGN STUDENT COURSE
const assignStudentCourse = async (assignedCourses: {userId: number, courseCode: string}[]) => {
  try {

    const assign = await prisma.assignedCourse.createMany({
      data: assignedCourses
    });

    if(!assign) return null;

    return assign;

  } catch(error) {
    console.log(`Assign Course error: ${error}`);
    return null;
  }
}

const getStudentAssignedCourse = async (userId: number) => {
  try {

    const assignedCourses = await prisma.assignedCourse.findMany({ where: { userId }});

    return assignedCourses;

  } catch(error) {
    console.log(`Retrieval error: ${error}`);
    return null;
  }
}

const getStudentAssignedCourses = async () => {
  try {

    const assignedCourses = await prisma.assignedCourse.findMany();

    return assignedCourses;

  } catch(error) {
    console.log(`Retrieval error: ${error}`);
    return null;
  }
}

const updateStudentAssignedCourse = async (userId: number, assignedCourses: {userId: number, courseCode: string}[]) => {
  try {

    // if(assignedCourses.length === 0) return null;
    
    await prisma.assignedCourse.deleteMany({ where: { userId } });
    
    const assign = await prisma.assignedCourse.createMany({
      data: assignedCourses
    });

    return assign;
  } catch(error) {
    console.log(`Update error: ${error}`);
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

  assignNewUserCourse,

  assignStudentCourse,
  getStudentAssignedCourse,
  getStudentAssignedCourses,
  updateStudentAssignedCourse
};
