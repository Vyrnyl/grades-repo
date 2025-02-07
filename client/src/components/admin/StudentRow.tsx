import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../types/studentTypes';
import { useRef, useState } from 'react';
import { deleteUser } from './utils';
import EditForm from './EditForm';
import getProgramId from '../../utils/getProgramId';
import getProgramName from '../../utils/getProgramName';
import yearSuffix from '../../utils/yearSuffix';
import HandleOutsideClick from '../../utils/HandleOutsideClick';
import isValidFormat from '../../utils/admin/isValidFormat';

type StudentData = {
  id: number,
  studentId: string,
  firstName: string,
  lastName: string,
  yearLevel: number,
  block: string,
  program: string,
  status: string
}

type StudentRowProps = {
  student: User,
  setStudents: React.Dispatch<React.SetStateAction<[] | User[]>>
}

const StudentRow = ({ student, setStudents }: StudentRowProps) => {
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');

  const {
    id,
    studentId,
    firstName,
    lastName,
    yearLevel,
    block,
    // programId,
    status
  } = student;



  let program = '';
  if(student?.program) {
    const { programName } = student.program;
    program = `BS ${programName.split(' in ')[1]}`;

    if(programName.split(' ')[2].charAt(0) === 'L') 
      program = `BL ${programName.split('and')[1]}`;
  }
  

  const [studentData, setStudentData] = useState<StudentData>({
    id,
    studentId,
    firstName,
    lastName,
    yearLevel,
    block,
    program,
    status
  });

  //Update
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState<Record<string, any>>({
    id,
    studentId,
    firstName: `${student.firstName}`,
    lastName: student.lastName,
    yearLevel: `${student.yearLevel}${yearSuffix(student.yearLevel)}` || '',
    block: student.block || '',
    programId: program,
    status
  });
  
  
  const [isUserIdExist, setIsUserIdExist] = useState(false);
  const [isValidIDFormat, setIsValidIDFormat] = useState(false);
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // let fullName = updateData.fullName.split(' ');
    // let yearBlock = updateData.yearBlock.split('');

    const updateUser = async () => {
      setIsValidIDFormat(false);
      setIsUserIdExist(false);
      const updatedData = {
        id,
        studentId: updateData.studentId,
        firstName: student?.firstName.charAt(0) === '@' ?  `@${updateData.firstName}` : updateData.firstName,
        lastName: updateData.lastName,
        yearLevel: typeof updateData.yearLevel == 'string' ? Number(updateData.yearLevel.charAt(0)) : updateData.yearLevel,
        block: updateData.block,
        programId: getProgramId(updateData.programId),
        status: updateData.status
      }
      
      try {
        const res = await fetch(`${apiUrl}/user/update-user`, {
          method: 'PUT',
          headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(updatedData)
        });

        const data = await res.json();

        if(res.ok && res.status !== 409) {
          setStudentData({...updatedData, program: getProgramName(data.programId)});
          setIsOpen(false);
          setIsUserIdExist(false);
          setIsValidIDFormat(false);
        } else setIsUserIdExist(true);

      } catch(error) {
        console.log("Fetch error" + error);
      }
    }

    if(isValidFormat(updateData.studentId)) 
      updateUser();
    else setTimeout(() => {
      setIsValidIDFormat(true);
      setIsUserIdExist(false);  
    }, 100);
  }

  //Delete User
  const [isDelete, setIsDelete] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  HandleOutsideClick(ref, setIsDelete);
  
  return (
    <tr className="bg-slate-100 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
        <td className="p-4 text-center">{studentData.studentId || ''}</td>
        <td className="p-4 text-center">{`${studentData.firstName.charAt(0) == '@' ? 
          studentData.firstName.slice(1) : studentData.firstName} ${studentData.lastName}`}</td>
        <td className="p-4 text-center">{`${studentData.yearLevel || ''}${studentData.block || ''}`}</td>
        <td className="p-4 text-center">{studentData.program}</td>
        <td className="p-4 text-center">{studentData.status || ''}</td>
        <td className="py-4 px-10">
            <div className="flex gap-6 justify-center">
                {isOpen && 
                  <EditForm
                    handleUpdate={handleUpdate}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    updateData={updateData}
                    setUpdateData={setUpdateData}
                    isExist={isUserIdExist}
                    isValidID={isValidIDFormat}
                  />
                }
                
                <FontAwesomeIcon className="text-blue-500 active:text-white" 
                  icon={faPenToSquare} onClick={() => setIsOpen(!isOpen)}/>
                <FontAwesomeIcon className="text-red-500 active:text-white" 
                  icon={faTrashCan} onClick={() => setIsDelete(!isDelete)}/>

                {isDelete && 
                  <div ref={ref} className='bg-slate-300 absolute px-8 py-10 left-[50%] top-[50%] 
                    translate-y-[-50%] translate-x-[-50%] flex flex-col gap-4 rounded-lg'>
                    <h1 className='text-slate-700 font-semibold text-[1.2rem] text-center'>Are you sure?</h1>
                    <div className='bg-cya-300 flex gap-4'>
                      <button className='bg-slate-500 text-white px-2 py-[.2rem] rounded-md'
                        onClick={() => setIsDelete(false)}>Cancel</button>
                      <button className='bg-red-500 text-white px-2 py-[.2rem] rounded-md'
                        onClick={() => deleteUser({setIsDelete, setStudents, student})}>Delete</button>
                    </div>
                  </div>
                }
            </div>
        </td>
    </tr>
  )
}

export default StudentRow