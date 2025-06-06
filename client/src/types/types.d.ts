
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
    bsitCurriculum?: Course,
    bscsCurriculum?: Course,
    bsisCurriculum?: Course,
    blisCurriculum?: Course,
    bsemcCurriculum?: Course,
    addedCourse?: Course
}

type StudentRecord = {
    id: number,
    studentId: string,
    firstName: string,
    middleName?: string,
    lastName: string,
    yearLevel: number,
    block: string
    program: Program,
    bsitStudentRecord: CourseType[],
    bscsStudentRecord: CourseType[],
    bsisStudentRecord: CourseType[],
    blisStudentRecord: CourseType[],
    bsemcStudentRecord: CourseType[],
    addedCourseRecord: CourseType[],
    assignedCourse: any[]
}


type AddedCourseType = {
    id: number,
    courseCode: string,
    courseTitle: string,
    units: number,
    yearLevel: number,
    semester: number,
    programIds: { courseId: number, id: number, programId: number }[]
}



//ADDED COURSE
type AddedCourse = {
    id: number,
    courseCode: string,
    courseTitle: string,
    units: number,
    yearLevel: number,
    semester: number,
    programId: number
  }
  
  type AddedCourseRecord = {
    id: number; 
    userId: number; 
    courseId: number; 
    grade: number | null,
    addedCourse?: AddedCourse
  }

export { CourseData, CourseInfo, CourseType, StudentRecord, Course, Grade, AddedCourseType, AddedCourseRecord };