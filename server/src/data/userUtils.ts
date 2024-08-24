import { PrismaClient } from '@prisma/client';
import { StoreRefreshTokenResponse } from '../types/types';

const prisma = new PrismaClient();

//Check email in the Database
const checkEmail = async (email: string) => {
    try {
        const isExist = await prisma.user.findUnique({ where: { email }});
        return isExist;
    } catch(error) {
        console.log('Email checking error');
        return false;
    }
};

const storeRefreshToken = async (token: string): Promise<StoreRefreshTokenResponse> => {
    try {
        const refreshToken = await prisma.refreshToken.create({
            data: { token }
        });
        return { refreshToken };
    } catch(error) {
        console.log(`Storing refresh token error: ${error}`);
        return { error: 'An error occurred while processing your request' };
    }
}


export { checkEmail, storeRefreshToken };