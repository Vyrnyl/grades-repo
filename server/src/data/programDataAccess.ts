import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProgramList = async () => {
    try {
        const program = await prisma.program.findMany();
        return program;
    } catch(error) {
        console.log(`Get class error: ${error}`);
        return null;
    }
}

const getCoursesList = async () => {
    try {
        // const courses = await prisma.bsitCurriculum.findMany();

        const courses = await prisma.$queryRaw`
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
    } catch(error) {
        console.log(`Get courses error: ${error}`);
        return null;
    }
}

export { getProgramList, getCoursesList }