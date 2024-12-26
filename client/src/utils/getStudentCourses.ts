import { CourseType, StudentRecord } from "../types/types"


const checkStudentCourse = (student: StudentRecord, courseCode: string) => {

    const { programCode } = student.program;
    let array: CourseType[] = [];
    let isExist: boolean = false;

    if(programCode === 'BSIT') {
        array = student.bsitStudentRecord;
        isExist = array.some(item => item.bsitCurriculum?.courseCode === courseCode)
    } else if(programCode === 'BSCS') {
        array = student.bscsStudentRecord;
        isExist = array.some(item => item.bscsCurriculum?.courseCode === courseCode)
    } else if(programCode === 'BSIS') {
        array = student.bsisStudentRecord;
        isExist = array.some(item => item.bsisCurriculum?.courseCode === courseCode)
    } else if(programCode === 'BLIS') {
        array = student.blisStudentRecord;
        isExist = array.some(item => item.blisCurriculum?.courseCode === courseCode)
    } else {
        array = student.bsemcStudentRecord;
        isExist = array.some(item => item.bsemcCurriculum?.courseCode === courseCode)
    }
    
    return isExist;

}

export default checkStudentCourse