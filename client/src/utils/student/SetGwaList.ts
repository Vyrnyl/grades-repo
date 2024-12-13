import { useEffect } from "react";
import { CourseType } from "../../types/types";
import { computeGwa, gwaStatus } from "../gwaStatus";
import yearSuffix from "../yearSuffix";

const SetGwaList = (courseGradeList: CourseType[], setGwaList: React.Dispatch<React.SetStateAction<{
        sem: string;
        gwa: number;
        status: string;
    }[]>>, student:  {
        studentId: string,
        firstName: string,
        lastName: string,
        yearLevel: number,
        programCode: string
    }) => {
    useEffect(() => {
        if(courseGradeList.length > 0) {
            let firstYearfirstSem = courseGradeList.slice(0, 12).slice(0, 6);
            let firstYearsecondSem = courseGradeList.slice(0, 12).slice(6);

            let secondYearfirstSem = courseGradeList.slice(12, 23).slice(0, 6);
            let secondYearsecondSem = courseGradeList.slice(12, 23).slice(6);

            let thirdYearfirstSem = courseGradeList.slice(23, 31).slice(0, 4);
            let thirdYearsecondSem = courseGradeList.slice(23, 31).slice(4);

            let fourthYearfirstSem = courseGradeList.slice(31, 40).slice(0, 5);
            let fourthYearsecondSem = courseGradeList.slice(31, 40).slice(5);
            
            let list = [
                firstYearfirstSem,
                firstYearsecondSem,
                secondYearfirstSem,
                secondYearsecondSem,
                thirdYearfirstSem,
                thirdYearsecondSem,
                fourthYearfirstSem,
                fourthYearsecondSem
            ];
            
            let sem = 2;
            let gwaList = list.map(item => {
                let semesterGwa = computeGwa(item);
                let status = gwaStatus(semesterGwa);
                if(sem == 2) {
                    sem = 1;
                } else sem = 2;

                let y = `${sem}${yearSuffix(sem)} `;
                return { sem: y, gwa: semesterGwa, status }
            });
            if(gwaList.length > 0) {
                let list: { sem: string, gwa: number, status: string }[] = [];
                for(let i = 0; i < (student.yearLevel * 2); i++) {
                    list.push(gwaList[i]);
                }
                setGwaList(list);
            }
        }
    }, [courseGradeList]);
}

export default SetGwaList;