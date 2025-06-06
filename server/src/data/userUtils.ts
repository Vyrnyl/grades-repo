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

const checkUserEmail = async (id: number, email: string) => {
    try {
        
        const user = await prisma.user.findUnique({ where: { id }});

        if(!user) throw new Error('User not found');

        if(user.email !== email) return user;

    } catch(error) {
        console.log('Email checking error');
        return false;
    }
}

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

const deleteRefreshToken = async (refreshToken: string) => {
    try {
        await prisma.refreshToken.delete({
            where: {
                token: refreshToken
            }
        });
        return true;
    } catch(error) {
        console.log('Deletion error');
        return undefined;
    }
}

const getProgram = async (programId: number) => {
    try {
        const program = await prisma.program.findUnique({
            where: {
                id: programId
            }
        });
        return program;
    } catch(error) {
        console.log(`Retrieve error ${error}`);
        return undefined;
    }
}

export { checkEmail, checkUserEmail, storeRefreshToken, deleteRefreshToken, getProgram };