import ClassSched from '../../components/shared/components/ClassSched'
import PageContainer from '../../components/shared/components/PageContainer'
import InputFieldWrapper from '../../components/shared/components/InputFieldWrapper'
import ClassInput from '../../components/shared/components/ClassInput'
import { useState } from 'react'
import handleInputChange from '../../utils/handleInputChange'

type CourseInfo = {
    courseCode: string,
    courseTitle: string,
    day: string,
    time: string,
    room: string
}

const CourseManagement = () => {

    const [addInfo, setAddInfo] = useState<CourseInfo>({
        courseCode: '',
        courseTitle: '',
        day: '',
        time: '',
        room: ''
    });
    

    console.log(addInfo);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
    }


    //Style
    const [isOpen, setIsOpen] = useState(false);

    return (
        <PageContainer>
            <div className='bg-blu-200 flex h-[100%] pr-4'>
                <div className='bg-cya-200 flex-grow flex flex-col mx-[2.5rem] pb-4'>
                    <div className='bg-slat-400 h-[20%] flex items-center px-5'>
                        <h1 className='text-[2rem] font-medium'>Classes</h1>
                    </div>
                    <div className='bg-gree-300 grid grid-cols-3 gap-[1rem] pb-4 place-items-center overflow-y-scroll scrollbar-hide'>
                        <ClassSched 
                            courseCode='CC106' 
                            day='Tuesday & Friday' 
                            time='1:00PM - 3:00PM' 
                            room='Computer Lab 3'
                        />
                        <ClassSched 
                            courseCode='CC106' 
                            day='Tuesday & Friday' 
                            time='1:00PM - 3:00PM' 
                            room='Computer Lab 3'
                        />
                        <ClassSched 
                            courseCode='CC106' 
                            day='Tuesday & Friday' 
                            time='1:00PM - 3:00PM' 
                            room='Computer Lab 3'
                        />
                        <ClassSched 
                            courseCode='CC106' 
                            day='Tuesday & Friday' 
                            time='1:00PM - 3:00PM' 
                            room='Computer Lab 3'
                        />
                        
                    </div>
                </div>
                <div className='bg-gree-200 w-[32%] flex flex-col justify-center items-center px-2 pb-[4rem] overflow-hidden
                    realtive'>
                    <button className='bg-blue-400  text-[1.1rem] font-medium p-2 rounded-md
                    absolute top-[6rem] active:text-white' onClick={() => setIsOpen(!isOpen)}>+Add Class</button>
                    {isOpen && 
                        <form className='bg-re-200 flex flex-col items-center gap-4 class-shadow w-[22rem] px-[.8rem] rounded-md
                        absolute top-[10rem] pt-10' onSubmit={handleAdd}>
                            <InputFieldWrapper label="Course Code">
                                <ClassInput type="text" value={addInfo?.courseCode} name="courseCode"
                                onChange={(e) => handleInputChange(e, setAddInfo)}/>
                            </InputFieldWrapper>
                            <InputFieldWrapper label="Course Title">
                                <ClassInput type="text" value={addInfo?.courseTitle} name="courseTitle"
                                onChange={(e) => handleInputChange(e, setAddInfo)}/>
                            </InputFieldWrapper>
                            <InputFieldWrapper label="Day">
                                <ClassInput type="text" value={addInfo?.day} name="day"
                                onChange={(e) => handleInputChange(e, setAddInfo)}/>
                            </InputFieldWrapper>
                            <InputFieldWrapper label="Time">
                                <ClassInput type="text" value={addInfo?.time} name="time"
                                onChange={(e) => handleInputChange(e, setAddInfo)}/>
                            </InputFieldWrapper>
                            <InputFieldWrapper label="Room">
                                <ClassInput type="text" value={addInfo?.room} name="room"
                                onChange={(e) => handleInputChange(e, setAddInfo)}/>   
                            </InputFieldWrapper>
                            <div className='bg-cya-300 w-[17rem] h-[5rem] gap-4 flex items-center justify-end'>
                                <button className='bg-blue-400 font-medium p-2 rounded-md 
                                w-[4rem] h-[2rem] flex justify-center items-center active:text-white' 
                                onClick={() => setIsOpen(false)}>Cancel</button>
                                <button className='bg-blue-400 font-medium p-2 rounded-md 
                                w-[4rem] h-[2rem] flex justify-center items-center active:text-white'>Add</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </PageContainer>
    )
}

export default CourseManagement