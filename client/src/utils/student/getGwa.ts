import { AddedCourseType } from "../../types/types";

type Record = {
    id: number,
    userId: number,
    courseId: number,
    grade: string,
    semester: number,
    yearLevel: number,
    addedCourse: AddedCourseType
}

const getGwa = (record: Record[]) => {
    let gwa = 0;
    let totalUnits= 0;
    let weightedSum = 0;
    
    record.map(course => {
        if(course.addedCourse && course.grade) {
            totalUnits += course.addedCourse?.units;
            weightedSum += Number(course.grade) * course.addedCourse?.units;
        }
    });
    gwa = parseFloat((weightedSum / totalUnits).toFixed(1)) || 0;
    
    return gwa;
}

export default getGwa;