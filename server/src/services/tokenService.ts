
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { DecodedToken, TokenPayload } from '../types/types';

const prisma = new PrismaClient();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: '10s'
    });
}

const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: '5m'
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

const verifyRefreshToken = async (refreshToken: string) => {
    const token = await prisma.refreshToken.findUnique({
        where: {
            token: refreshToken
        }
    });
    return token;
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };