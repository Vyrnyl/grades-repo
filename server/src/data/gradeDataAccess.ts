import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

type Record = {
    id: number;
    userId: number;
    courseId: number;
    grade: Decimal | null;
} | null;

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

export { updateGrade };