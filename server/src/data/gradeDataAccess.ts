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
    bsitStudentRecord?: Grade[];
    bscsStudentRecord?: Grade[];
    bsisStudentRecord?: Grade[];
    blisStudentRecord?: Grade[];
    bsemcStudentRecord?: Grade[];
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
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
}

const getRecords = async () => {
    try {

        const bsitRecord = await prisma.bsitStudentRecord.findMany();
        const bscsRecord = await prisma.bscsStudentRecord.findMany();
        const bsisRecord = await prisma.bsisStudentRecord.findMany();
        const blisRecord = await prisma.blisStudentRecord.findMany();
        const bsemcRecord = await prisma.bsemcStudentRecord.findMany();

        let recordArray: { id: number; userId: number; courseId: number; grade: Decimal | null; }[] = 
        [...bsitRecord, ...bscsRecord, ...bsisRecord, ...blisRecord, ...bsemcRecord];
        
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
                record = await prisma.bsitCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsitStudentRecord: {
                            where: { userId }
                        }
                    }
                });

                if(record?.bsitStudentRecord) {
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
                if(addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            } else if(programId === 2) {
                record = await prisma.bscsCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bscsStudentRecord: {
                            where: { userId }
                        }
                    }
                });

                if(record?.bscsStudentRecord) {
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
                if(addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            } else if(programId === 3) {
                record = await prisma.bsisCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsisStudentRecord: {
                            where: { userId }
                        }
                    }
                });

                if(record?.bsisStudentRecord) {
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
                if(addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }

            } else if(programId === 4) {
                record = await prisma.blisCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        blisStudentRecord: {
                            where: { userId }
                        }
                    }
                });

                if(record?.blisStudentRecord) {
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
                if(addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            } else if(programId === 5) {
                record = await prisma.bsemcCurriculum.findFirst({
                    where: { courseCode },
                    include: {
                        bsemcStudentRecord: {
                            where: { userId }
                        }
                    }
                });

                if(record?.bsemcStudentRecord) {
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
                if(addedCourse) {
                    update = await prisma.addedCourseRecord.update({
                        where: { id: addedCourse?.addedCourseRecord[0].id },
                        data: { grade }
                    });
                }
            } else return undefined;
            
            return { message: "Update Successfully" };
        });
        
        return updateResult;

    } catch(error) {
        console.log(`Update error: ${error}`);
        return undefined;
    }

}








//ADDED COURSE
const getAddedCourseRecord = async (userId: number) => {
    try {

        const addedRecord = await prisma.addedCourseRecord.findMany({
            where: { userId },
            include: { addedCourse: true }
        });
        
        return addedRecord;
    } catch(error) {
        console.log(`Retrieval error: ${error}`);
        return undefined;
    }
}


export { getGrades, getRecords, updateGrade, getStudents, getAddedCourseRecord };