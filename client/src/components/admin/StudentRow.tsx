import { faPenToSquare, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../types/studentTypes';
import { useState } from 'react';
import Input from '../shared/components/Input';
import SaveButton from '../shared/components/SaveButton';
import SelectInput from './SelectInput';
import handleSelectChange from '../../utils/handleSelectChange';
import handleInputChange from '../../utils/handleInputChange';

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

type UpdateData = {
  id: number,
  studentId: string,
  fullName: string,
  yearBlock: string,
  programId: string,
  status: string
}

const StudentRow = ({ student }: { student: User }) => {
  
  const {
    id,
    studentId,
    firstName,
    lastName,
    yearLevel,
    block,
    programId,
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
  const [updateData, setUpdateData] = useState<UpdateData>({
    id,
    studentId,
    fullName: `${student.firstName} ${student.lastName}`,
    yearBlock: `${student.yearLevel || ''}${student.block || ''}`,
    programId: String(programId),
    status
  });
  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('atoken');
    console.log("kek")
    let fullName = updateData.fullName.split(' ');
    let yearBlock = updateData.yearBlock.split('');

    const updateUser = async () => {

      const updatedData = {
        id,
        studentId: updateData.studentId,
        firstName: fullName[0],
        lastName: fullName[fullName.length - 1],
        yearLevel: Number(yearBlock[0]),
        block: yearBlock[1],
        programId: Number(updateData.programId),
        status: updateData.status
      }
      console.log(updateData);
      try {
        const res = await fetch('http://localhost:8000/user/update-user', {
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
        console.log("Fetch error");
      }
    }

    updateUser();
  }

  
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
                  <div className='bg-white absolute px-[1rem] py-[1.5rem] z-10 left-[50%] top-[50%] 
                    translate-y-[-50%] translate-x-[-50%] card-shadow rounded-lg'>
                    <FontAwesomeIcon className="absolute text-[1rem] right-[.8rem] top-4 font-bold hover:scale-110 active:scale-100" 
                    icon={faX} onClick={() => setIsOpen(!isOpen)}/>
                    <h1 className="text-[1.5rem] font-bold text-slate-700 self-center mb-2 text-center">Edit</h1>
                    <form onSubmit={handleUpdate} className='bg-gree-200 flex flex-col gap-4'>
                      <Input type='text' className='w-[15rem] h-[2rem]' name='studentId' value={updateData.studentId} 
                        onChange={(e) => handleInputChange(e, setUpdateData)}/>
                      <Input type='text' className='w-[15rem] h-[2rem]' name='fullName' 
                        value={updateData.fullName}
                        onChange={(e) => handleInputChange(e, setUpdateData)}/>
                      <Input type='text' max={2} className='w-[15rem] h-[2rem]' name='yearBlock' 
                        value={updateData.yearBlock}
                        onChange={(e) => handleInputChange(e, setUpdateData)}/>
                      <SelectInput className='w-[15rem] h-[2rem] self-center' value={updateData.programId.toString()}
                        onChange={(e) => handleSelectChange(e, setUpdateData)} name='programId'>
                        <option value="1">BS Accountancy</option>
                        <option value="2">BS Business Administration</option>
                        <option value="3">BS Management Accounting</option>
                      </SelectInput>
                      <SelectInput className='w-[10rem] h-[2rem] self-center'
                        name='status' value={updateData.status === 'Enrolled' ? updateData.status : 'Unenrolled'}
                        onChange={(e) => handleSelectChange(e, setUpdateData)}>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Unenrolled">Unenrolled</option>
                      </SelectInput>
                      <SaveButton className='w-[50%] self-center bg-blue-500 text-white'/>
                    </form>
                  </div>
                }
                <FontAwesomeIcon className="text-blue-500 active:text-white" icon={faPenToSquare} onClick={() => setIsOpen(!isOpen)}/>
                <FontAwesomeIcon className="text-red-500 active:text-white" icon={faTrashCan}/>
            </div>
        </td>
    </tr>
  )
}

export default StudentRow