import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageContainer from '../../components/shared/components/PageContainer'
import { faPenToSquare, faSave } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import CustomSelect from '../../components/faculty/CustomSelect';
import StudentGradeRow from '../../components/faculty/StudentGradeRow';
import useFetch from '../../hooks/useFetch';
import { Course, StudentRecord } from '../../types/types';


const GradeEntry = () => {

  const records = useFetch('grade/get-records', 'GET');
  const courses = useFetch('program/get-courses', 'GET');
  
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentRecord[]>([]);
  
  const [selectedCourseCode, setSelectedCourseCode] =  useState<string>('');
  const [courseId, setCourseId] = useState<number>(1);
  const [selectedCourseTitle, setSelectedCourseTitle] =  useState<string>('');
  const [selectedBlock, setSelectedBlock] = useState<string>('A');
  const [selectedYearLevel, setSelectedYearLevel] = useState<string>('1st');
  
  //Set Record
  useEffect(() => {
    if(records.data) setStudents(records.data as StudentRecord[]);
    if(courses.data) setCourseList(courses.data as Course[]);
    if(courseList.length > 0) {
      setSelectedCourseCode(courseList[0].courseCode);
    }
  }, [records.data, courses.data, courseList]);

  
  //Set Course Title/Filter Students
  useEffect(() => {
    let course = courseList.find((course) => course.courseCode == selectedCourseCode);
    if(course) {
      setSelectedCourseTitle(course.courseTitle);
      setCourseId(course.id);
    }

    if(students.length > 0) {
      let filteredList = students.filter((student) => {
        return student.block == selectedBlock && student.yearLevel == Number(selectedYearLevel.charAt(0))
      });
      
      setFilteredStudents((filteredList));
    }
  }, [records.data, selectedCourseCode, selectedYearLevel, selectedBlock]);


  //Selected Course Edit
  const index = courseList.indexOf(courseList.find(x => x.courseCode == selectedCourseCode) as Course);

  //Style
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [closeEdit, setCloseEdit] = useState(false);
  
  useEffect(() => {
    if(isEditOpen) {
      setCloseEdit(true);
    } else setCloseEdit(false)
  }, [isEditOpen]);

  

  return (
    <PageContainer className='flex flex-col px-6 pt-10'>
        <div className='bg-cya-200 flex flex-col justify-end gap-4'>
          <ul className='bg-gree-200 flex text-[.95rem] font-semibold text-slate-700 h-[3rem]'>
            <li className='flex text-center items-center px-6 border-l-2 border-y-2
            border-slate-500'>
              {!isEditOpen ? `Course Code: ${selectedCourseCode}` :
              <CustomSelect 
                className='h-[2.7rem] w-[8.4rem]' 
                setValue={setSelectedCourseCode}
                option={courseList.map((course) => course.courseCode)}
                selectedItem={index}
              />}
            </li>
            
            <li className='flex text-center items-center justify-center
             px-10 border-l-2 border-y-2 border-slate-500'>Course Title: {selectedCourseTitle}</li>

            <li className='flex text-center items-center justify-center px-8 
             border-x-2 border-y-2 border-slate-500 gap-4'>
              {isEditOpen ? 
                <FontAwesomeIcon className="text-blue-500 active:text-white" 
                icon={faSave} onClick={() => setIsEditOpen(!isEditOpen)}/> :
                <FontAwesomeIcon className="text-blue-500 active:text-white" 
                  icon={faPenToSquare} onClick={() => setIsEditOpen(!isEditOpen)}/>
              }
            </li>
          </ul>
      </div>

      <div className='bg-gree-200 flex gap-2 text-[.95rem] font-semibold text-slate-700 pt-2'>
          <div className='bg-slate-300 rounded-[.2rem] px-4 flex items-center border-2 border-slate-500'>
              <p>Student: {filteredStudents.length}</p>
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
    </PageContainer>
  )
}

export default GradeEntry