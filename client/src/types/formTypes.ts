

type SignupInfoType = {
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    role: string,
    programId: number | null,
    studentId: string,
    password: string,
    confirmPassword: string
}

export { SignupInfoType };