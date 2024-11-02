import { faPenToSquare, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../types/studentTypes';
import { useState } from 'react';
import Input from '../shared/components/Input';
import SaveButton from '../shared/components/SaveButton';
import SelectInput from './SelectInput';
import handleSelectChange from '../../utils/handleSelectChange';
import handleInputChange from '../../utils/handleInputChange';

type UpdateData = {
  studentId: string,
  fullName: string,
  yearLevel: number,
  block: string,
  status: string
}

const StudentRow = ({ student }: { student: User }) => {
  
  const {
    studentId,
    firstName,
    lastName,
    yearLevel,
    block,
    status
  } = student;

  let program = '';
  if(student?.program) {
    const { programName } = student.program;
    program = `BS ${programName.split(' in ')[1]}`;
  }


  //Update
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState<UpdateData>({
    studentId,
    fullName: `${student.firstName} ${student.lastName}`,
    yearLevel,
    block,
    status
  });

  const handleEdit = () => {
    setIsOpen(!isOpen);

    // setUpdateData((prev) => ({...prev, status: e.target.value}));
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
  }

  console.log(updateData)
  return (
    <tr className="bg-slate-100 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
        <td className="p-4 text-center">{studentId || ''}</td>
        <td className="p-4 text-center">{`${firstName} ${lastName}`}</td>
        <td className="p-4 text-center">{`${yearLevel || ''}${block || ''}`}</td>
        <td className="p-4 text-center">{program}</td>
        <td className="p-4 text-center">{status || ''}</td>
        <td className="py-4 px-10">
            <div className="flex gap-6 justify-center">
                {isOpen && 
                  <div className='bg-white absolute px-[1rem] py-[1.5rem] z-10 left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] 
                    card-shadow rounded-lg'>
                    <FontAwesomeIcon className="absolute text-[1rem] right-[.8rem] top-4 font-bold hover:scale-110 active:scale-100" 
                    icon={faX} onClick={handleEdit}/>
                    <h1 className="text-[1.5rem] font-bold text-slate-700 self-center mb-2 text-center">Edit</h1>
                    <form onSubmit={handleUpdate} className='bg-gree-200 flex flex-col gap-4'>
                      <Input type='text' className='w-[16rem] h-[2rem]' name='studentId' value={updateData.studentId} 
                        onChange={(e) => handleInputChange(e, setUpdateData)}/>
                      <Input type='text' className='w-[16rem] h-[2rem]' name='fullName' 
                        value={updateData.fullName}
                        onChange={(e) => handleInputChange(e, setUpdateData)}/>
                      <Input type='text' max={2} className='w-[16rem] h-[2rem]' name='yearLevel' 
                        value={`${updateData.yearLevel}${updateData.block || ''}`}
                        onChange={(e) => handleInputChange(e, setUpdateData)}/>
                      {/* <SelectInput className='w-[14rem] h-[2rem] self-center' value={''}>
                        <option value="student">BS Business Administration</option>
                        <option value="faculty">BS Business Administration</option>
                        <option value="admin">BS Management Accounting</option>
                      </SelectInput> */}
                      {/* <SelectInput className='w-[14rem] h-[2rem] self-center' 
                        value={status === 'Enrolled' ? status : 'Unenrolled'}
                        >
                        <option value="Enrolled">Enrolled</option>
                        <option value="Unenrolled">Unenrolled</option>
                      </SelectInput> */}
                      <SaveButton className='w-[50%] self-center bg-blue-500 text-white'/>
                    </form>
                  </div>
                }
                <FontAwesomeIcon className="text-blue-500 active:text-white" icon={faPenToSquare} onClick={handleEdit}/>
                <FontAwesomeIcon className="text-red-500 active:text-white" icon={faTrashCan}/>
            </div>
        </td>
    </tr>
  )
}

export default StudentRow