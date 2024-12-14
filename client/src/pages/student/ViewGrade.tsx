
import { useEffect, useState } from 'react';
import PageContainer from '../../components/shared/components/PageContainer'
import EnrolledRow from '../../components/student/EnrolledRow'
import useFetch from '../../hooks/useFetch';
import { CourseType, StudentRecord } from '../../types/types';
import SetCourseList from '../../utils/student/SetCourseList';

type Student = {
    studentId: string,
    firstName: string,
    lastName: string,
    yearLevel: number,
    block: string,
    programCode: string,
    period: string
};

const ViewGrade = () => {

    const { data } = useFetch('grade/get-grades', 'GET');
    
    const [studentData, setStudentData] = useState<StudentRecord[]>([]);
    const [courseGradeList, setCourseGradeList] = useState<CourseType[]>([]);
    const [filteredCourseList, setFilteredCourseList] = useState<CourseType[]>([]);
    const [semester, setSemester] = useState(2);
    
    //Set list
    useEffect(() => {
        if(Array.isArray(data)) {
            setStudentData(data);
            if(data[0].bsitStudentRecord.length > 0) setCourseGradeList(data[0].bsitStudentRecord);
            if(data[0].bscsStudentRecord.length > 0) setCourseGradeList(data[0].bscsStudentRecord);
            if(data[0].bsisStudentRecord.length > 0) setCourseGradeList(data[0].bsisStudentRecord);
            if(data[0].blisStudentRecord.length > 0) setCourseGradeList(data[0].blisStudentRecord);
            if(data[0].bsemcStudentRecord.length > 0) setCourseGradeList(data[0].bsemcStudentRecord);
        }
    }, [data]);

    let student: Student = {
        studentId: '',
        firstName: '',
        lastName: '',
        yearLevel: 0,
        block: '',
        programCode: '',
        period: ''
    };

    const date = new Date();
    let currentYear = date.getFullYear();
    if(studentData.length > 0) {
        student.studentId = studentData[0].studentId;
        student.firstName = studentData[0].firstName;
        student.lastName = studentData[0].lastName;
        student.yearLevel = studentData[0].yearLevel;
        student.block = studentData[0].block;
        student.programCode = studentData[0].program.programCode;
        student.period = semester == 1 ? `FIRST SEMESTER ${currentYear}-${currentYear + 1}` : 
        `SECOND SEMESTER ${currentYear}-${currentYear + 1}`;
    }
    


    //Course List
    useEffect(() => {
        SetCourseList(courseGradeList, student, semester, setFilteredCourseList);
    }, [courseGradeList]);
    
    //GWA
    let gwa = 0;
    let totalUnits= 0;
    let weightedSum = 0;

    const curriculumKeys = [
        "bsitCurriculum",
        "bscsCurriculum",
        "bsisCurriculum",
        "blisCurriculum",
        "bsemcCurriculum"
    ] as (keyof CourseType)[];
    
    filteredCourseList.forEach((course) => {
        curriculumKeys.forEach((key) => {
            const curriculum = course[key];
            if (course.grade && typeof curriculum === "object" && curriculum?.units) {
                weightedSum += curriculum.units * course.grade;
                totalUnits += curriculum.units;
            }
        });
    });
    
    gwa = parseFloat((weightedSum / totalUnits).toFixed(1)) || 0;

    
    return (
        <PageContainer className='px-12'>
            <div className='flex-[.15] flex'>
                <h1 className='text-[2rem] font-medium text-slate-700 self-center'>Student Grade Details</h1>
            </div>
            <div className='font-[550] text-slate-700 flex gap-10 mt-2'>
                <div className='flex flex-col gap-2'>
                    <p>Student Name: {`${student?.firstName.charAt(0) == '@' ? 
          student.firstName.slice(1).toUpperCase() : student?.firstName.toUpperCase()}, ${student.lastName.toUpperCase()}`}</p>
                    <p>ID No: {student.studentId}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Program/Block/Year: {`${student.programCode}/${student.block || ''}/${student.yearLevel || ''}`}</p>
                    <p>Period: {student.period}</p>
                </div>
            </div>
            <div className='mb-6 flex-1 mt-8 overflow-y-scroll'>
                <table className="w-full font-semibold text-white">
                    <thead className="bg-blue-500 sticky top-0 z-10">
                        <tr>                  
                            <th className="px-4 py-4 text-center min-w-[8rem]">Course Title</th>
                            <th className="px-4 py-4 text-center w-[10rem]">Units</th>
                            <th className="px-4 py-4 text-center w-[10rem]">Semester</th>
                            <th className="px-4 py-4 text-center w-[10rem]">Grade</th>
                            <th className="px-4 py-4 text-center w-[8rem]">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredCourseList.map((course, i) => 
                            <EnrolledRow 
                                key={i}
                                course={course}
                                sem={semester}
                            />)}
                        <tr>
                            <td className='border-b-2 border-l-2 border-slate-500'></td>
                            <td className='border-b-2 border-slate-500'></td>
                            <td className='border-b-2 border-slate-500'></td>
                            <td className='border-b-2 border-slate-500'></td>
                            <td className='px-2 py-2 text-center font-bold 
                            border-b-2 border-r-2 border-slate-500'>GWA: {gwa}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </PageContainer>
    )
}

export default ViewGrade