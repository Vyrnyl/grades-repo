"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGrade = exports.getGrades = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getGrades = async (userId) => {
    try {
        const program = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                program: true
            }
        });
        const programId = program?.program?.id;
        let records;
        if (programId === 1) {
            records = await prisma.bsaStudentRecord.findMany({
                where: { userId },
                select: {
                    id: true,
                    userId: true,
                    courseId: true,
                    grade: true,
                    bsaCurriculum: {
                        select: {
                            units: true
                        }
                    }
                }
            });
        }
        else if (programId === 2) {
            records = await prisma.bsbaStudentRecord.findMany({
                where: { userId },
                select: {
                    id: true,
                    userId: true,
                    courseId: true,
                    grade: true,
                    bsbaCurriculum: {
                        select: {
                            units: true
                        }
                    }
                }
            });
        }
        else if (programId === 3) {
            records = await prisma.bsmaStudentRecord.findMany({
                where: { userId },
                select: {
                    id: true,
                    userId: true,
                    courseId: true,
                    grade: true,
                    bsmaCurriculum: {
                        select: {
                            units: true
                        }
                    }
                }
            });
        }
        else
            return undefined;
        return records;
    }
    catch (error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
};
exports.getGrades = getGrades;
const updateGrade = async (userId, programId, courseId, grade) => {
    try {
        const updateResult = await prisma.$transaction(async () => {
            let record;
            let update;
            if (programId === 1) {
                record = await prisma.bsaStudentRecord.findFirst({
                    where: { userId, courseId }
                });
                update = await prisma.bsaStudentRecord.update({
                    where: { id: record?.id, courseId },
                    data: {
                        grade
                    }
                });
            }
            else if (programId === 2) {
                record = await prisma.bsbaStudentRecord.findFirst({
                    where: { userId, courseId }
                });
                update = await prisma.bsbaStudentRecord.update({
                    where: { id: record?.id, courseId },
                    data: {
                        grade
                    }
                });
            }
            else if (programId === 3) {
                record = await prisma.bsmaStudentRecord.findFirst({
                    where: { userId, courseId }
                });
                update = await prisma.bsmaStudentRecord.update({
                    where: { id: record?.id, courseId },
                    data: {
                        grade
                    }
                });
            }
            else
                return undefined;
            return update;
        });
        return updateResult;
    }
    catch (error) {
        console.log(`Update error: ${error}`);
        return undefined;
    }
};
exports.updateGrade = updateGrade;
