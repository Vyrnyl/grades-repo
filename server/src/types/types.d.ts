import { PrismaClient } from "@prisma/client";

//Validator Types
export type SignupPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    sex: string
    role: string;
    studentId: string;
    yearLevel: number;
    programId: number;
};

export type LoginPayload = {
    email: string,
    password: string
};



//Data Access Layer Types
export type NewUserData = {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    sex: string,
    role: string,
    studentId: string | null,
    yearLevel: number | null,
    programId: number | null
}

export type StoreRefreshTokenResponse = {
    error?: string,
    refreshToken?: {
        id: number;
        token: string;
        userId: number;
    };
}

 

//TOKEN
export type TokenPayload = {
    userId: number,
    firstName: string,
    role: string
}

export type DecodedToken = { 
    userId: number, 
    firstName: string, 
    role: string, 
    iat: number, 
    exp: number
}

