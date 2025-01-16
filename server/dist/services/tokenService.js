"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: '72h'
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: '72h'
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        return undefined;
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = async (refreshToken) => {
    try {
        const tokenResult = await prisma.refreshToken.findUnique({
            where: {
                token: refreshToken
            }
        });
        if (!tokenResult) {
            return undefined;
        }
        const rtoken = jsonwebtoken_1.default.verify(tokenResult.token, REFRESH_TOKEN_SECRET);
        if (!rtoken) {
            return undefined;
        }
        return rtoken;
    }
    catch (error) {
        return undefined;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
