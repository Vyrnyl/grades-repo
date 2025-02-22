import { useEffect, useState } from 'react'

import PageContainer from '../../components/shared/components/PageContainer'
import { AddedCourseType } from '../../types/types'
import GwaRow from '../../components/faculty/GwaRow'
import useUserStore from '../../store/useUserStore'
import getProgram from '../../utils/getProgram'
import getGwa from '../../utils/student/getGwa'
import { gwaStatus } from '../../utils/gwaStatus'
import useGwaListStore from '../../store/useGwaListStore'

type Record = {
    id: number,
    userId: number,
    courseId: number,
    grade: string,
    semester: number,
    yearLevel: number,
    addedCourse: AddedCourseType
}

const GWAStatus = ({ className } : { className: string }) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { userInfo } = useUserStore();
    
    const [studentRecords, setStudentRecords] = useState<Record[]>([]);

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
                    if(Array.isArray(data)) setStudentRecords(data);
                }

            } catch(e) {
                console.log(`Fetch Error${e}`)
            }
        };
        getAddedRecord();

    }, [userInfo]);
    
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

    
    
    //GWA LIST
    const [recordList, setRecordList] = useState<Record[]>([]);
    
    //Set record
    useEffect(() => {
        if(studentRecords.length > 0) {
            setRecordList(studentRecords.filter(item => {
                if(item.semester && item.yearLevel) return item
            }));
        }
    }, [studentRecords]);
    
    
    // const [gwaList, setGwaList] = useState<{ semester: number, gwa: number, status: string }[]>([]);
    const { gwaList, setGwaList } = useGwaListStore();
    
    const [firstSemFirstYearRecord, setFirstSemFirstYearRecord] = useState<Record[]>([]);
    const [secondSemFirstYearRecord, setSecondSemFirstYearRecord] = useState<Record[]>([]);

    const [firstSemSecondYearRecord, setFirstSemSecondYearRecord] = useState<Record[]>([]);
    const [secondSemSecondYearRecord, setSecondSemSecondYearRecord] = useState<Record[]>([]);

    const [firstSemThirdYearRecord, setFirstSemThirdYearRecord] = useState<Record[]>([]);
    const [secondSemThirdYearRecord, setSecondSemThirdYearRecord] = useState<Record[]>([]);

    const [firstSemFourthYearRecord, setFirstSemFourthYearRecord] = useState<Record[]>([]);
    const [secondSemFourthYearRecord, setSecondSemFourthYearRecord] = useState<Record[]>([]);

    const [firstOne, setFirstOne] = useState<any>();
    const [firstTwo, setFirstTwo] = useState<any>();

    const [secondOne, setSecondOne] = useState<any>();
    const [secondTwo, setSecondTwo] = useState<any>();

    const [thirdOne, setThirdOne] = useState<any>();
    const [thirdTwo, setThirdTwo] = useState<any>();

    const [fourthOne, setFourthOne] = useState<any>();
    const [fourthTwo, setFourthTwo] = useState<any>();

    //Set list
    useEffect(() => {
        setFirstSemFirstYearRecord(studentRecords.filter(item => item.yearLevel === 1 && item.semester === 1));
        setSecondSemFirstYearRecord(studentRecords.filter(item => item.yearLevel === 1 && item.semester === 2));

        setFirstSemSecondYearRecord(studentRecords.filter(item => item.yearLevel === 2 && item.semester === 1));
        setSecondSemSecondYearRecord(studentRecords.filter(item => item.yearLevel === 2 && item.semester === 2));

        setFirstSemThirdYearRecord(studentRecords.filter(item => item.yearLevel === 3 && item.semester === 1));
        setSecondSemThirdYearRecord(studentRecords.filter(item => item.yearLevel === 3 && item.semester === 2));

        setFirstSemFourthYearRecord(studentRecords.filter(item => item.yearLevel === 4 && item.semester === 1));
        setSecondSemFourthYearRecord(studentRecords.filter(item => item.yearLevel === 4 && item.semester === 2));
    }, [recordList]);
    
    useEffect(() => {
        if(firstSemFirstYearRecord.length > 0) {
            let gwa = getGwa(firstSemFirstYearRecord);
            setFirstOne({ semester: 1, yearLevel: 1, gwa, status: gwaStatus(gwa) });
        } else setFirstOne({ semester: 1, yearLevel: 1, gwa: '', status: '' });
        if(secondSemFirstYearRecord.length > 0) {
            let gwa = getGwa(secondSemFirstYearRecord);
            setFirstTwo({ semester: 2, yearLevel: 1, gwa, status: gwaStatus(gwa) });
        } else setFirstTwo({ semester: 2, yearLevel: 1, gwa: '', status: '' });

        if(firstSemSecondYearRecord.length > 0) {
            let gwa = getGwa(firstSemSecondYearRecord);
            setSecondOne({ semester: 1, yearLevel: 2, gwa, status: gwaStatus(gwa) });
        } else setSecondOne({ semester: 1, yearLevel: 2, gwa: '', status: '' });
        if(secondSemSecondYearRecord.length > 0) {
            let gwa = getGwa(secondSemSecondYearRecord);
            setSecondTwo({ semester: 2, yearLevel: 2, gwa, status: gwaStatus(gwa) });
        } else setSecondTwo({ semester: 2, yearLevel: 2, gwa: '', status: '' });

        if(firstSemThirdYearRecord.length > 0) {
            let gwa = getGwa(firstSemThirdYearRecord);
            setThirdOne({ semester: 1, yearLevel: 3, gwa, status: gwaStatus(gwa) });
        } else setThirdOne({ semester: 1, yearLevel: 3, gwa: '', status: '' });
        if(secondSemThirdYearRecord.length > 0) {
            let gwa = getGwa(secondSemThirdYearRecord);
            setThirdTwo({ semester: 2, yearLevel: 3, gwa, status: gwaStatus(gwa) });
        } else setThirdTwo({ semester: 2, yearLevel: 3, gwa: '', status: '' });

        if(firstSemFourthYearRecord.length > 0) {
            let gwa = getGwa(firstSemFourthYearRecord);
            setFourthOne({ semester: 1, yearLevel: 4, gwa, status: gwaStatus(gwa) });
        } else setFourthOne({ semester: 1, yearLevel: 4, gwa: '', status: '' });
        if(secondSemFourthYearRecord.length > 0) {
            let gwa = getGwa(secondSemFourthYearRecord);
            setFourthTwo({ semester: 2, yearLevel: 4, gwa, status: gwaStatus(gwa) });
        } else setFourthTwo({ semester: 2, yearLevel: 4, gwa: '', status: '' });
    }, [
        firstSemFirstYearRecord,
        secondSemFirstYearRecord,

        firstSemSecondYearRecord,
        secondSemSecondYearRecord,

        firstSemThirdYearRecord,
        secondSemThirdYearRecord,

        firstSemFourthYearRecord,
        secondSemFourthYearRecord
    ]);

    //Set GWA List
    useEffect(() => {
        setGwaList([
            firstOne, firstTwo, 
            secondOne, secondTwo, 
            thirdOne, thirdTwo, 
            fourthOne, fourthTwo
        ]);

        if(userInfo?.yearLevel) {
            for(let i = 0; i < (4 - userInfo.yearLevel); i++) {
                setGwaList(prev => prev.slice(0, -2));
            };
        }
    }, [
        firstOne, firstTwo,
        secondOne, secondTwo,
        thirdOne, thirdTwo,
        fourthOne, fourthTwo,
        userInfo
    ]);
    
    return (
        <PageContainer className={`${className} px-16`}>
            <div className='bg-cyn-200 font-[550] text-slate-700 flex flex-[.18] gap-10 mt-2'>
                <div className='flex flex-col gap-2 self-end'>
                    <p>Name: {`${userInfo?.firstName.toUpperCase() || ''}, ${userInfo?.lastName.toUpperCase() || ''} 
                    ${userInfo?.middleName && userInfo?.middleName !== '' ? `${userInfo?.middleName.charAt(0)}.` : ''}`}</p>
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
                            <th className="px-4 py-4 text-center w-[10rem]">Remarks</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {gwaList.map((item, i) => {
                            return <GwaRow key={i} gwa={item}/>
                        })}
                    </tbody>
                </table>
            </div>
        </PageContainer>
    )
}

export default GWAStatus