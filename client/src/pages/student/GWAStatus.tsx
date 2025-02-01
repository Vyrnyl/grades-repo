import { Fragment, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'

import PageContainer from '../../components/shared/components/PageContainer'
import { AddedCourseType, CourseType, StudentRecord } from '../../types/types'
import GwaRow from '../../components/faculty/GwaRow'
import SetGwaList from '../../utils/student/SetGwaList'
import useGwaListStore from '../../store/useGwaListStore'
import useUserStore from '../../store/useUserStore'
import getProgram from '../../utils/getProgram'

type Student = {
    studentId: string,
    firstName: string,
    lastName: string,
    yearLevel: number,
    programCode: string
};

type Record = {
    id: number,
    userId: number,
    courseId: number,
    grade: string,
    addedCourse: AddedCourseType
}

const GWAStatus = ({ className } : { className: string }) => {
    
    // const { data } = useFetch('grade/get-grades', 'GET');

    // const [studentData, setStudentData] = useState<StudentRecord[]>([]);
    // const [courseGradeList, setCourseGradeList] = useState<CourseType[]>([]);
    // // const [gwaList, setGwaList] = useState<{ sem: string, gwa: number, status: string }[]>([]);
    // const { gwaList, setGwaList } = useGwaListStore();
    
    
    //Set list
    // useEffect(() => {
    //     if(Array.isArray(data)) {
    //         setStudentData(data);
    //         if (data[0].bsitStudentRecord.length > 0 && data[0].program.programCode === 'BSIT') {
    //             setCourseGradeList(data[0].bsitStudentRecord);
    //         } else if (data[0].bscsStudentRecord.length > 0 && data[0].program.programCode === 'BSCS') {
    //             setCourseGradeList(data[0].bscsStudentRecord);
    //         } else if (data[0].bsisStudentRecord.length > 0 && data[0].program.programCode === 'BSIS') {
    //             setCourseGradeList(data[0].bsisStudentRecord);
    //         } else if (data[0].blisStudentRecord.length > 0 && data[0].program.programCode === 'BLIS') {
    //             setCourseGradeList(data[0].blisStudentRecord);
    //         } else if (data[0].bsemcStudentRecord.length > 0 && data[0].program.programCode === 'BSEMC') {
    //             setCourseGradeList(data[0].bsemcStudentRecord);
    //         }
    //     }
    // }, [data]);

    // //Student info
    // let student: Student = {
    //     studentId: '',
    //     firstName: '',
    //     lastName: '',
    //     yearLevel: 0,
    //     programCode: ''
    // };
    // if(studentData.length > 0) {
    //     student.studentId = studentData[0].studentId;
    //     student.firstName = studentData[0].firstName;
    //     student.lastName = studentData[0].lastName;
    //     student.yearLevel = studentData[0].yearLevel;
    //     student.programCode = studentData[0].program.programCode;
    // }
    
    //Course List
    // SetGwaList(courseGradeList, setGwaList, student);

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { userInfo } = useUserStore();

    const record = useFetch('grade/get-added-record', 'POST', JSON.stringify({ userId: 7 }));
    const [studentRecords, setStudentRecords] = useState<Record[]>([]);

    //Set Records
    useEffect(() => {
        if(Array.isArray(record.data)) setStudentRecords(record.data);
    }, [record.data]);
    
    
    //ASSIGNED COURSES
    const [enrolledCourses, setEnrolledCourses] = useState<{ id: number, userId: number, courseCode: string, semester: number, yearLevel: number }[]>([]);
    
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

    
    console.log(record.data)


    return (
        <PageContainer className={`${className} px-16`}>
            <div className='bg-cyn-200 font-[550] text-slate-700 flex flex-[.18] gap-10 mt-2'>
                <div className='flex flex-col gap-2 self-end'>
                    <p>Name: {`${userInfo?.firstName.toUpperCase() || ''}, ${userInfo?.lastName.toUpperCase() || ''}`}</p>
                    <p>ID No: {userInfo?.studentId}</p>
                </div>
                <div className='flex flex-col gap-2 self-end'>
                    <p>Program: {getProgram(userInfo?.programId || 0)}</p>
                    <p>Year: {userInfo?.yearLevel || ''}</p>
                </div>
            </div>

            <div className='mb-6 flex-1 mt-8 overflow-y-scroll'>
                <table className="w-[45rem] font-semibold text-white">
                    <thead className="bg-blue-500 sticky top-0 z-10">
                        <tr>                  
                            <th className="px-4 py-4 text-center w-[10rem]">Semester</th>
                            <th className="px-4 py-4 text-center w-[10rem]">GWA</th>
                            <th className="px-4 py-4 text-center w-[10rem]">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        <GwaRow/>
                        <GwaRow/>
                        <GwaRow/>
                    </tbody>
                </table>
            </div>
        </PageContainer>
    )
}

export default GWAStatus