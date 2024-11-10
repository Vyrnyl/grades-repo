import ClassSched from '../../components/shared/components/ClassSched'
import PageContainer from '../../components/shared/components/PageContainer'
import InputFieldWrapper from '../../components/shared/components/InputFieldWrapper'
import ClassInput from '../../components/shared/components/ClassInput'
import { useEffect, useState } from 'react'
import handleInputChange from '../../utils/handleInputChange'
import useFetch from '../../hooks/useFetch'

type CourseInfo = {
    courseCode: string,
    courseTitle: string,
    day: string,
    time: string,
    room: string
}

const CourseManagement = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { data } = useFetch('class/get-classes', 'GET');

    const [classes, setClasses] = useState<CourseInfo[] | []>([]);
    const [addInfo, setAddInfo] = useState<CourseInfo>({
        courseCode: '',
        courseTitle: '',
        day: '',
        time: '',
        room: ''
    });
    

    console.log(classes);


    //Set Classes
    useEffect(() => {
        if(data) {
            setClasses(data as CourseInfo[]);
        }
    }, [data]);


    //Add Class
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSave(true);
        const addClass = async () => {
            try {
                const res = await fetch(`${apiUrl}/class/add-class`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token ? token : '',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addInfo)
                });

                const data = await res.json();
                
                if(data.message) {

                    setClasses((prev) => [...prev, addInfo]);

                    setSave('Added!');
                    setTimeout(() => {
                        setIsSave(false);
                    }, 700);
                }

            } catch(error) {
                console.log('Add error');
            }
        }
        addClass();
    }


    //Style
    const [isOpen, setIsOpen] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [save, setSave] = useState('Adding');

    const [isOpenCourse, setIsOpenCourse] = useState(false);

    return (
        <PageContainer className='relative'>
            <div className='bg-blu-200 flex h-[100%] pr-4'>
                <div className='bg-cya-200 flex-grow flex flex-col mx-[2.5rem] pb-4'>
                    <div className='bg-slat-400 h-[20%] flex items-center px-5'>
                        <h1 className='text-[2rem] font-medium'>Classes</h1>
                    </div>
                    <div className='bg-gree-300 grid grid-cols-3 gap-[1rem] pb-4 place-items-center overflow-y-scroll scrollbar-hide'>
                        {classes.map((clss, i) => {
                            return <ClassSched 
                                key={i}
                                courseCode={clss.courseCode}
                                day={clss.day} 
                                time={clss.time}  
                                room={clss.room} 
                            />     
                        })}                   
                        
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
                                <button type='submit' className='bg-blue-400 font-medium p-2 rounded-md 
                                w-[4rem] h-[2rem] flex justify-center items-center active:text-white'>Add</button>
                            </div>
                        </form>
                    }
                    {isSave && 
                        <div className="bg-white h-[4rem] px-4 flex items-center absolute left-[50%] top-[50%] 
                        translate-y-[-50%] translate-x-[-50%] card-shadow rounded-lg z-10">
                            <h1 className="text-[1.2rem] font-semibold text-slate-700 ">{save}</h1>
                        </div>
                    }
                </div>
            </div>

            <PageContainer className='bg-red-300 absolute w-[100%] h-[101%] flex flex-col px-10'>
                <div className='bg-cya-200 flex flex-col flex-[.2] justify-center gap-4'>
                    <h1 className="text-[1.5rem] font-semibold text-slate-700 ">Course Details</h1>
                    <ul className='bg-gree-200 flex text-[.95rem] font-semibold text-slate-700 h-[3rem]'>
                        <li className='flex text-center items-center
                        flex-[.7] px-2 border-l-2 border-y-2 border-slate-500'>Course Code: FGMT 201</li>
                        <li className='flex text-center items-center justify-center
                        flex-1 px-2 border-l-2 border-y-2 border-slate-500'>Course Title: Financial Mangement</li>
                        <li className='flex text-center items-center justify-center px-2 
                        flex-[.8] border-l-2 border-y-2 border-slate-500'>Day: Monday & Thursday</li>
                        <li className='flex text-center items-center justify-center px-2 
                        flex-[.6] border-l-2 border-y-2 border-slate-500'>Time: 7:30-9:00am</li>
                        <li className='flex text-center items-center justify-center px-2 
                        flex-[.4] border-l-2 border-y-2 border-slate-500'>Room: 101</li>
                        <li className='flex text-center items-center justify-center px-2 
                        flex-[.4] border-x-2 border-y-2 border-slate-500'>sdsd</li>
                    </ul>
                </div>
                <div className='bg-red-200 flex-[.6]'></div>
                <div className='bg-purple-300 flex-[.2]'></div>
            </PageContainer>
        </PageContainer>
    )
}

export default CourseManagement