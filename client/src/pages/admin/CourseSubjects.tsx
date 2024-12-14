import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import CustomSelect from '../../components/faculty/CustomSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/shared/components/Input';
import { Course } from '../../types/types';

type AddData = {
    studentId: string,
    firstName: string,
    lastName: string,
    email: string
}

const CourseSubjects = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    //Course List
    const courses = useFetch('program/get-courses', 'GET');
    const [courseList, setCourseList] = useState<Course[]>([]);

    //Set List
    useEffect(() => {
        if(courses.data) setCourseList(courses.data as Course[]);
    }, [courses.data]);



    console.log(courseList);


    
    //Add
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [addData, setAddData] = useState<AddData>({
      studentId: '',
      firstName: '',
      lastName: '',
      email: ''
    });
    const [selectedProgram, setSelectedProgram] = useState('BS Accountancy');
    const [selectedYearLevel, setSelectedYearLevel] = useState('1');
    const [selectedBlock, setSelectedBlock] = useState('A');


        
    const handleAddData = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddData({...addData, [e.target.name]: e.target.value});
    }

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      
    }


    //Paginition
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(6);
    
    // let x = users.reverse();
    // console.log(x)
    let entries = courseList.slice(start, end);
    
    const handleNext = () => {
      if(entries.length % 6 === 0) {
        setStart(prev => prev + 6);
        setEnd(prev => prev + 6);
      }
    }
    const handlePrev = () => {
      if(start >= 6){
        setStart(prev => prev - 6);
        setEnd(prev => prev - 6);
      }
    }

    return (
        <div className='bg-cya-100 h-[98%] flex flex-col gap-2 flex-[80%] 
        rounded-lg px-10 py-6 shadow-pageComponentShadow relative'>
            
            <div className="bg-gree-300 flex flex-[10%]">
            <h1 className="text-[2rem] font-semibold text-slate-800 self-center">Manage Students</h1>
            </div>
            
            <button className="bg-blue-400 rounded-md self-end font-semibold text-[1.1rem] px-6 py-[.5rem] 
            mb-4 active:text-white" onClick={() => setIsAddOpen(prev => !prev)}>Add Student</button>
    
            <div className="bg-re-300 flex-[90%] mb-[1rem] overflow-y-scroll">
            <table className="w-full font-semibold text-white">
                <thead className="bg-white sticky text-slate-800 top-0 z-10">
                    <tr>
                        <th className="px-4 py-4 text-center border-2 border-slate-500 min-w-[5rem]">Course Code</th>
                        <th className="px-4 py-4 text-center border-2 border-slate-500 min-w-[8rem]">Course Title</th>
                        <th className="px-4 py-4 text-center border-2 border-slate-500 min-w-[5rem]">Units</th>
                        <th className="px-4 py-4 text-center border-2 border-slate-500 min-w-[5rem]">Year Level</th>
                        <th className="px-4 py-4 text-center border-2 border-slate-500 min-w-[5rem]">Semester</th>
                        <th className="px-4 py-4 text-center border-2 border-slate-500 min-w-[5rem]">Option</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 overflow-y-scroll">
                    {entries.map(course => {
                      return <>
                        <tr>
                          <td className="px-4 py-4 text-center border-2 border-slate-500">{course.courseCode}</td>
                          <td className="px-4 py-4 text-center border-2 border-slate-500">{course.courseTitle}</td>
                          <td className="px-4 py-4 text-center border-2 border-slate-500">{course.units}</td>
                          <td className="px-2 py-4 text-center border-2 border-slate-500">u</td>
                          <td className="px-4 py-4 text-center border-2 border-slate-500">u</td>
                          <td className="px-4 py-4 text-center border-2 border-slate-500">g</td>
                        </tr>
                      </>
                    })}
                </tbody>
            </table>
            <div className="bg-slate-200 flex justify-between mt-4 absolute w-[84%] bottom-[2rem]">
                <span className="font-semibold text-[.9rem] self-center">Showing {entries.length} entries</span>
                <div className="bg-blu-200">
                <button className="text-[1rem] active:scale-[98%] text-slate-700 font-semibold 
                border-2 border-slate-700 px-10 py-2" onClick={handlePrev}>Previous</button>
                <button className="text-[1rem] active:scale-[98%] text-slate-700 font-semibold 
                border-r-2 border-y-2 border-slate-700 px-12 py-2" onClick={handleNext}>Next</button>
                </div>
            </div>
            </div>
    
            
            
            
    
            
            {/* ADD FORM */}
            {isAddOpen && 
            <form onSubmit={handleFormSubmit} className="bg-slate-300  w-[33%] h-[70% absolute z-10 flex flex-col pt-[.8rem] 
            px-[3rem] top-[52%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[.4rem] ">
        
                <FontAwesomeIcon className="absolute text-[1.5rem] right-4
                top-2 font-bold hover:scale-110 active:scale-100" icon={faClose} onClick={() => setIsAddOpen(false)}/>
                <div className="bg-blu-200 ml-[-2rem] mb-4">
                <p className="font-semibold">Add Student</p>
                </div>
                <div className="bg-re-200 flex-[.8] flex w-[100%] justify-center gap-[6rem]">
                <div className="bg-purpl-200 flex flex-col gap-4">

                    <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Student ID:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="studentId"
                        />
                    </div>
                    <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">First Name:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="firstName"
                        />
                    </div>
                    <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Last Name:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="lastName"
                        />
                    </div>
                    <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Email:</label>
                    <Input 
                        type="email" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="email"
                        />
                    </div>
                    <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Program:</label>
                    <CustomSelect 
                        className="border-slate-500 text-[.8rem] font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                        option={[
                        'BS Accountancy', 
                        'BS Business Administration', 
                        'BS Management Accounting'
                        ]} 
                        setValue={setSelectedProgram}/>
                    </div>
                    <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Year Level:</label>
                    <CustomSelect 
                        className="border-slate-500 font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                        option={['1', '2', '3', '4']} 
                        setValue={setSelectedYearLevel}/>
                    </div>
                    <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Block:</label>
                    <CustomSelect 
                        className="border-slate-500 font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                        option={['A', 'B', 'C', 'D']} 
                        setValue={setSelectedBlock}/>
                    </div>
                </div>
                </div>
                <div className="bg-gree-200 flex justify-end items-start mt-6 mb-8">
                <div className="bg-re-200 flex gap-4">
                    <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-2 py-[.5rem] 
                    active:text-white" type="button" onClick={() => setIsAddOpen(false)}>Cancel</button>
                    <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-4 py-[.5rem] 
                    active:text-white" type="submit">Add</button>
                </div>
                </div>
            </form>
            }
        </div>
    )
}

export default CourseSubjects