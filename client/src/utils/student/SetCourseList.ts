import { AddedCourseRecord, CourseType } from "../../types/types";
import setCourseYear from "./setCourseYear";

type Student = {
  studentId: string;
  firstName: string;
  lastName: string;
  yearLevel: number;
  block: string;
  programCode: string;
  period: string;
};

//EXTREMLY HARD CODED!!!

const SetCourseList = (
  courseGradeList: CourseType[],
  student: Student,
  semester: number,
  addedCourseRecord: AddedCourseRecord[],
  setFilteredCourseList: (data: CourseType[]) => void
) => {
  if (courseGradeList.length > 0 && student.programCode == "BSIT") {
    let firstYear = courseGradeList.slice(0, 16);
    let secondYear = courseGradeList.slice(16, 32);
    let thirdYear = courseGradeList.slice(32, 43);
    let fourthYear = courseGradeList.slice(43, 49);

    if (student.yearLevel === 1) {
      let semesterCourses =
        semester === 1 ? firstYear.slice(0, 8) : firstYear.slice(8);

      setCourseYear(addedCourseRecord, 1, 1, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 2) {
      let semesterCourses =
        semester === 1 ? secondYear.slice(0, 8) : secondYear.slice(8);

      setCourseYear(addedCourseRecord, 1, 2, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 3) {
      let semesterCourses =
        semester === 1 ? thirdYear.slice(0, 5) : thirdYear.slice(5);

      setCourseYear(addedCourseRecord, 1, 3, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 4) {
      let semesterCourses =
        semester === 1 ? fourthYear.slice(0, 5) : fourthYear.slice(5);

      setCourseYear(addedCourseRecord, 1, 4, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
  }

  if (courseGradeList.length > 0 && student.programCode == "BSCS") {
    let firstYear = courseGradeList.slice(0, 17);
    let secondYear = courseGradeList.slice(17, 33);
    let thirdYear = courseGradeList.slice(33, 45);
    let fourthYear = courseGradeList.slice(45, 51);

    if (student.yearLevel === 1) {
      let semesterCourses =
        semester === 1 ? firstYear.slice(0, 8) : firstYear.slice(8);

      setCourseYear(addedCourseRecord, 2, 1, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 2) {
      let semesterCourses =
        semester === 1 ? secondYear.slice(0, 8) : secondYear.slice(8);

      setCourseYear(addedCourseRecord, 2, 2, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 3) {
      let semesterCourses =
        semester === 1 ? thirdYear.slice(0, 6) : thirdYear.slice(6);

      setCourseYear(addedCourseRecord, 2, 3, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 4) {
      let semesterCourses =
        semester === 1 ? fourthYear.slice(0, 3) : fourthYear.slice(3);

      setCourseYear(addedCourseRecord, 2, 4, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
  }

  if (courseGradeList.length > 0 && student.programCode == "BSIS") {
    let firstYear = courseGradeList.slice(0, 16);
    let secondYear = courseGradeList.slice(16, 32);
    let thirdYear = courseGradeList.slice(32, 46);
    let fourthYear = courseGradeList.slice(46, 51);

    if (student.yearLevel === 1) {
      let semesterCourses =
        semester === 1 ? firstYear.slice(0, 8) : firstYear.slice(8);

      setCourseYear(addedCourseRecord, 3, 1, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 2) {
      let semesterCourses =
        semester === 1 ? secondYear.slice(0, 8) : secondYear.slice(8);

      setCourseYear(addedCourseRecord, 3, 2, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 3) {
      let semesterCourses =
        semester === 1 ? thirdYear.slice(0, 7) : thirdYear.slice(7);

      setCourseYear(addedCourseRecord, 3, 3, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 4) {
      let semesterCourses =
        semester === 1 ? fourthYear.slice(0, 4) : fourthYear.slice(4);

      setCourseYear(addedCourseRecord, 3, 4, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
  }

  if (courseGradeList.length > 0 && student.programCode == "BLIS") {
    let firstYear = courseGradeList.slice(0, 16);
    let secondYear = courseGradeList.slice(16, 32);
    let thirdYear = courseGradeList.slice(32, 45);
    let fourthYear = courseGradeList.slice(45, 51);

    if (student.yearLevel === 1) {
      let semesterCourses =
        semester === 1 ? firstYear.slice(0, 8) : firstYear.slice(8);

      setCourseYear(addedCourseRecord, 4, 1, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 2) {
      let semesterCourses =
        semester === 1 ? secondYear.slice(0, 8) : secondYear.slice(8);

      setCourseYear(addedCourseRecord, 4, 2, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 3) {
      let semesterCourses =
        semester === 1 ? thirdYear.slice(0, 7) : thirdYear.slice(7);

      setCourseYear(addedCourseRecord, 4, 3, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 4) {
      let semesterCourses =
        semester === 1 ? fourthYear.slice(0, 4) : fourthYear.slice(4);

      setCourseYear(addedCourseRecord, 4, 4, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
  }

  if (courseGradeList.length > 0 && student.programCode == "BSEMC") {
    let firstYear = courseGradeList.slice(0, 15);
    let secondYear = courseGradeList.slice(15, 28);
    let thirdYear = courseGradeList.slice(28, 41);
    let fourthYear = courseGradeList.slice(41, 48);

    if (student.yearLevel === 1) {
      let semesterCourses =
        semester === 1 ? firstYear.slice(0, 8) : firstYear.slice(8);

      setCourseYear(addedCourseRecord, 5, 1, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 2) {
      let semesterCourses =
        semester === 1 ? secondYear.slice(0, 7) : secondYear.slice(7);

      setCourseYear(addedCourseRecord, 5, 2, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 3) {
      let semesterCourses =
        semester === 1 ? thirdYear.slice(0, 7) : thirdYear.slice(7);

      setCourseYear(addedCourseRecord, 5, 3, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
    if (student.yearLevel === 4) {
      let semesterCourses =
        semester === 1 ? fourthYear.slice(0, 6) : fourthYear.slice(6);

      setCourseYear(addedCourseRecord, 5, 4, semester, semesterCourses);

      setFilteredCourseList(semesterCourses);
    }
  }
};

export default SetCourseList;
