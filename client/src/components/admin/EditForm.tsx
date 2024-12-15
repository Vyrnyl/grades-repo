import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import Input from '../shared/components/Input'
import { faX } from '@fortawesome/free-solid-svg-icons'
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
    setUpdateData: React.Dispatch<React.SetStateAction<Record<string, any>>>
}


const EditForm = ({ handleUpdate, isOpen, setIsOpen, updateData, setUpdateData } : EditFormProps) => {

    //Style
    const ref = useRef<HTMLDivElement>(null);
    HandleOutsideClick(ref, setIsOpen);

  return (
    <div ref={ref} className='bg-white absolute px-[1rem] py-[1.5rem] z-10 left-[50%] top-[50%] 
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

            <Input type='text' max={2} className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='yearBlock' 
            value={updateData.yearBlock} placeholder='Year/Block(eg. 1A)'
            onChange={(e) => handleInputChange(e, setUpdateData)}/>

            <SelectInput className='w-[10rem] h-[2rem] self-center'
            name='status' value={updateData.status || ""}
            onChange={(e) => handleSelectChange(e, setUpdateData)}>
              <option value="" disabled>Status</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Unenrolled">Unenrolled</option>
            </SelectInput>
            
            <SaveButton className='w-[50%] self-center bg-blue-500 text-white'/>
        </form>
    </div>
  )
}

export default EditForm