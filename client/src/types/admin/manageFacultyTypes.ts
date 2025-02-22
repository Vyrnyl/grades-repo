

type UserData = {
    id: number,
    studentId: string,
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    role: string,
    sex: string,
    status: string
  }

type Program = {
    id: number,
    programCode: string,
    userId: number
}

type Course = {
    id: number,
    courseCode: string,
    userId: number,
    createdAt: string,
    updatedAt: string
}

type ProgramYear = {
    id?: number,
    userId: number,
    programYearBlock: string
}

export { UserData, Program, Course, ProgramYear }