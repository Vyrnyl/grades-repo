import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

type Grade = {
    id: number,
    userId: number,
    courseId: number,
    grade: Decimal | null
}

type Record = {
    id: number;
    courseCode: string;
    courseTitle: string;
    units: number;
    bsaStudentRecord?: Grade[];
    bsbaStudentRecord?: Grade[];
    bsmaStudentRecord?: Grade[];
} | null;


const getGrades = async (userId: number) => {
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
                bsaStudentRecord: {
                    include: { bsaCurriculum: true }
                },
                bsbaStudentRecord: {
                    include: { bsbaCurriculum: true }
                },
                bsmaStudentRecord: {
                    include: { bsmaCurriculum: true }
                }
            },
            where: { id: userId }
        });

        return students;

        // const programId = program?.program?.id;

        // let records: Grade[];
        // if(programId === 1) {
        //     records = await prisma.bsaStudentRecord.findMany({
        //         where: { userId },
        //         select: {
        //             id: true,
        //             userId: true,
        //             courseId: true,
        //             grade: true,
        //             bsaCurriculum: { // Use brackets to define the dynamic key
        //                 select: {
        //                     units: true
        //                 }
        //             }
        //         }
        //     });

        // } else if(programId === 2) {
        //     records = await prisma.bsbaStudentRecord.findMany({
        //         where: { userId },
        //         select: {
        //             id: true,
        //             userId: true,
        //             courseId: true,
        //             grade: true,
        //             bsbaCurriculum: {
        //                 select: {
        //                     units: true
        //                 }
        //             }
        //         }
        //     });
        // } else if(programId === 3) {
        //     records = await prisma.bsmaStudentRecord.findMany({
        //         where: { userId },
        //         select: {
        //             id: true,
        //             userId: true,
        //             courseId: true,
        //             grade: true,
        //             bsmaCurriculum: {
        //                 select: {
        //                     units: true
        //                 }
        //             }
        //         }
        //     });
        // } else return undefined;
        
        // return records;
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
}

const getRecords = async () => {
    try {

        const bsaRecord = await prisma.bsaStudentRecord.findMany();
        const bsbaRecord = await prisma.bsbaStudentRecord.findMany();
        const bsmaRecord = await prisma.bsmaStudentRecord.findMany();

        let recordArray: { id: number; userId: number; courseId: number; grade: Decimal | null; }[] = 
        [...bsaRecord, ...bsbaRecord, ...bsmaRecord];
        
        return recordArray;
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
}

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
                bsaStudentRecord: {
                    include: { bsaCurriculum: true }
                },
                bsbaStudentRecord: {
                    include: { bsbaCurriculum: true }
                },
                bsmaStudentRecord: {
                    include: { bsmaCurriculum: true }
                }
            },
            where: { role: 'student' }
        });
        
        return students;
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
}

const updateGrade = async (userId: number, programId: number, courseCode: string, grade: number) => {

    try {
        const updateResult = await prisma.$transaction(async () => {

            let record: Record;
            let update: Grade;

            if(programId === 1) {
                record = await prisma.bsaCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsaStudentRecord: {
                            where: { userId }
                        }
                    }
                });

                if(record?.bsaStudentRecord) {
                    update = await prisma.bsaStudentRecord.update({
                        where: { id: record?.bsaStudentRecord[0].id },
                        data: { grade }
                    });
                }
            } else if(programId === 2) {
                record = await prisma.bsbaCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsbaStudentRecord: {
                            where: { userId }
                        }
                    }
                });

                if(record?.bsbaStudentRecord) {
                    update = await prisma.bsbaStudentRecord.update({
                        where: { id: record?.bsbaStudentRecord[0].id },
                        data: { grade }
                    });
                }
            } else if(programId === 3) {
                record = await prisma.bsmaCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsmaStudentRecord: {
                            where: { userId }
                        }
                    }
                });

                if(record?.bsmaStudentRecord) {
                    update = await prisma.bsmaStudentRecord.update({
                        where: { id: record?.bsmaStudentRecord[0].id },
                        data: { grade }
                    });
                }
            } else return undefined;
            // console.log(update);


            // if(programId === 1) {
            //     record = await prisma.bsaStudentRecord.findFirst({
            //         where: { userId }
            //     });

            //     update = await prisma.bsaStudentRecord.update({
            //         where: { id: record?.id, courseId },
            //         data: {
            //             grade
            //         }
            //     });
            // } else if(programId === 2) {
            //     record = await prisma.bsbaStudentRecord.findFirst({
            //         where: { userId, courseId }
            //     });
            //     update = await prisma.bsbaStudentRecord.update({
            //         where: { id: record?.id, courseId },
            //         data: {
            //             grade
            //         }
            //     });
            // } else if(programId === 3) {
            //     record = await prisma.bsmaStudentRecord.findFirst({
            //         where: { userId, courseId }
            //     });
            //     update = await prisma.bsmaStudentRecord.update({
            //         where: { id: record?.id, courseId },
            //         data: {
            //             grade
            //         }
            //     });
            // } else return undefined;

            return { message: "Update Successfully" };
        });
        
        return updateResult;

    } catch(error) {
        console.log(`Update error: ${error}`);
        return undefined;
    }

}

export { getGrades, getRecords, updateGrade, getStudents };