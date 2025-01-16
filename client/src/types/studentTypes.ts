
type Grades = {
    id: number,
    userId: number,
    courseId: number,
    grade: number,
    bsaCurriculum?: {
        units: number
    }
    bsbaCurriculum?: {
        units: number
    }
    bsmaCurriculum?: {
        units: number
    }
}

type Program = {
    id: number,
    programCode: string,
    programName: string
}
  
type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    sex: string,
    studentId: string,
    yearLevel: number,
    role: string,
    block: string,
    status: string,
    programId: number,
    program: Program,
    createdAt: string,
    updatedAt: string
}

export { Grades, Program, User };