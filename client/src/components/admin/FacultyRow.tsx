
import { faPenToSquare, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../types/studentTypes';
import { useState } from 'react';
import Input from '../shared/components/Input';
import handleInputChange from '../../utils/handleInputChange';
import SelectInput from './SelectInput';
import SaveButton from '../shared/components/SaveButton';
import handleSelectChange from '../../utils/handleSelectChange';

type FacultyData = {
  id: number,
  studentId: string,
  firstName: string,
  lastName: string,
  email: string,
  status: string
}

type FacultyRowProps = { 
  faculty: User,
  setFaculties: React.Dispatch<React.SetStateAction<[] | User[]>>
}

const FacultyRow = ({ faculty, setFaculties }: FacultyRowProps) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');

  const {
    id,
    studentId,
    firstName,
    lastName,
    email,
    status
  } = faculty;


  //Update
  const [facultyData, setFacultyData] = useState<FacultyData>({
    id,
    studentId,
    firstName,
    lastName,
    email,
    status
  }); 

  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState<Record<string, any>>({
    id,
    studentId,
    fullName: `${faculty.firstName} ${faculty.lastName}`,
    email: faculty.email,
    status
  });



  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    let fullName = updateData.fullName.split(' ');

    const updateUser = async () => {

      setIsOpen(!isOpen);
      const updatedData = {
        id,
        studentId: updateData.studentId,
        firstName: fullName[0],
        lastName: fullName[fullName.length - 1],
        email: updateData.email,
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
          setFacultyData(updatedData);
        }

      } catch(error) {
        console.log("Fetch error" + error);
      }
    }

    updateUser();
  }

  //Delete User
  const [isDelete, setIsDelete] = useState(false);
  const deleteUser = async () => {
    setIsDelete(false);
    try {
      const res = await fetch(`${apiUrl}/user/delete-user`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? token : '',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({ userId: faculty.id })
      });

      const data = await res.json();

      if(res.ok && data) {
        setFaculties((prev) => {
          return prev.filter((fac) => fac.id !== faculty.id);
        });
      }
      console.log(data)

    } catch(error) {
      console.log('Request Error');
    }
  }

  return (
    <tr className="bg-slate-100 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
    <td className="p-4 text-center">{facultyData.studentId}</td>
    <td className="p-4 text-center">{`${facultyData.firstName} ${facultyData.lastName}`}</td>
    {/* <td className="p-4 text-center">CBA</td> */}
    <td className="p-4 text-center">{facultyData.email}</td>
    <td className="p-4 text-center">{facultyData.status}</td>
    <td className="py-4 px-10">
        <div className="flex gap-6 justify-center">
            {isOpen && 
              <div className='bg-white absolute px-[1rem] py-[1.5rem] z-10 left-[50%] top-[50%] 
                translate-y-[-50%] translate-x-[-50%] card-shadow rounded-lg'>
                <FontAwesomeIcon className="absolute text-[1rem] right-[.8rem] top-4 font-bold hover:scale-110 active:scale-100" 
                icon={faX} onClick={() => setIsOpen(!isOpen)}/>
                <h1 className="text-[1.5rem] font-bold text-slate-700 self-center mb-2 text-center">Edit</h1>
                <form onSubmit={handleUpdate} className='bg-gree-200 flex flex-col gap-4'>
                  <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='studentId' 
                    value={updateData.studentId} placeholder='Student ID' 
                    onChange={(e) => handleInputChange(e, setUpdateData)}/>
                  <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='fullName' 
                    placeholder='Full Name'
                    value={updateData.fullName}
                    onChange={(e) => handleInputChange(e, setUpdateData)}/>
                  <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='email' 
                    placeholder='Email'
                    value={updateData.email}
                    onChange={(e) => handleInputChange(e, setUpdateData)}/>
                  <SelectInput className='w-[10rem] h-[2rem] self-center'
                    name='status' value={updateData.status || ''}
                    onChange={(e) => handleSelectChange(e, setUpdateData)}>
                    <option value="" disabled>Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </SelectInput>
                  <SaveButton className='w-[50%] self-center bg-blue-500 text-white'/>
                </form>
              </div>
            }

            <FontAwesomeIcon className="text-blue-500" icon={faPenToSquare} onClick={() => setIsOpen(!isOpen)}/>
            <FontAwesomeIcon className="text-red-500" icon={faTrashCan} onClick={() => setIsDelete(!isDelete)}/>

            {isDelete && 
              <div className='bg-slate-300 absolute px-8 py-10 left-[50%] top-[50%] 
                translate-y-[-50%] translate-x-[-50%] flex flex-col gap-4 rounded-lg'>
                <h1 className='text-slate-700 font-semibold text-[1.2rem] text-center'>Are you sure?</h1>
                <div className='bg-cya-300 flex gap-4'>
                  <button className='bg-slate-500 text-white px-2 py-[.2rem] rounded-md'
                    onClick={() => setIsDelete(false)}>Cancel</button>
                  <button className='bg-red-500 text-white px-2 py-[.2rem] rounded-md'
                    onClick={deleteUser}>Delete</button>
                </div>
              </div>
            }
        </div>
    </td>
</tr>
  )
}

export default FacultyRow