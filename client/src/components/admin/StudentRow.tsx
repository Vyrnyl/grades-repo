import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../types/studentTypes';
import { useState } from 'react';
import { deleteUser } from './utils';
import EditForm from './EditForm';

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
    fullName: `${student.firstName} ${student.lastName}`,
    yearBlock: `${student.yearLevel || ''}${student.block || ''}`,
    // programId: String(programId),
    status
  });
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    let fullName = updateData.fullName.split(' ');
    let yearBlock = updateData.yearBlock.split('');

    const updateUser = async () => {

      setIsOpen(!isOpen);
      const updatedData = {
        id,
        studentId: updateData.studentId,
        firstName: fullName[0],
        lastName: fullName[fullName.length - 1],
        yearLevel: Number(yearBlock[0]),
        block: yearBlock[1],
        // programId: Number(updateData.programId),
        status: updateData.status
      }
      console.log(updateData);
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

        if(res.ok && data) {
          setStudentData({...updatedData, program});
        }

      } catch(error) {
        console.log("Fetch error" + error);
      }
    }

    updateUser();
  }

  //Delete User
  const [isDelete, setIsDelete] = useState(false);


  return (
    <tr className="bg-slate-100 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
        <td className="p-4 text-center">{studentData.studentId || ''}</td>
        <td className="p-4 text-center">{`${studentData.firstName} ${studentData.lastName}`}</td>
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
                  />
                }
                
                <FontAwesomeIcon className="text-blue-500 active:text-white" 
                  icon={faPenToSquare} onClick={() => setIsOpen(!isOpen)}/>
                <FontAwesomeIcon className="text-red-500 active:text-white" 
                  icon={faTrashCan} onClick={() => setIsDelete(!isDelete)}/>

                {isDelete && 
                  <div className='bg-slate-300 absolute px-8 py-10 left-[50%] top-[50%] 
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