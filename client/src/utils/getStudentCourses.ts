import { CourseType, StudentRecord } from "../types/types"


const checkStudentCourse = (student: StudentRecord, courseCode: string) => {

    const { programCode } = student.program;
    let array: CourseType[] = [];
    let addedCourseArr: CourseType[] = [];
    let isExist: boolean = false;

    if(student.addedCourseRecord.length > 0) {
        addedCourseArr = student.addedCourseRecord;
    }
    
    if(programCode === 'BSIT') {
        array = [...student.bsitStudentRecord, ...addedCourseArr];
        isExist = array.some(item => {
            return (item.addedCourse === undefined ? item.bsitCurriculum?.courseCode === courseCode : 
                item.addedCourse.courseCode === courseCode)
        });
        
    } else if(programCode === 'BSCS') {
        array = [...student.bscsStudentRecord, ...addedCourseArr];
        isExist = array.some(item => {
            return (item.addedCourse === undefined ? item.bscsCurriculum?.courseCode === courseCode : 
                item.addedCourse.courseCode === courseCode)
        });
    } else if(programCode === 'BSIS') {
        array = [...student.bsisStudentRecord, ...addedCourseArr];
        isExist = array.some(item => {
            return (item.addedCourse === undefined ? item.bsisCurriculum?.courseCode === courseCode : 
                item.addedCourse.courseCode === courseCode)
        });
        
    } else if(programCode === 'BLIS') {
        array = [...student.blisStudentRecord, ...addedCourseArr];
        isExist = array.some(item => {
            return (item.addedCourse === undefined ? item.blisCurriculum?.courseCode === courseCode : 
                item.addedCourse.courseCode === courseCode)
        });
    } else {
        array = [...student.bsemcStudentRecord, ...addedCourseArr];
        isExist = array.some(item => {
            return (item.addedCourse === undefined ? item.bsemcCurriculum?.courseCode === courseCode : 
                item.addedCourse.courseCode === courseCode)
        });
    }
    
    
    return isExist;

}

export default checkStudentCourse