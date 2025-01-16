import { Fragment, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'

import PageContainer from '../../components/shared/components/PageContainer'
import { CourseType, StudentRecord } from '../../types/types'
import GwaRow from '../../components/faculty/GwaRow'
import SetGwaList from '../../utils/student/SetGwaList'
import useGwaListStore from '../../store/useGwaListStore'

type Student = {
    studentId: string,
    firstName: string,
    lastName: string,
    yearLevel: number,
    programCode: string
};

const GWAStatus = ({ className } : { className: string }) => {

    const { data } = useFetch('grade/get-grades', 'GET');

    const [studentData, setStudentData] = useState<StudentRecord[]>([]);
    const [courseGradeList, setCourseGradeList] = useState<CourseType[]>([]);
    // const [gwaList, setGwaList] = useState<{ sem: string, gwa: number, status: string }[]>([]);
    const { gwaList, setGwaList } = useGwaListStore();
    
    // console.log(gwaList)
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

    //Student info
    let student: Student = {
        studentId: '',
        firstName: '',
        lastName: '',
        yearLevel: 0,
        programCode: ''
    };
    if(studentData.length > 0) {
        student.studentId = studentData[0].studentId;
        student.firstName = studentData[0].firstName;
        student.lastName = studentData[0].lastName;
        student.yearLevel = studentData[0].yearLevel;
        student.programCode = studentData[0].program.programCode;
    }

    //Course List
    SetGwaList(courseGradeList, setGwaList, student);
    
    return (
        <PageContainer className={`${className} px-16`}>
            <div className='bg-cyn-200 font-[550] text-slate-700 flex flex-[.18] gap-10 mt-2'>
                <div className='flex flex-col gap-2 self-end'>
                    <p>Name: {`${student?.firstName.charAt(0) == '@' ? student.firstName.slice(1).toUpperCase() : 
                        student?.firstName.toUpperCase() || ''}, ${student.lastName.toUpperCase()}`}</p>
                    <p>ID No: {student.studentId}</p>
                </div>
                <div className='flex flex-col gap-2 self-end'>
                    <p>Program: {student.programCode}</p>
                    <p>Year: {student.yearLevel}</p>
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
                        {gwaList.map((gwaInfo, i) => {
                            return ((i + 1) % 2 == 0 || i == 0) ? <GwaRow key={i} gwaInfo={gwaInfo}/> :
                            <Fragment key={i}>
                                <tr className='h-4'></tr>
                                <GwaRow gwaInfo={gwaInfo}/>
                            </Fragment>
                        })}
                    </tbody>
                </table>
            </div>
        </PageContainer>
    )
}

export default GWAStatus