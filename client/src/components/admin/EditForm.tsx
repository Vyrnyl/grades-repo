import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import Input from '../shared/components/Input'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import handleInputChange from '../../utils/handleInputChange'
import handleSelectChange from '../../utils/handleSelectChange'
import SelectInput from './SelectInput'
import SaveButton from '../shared/components/SaveButton'
import HandleOutsideClick from '../../utils/HandleOutsideClick'


type EditFormProps = {
    handleUpdate: (e: React.FormEvent) => void,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateData: Record<string, any>,
    setUpdateData: React.Dispatch<React.SetStateAction<Record<string, any>>>,
    isExist: boolean,
    isValidID: boolean
}


const EditForm = ({ handleUpdate, isOpen, setIsOpen, updateData, setUpdateData, isExist, isValidID } : EditFormProps) => {

  //Style
  const ref = useRef<HTMLDivElement>(null);
  HandleOutsideClick(ref, setIsOpen);
  
  return (
    <div ref={ref} className='bg-white absolute px-[1rem] py-[1.5rem] z-10 left-[50%] top-[50%] 
            translate-y-[-50%] translate-x-[-50%] card-shadow rounded-lg'>

        <FontAwesomeIcon className="absolute text-[1.5rem] right-[.8rem] top-2 font-bold hover:scale-110 active:scale-100" 
            icon={faClose} onClick={() => setIsOpen(!isOpen)}/>

        <h1 className="text-[1.5rem] font-bold text-slate-700 self-center mb-2 text-center">Edit</h1>
        <form onSubmit={handleUpdate} className='bg-gree-200 flex flex-col gap-4'>

            <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='studentId' 
            value={updateData.studentId} placeholder='Student ID' 
            onChange={(e) => handleInputChange(e, setUpdateData)}/>
            {isExist && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 ml-2 text-start mt-[-1rem]">
              UserID already exist!</p>}
            {isValidID && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 ml-2 text-start mt-[-1rem]">
              Invalid format! (eg. 1234-12345)
            </p>}

            <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='firstName' 
            placeholder='First Name'
            value={updateData.firstName}
            onChange={(e) => handleInputChange(e, setUpdateData)}/>

            <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='lastName' 
            placeholder='Last Name'
            value={updateData.lastName}
            onChange={(e) => handleInputChange(e, setUpdateData)}/>

            <SelectInput className='w-[15rem] h-[2rem] self-center'
            name='programId' value={updateData.programId || ""}
            onChange={(e) => handleSelectChange(e, setUpdateData)}>
              <option className='font-semibold' value="BS Information Technology">BS Information Technology</option>
              <option className='font-semibold' value="BS Computer Science">BS Computer Science</option>
              <option className='font-semibold' value="BS Information Systems">BS Information Systems</option>
              <option className='font-semibold' value="BL Information Science">BL Information Science</option>
              <option className='font-semibold' value="BS Entertainment and Multimedia Computing">BS Entertainment and Multimedia Computing</option>
            </SelectInput>

            <SelectInput className='w-[10rem] h-[2rem] self-center text-center'
            name='yearLevel' value={updateData.yearLevel || ""}
            onChange={(e) => handleSelectChange(e, setUpdateData)}>
              <option className='font-semibold' value="" disabled>Year Level</option>
              <option className='font-semibold' value="1st">1st</option>
              <option className='font-semibold' value="2nd">2nd</option>
              <option className='font-semibold' value="3rd">3rd</option>
              <option className='font-semibold' value="4th">4th</option>
            </SelectInput>
            
            <SelectInput className='w-[10rem] h-[2rem] self-center text-center'
            name='block' value={updateData.block || ""}
            onChange={(e) => handleSelectChange(e, setUpdateData)}>
              <option className='font-semibold' value="" disabled>Block</option>
              <option className='font-semibold' value="A">A</option>
              <option className='font-semibold' value="B">B</option>
              <option className='font-semibold' value="C">C</option>
              <option className='font-semibold' value="D">D</option>
            </SelectInput>

            <SelectInput className='w-[10rem] h-[2rem] self-center text-center'
            name='status' value={updateData.status || ""}
            onChange={(e) => handleSelectChange(e, setUpdateData)}>
              <option className='font-semibold' value="" disabled>Status</option>
              <option className='font-semibold' value="Enrolled">Enrolled</option>
              <option className='font-semibold' value="Unenrolled">Unenrolled</option>
            </SelectInput>
            
            <SaveButton className='w-[50%] self-center bg-blue-500 text-white'/>
        </form>
    </div>
  )
}

export default EditForm