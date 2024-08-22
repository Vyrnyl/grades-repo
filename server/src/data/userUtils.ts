import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Check email in the Database
const checkEmail = async (email: string): Promise<boolean> => {
    try {
        const isExist = await prisma.user.findUnique({ where: { email }});
        
        return isExist !== null;
    } catch(error) {
        console.log('Email checking error');
        return false;
    }
};

export { checkEmail };