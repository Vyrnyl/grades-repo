"use strict";
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
// import { TokenPayload } from '../types/types';
// const prisma = new PrismaClient();
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
// const generateAccessToken = (payload: TokenPayload) => {
//     return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
//         expiresIn: '5s'
//     });
// }
// const generateRefreshToken = (payload: TokenPayload) => {
//     return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
//         expiresIn: '5m'
//     });
// }
// const verifyRefreshToken = async (refreshToken: string) => {
//     const token = await prisma.refreshToken.findUnique({
//         where: {
//             token: refreshToken
//         }
//     });
//     return token;
// }
// export { generateAccessToken, generateRefreshToken, verifyRefreshToken };
