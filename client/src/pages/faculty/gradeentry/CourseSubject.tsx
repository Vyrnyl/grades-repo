import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from '../../../hooks/useFetch';
import { useEffect, useState } from 'react';
import useUserStore from '../../../store/useUserStore';
import { Course, StudentRecord } from '../../../types/types';
import CustomSelect from '../../../components/faculty/CustomSelect';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import StudentGradeRow from '../../../components/faculty/StudentGradeRow';
import checkStudentCourse from '../../../utils/getStudentCourses';

type Program = {
  id: number,
  programCode: string,
  userId: number
}

type CourseSubject = {
  className?: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean

  courseCode: string
  programs: Program[]
}

const CourseSubject = ({ className, setIsOpen, courseCode, programs } : CourseSubject) => {


  const token = localStorage.getItem('atoken');
  const { userInfo } = useUserStore();
  

  const [userId, setUserId] = useState(0);

  const records = useFetch('grade/get-records', 'GET');
  const courses = useFetch('program/get-courses', 'GET');

  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentRecord[]>([]);
  
  const [selectedCourseCode, setSelectedCourseCode] =  useState<string>('');
  const [courseId, setCourseId] = useState<number>(1);
  const [selectedCourseTitle, setSelectedCourseTitle] =  useState<string>('');
  const [selectedBlock, setSelectedBlock] = useState<string>('A');
  const [selectedYearLevel, setSelectedYearLevel] = useState<string>('1st');
  const [selectedProgram, setSelectedProgram] = useState('BSIT');
  
  
  //Set Record
  useEffect(() => {

    //Get Course
    const getCourses = async () => {
      const res = await fetch(`http://localhost:8000/faculty/get-handled`, {
        method: 'POST',
        headers: {
          'Authorization': token ? token : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userInfo?.id })
       });
       const data = await res.json();
       
       if(res.ok && Array.isArray(data)) {
        const courses = data as Course[];
        
        setFilteredCourses(courseList.filter(courseX => courses.some(courseY => courseY.courseCode === courseX.courseCode)));
       }
    }
    getCourses();

    if(userInfo?.id) setUserId(userInfo.id);
    if(records.data) setStudents(records.data as StudentRecord[]);
    if(courses.data) setCourseList(courses.data as Course[]);

  }, [records.data, courses.data, courseList, userInfo]);


  //Handle All
  const [allBg, setAllBg] = useState(false);

  //Set Course Title/Filter Students
  useEffect(() => {
    let course = filteredCourses.find((course) => course.courseCode == selectedCourseCode);
    if(course) {
      setSelectedCourseTitle(course.courseTitle);
      setCourseId(course.id);
    }
    
    if(students.length > 0) {
      let filteredList = allBg ? students.filter((student) => {
        return checkStudentCourse(student, courseCode)
      }).filter(student => programs.some(prog => prog.programCode === student.program.programCode)) : students.filter((student) => {
        return student.block == selectedBlock && 
          student.yearLevel == Number(selectedYearLevel.charAt(0)) && 
          student.program.programCode == selectedProgram && 
          checkStudentCourse(student, courseCode)
      });

      // let filteredList = students.filter(stud => {
      //   return stud.bsisStudentRecord.some(s => s.bsisCurriculum?.courseCode === courseCode)
      // });

      setFilteredStudents(filteredList);
    }
  }, [
      records.data, 
      selectedCourseCode, 
      selectedYearLevel, 
      selectedProgram,
      selectedBlock, 
      filteredCourses,
      allBg
    ]);

    useEffect(() => {
      if(allBg) setAllBg(false);
    }, [
        selectedCourseCode, 
        selectedYearLevel, 
        selectedProgram,
        selectedBlock, 
        filteredCourses
    ]);

    // console.log(filteredStudents)

    
    // if(filteredStudents.length > 0) 
    //   console.log(filteredStudents.filter(student => programs.some(prog => prog.programCode === student.program.programCode)));


  //Set Default CourseCode
  useEffect(() => {
    if(filteredCourses.length > 0) {
      setSelectedCourseCode(courseCode);
      setSelectedProgram(programs[0].programCode);
    }
  }, [filteredCourses, courseCode, programs]);
  
  

  // if(filteredStudents[0]) 
  //   console.log(checkStudentCourse(filteredStudents[0], courseCode));


  //Selected Course Edit
  // const index = filteredCourses.indexOf(filteredCourses.find(x => x.courseCode == selectedCourseCode) as Course);

  //Style
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [closeEdit, setCloseEdit] = useState(false);
  
  useEffect(() => {
    if(isEditOpen) {
      setCloseEdit(true);
    } else setCloseEdit(false)
  }, [isEditOpen]);

  
  return (
    <div className={`${className} bg-slate-100 h-[100%] w-[100%] flex flex-col flex-[80%] shadow-pageComponentShadow 
      rounded-lg px-6 pt-10`}>

        <FontAwesomeIcon 
          onClick={() => setIsOpen(false)}
          className='close-course active:scale-110 text-[2rem] text-slate-700 absolute right-4 top-4' icon={faClose}/>

        <div className='bg-cya-200 flex flex-col justify-end gap-4'>
          <ul className='bg-gree-200 flex text-[.95rem] font-semibold text-slate-700 h-[3rem]'>
            <li className='flex text-center items-center px-6 border-l-2 border-y-2
            border-slate-500'>
              {!isEditOpen && `Course Code: ${selectedCourseCode}` 
              // <CustomSelect 
              //   className='h-[2.7rem] w-[8.4rem]' 
              //   setValue={setSelectedCourseCode}
              //   option={filteredCourses.map((course) => course.courseCode)}
              //   selectedItem={index}/>
              }
            </li>
            
            <li className='flex text-center items-center justify-center
             px-10 border-x-2 border-y-2 border-slate-500'>Course Title: {selectedCourseTitle}</li>

            {/* <li className='flex text-center items-center justify-center px-8 
             border-x-2 border-y-2 border-slate-500 gap-4'>
              {isEditOpen ? 
                <FontAwesomeIcon className="text-blue-500 active:text-white" 
                icon={faSave} onClick={() => setIsEditOpen(!isEditOpen)}/> :
                <FontAwesomeIcon className="text-blue-500 active:text-white" 
                  icon={faPenToSquare} onClick={() => setIsEditOpen(!isEditOpen)}/>
              }
            </li> */}
          </ul>
      </div>

      <div className='bg-gree-200 flex gap-2 text-[.95rem] font-semibold text-slate-700 pt-2'>
          <div className='bg-slate-300 rounded-[.2rem] px-4 flex items-center border-2 border-slate-500'>
              <p>Student: {filteredStudents.length}</p>
          </div>
          <div className='bg-slate-300 rounded-[.2rem] border-2 border-slate-500'>
            <CustomSelect 
              className='h-[2rem] w-[6rem]' 
              setValue={setSelectedProgram}
              option={programs.map(x => x.programCode)}/>
          </div>
          <div className='bg-slate-300 rounded-[.2rem] border-2 border-slate-500'>
            <CustomSelect 
              className='h-[2rem] w-[6rem]' 
              setValue={setSelectedBlock} 
              option={['A', 'B', 'C', 'D']}/>
          </div>
          <div className='bg-slate-300 rounded-[.2rem] border-2 border-slate-500'>
            <CustomSelect 
              className='h-[2rem] w-[6rem]' 
              setValue={setSelectedYearLevel} 
              option={['1st', '2nd', '3rd', '4th']}/>
          </div>
          <div onClick={() => setAllBg(prev => !prev)} className={`${allBg ? 'bg-blue-500 border-blue-500 text-white' : 'bg-slate-300 border-slate-500'} 
          rounded-[.2rem] border-2  px-2 grid place-content-center`}>
            <button>All</button>
          </div>
      </div>

      <div className='bg-re-200 px-4 mt-8 mb-[1rem] overflow-y-scroll'>
        <table className="w-full font-semibold text-white">
            <thead className="bg-blue-500 sticky top-0 z-10">
              <tr>                  
                <th className="px-4 py-4 text-center min-w-[8rem]">Name</th>
                <th className="px-4 py-4 text-center w-[15rem]">Student ID</th>
                <th className="px-4 py-4 text-center w-[15rem]">Course/Year/Block</th>
                <th className="px-4 py-4 text-center w-[10rem]">Grade</th>
                <th className="px-4 py-4 text-center w-[8rem]">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {
                filteredStudents.map((student) => {
                  return <StudentGradeRow 
                    key={student.id} 
                    student={student} 
                    courseId={courseId} 
                    courseCode={selectedCourseCode}
                    setCloseEdit={setIsEditOpen}
                    closeEdit={closeEdit}
                  />
                })
              }
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default CourseSubject