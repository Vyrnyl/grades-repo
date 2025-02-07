import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchData from "../../utils/admin/fetchData";
import { useEffect, useState } from "react";
import pagination from "../../utils/pagination";
import CourseSubjectRow from "./CourseSubjectRow";
import useFetch from "../../hooks/useFetch";
import { User } from "../../types/studentTypes";

type CourseSubjectPage = {
    setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: User
}


type AddedCourseType = {
  id: number,
  courseCode: string,
  courseTitle: string,
  units: number,
  yearLevel: number,
  semester: number,
  programIds: { id: number, courseId: number, programId: number }[]
}

type AssignedCourse = {
  userId: number, 
  courseCode: string, 
  semester?: number, 
  yearLevel?: number 
}

const StudentCoursePage = ({ setIsListOpen, user } : CourseSubjectPage) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');

  const [allCourse, setAllCourse] = useState<AddedCourseType[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<AssignedCourse[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  //Get Courses
  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchData('program/get-added-courses');
      
      if(Array.isArray(data)) setAllCourse(data);
    }
    getCourses();
  }, []);
  
  

  //ASSIGNED COURSES
  //Get/Set assigned courses
  const assignedCourses = useFetch('program/get-assigned-courses', 'POST', JSON.stringify({ userId: user.id }));
  
  useEffect(() => {
    if(Array.isArray(assignedCourses.data)) {
      if(assignedCourses.data.length > 0)
        setSelectedCourses(assignedCourses.data.map(({ id, ...rest}) => rest));
    }
  }, [assignedCourses.data]);

  //Check if all sem selected
  const [isAllSemSelected, setIsAllSemSelected] = useState(false);
  
  //Update assigned courses
  const submitAssignedCourse = async () => {

    setIsAllSemSelected(false);

    if(selectedCourses.every(course => 'semester' in course && 'yearLevel' in course)) 
      setIsAllSemSelected(false);
    else setTimeout(() => {
      setIsAllSemSelected(true);
    }, 200);
    
    console.log(selectedCourses)
    
    if(selectedCourses.every(course => 'semester' in course && 'yearLevel' in course)) {
      
      setIsSaving(true);
      
      try {

        const res = await fetch(`${apiUrl}/program/update-assigned-courses`, {
          method: 'PUT',
          headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: user.id, courses: selectedCourses })
        });

        const data = await res.json();
        
        if(data) {

          setTimeout(() => {
            setIsSaving(false);
          }, 500);
        } else setIsSaving(false);


      } catch(e) {
        console.log('Submit Error');
      }
    }
  }
  
  

  //Set Selected Courses
  const handleChange = (courseCode: string) => {

    setSelectedCourses(prev => {
      if(prev.some(course => course.courseCode === courseCode)) {
        return prev.filter((code) => code.courseCode !== courseCode);
      } else return [...prev, { userId: user.id, courseCode }];
    });
  }

  //Selected Sem
  const handleSem = (courseSem: string) => {
    setSelectedCourses(prev => prev.map(item => item.courseCode === 
      courseSem.split(' ')[0] ? ({...item, semester: Number(courseSem.split(' ')[1])}) : item));
  }
  

  //Selected Year
  const [x, setX] = useState('');
  const handleYear = (yearLevel: string) => {
    setX(yearLevel);
    setSelectedCourses(prev => prev.map(item => item.courseCode === 
      yearLevel.split(' ')[0] ? ({...item, yearLevel: Number(yearLevel.split(' ')[1].charAt(0))}) : item));
  }

  //Filter All Course by student program
  const [filteredCourse, setFilteredCourse] = useState<AddedCourseType[]>([]);

  useEffect(() => {
    setFilteredCourse(allCourse.filter(course => course.programIds.some(prog => prog.programId === user.programId)));
  }, [allCourse]);

  //PAGINATION
  const { handleNext, handlePrev, entries } = pagination(filteredCourse);

  
  return <div className='bg-white w-[100%] h-[100%] flex flex-col gap-[4.6rem 
  rounded-lg px-10 py-6 shadow-pageComponentShadow absolute z-20 top-0 left-0'>
      
      <FontAwesomeIcon className="absolute right-4 text-[2rem] top-4 font-bold hover:scale-110 active:scale-100" 
      icon={faClose} onClick={() => setIsListOpen(false)}/>

      <div className="bg-gree-300 flex flex-col flex-[20%] relative">
        <div className="bg-cya-200 flex justify-between">
          <h1 className="text-[2rem] font-semibold text-slate-800">Enrolled Courses</h1>
          
          <div className="bg-cya-200 flex flex-col text-start mr-14">
            <p><span className="font-bold">Student ID: </span>{user.studentId}</p>
            <p><span className="font-bold">Name: </span>{`${user.firstName} ${user.lastName}`}</p>
            <p><span className="font-bold">
              Year/Block: </span>{`${user.yearLevel ? user.yearLevel : ''}${user.block ? user.block : ''}`}</p>
          </div>
        </div>
        
        <div className="bg-cya-200 flex justify-start gap-x-6 items-center">
          <button className={`bg-blue-500 rounded-md self-start font-semibold text-[1.1rem] px-4 py-[.2rem] 
            mb-4 active:scale-[103%] mt-2 text-white`}
            onClick={() => {submitAssignedCourse()}}>Save Selected</button>
          <p className="text-[1.1rem]">Selected Courses: <span>{selectedCourses.length || 0}</span></p>
        </div>

        {isAllSemSelected && 
          <p className="text-red-500 absolute bottom-2 left-[50%] translate-x-[-50%]">
            Please select semester/year level for all selected courses</p>
        }
      </div>
      
      <div className="bg-re-300 flex-[80%] mb-[1rem] overflow-y-scroll">
          <table className="bg-cya-200 w-full font-semibold text-white">
              <thead className="bg-blue-500 sticky text-slate-800 top-0 z-10">
                  <tr className="text-white">
                      <th className="px-4 py-4 text-center border-2 border-blue-500 w-[3rem]">Action</th>
                      <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[8rem]">Course Code</th>
                      <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[5rem]">Course Title</th>
                      <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[5rem]">Units</th>
                      <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[5rem]">Semester</th>
                      <th className="px-4 py-4 text-center border-2 border-blue-500 min-w-[5rem]">Year Level</th>
                  </tr>
          </thead>
          <tbody className="text-gray-700">
            {entries.map((item, i) => {
              return <CourseSubjectRow key={i} value={item} 
              isChecked={selectedCourses.some(course => course.courseCode === item.courseCode)}
              handleChange={handleChange} 
              handledSem={handleSem} 
              handledYear={handleYear}
              sem={selectedCourses.find(course => course.courseCode === item.courseCode)}
              year={selectedCourses.find(course => course.courseCode === item.courseCode)}/>
            })}
          </tbody>
        </table>
        
        <div className="bg-slat-200 flex justify-between mt-4 absolute w-[84%] bottom-[2rem]">
            <span className="font-semibold text-[.9rem] self-center">Showing {entries.length} entries</span>
            <div className="bg-blu-200">
              <button className="text-[1rem] active:scale-[98%] text-slate-700 font-semibold 
              border-2 border-slate-700 px-10 py-2" onClick={handlePrev}>Previous</button>
              <button className="text-[1rem] active:scale-[98%] text-slate-700 font-semibold 
              border-r-2 border-y-2 border-slate-700 px-12 py-2" onClick={handleNext}>Next</button>
            </div>
          </div>
      </div>

      {isSaving && <div className="bg-blue-500 h-[6rem] w-[8rem] z-10 grid place-content-center 
      text-[1.2rem] text-white font-bold rounded-[.5rem] absolute top-[50%] 
      left-[50%] translate-x-[-50%] translate-y-[-50%]">
        Saved!
      </div>}
  </div>
}

export default StudentCoursePage;