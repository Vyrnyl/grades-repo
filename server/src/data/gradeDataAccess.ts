import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

type Record = {
    id: number;
    userId: number;
    courseId: number;
    grade: Decimal | null;
} | null;


const getGrades = async (userId: number) => {
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

        let records: Record[];
        if(programId === 1) {
            records = await prisma.bsaStudentRecord.findMany({
                where: { userId },
                select: {
                    id: true,
                    userId: true,
                    courseId: true,
                    grade: true,
                    bsaCurriculum: { // Use brackets to define the dynamic key
                        select: {
                            units: true
                        }
                    }
                }
            });

        } else if(programId === 2) {
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
        } else if(programId === 3) {
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
        } else return undefined;   
        
        return records;        
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
}

const updateGrade = async (userId: number, programId: number, courseId: number, grade: number) => {

    try {
        const updateResult = await prisma.$transaction(async () => {

            let record: Record;
            let update: Record;

            if(programId === 1) {
                record = await prisma.bsaStudentRecord.findFirst({
                    where: { userId, courseId }
                });

                update = await prisma.bsaStudentRecord.update({
                    where: { id: record?.id, courseId },
                    data: {
                        grade
                    }
                });
            } else if(programId === 2) {
                record = await prisma.bsbaStudentRecord.findFirst({
                    where: { userId, courseId }
                });
                update = await prisma.bsbaStudentRecord.update({
                    where: { id: record?.id, courseId },
                    data: {
                        grade
                    }
                });
            } else if(programId === 3) {
                record = await prisma.bsmaStudentRecord.findFirst({
                    where: { userId, courseId }
                });
                update = await prisma.bsmaStudentRecord.update({
                    where: { id: record?.id, courseId },
                    data: {
                        grade
                    }
                });
            } else return undefined;     

            return update;
        });
        
        return updateResult;

    } catch(error) {
        console.log(`Update error: ${error}`);
        return undefined;
    }

}

export { getGrades, updateGrade };