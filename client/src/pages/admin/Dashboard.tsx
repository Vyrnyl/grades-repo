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
import PieChart from "../../components/admin/PieChart"
import PercentageCircle from "../../components/admin/PercentageCircle"
import ProfilePic from "../../components/shared/components/ProfilePic"

const Dashboard = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');

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


  //Sessions
  const session = useFetch('activity/get-login-sessions', 'GET');
  const [active, setActive] = useState<{ id: number, activeSessions: number }>({ id: 0, activeSessions: 0 });

  useEffect(() => {
    if(session.data) {
      setActive(session.data as { id: number, activeSessions: number });
    }
  }, [session.data, data]);

  let percentage = active.activeSessions / (students.length + faculties.length) * 100;

  // console.log(percentage < 0 ? 0 : percentage)



  
  //Profile
  const [isOpen, setIsOpen] = useState(false);


   //GET IMAGE
   const [imgSrc, setImgSrc] = useState('');
   const [isImageError, setIsImageError] = useState(false);
   const [hasPic, setHasPic] = useState(false);
 
   useEffect(() => {
     const getProfilePic = async () => {
       try {
        const res = await fetch(`${apiUrl}/image/get-image`, {
          method: 'POST',
          headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userInfo?.id || 0 })
        });
        const data = await res.json();
        
        if(!res.ok && data.error) {
          setIsImageError(true);
        } else {
          const src = `data:${data.mimeType};base64,${data.image}`;
          setImgSrc(src);
          setIsImageError(false);
          setHasPic(true);
        }
       } catch(e) {
        console.log('Get error')
      }
     }
     getProfilePic();
  }, [userInfo, isOpen]);

  console.log()
  
  return (
    <div className='bg-cya-100 h-[100%] flex-[80%] relative'>
      <div className="bg-gree-300 h-[100%] flex flex-col justify-center">

        <div className='bg-cya-200 flex-[.2] flex justify-between'>
          <h1 className="text-[2rem] font-mono font-semibold text-slate-800 pt-[3rem]">Welcome {userInfo?.firstName}!</h1>
          <div className="bg-gree-200 pt-[1rem] flex gap-2 relative">
            <div onClick={() => setIsOpen(true)} className="bg-slate-300 h-[4rem] w-[4rem] grid place-content-center rounded-full">
              {hasPic ? <img src={imgSrc} alt="" className='h-[4rem] w-[4rem] rounded-full object-cover' /> :
                <FontAwesomeIcon className=" text-[2.5rem] text-slate-600" icon={faUser}/>
              }
            </div>
            <p className="text-[1.1rem] mt-[1.2rem] text-slate-700 font-bold">{`${userInfo?.firstName || ''}`}</p>
              
            {isOpen && <ProfilePic className="absolute left-[-15.2rem] top-[3rem] z-10" 
            setIsOpen={setIsOpen} hasPic={hasPic}/>}
          </div>
        </div>

        <div className="bg-gree-200 flex-[.3] flex justify-between flex-wrap">
          <DashboardCard count={programs?.length || 0} label="Programs" icon={faChartColumn} onClick={() => setIsCourseOpen(!isCourseOpen)}/>
          <DashboardCard count={students.length || 0} label="Students" icon={faUser} onClick={() => setIsStudentOpen(!isStudentOpen)}/>
          <DashboardCard count={faculties.length || 0} label="Faculty Members" icon={faUser} onClick={() => setIsFacultyOpen(!isFacultyOpen)}/>
        </div>
              
        <div className="bg-cya-200 flex-[.6] flex justify-evenly items-end">
          <div className="bg-pin-200 border-2 border-slate-600 h-[90%] px-8
          rounded-[1rem] grid place-content-center relative">
            <h1 className="absolute text-[1.5rem] font-semibold text-slate-700 top-[-2.5rem]">Active Users</h1>
            <span className="absolute text-[4rem] font-semibold text-slate-700 
            top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">{(percentage || percentage === 0) ? percentage.toFixed() : 0}%</span>
            <PercentageCircle active={active.activeSessions} inactive={(students.length + faculties.length + 1) || 0}/>
          </div>
          <div className="bg-gree-200 border-2 border-slate-600 px-[4rem] h-[100%]
          rounded-[1rem] grid place-content-center">
            <PieChart students={students}/>
          </div>
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