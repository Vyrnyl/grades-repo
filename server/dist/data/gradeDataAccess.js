"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddedCourseRecord = exports.getStudents = exports.updateGrade = exports.getRecords = exports.getGrades = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getGrades = async (userId) => {
    try {
        const students = await prisma.user.findMany({
            select: {
                id: true,
                studentId: true,
                firstName: true,
                lastName: true,
                yearLevel: true,
                block: true,
                program: true,
                bsitStudentRecord: {
                    include: { bsitCurriculum: true }
                },
                bscsStudentRecord: {
                    include: { bscsCurriculum: true }
                },
                bsisStudentRecord: {
                    include: { bsisCurriculum: true }
                },
                blisStudentRecord: {
                    include: { blisCurriculum: true }
                },
                bsemcStudentRecord: {
                    include: { bsemcCurriculum: true }
                }
            },
            where: { id: userId }
        });
        return students;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
};
exports.getGrades = getGrades;
const getRecords = async () => {
    try {
        const bsitRecord = await prisma.bsitStudentRecord.findMany();
        const bscsRecord = await prisma.bscsStudentRecord.findMany();
        const bsisRecord = await prisma.bsisStudentRecord.findMany();
        const blisRecord = await prisma.blisStudentRecord.findMany();
        const bsemcRecord = await prisma.bsemcStudentRecord.findMany();
        let recordArray = [...bsitRecord, ...bscsRecord, ...bsisRecord, ...blisRecord, ...bsemcRecord];
        return recordArray;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
};
exports.getRecords = getRecords;
const getStudents = async () => {
    try {
        const students = await prisma.user.findMany({
            select: {
                id: true,
                studentId: true,
                firstName: true,
                lastName: true,
                yearLevel: true,
                block: true,
                program: true,
                bsitStudentRecord: {
                    include: { bsitCurriculum: true }
                },
                bscsStudentRecord: {
                    include: { bscsCurriculum: true }
                },
                bsisStudentRecord: {
                    include: { bsisCurriculum: true }
                },
                blisStudentRecord: {
                    include: { blisCurriculum: true }
                },
                bsemcStudentRecord: {
                    include: { bsemcCurriculum: true }
                },
                addedCourseRecord: {
                    include: { addedCourse: true }
                },
                assignedCourse: true
            },
            where: { role: 'student' }
        });
        return students;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
};
exports.getStudents = getStudents;
const updateGrade = async (userId, programId, courseCode, grade) => {
    try {
        const updateResult = await prisma.$transaction(async () => {
            let record;
            let update;
            if (programId === 1) {
                record = await prisma.bsitCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsitStudentRecord: {
                            where: { userId }
                        }
                    }
                });
                if (record?.bsitStudentRecord) {
                    update = await prisma.bsitStudentRecord.update({
                        where: { id: record?.bsitStudentRecord[0].id },
                        data: { grade }
                    });
                }
                //ADDED COURSE
                const addedCourse = await prisma.addedCourse.findFirst({
                    where: { courseCode },
                    include: {
                        addedCourseRecord: {
                            where: { userId }
                        }
                    }
                });
                if (addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            }
            else if (programId === 2) {
                record = await prisma.bscsCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bscsStudentRecord: {
                            where: { userId }
                        }
                    }
                });
                if (record?.bscsStudentRecord) {
                    update = await prisma.bscsStudentRecord.update({
                        where: { id: record?.bscsStudentRecord[0].id },
                        data: { grade }
                    });
                }
                //ADDED COURSE
                const addedCourse = await prisma.addedCourse.findFirst({
                    where: { courseCode },
                    include: {
                        addedCourseRecord: {
                            where: { userId }
                        }
                    }
                });
                if (addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            }
            else if (programId === 3) {
                record = await prisma.bsisCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsisStudentRecord: {
                            where: { userId }
                        }
                    }
                });
                if (record?.bsisStudentRecord) {
                    update = await prisma.bsisStudentRecord.update({
                        where: { id: record?.bsisStudentRecord[0].id },
                        data: { grade }
                    });
                }
                //ADDED COURSE
                const addedCourse = await prisma.addedCourse.findFirst({
                    where: { courseCode },
                    include: {
                        addedCourseRecord: {
                            where: { userId }
                        }
                    }
                });
                if (addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            }
            else if (programId === 4) {
                record = await prisma.blisCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        blisStudentRecord: {
                            where: { userId }
                        }
                    }
                });
                if (record?.blisStudentRecord) {
                    update = await prisma.blisStudentRecord.update({
                        where: { id: record?.blisStudentRecord[0].id },
                        data: { grade }
                    });
                }
                //ADDED COURSE
                const addedCourse = await prisma.addedCourse.findFirst({
                    where: { courseCode },
                    include: {
                        addedCourseRecord: {
                            where: { userId }
                        }
                    }
                });
                if (addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            }
            else if (programId === 5) {
                record = await prisma.bsemcCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsemcStudentRecord: {
                            where: { userId }
                        }
                    }
                });
                if (record?.bsemcStudentRecord) {
                    update = await prisma.bsemcStudentRecord.update({
                        where: { id: record?.bsemcStudentRecord[0].id },
                        data: { grade }
                    });
                }
                //ADDED COURSE
                const addedCourse = await prisma.addedCourse.findFirst({
                    where: { courseCode },
                    include: {
                        addedCourseRecord: {
                            where: { userId }
                        }
                    }
                });
                if (addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            }
            else
                return undefined;
            return { message: "Update Successfully" };
        });
        return updateResult;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return undefined;
    }
};
exports.updateGrade = updateGrade;
//ADDED COURSE
const getAddedCourseRecord = async (userId) => {
    try {
        const addedRecord = await prisma.addedCourseRecord.findMany({
            where: { userId },
            include: { addedCourse: true }
        });
        return addedRecord;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
};
exports.getAddedCourseRecord = getAddedCourseRecord;
