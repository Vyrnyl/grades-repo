import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import CustomSelect from '../../components/faculty/CustomSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/shared/components/Input';
import { AddedCourseType } from '../../types/types';
import AddedCourseRow from '../../components/student/AddedCourseRow';
import getProgramId from '../../utils/getProgramId';
import getUppercaseLetters from '../../utils/getUpperCaseLetter';
import removeObjectDuplicate from '../../utils/admin/removeObjectDuplicate';
// import fetchData from '../../utils/admin/fetchData';

type AddData = {
    courseCode: string,
    courseTitle: string
}

const CourseSubjects = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    //Course List
    const courses = useFetch('program/get-added-courses', 'GET');
    const [courseList, setCourseList] = useState<AddedCourseType[]>([]);
    // const [allCourse, setAllCourse] = useState<AddedCourseType[]>([]);
    
    //Set List
    useEffect(() => {
        if(courses.data) setCourseList(courses.data as AddedCourseType[]);
    }, [courses.data]);
    
    //Add
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [addData, setAddData] = useState<AddData>({
      courseCode: '',
      courseTitle: ''
    });
    const [selectedProgram, setSelectedProgram] = useState('BS Information Technology');
    const [selectedYearLevel, setSelectedYearLevel] = useState('1');
    const [selectedUnits, setSelectedUnits] = useState('1');
    const [selectedSem, setSelectedSem] = useState('1st');

    const [reload, setReload] = useState(false);
    const [isCourseExist, setIsCourseExist] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddData = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddData({...addData, [e.target.name]: e.target.value});
    }

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      setIsAdding(true);

      let progIds = programHandled.map(item => getProgramId(item.programCode)).filter((val, i, self) => self.indexOf(val) === i);
      const body = {
        ...addData, 
        programIds: progIds, 
        units: Number(selectedUnits), 
        yearLevel: Number(selectedYearLevel.charAt(0)), 
        semester: Number(selectedSem.charAt(0))
      };
      
      const addCourse = async () => {

        const res = await fetch(`${apiUrl}/program/add-added-course`, {
          method: 'POST',
          headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        const data = await res.json();

        if(res.ok && data) {
          let programCode = selectedProgram.replace(/\s+/g, '').split('').filter(char => char === char.toUpperCase()).join('');
          setCourseList([...courseList, {...data, program: { programCode }}]);
          setSelectedProgram('BS Information Technology');
          setSelectedYearLevel('1st');
          setSelectedUnits('1');
          setSelectedSem('1st');

          setTimeout(() => {
            setIsAdding(false);
            setIsAddOpen(false);
            setReload(prev => !prev);
          }, 300);
        };
        
      }

      if(courseList.some(item => item.courseCode === body.courseCode)) {
        setTimeout(() => {
          setIsCourseExist(true);
          setIsAddOpen(false);
        }, 500);
      } else addCourse();
    }

    //Set All CourseCode to check for existing
    // useEffect(() => {
    //   const getCourses = async () => {
    //     const data = await fetchData('program/get-courses');
        
    //     if(Array.isArray(data)) setAllCourse(data);
    //   }
    //   getCourses();
    // }, [courses.data, reload]);


    //SET SELECTED PROGRAM
    //SET Programs
    const [programHandled, setProgramHandled] = useState<{ programCode: string, userId?: number}[]>([]);

    useEffect(() => {
      const setPrograms = () => {
        setProgramHandled(prev => [...prev, { programCode: getUppercaseLetters(selectedProgram) }]);
      }
      
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest(".selected")) {
          setPrograms();
        }
      };
  
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [selectedProgram]);

    //Remove selected program
    const handleDeleteProgram = (item: { programCode: string, userId?: number}) => {
      setProgramHandled(prev => {
        return prev.filter(prog => prog.programCode !== item.programCode)
      });
    }

    useEffect(() => {
      if(!isAddOpen) setProgramHandled([]);
    }, [isAddOpen]);
    

    //Paginition
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(7);
    
    let x = courseList.reverse();
    let entries = x.slice(start, end);
    
    const handleNext = () => {
      if(entries.length % 7 === 0) {
        setStart(prev => prev + 7);
        setEnd(prev => prev + 7);
      }
    }
    const handlePrev = () => {
      if(start >= 6){
        setStart(prev => prev - 7);
        setEnd(prev => prev - 7);
      }
    }
    
    return (
        <div className='bg-cya-100 h-[98%] flex flex-col gap-2 flex-[80%] 
        rounded-lg px-10 py-6 shadow-pageComponentShadow relative'>
            
            <div className="bg-gree-300 flex flex-[10%]">
            <h1 className="text-[2rem] font-semibold text-slate-800 self-center">Course Subjects</h1>
            </div>
            
            <button className="bg-blue-500 rounded-md self-end font-semibold text-[1.1rem] px-6 py-[.5rem] 
            mb-4 active:scale-[103%] text-white" onClick={() => setIsAddOpen(prev => !prev)}>Add Course</button>

            <div className="bg-re-300 flex-[90%] mb-[1rem] overflow-y-scroll">
            <table className="w-full font-semibold text-white">
                <thead className="bg-blue-500 sticky text-slate-800 top-0 z-10">
                    <tr className='text-white'>
                        <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[5rem]">Course Code</th>
                        <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[8rem]">Course Title</th>
                        <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[8rem]">Program</th>
                        <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[5rem]">Units</th>
                        <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[5rem]">Year Level</th>
                        <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[5rem]">Semester</th>
                        <th className="px-4 py-4 text-center border-2 border-blue-500 w-[5rem]">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 overflow-y-scroll">
                    {entries.sort((a, b) => b.id - a.id).map(course => {
                      return <AddedCourseRow 
                        key={course.courseCode} 
                        addedCourse={course} 
                        setCourseList={setCourseList}
                        setReload={setReload}
                        />
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
              top-2 font-bold hover:scale-110 active:scale-100" 
              icon={faClose} 
              onClick={() => setIsAddOpen(false)}/>

              <div className="bg-blu-200 ml-[-2rem] mb-4">
                <p className="font-semibold">Add Course</p>
              </div>

              <div className="bg-re-200 flex-[.8] flex w-[100%] justify-center gap-[6rem]">
                <div className="bg-purpl-200 flex flex-col gap-4">

                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Course Code:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="courseCode"
                        />
                  </div>

                  
                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Course Title:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="courseTitle"
                        />
                  </div>
                   
                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Program:</label>
                    <CustomSelect 
                        className="cursor-pointer border-slate-500 text-[.8rem] font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                        option={[
                          'BS Information Technology', 
                          'BS Computer Science', 
                          'BS Information Systems',
                          'BL Information Science',
                          'BS Entertainment and Multimedia Computing'
                        ]} 
                        setValue={setSelectedProgram}/>

                        {/* SELECTED */}
                        <div className="bg-blu-200 max-h-[5rem] text-[.9rem] text-slate-700 font-semibold mt-2 
                            flex flex-wrap gap-2 gap-x-4 overflow-y-auto">
                            {removeObjectDuplicate(programHandled).map((item, i) => {
                              return <div key={i} className="bg-pin-200 flex gap-2 h-[1.5rem]">
                                <span className="text-center">{item.programCode}</span>
                                <FontAwesomeIcon className="text-[.8rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                                icon={faClose} onClick={() => handleDeleteProgram(item)}/>
                              </div>
                            })}
                        </div>
                  </div>

                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Units:</label>
                    <CustomSelect 
                        className="cursor-pointer border-slate-500 font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                        option={['1', '2', '3', '4', '5', '6']} 
                        setValue={setSelectedUnits}/>
                  </div>

                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Year Level:</label>
                    <CustomSelect 
                        className="cursor-pointer border-slate-500 font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                        option={['1st', '2nd', '3rd', '4th']} 
                        setValue={setSelectedYearLevel}/>
                  </div>
                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Semester:</label>
                    <CustomSelect 
                        className="cursor-pointer border-slate-500 font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                        option={['1st', '2nd']} 
                        setValue={setSelectedSem}/>
                  </div>
                </div>
              </div>

              <div className="bg-gree-200 flex justify-end items-start mt-6 mb-8">
                <div className="bg-re-200 flex gap-4">
                    <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-2 py-[.5rem] 
                    active:text-white" type="button" onClick={() => setIsAddOpen(false)}>Cancel</button>
                    <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-4 py-[.5rem] 
                    active:text-white" type="submit">{isAdding ? 'Adding' : 'Add'}</button>
                </div>
              </div>
            </form>
            }

            {isCourseExist && 
              <div className='bg-slate-300 z-10 absolute px-4 py-4 left-[50%] top-[50%] 
              translate-y-[-50%] translate-x-[-50%] flex flex-col gap-4 rounded-lg border-2 border-slate-400'>
                <h1 className='text-red-500 font-semibold text-[1rem] text-center'>Course Subject {addData.courseCode} already exist!</h1>
                <div className='bg-cya-300 flex gap-4 justify-center'>
                  <button className='bg-blue-500 text-white px-2 py-[.2rem] rounded-md font-semibold'
                    onClick={() => {
                      setIsCourseExist(false);
                      setIsAdding(false);
                    }}>Okay</button>
                </div>
              </div>
            }
        </div>
    )
}

export default CourseSubjects