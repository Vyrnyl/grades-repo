
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

 

