import { faUser, faChartColumn } from "@fortawesome/free-solid-svg-icons"
import { CSSTransition } from "react-transition-group"
import { useEffect, useRef, useState } from "react"

import DashboardCard from "../../components/shared/components/DashboardCard"
import CourseList from "../../components/admin/CourseList"
import StudentList from "../../components/admin/StudentList"
import FacultyList from "../../components/admin/FacultyList"
import useFetch from "../../hooks/useFetch"
import useUserStore from "../../store/useUserStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Program, User } from "../../types/studentTypes"

const Dashboard = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const { userInfo } = useUserStore();

  //Count
  const { data } = useFetch('user/get-users', 'GET');
  const [students, setStudents] = useState<User[] | []>([]);
  const [faculties, setFaculties] = useState<User[] | []>([]);
  const [programs, setPrograms] = useState<Program[]>();
  
  const getPrograms = async () => {
    const token = localStorage.getItem('atoken');
    try {
      const res = await fetch(`${apiUrl}/program/get-programs`, {
        method: 'GET',
        headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json'
        }
    });
      const data = await res.json();

      if(data) setPrograms(data as Program[]);
    } catch(err) {
      console.log('Fetch Error')
    }
  }
  

  useEffect(() => {
    getPrograms();
    if(Array.isArray(data)) {
        const students = data.filter((d) => d.role === 'student');
        const faculties = data.filter((d) => d.role === 'faculty');
        setStudents(students);
        setFaculties(faculties);
    }
}, [data]);

  //STYLE
  const courseNodeRef = useRef(null);
  const studentNodeRef = useRef(null);
  const facultyNodeRef = useRef(null);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isFacultyOpen, setIsFacultyOpen] = useState(false);

  return (
    <div className='bg-cya-100 h-[100%] flex-[80%] relative'>
      <div className="bg-gree-300 h-[100%] flex flex-col justify-center">
        <div className='bg-cya-200 flex-[.2] flex justify-between'>
          <h1 className="text-[2rem] font-mono font-semibold text-slate-800 pt-[3rem]">Welcome {userInfo?.firstName}!</h1>
          <div className="bg-gree-200 pt-[1rem] flex gap-2">
            <div className="bg-slate-300 h-[4rem] w-[4rem] grid place-content-center rounded-full">
              <FontAwesomeIcon className="text-[2.5rem] text-slate-600" icon={faUser}/>
            </div>
            <p className="text-[1.1rem] mt-[1.2rem] text-slate-700 font-bold">{`${userInfo?.firstName || ''}`}</p>
          </div>
        </div>

        <div className="bg-gree-200 flex-[.3] flex justify-between flex-wrap">
          <DashboardCard count={programs?.length || 0} label="Courses" icon={faChartColumn} onClick={() => setIsCourseOpen(!isCourseOpen)}/>
          <DashboardCard count={students.length || 0} label="Students" icon={faUser} onClick={() => setIsStudentOpen(!isStudentOpen)}/>
          <DashboardCard count={faculties.length || 0} label="Faculty Members" icon={faUser} onClick={() => setIsFacultyOpen(!isFacultyOpen)}/>
        </div>

        <div className="bg-re-200 flex-[.5]">
          {/* <ActivityContainer>
            <div className="bg-cya-200 h-[100%] px-[4rem] pb-[4rem] overflow-auto scrollbar-hide">
              <ul className="">
                {activities.map(activity => {
                  return <li key={activity.id} className='py-[.5rem] font-[500] text-slate-900'>{activity.content}</li>
                })}
              </ul>
            </div>
          </ActivityContainer> */}
        </div>
      </div>

      <CSSTransition in={isCourseOpen} timeout={200} classNames="scale" unmountOnExit nodeRef={courseNodeRef}>
        <CourseList ref={courseNodeRef} handleOpenCard={() => setIsCourseOpen(!isCourseOpen)}/>
      </CSSTransition>
      <CSSTransition in={isStudentOpen} timeout={200} classNames="scale" unmountOnExit nodeRef={studentNodeRef}>
        <StudentList ref={studentNodeRef} handleOpenCard={() => setIsStudentOpen(!isStudentOpen)}/>
      </CSSTransition>
      <CSSTransition in={isFacultyOpen} timeout={200} classNames="scale" unmountOnExit nodeRef={facultyNodeRef}>
        <FacultyList ref={facultyNodeRef} handleOpenCard={() => setIsFacultyOpen(!isFacultyOpen)}/>
      </CSSTransition>
      
    </div>
  )
}

export default Dashboard