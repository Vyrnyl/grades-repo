
import { useEffect, useState } from 'react';
import PageContainer from '../../components/shared/components/PageContainer'
import EnrolledRow from '../../components/student/EnrolledRow'
import useFetch from '../../hooks/useFetch';
import { AddedCourseRecord, CourseType, StudentRecord } from '../../types/types';
import SetCourseList from '../../utils/student/SetCourseList';
import useSemStore from '../../store/useSemStore';
import useUserStore from '../../store/useUserStore';
import useAssignedCourses from '../../store/useAssignedCourses';

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

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { userInfo } = useUserStore();

    const { data } = useFetch('grade/get-grades', 'GET');
    
    const [studentData, setStudentData] = useState<StudentRecord[]>([]);
    const [courseGradeList, setCourseGradeList] = useState<CourseType[]>([]);
    const [filteredCourseList, setFilteredCourseList] = useState<CourseType[]>([]);
    // const [semester, setSemester] = useState(1);
    const { semester, setSemester } = useSemStore();
    
    //Set list
    useEffect(() => {
        if(Array.isArray(data)) {
            setStudentData(data);
            if (data[0].bsitStudentRecord.length > 0 && data[0].program.programCode === 'BSIT') {
                setCourseGradeList(data[0].bsitStudentRecord);
            } else if (data[0].bscsStudentRecord.length > 0 && data[0].program.programCode === 'BSCS') {
                setCourseGradeList(data[0].bscsStudentRecord);
            } else if (data[0].bsisStudentRecord.length > 0 && data[0].program.programCode === 'BSIS') {
                setCourseGradeList(data[0].bsisStudentRecord);
            } else if (data[0].blisStudentRecord.length > 0 && data[0].program.programCode === 'BLIS') {
                setCourseGradeList(data[0].blisStudentRecord);
            } else if (data[0].bsemcStudentRecord.length > 0 && data[0].program.programCode === 'BSEMC') {
                setCourseGradeList(data[0].bsemcStudentRecord);
            }
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
    const [addedRecord, setAddedRecord] = useState<AddedCourseRecord[]>([]);
    useEffect(() => {
        // if(Array.isArray(addedCourseRecord.data)) setAddedRecord(addedCourseRecord.data);

        const getAddedRecord = async () => {
            try {
                const res = await fetch(`${apiUrl}/grade/get-added-record`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token ? token : '',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userInfo?.id })
                });
                const data = await res.json();
                
                if(res.ok && data) {
                    if(Array.isArray(data)) setAddedRecord(data);
                }

            } catch(e) {
                console.log(`Fetch Error${e}`)
            }
        };
        getAddedRecord();

    }, [userInfo]);

    useEffect(() => {
        SetCourseList(courseGradeList, student, semester, addedRecord, setFilteredCourseList);
    }, [courseGradeList, semester, addedRecord]);
    



    //ASSIGNED COURSES
    const [enrolledCourses, setEnrolledCourses] = useState<{ id: number, userId: number, courseCode: string, semester: number, yearLevel: number }[]>([]);
    // const [assignedCourses, setAssignedCourse] = useState<(AddedCourseRecord)[]>([]);
    const { assignedCourses, setAssignedCourses } = useAssignedCourses();
    
    useEffect(() => {
        const getAssignedCourses = async () => {
            try {
                const res = await fetch(`${apiUrl}/program/get-assigned-courses`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token ? token : '',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userInfo?.id })
                });
                const data = await res.json();
                
                if(Array.isArray(data)) {
                    if(data.length > 0)
                        setEnrolledCourses(data);
                }
                

            } catch(e) {
                console.log('Fetch Error')
            }
        }
        getAssignedCourses();

    }, [userInfo]);

    //Filter AddedRecord to Assigned Courses
    useEffect(() => {
        let courses = enrolledCourses.filter(item => item.semester === semester).map(element => {
            // let course = addedRecord.find(course => course.addedCourse?.courseCode === element.courseCode);
            let course = addedRecord.find(course => course.addedCourse?.courseCode === element.courseCode);
            
            return course;
        });

        const filteredRecords = courses.filter(
            (record): record is AddedCourseRecord => record !== undefined
          );
          
        setAssignedCourses(filteredRecords);
        // setAssignedCourses(enrolledCourses);
    }, [enrolledCourses, semester]);
    
    //GWA
    let gwa = 0;
    let totalUnits= 0;
    let weightedSum = 0;
    
    assignedCourses.map(course => {
        if(course.addedCourse && course.grade) {
            totalUnits += course.addedCourse?.units;
            weightedSum += Number(course.grade) * course.addedCourse?.units;
        }
    });
    
    gwa = parseFloat((weightedSum / totalUnits).toFixed(1)) || 0;
    
    //OLD GWA CALC
    // const curriculumKeys = [
    //     "bsitCurriculum",
    //     "bscsCurriculum",
    //     "bsisCurriculum",
    //     "blisCurriculum",
    //     "bsemcCurriculum",
    //     "addedCourse"
    // ] as (keyof CourseType)[];
    
    // filteredCourseList.forEach((course) => {
    //     curriculumKeys.forEach((key) => {
    //         const curriculum = course[key];
    //         if (course.grade && typeof curriculum === "object" && curriculum?.units) {
    //             weightedSum += curriculum.units * course.grade;
    //             totalUnits += curriculum.units;
    //         }
    //     });
    // });
    
    
    return (
        <PageContainer className='px-12'>
            <div className='flex-[.15] flex'>
                <h1 className='text-[2rem] font-medium text-slate-700 self-center'>Student Grade Details</h1>
            </div>
            <div className='bg-cya-200 font-[550] text-slate-700 flex gap-10 mt-2 relative'>
                <div className='bg-blu-200 flex flex-col gap-2'>
                    <p>Student Name: {`${student?.firstName.charAt(0) == '@' ? 
          student.firstName.slice(1).toUpperCase() : student?.firstName.toUpperCase()}, ${student.lastName.toUpperCase()}`}</p>
                    <p>ID No: {student.studentId}</p>
                </div>
                <div className='bg-pin-200 flex flex-col gap-2'>
                    <p>Program/Block/Year: {`
                        ${student.programCode}
                        ${student.block ? `/${student.block}` : ''}
                        ${student.yearLevel ? `/${student.yearLevel}` : ''}`}</p>
                    <p>Period: {student.period}</p>
                </div>

                <select value={semester} onChange={(e) => setSemester(Number(e.target.value))} className='h-[1.5rem] text-[.8rem] text-slate-600 font-semibold rounded-sm border-2
                 border-slate-700 absolute bottom-0 right-0'>
                    <option className='text-[.8rem] text-slate-600 font-semibold' value={'1'}>1st Sem</option>
                    <option className='text-[.8rem] text-slate-600 font-semibold' value={'2'}>2nd Sem</option>
                </select>
            </div>
            <div className='mb-6 flex-1 mt-8 overflow-y-scroll'>
                <table className="w-full font-semibold text-white">
                    <thead className="bg-blue-500 sticky top-0 z-10">
                        <tr>     
                            <th>Professor</th>             
                            <th className="px-4 py-4 text-center min-w-[8rem]">Course Title</th>
                            <th className="px-4 py-4 text-center w-[10rem]">Units</th>
                            <th className="px-4 py-4 text-center w-[10rem]">Semester</th>
                            <th className="px-4 py-4 text-center w-[10rem]">Grade</th>
                            <th className="px-4 py-4 text-center w-[8rem]">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {assignedCourses.map((course, i) => 
                            <EnrolledRow 
                                key={i}
                                course={course}
                                sem={semester}
                                user={userInfo}
                            />)}
                        <tr>
                            <td className='border-b-2 border-l-2 border-slate-500'></td>
                            <td className='border-b-2 border-slate-500'></td>
                            <td className='border-b-2 border-slate-500'></td>
                            <td className='border-b-2 border-slate-500'></td>
                            <td className='border-b-2 border-slate-500'></td>
                            <td className='px-2 py-2 text-center font-bold 
                            border-b-2 border-r-2 border-slate-500'>GWA: {(Number.isInteger(Number(gwa)) ? `${gwa}.0` : gwa)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </PageContainer>
    )
}

export default ViewGrade