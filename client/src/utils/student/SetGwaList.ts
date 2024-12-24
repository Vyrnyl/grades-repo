import { useEffect } from "react";
import { CourseType } from "../../types/types";
import { computeGwa, gwaStatus } from "../gwaStatus";
import yearSuffix from "../yearSuffix";
import useGradeListStore from "../../store/useGradeListStore";


//HARD CODED

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

    const { setGradeList } = useGradeListStore();

    const setList = (list: CourseType[][]) => {

        // let semYear: string | number = '';
        let yr = student.studentId.split('-')[0];
        let studYear = Number(student.studentId.split('-')[0]);
        
        // console.log(list);
        let sem = 2;
        
        let gwaList = list.map((item, i) => {
            let semesterGwa = computeGwa(item);
            let status = gwaStatus(semesterGwa);
            if(sem == 2) {
                sem = 1;
            } else sem = 2;
            
            let y = `${sem}${yearSuffix(sem)} Semester ${yr.length === 4 ? Math.floor(studYear) : ''}`;
            studYear += .5;

            return { sem: y, gwa: semesterGwa, status }
        });

        if(gwaList.length > 0) {
            let glist: { sem: string, gwa: number, status: string }[] = [];
            let gradeList: CourseType[][] = [];
            for(let i = 0; i < (student.yearLevel * 2); i++) {
                glist.push(gwaList[i]);
                gradeList.push(list[i]);
            }
            setGradeList(gradeList);
            setGwaList(glist);
        }
    }
    
    useEffect(() => {

        if(courseGradeList.length > 0 && student.programCode === 'BSIT') {
            let firstYearfirstSem = courseGradeList.slice(0, 16).slice(0, 8);
            let firstYearsecondSem = courseGradeList.slice(0, 16).slice(8);

            let secondYearfirstSem = courseGradeList.slice(16, 32).slice(0, 8);
            let secondYearsecondSem = courseGradeList.slice(16, 32).slice(8);

            let thirdYearfirstSem = courseGradeList.slice(32, 43).slice(0, 5);
            let thirdYearsecondSem = courseGradeList.slice(32, 43).slice(5);

            let fourthYearfirstSem = courseGradeList.slice(43, 49).slice(0, 5);
            let fourthYearsecondSem = courseGradeList.slice(43, 49).slice(5);
            
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
            
            setList(list);
        }

        if(courseGradeList.length > 0 && student.programCode === 'BSCS') {
            let firstYearfirstSem = courseGradeList.slice(0, 17).slice(0, 8);
            let firstYearsecondSem = courseGradeList.slice(0, 17).slice(8);

            let secondYearfirstSem = courseGradeList.slice(17, 33).slice(0, 8);
            let secondYearsecondSem = courseGradeList.slice(17, 33).slice(8);

            let thirdYearfirstSem = courseGradeList.slice(33, 45).slice(0, 6);
            let thirdYearsecondSem = courseGradeList.slice(33, 45).slice(6);

            let fourthYearfirstSem = courseGradeList.slice(45, 51).slice(0, 3);
            let fourthYearsecondSem = courseGradeList.slice(45, 51).slice(3);
            
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
            
            setList(list);
        }

        if(courseGradeList.length > 0 && student.programCode === 'BSIS') {
            let firstYearfirstSem = courseGradeList.slice(0, 16).slice(0, 8);
            let firstYearsecondSem = courseGradeList.slice(0, 16).slice(8);

            let secondYearfirstSem = courseGradeList.slice(16, 32).slice(0, 8);
            let secondYearsecondSem = courseGradeList.slice(12, 32).slice(8);

            let thirdYearfirstSem = courseGradeList.slice(32, 46).slice(0, 7);
            let thirdYearsecondSem = courseGradeList.slice(32, 46).slice(7);

            let fourthYearfirstSem = courseGradeList.slice(46, 51).slice(0, 4);
            let fourthYearsecondSem = courseGradeList.slice(46, 51).slice(4);
            
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
            
            setList(list);
        }

        if(courseGradeList.length > 0 && student.programCode === 'BLIS') {
            let firstYearfirstSem = courseGradeList.slice(0, 16).slice(0, 8);
            let firstYearsecondSem = courseGradeList.slice(0, 16).slice(8);

            let secondYearfirstSem = courseGradeList.slice(16, 32).slice(0, 8);
            let secondYearsecondSem = courseGradeList.slice(12, 32).slice(8);

            let thirdYearfirstSem = courseGradeList.slice(32, 45).slice(0, 7);
            let thirdYearsecondSem = courseGradeList.slice(32, 45).slice(7);

            let fourthYearfirstSem = courseGradeList.slice(45, 51).slice(0, 4);
            let fourthYearsecondSem = courseGradeList.slice(45, 51).slice(4);
            
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
            
            setList(list);
        }

        if(courseGradeList.length > 0 && student.programCode === 'BSEMC') {
            let firstYearfirstSem = courseGradeList.slice(0, 15).slice(0, 8);
            let firstYearsecondSem = courseGradeList.slice(0, 15).slice(8);

            let secondYearfirstSem = courseGradeList.slice(15, 28).slice(0, 7);
            let secondYearsecondSem = courseGradeList.slice(15, 28).slice(7);

            let thirdYearfirstSem = courseGradeList.slice(28, 41).slice(0, 7);
            let thirdYearsecondSem = courseGradeList.slice(28, 41).slice(7);

            let fourthYearfirstSem = courseGradeList.slice(41, 48).slice(0, 6);
            let fourthYearsecondSem = courseGradeList.slice(41, 48).slice(6);
            
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
            
            setList(list);
        }
    }, [courseGradeList]);
}

export default SetGwaList;