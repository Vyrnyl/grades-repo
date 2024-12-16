import React, { useRef, useState } from 'react'
import HandleOutsideClick from '../../utils/HandleOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import Input from '../shared/components/Input';
import SaveButton from '../shared/components/SaveButton';
import { AddedCourseType } from '../../types/types';
import handleInputChange from '../../utils/handleInputChange';
import getProgram from '../../utils/getProgram';
import yearSuffix from '../../utils/yearSuffix';


type AddedCourse = {
    id: number,
    courseCode: string,
    courseTitle: string,
    units: number,
    yearLevel: number,
    semester: number
}

const AddedCourseRow = ({ addedCourse, setCourseList }: { 
    addedCourse: AddedCourseType, 
    setCourseList: React.Dispatch<React.SetStateAction<AddedCourseType[]>> 
}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { id, courseCode, courseTitle, programId, units, yearLevel, semester } = addedCourse;
    const [courseData, setCourseData] = useState<AddedCourse>
    ({ id, courseCode, courseTitle, units, yearLevel, semester });
    
    





    //Update
    const [isOpen, setIsOpen] = useState(false);
    const [updateData, setUpdateData] = useState<Record<string, any>>({
        id, courseCode, courseTitle, programId, units, yearLevel, semester
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        const updateUser = async () => {
        setIsOpen(!isOpen);
          const updatedData = {
            id,
            courseCode: updateData.courseCode,
            courseTitle: updateData.courseTitle,
            units: Number(updateData.units),
            yearLevel: Number(updateData.yearLevel),
            semester: Number(updateData.semester)
          }
          
          try {
            const res = await fetch(`${apiUrl}/program/update-added-course`, {
              method: 'PUT',
              headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
            },
              body: JSON.stringify(updatedData)
            });
    
            const data = await res.json();
    
            if(res.ok && data) {
              setCourseData(updatedData);
            }
    
          } catch(error) {
            console.log("Fetch error" + error);
          }
        }
        updateUser();
    }


    //Delete AddedCourse
    const [isDelete, setIsDelete] = useState(false);

    const deleteUser = async () => {
        setIsDelete(false);
        try {
            const res = await fetch(`${apiUrl}/program/delete-added-course`, {
                method: 'DELETE',
                headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ id: courseData.id })
            });

            const data = await res.json();

            if(res.ok && data) {
                setCourseList(prev => prev.filter(u => u.id !== courseData.id));
                // console.log(user)
            }
            
        } catch(error) {
            console.log('Request Error');
        }
    }


    //Style
    const ref = useRef<HTMLDivElement>(null);
    HandleOutsideClick(ref, setIsOpen);
    return (
        <tr>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{courseData.courseCode}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{courseData.courseTitle}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{getProgram(addedCourse.programId)}</td>
            <td className="px-2 py-4 text-center border-2 border-slate-500">{courseData.units}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{courseData.yearLevel}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{`${courseData.semester}${yearSuffix(courseData.semester)}`}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">
                <div className="flex gap-6 justify-center">
                    {isOpen && 
                        <div ref={ref} className='bg-white absolute px-[1rem] py-[1.5rem] z-10 left-[50%] top-[50%] 
                            translate-y-[-50%] translate-x-[-50%] card-shadow rounded-lg'>

                            <FontAwesomeIcon className="absolute text-[1rem] right-[.8rem] top-4 font-bold hover:scale-110 active:scale-100" 
                                icon={faX} onClick={() => setIsOpen(!isOpen)}/>

                            <h1 className="text-[1.5rem] font-bold text-slate-700 self-center mb-2 text-center">Edit</h1>
                            <form onSubmit={handleUpdate} className='bg-gree-200 flex flex-col gap-4'>

                                <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='courseCode' 
                                value={updateData.courseCode} placeholder='Course Code' 
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>

                                <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='courseTitle' 
                                placeholder='Course Title'
                                value={updateData.courseTitle}
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>

                                {/* <Input type='text' max={2} className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='progmId' 
                                value={getProgram(updateData.progmId)} placeholder='Program'
                                onChange={(e) => handleInputChange(e, setUpdateData)}/> */}

                                <Input type='number' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='units' 
                                value={updateData.units || ''} placeholder='Units'
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>

                                <Input type='number' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='yearLevel' 
                                value={updateData.yearLevel || ''} placeholder='Year Level'
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>
                                
                                <Input type='number' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='semester' 
                                value={updateData.semester || ''} placeholder='Semester'
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>

                                <SaveButton className='w-[50%] self-center bg-blue-500 text-white'/>
                            </form>
                        </div>
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
                            onClick={deleteUser}>Delete</button>
                        </div>
                    </div>
                }
            </div>        
        </td>

    </tr>
    )
}





export default AddedCourseRow



