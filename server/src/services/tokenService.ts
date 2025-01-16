import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { DecodedToken, TokenPayload } from '../types/types';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: '72h'
    });
}

const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: '72h'
    });
}

const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return decoded as DecodedToken;
    } catch(error) {
        return undefined;
    }
};

const verifyRefreshToken = async (refreshToken: string): Promise<DecodedToken | undefined> => {
    try {
        const tokenResult = await prisma.refreshToken.findUnique({
            where: {
                token: refreshToken
            }
        });

        if(!tokenResult) {
            return undefined;
        }

        const rtoken = jwt.verify(tokenResult.token, REFRESH_TOKEN_SECRET) as DecodedToken;

        if(!rtoken) {
            return undefined;
        }
        return rtoken;

    } catch(error) {
        return undefined;
    }
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };