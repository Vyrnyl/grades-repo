import { useEffect, useState } from 'react'
import PageContainer from '../../components/shared/components/PageContainer'
import useUserStore from '../../store/useUserStore'
import useFetch from '../../hooks/useFetch'
import CourseCode from './gradeentry/CourseCode'
import { Course } from '../../types/types'

type HandledCourse = { 
  id: number,
  courseCode: string,
  userId: number,
  createdAt: string,
  updatedAt: string
}


const GradeEntry = () => {

  const token = localStorage.getItem('atoken');
  const { userInfo } = useUserStore();

  const [courseList, setCourseList] = useState<Course[]>([]);
  const [handledCourse, setHandledCourse] = useState<HandledCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  
  //Get Courses 
  const courses = useFetch('program/get-courses', 'GET');
  
  //Get Handled Courses
  useEffect(() => {
    if(courses.data) setCourseList(courses.data as Course[]);
  }, [courses.data]);
  useEffect(() => {
    
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
        const courses = data as HandledCourse[];
        setHandledCourse(courses);
        setFilteredCourses(courseList.filter(courseX => courses.some(courseY => courseY.courseCode === courseX.courseCode)));
       }
    }
    getCourses();
  }, [userInfo, courses.data, courseList]);


  const handledCourses = filteredCourses.map((item, i) => {
    return {
      id: item.id, 
      courseCode: item.courseCode, 
      courseTitle: item.courseTitle, 
      units: item.units, 
      createdAt: handledCourse[i].createdAt
    }
  });
  

  //Style

  return (
    <PageContainer className='px-6 pt-10 relative'>
      <div className='bg-cya-200 max-h-[98%] flex flex-wrap gap-6 pl-[6rem] overflow-y-auto'>
        {handledCourses.map((item, i) => {
          return <CourseCode key={i} data={item}/>
        })}
      </div>
      
      {/* {isOpen && 
      <CourseSubject 
        setIsOpen={setIsOpen} 
        className='absolute top-0 left-0'
      />} */}
    </PageContainer>
  )
}

export default GradeEntry