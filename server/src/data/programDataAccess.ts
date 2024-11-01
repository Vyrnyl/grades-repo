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

export { getProgramList }