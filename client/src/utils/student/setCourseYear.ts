import { AddedCourseRecord, CourseType } from "../../types/types";

const setCourseYear = (addedCourseRecord: AddedCourseRecord[], programId: number, yearLevel: number, semester: number, semesterCourses: CourseType[]) => {
    addedCourseRecord.forEach((item) => {
        if (
            item.addedCourse?.semester === 1 &&
            item.addedCourse.yearLevel === yearLevel &&
            semester === 1 && item.addedCourse.programId === programId
        ) {
            semesterCourses.push(item);
        } else if (
            item.addedCourse?.semester === 2 &&
            item.addedCourse.yearLevel === yearLevel &&
            semester === 2
        ) {
            semesterCourses.push(item);
        }
    });
}

export default setCourseYear;