import React, { useEffect, useState } from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PageContainer from '../shared/components/PageContainer'
import StudentRow from './StudentRow';
import useFetch from '../../hooks/useFetch';
import { User } from '../../types/studentTypes';

type StudentListProps = {
    handleOpenCard: () => void;
}


const StudentList = React.forwardRef<HTMLDivElement, StudentListProps>(({ handleOpenCard }, ref) => {

    const { data } = useFetch('user/get-users', 'GET');


    const [students, setStudents] = useState<User[] | []>([]);

    useEffect(() => {
        if(Array.isArray(data)) {
            const list = data.filter((d) => d.role === 'student');
            setStudents(list);
        }
    }, [data]);

    return (
        <PageContainer ref={ref} className='bg-cya-300 absolute w-full top-4 flex flex-col px-[3rem]'>
            <div className="bg-gree-200 flex h-[20%] relative">
            <h1 className="text-[2rem] font-bold text-slate-800 self-center">Students</h1>
            <FontAwesomeIcon className="absolute text-[1.3rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                icon={faX} onClick={handleOpenCard}/>
            </div>
            <div className="bg-blu-200 h-[80%] mb-[1rem] overflow-y-scroll">
            <table className="w-full font-semibold text-white">
                <thead className="bg-blue-500 sticky top-0">
                    <tr>
                        <th className="p-4 text-center">Student ID</th>
                        <th className="p-4 text-center">Name</th>
                        <th className="p-4 text-center">Year Level/Block</th>
                        <th className="p-4 text-center">Course</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {students.map((student, i) => <StudentRow key={i} student={student}/>)}
                </tbody>
            </table>
            </div>
        </PageContainer>
    )
})

export default StudentList