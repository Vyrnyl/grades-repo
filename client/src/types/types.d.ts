
type CourseData = {
    id: number,
    courseCode: string,
    courseTitle: string,
    day: string,
    time: string,
    room: string
}

type CourseInfo = {
    courseCode: string,
    courseTitle: string,
    day: string,
    time: string,
    room: string
}

type Course = {
    id: number,
    courseCode: string,
    courseTitle: string,
    units: number
}

type Grade = { 
    id: number; 
    userId: number; 
    courseId: number; 
    grade: number | null 
}

type Program = {
    id: number,
    programCode: string,
    programName: string
}

type CourseType = { 
    id: number; 
    userId: number; 
    courseId: number; 
    grade: number | null,
    bsaCurriculum?: Course,
    bsbaCurriculum?: Course,
    bsmaCurriculum?: Course
}

type StudentRecord = {
    id: number,
    studentId: string,
    firstName: string,
    lastName: string,
    yearLevel: number,
    block: string
    program: Program,
    bsaStudentRecord: CourseType[],
    bsbaStudentRecord: CourseType[],
    bsmaStudentRecord: CourseType[]
}


export { CourseData, CourseInfo, CourseType, StudentRecord, Course, Grade };