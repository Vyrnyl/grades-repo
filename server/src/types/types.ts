

export type SignupPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    sex: string
    role?: string;
    studentId: string;
    yearLevel: number;
    programId: number;
};

export type LoginPayload = {
    email: string,
    password: string
};