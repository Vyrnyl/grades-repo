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

export type UserUpdatePayload = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    sex: string
    studentId: string;
    yearLevel: number;
    programId: number
};



//Data Access Layer Types
export type NewUserData = {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

export type StoreRefreshTokenResponse = {
    error?: string,
    refreshToken?: {
        id: number;
        token: string;
    };
}

export type LoginActivity = {
    studentId: string,
    firstName: string,
    lastName: string,
    role: string,
    numberOfAttempts: number,
    status: string
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


//CLASS
type  ClassPayload = {
    courseCode: string,
    courseTitle: string,
    day: string,
    time: string,
    room: string
}
type  ClassUpdatePayload = {
    id: number,
    courseCode: string,
    day: string,
    time: string,
    room: string
}

//ADDED COURSE
export type AddedCourseType = {
    id? : number,
    courseCode: string,
    courseTitle: string,
    units: number,
    yearLevel: number,
    semester: number,
    programIds: number[]
}
